import { NextResponse } from 'next/server';
import { getSiteBaseUrl } from '@/lib/siteUrl';
import { sendMail } from '@/lib/mailer';
import { saveOrder, getOrder, generateOrderRef } from '@/lib/orderStore';
import { rateLimit, clientIp } from '@/lib/rateLimit';
import { saveEnquiry, generateEnquiryRef } from '@/lib/enquiryStore';
import {
  orderNotificationEmail,
  orderConfirmationEmail,
  enquiryNotificationEmail,
} from '@/utils/emailTemplates';
import { CONTACT, FORMS, SITE } from '@/src/config/site';

function getRequestBaseUrl() {
  return getSiteBaseUrl();
}

export async function POST(request) {
  try {
    // --- abuse protection: per-IP rate limit (best-effort, in-memory) ---
    const { allowed } = rateLimit(`contact:${clientIp(request)}`, { limit: 8, windowMs: 10 * 60 * 1000 });
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: 'Too many submissions. Please wait a few minutes or WhatsApp us.' },
        { status: 429 }
      );
    }

    const raw = await request.text();
    if (raw.length > 100_000) {
      return NextResponse.json({ success: false, message: 'Request too large.' }, { status: 413 });
    }
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
    }

    // Honeypot: real users never fill this hidden field. Pretend success so bots move on.
    if (body && typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Received.' });
    }

    const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 200;

    const formName = body.formName || (body.items ? 'order' : 'contact');
    const baseUrl = getRequestBaseUrl(request);

    // =========================================================================
    // 1. ORDER SUBMISSION (both 'Place order' and 'Order via WhatsApp' checkout)
    // =========================================================================
    if (formName === 'order' || body.items) {
      const {
        customer = {},
        items = [],
        subtotal = 0,
        shipping = 0,
        discount = 0,
        total = 0,
        paymentMethod = 'Direct Bank Transfer (Osko / Fast EFT)',
        channel = 'email', // 'email' | 'whatsapp'
        orderRef,
      } = body;

      const suppliedRef = String(orderRef || body.orderNumber || '').trim().toUpperCase();
      const orderNumber = /^[A-Z]{2,6}-[A-Z2-9]{6}$/.test(suppliedRef) ? suppliedRef : generateOrderRef();
      if (suppliedRef && orderNumber === suppliedRef) {
        try {
          if (await getOrder(orderNumber)) {
            return NextResponse.json({ success: false, message: 'This order reference already exists. Please refresh and try again.' }, { status: 409 });
          }
        } catch (e) {}
      }

      if (!Array.isArray(items) || items.length === 0 || items.length > 60) {
        return NextResponse.json({ success: false, message: 'Your cart is empty or invalid.' }, { status: 400 });
      }
      if (!isEmail(clean(customer.email, 200)) || !clean(customer.name, 120)) {
        return NextResponse.json({ success: false, message: 'A valid name and email are required for order dispatch.' }, { status: 400 });
      }

      if (!customer.email || !customer.name) {
        return NextResponse.json(
          { success: false, message: 'Name and email are required for order dispatch.' },
          { status: 400 }
        );
      }

      const orderRecord = {
        id: orderNumber,
        orderNumber,
        customer: {
          name: clean(customer.name, 120),
          email: clean(customer.email, 200),
          phone: clean(customer.phone, 40),
          address: clean(customer.address, 300),
          state: clean(customer.state, 40),
          postcode: clean(customer.postcode, 12),
          notes: clean(customer.notes, 1500),
        },
        items,
        subtotal,
        shipping,
        discount,
        total,
        paymentMethod,
        channel,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // 1. Save to Redis order store
      let saved = null;
      try {
        saved = await saveOrder(orderRecord);
      } catch (saveErr) {
        console.error('[contact/route] Failed to save order to store:', saveErr);
      }

      // 2. Send Shop Notification Email to Admin Desk (Zoho Mail)
      const adminDest = process.env.ORDER_EMAIL || FORMS.destinations?.order || CONTACT.email;
      try {
        const adminEmailHtml = orderNotificationEmail(orderRecord, baseUrl);
        await sendMail({
          to: adminDest,
          subject: `[New Order ${orderNumber}] ${customer.name} - ${channel === 'whatsapp' ? 'WhatsApp' : 'Web'} Checkout`,
          html: adminEmailHtml,
          replyTo: customer.email,
        });
      } catch (mailErr) {
        console.error('[contact/route] Failed to dispatch admin order email:', mailErr);
      }

      // 3. UNCONDITIONAL Customer Confirmation Email (sent on both Web and WhatsApp checkouts)
      try {
        const customerEmailHtml = orderConfirmationEmail(orderRecord, baseUrl);
        await sendMail({
          to: customer.email,
          subject: `Order Confirmation: ${orderNumber} - The Buggy Shop`,
          html: customerEmailHtml,
          replyTo: adminDest,
        });
      } catch (custMailErr) {
        console.error('[contact/route] Failed to dispatch customer confirmation email:', custMailErr);
      }

      return NextResponse.json({
        success: true,
        orderId: orderNumber,
        orderNumber,
        message: 'Order received and confirmed. Payment instructions dispatched.',
      });
    }

    // =========================================================================
    // 2. ENQUIRY / CONTACT / WHOLESALE SUBMISSION
    // =========================================================================
    const type = body.type === 'wholesale' ? 'wholesale' : 'contact';
    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const phone = clean(body.phone, 40);
    const subject = clean(body.subject, 200);
    const message = clean(body.message, 5000);

    if (!name || !isEmail(email) || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const enquiryId = generateEnquiryRef();
    const enquiryRecord = {
      id: enquiryId,
      name,
      email,
      phone,
      subject: subject || (type === 'wholesale' ? 'Wholesale / Fleet Application' : 'General Enquiry'),
      message,
      type,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    // 1. Save to Redis enquiry store
    await saveEnquiry(enquiryRecord);

    // 2. Send Notification Email to Admin
    const destEmail =
      type === 'wholesale'
        ? process.env.WHOLESALE_EMAIL || FORMS.destinations?.wholesale || CONTACT.email
        : process.env.CONTACT_EMAIL || FORMS.destinations?.contact || CONTACT.email;

    await sendMail({
      to: destEmail,
      subject: `[${type === 'wholesale' ? 'Wholesale Enquiry' : 'Customer Enquiry'}] ${name} - ${subject || 'The Buggy Shop'}`,
      html: enquiryNotificationEmail(enquiryRecord, baseUrl),
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      enquiryId,
      message: 'Enquiry received. A technical consultant will respond shortly.',
    });
  } catch (err) {
    console.error('[api/contact] Error processing submission:', err);
    return NextResponse.json(
      { success: false, message: 'Internal server error processing request.' },
      { status: 500 }
    );
  }
}
