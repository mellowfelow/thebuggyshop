import { NextResponse } from 'next/server';
import { sendMail } from '@/lib/mailer';
import { saveOrder, generateOrderRef } from '@/lib/orderStore';
import { saveEnquiry, generateEnquiryRef } from '@/lib/enquiryStore';
import {
  orderNotificationEmail,
  orderConfirmationEmail,
  enquiryNotificationEmail,
} from '@/utils/emailTemplates';
import { CONTACT, FORMS, SITE } from '@/src/config/site';

function getRequestBaseUrl(request) {
  const origin = request.headers.get('origin') || request.headers.get('referer');
  if (origin) {
    try {
      const u = new URL(origin);
      return `${u.protocol}//${u.host}`;
    } catch (e) {}
  }
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    return `${proto}://${host}`;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('DOMAIN')) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.SITE_URL && !process.env.SITE_URL.includes('DOMAIN')) {
    return process.env.SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (SITE.domain && SITE.domain !== 'DOMAIN.com' && !SITE.domain.includes('DOMAIN')) {
    return `https://${SITE.domain}`;
  }
  return 'https://ais-dev-xdh4d5ckavk5dajkxx66zn-274197567478.us-west2.run.app';
}

export async function POST(request) {
  try {
    const body = await request.json();
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

      const orderNumber = orderRef || body.orderNumber || generateOrderRef();

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
          name: customer.name || '',
          email: customer.email || '',
          phone: customer.phone || '',
          address: customer.address || '',
          state: customer.state || '',
          postcode: customer.postcode || '',
          notes: customer.notes || '',
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
    const {
      name,
      email,
      phone = '',
      subject = '',
      message = '',
      type = 'contact',
    } = body;

    if (!name || !email || !message) {
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
