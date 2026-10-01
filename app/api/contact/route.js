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

export async function POST(request) {
  try {
    const body = await request.json();
    const formName = body.formName || (body.items ? 'order' : 'contact');

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
        paymentMethod = 'Direct Bank Wire (EFT / Osko / PayID)',
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
      await saveOrder(orderRecord);

      // 2. Send Shop Notification Email to Admin
      const adminDest = process.env.ORDER_EMAIL || FORMS.destinations?.order || CONTACT.email;
      await sendMail({
        to: adminDest,
        subject: `[New Order ${orderNumber}] ${customer.name} - ${channel === 'whatsapp' ? 'WhatsApp' : 'Web'} Checkout`,
        html: orderNotificationEmail(orderRecord),
        replyTo: customer.email,
      });

      // 3. UNCONDITIONAL Customer Confirmation Email (sent on both Web and WhatsApp checkouts)
      await sendMail({
        to: customer.email,
        subject: `Order Confirmation: ${orderNumber} - The Buggy Shop`,
        html: orderConfirmationEmail(orderRecord),
        replyTo: adminDest,
      });

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
      type = formName === 'wholesale' ? 'wholesale' : 'contact',
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please provide your name, email, and message.' },
        { status: 400 }
      );
    }

    const enquiryId = generateEnquiryRef();
    const enquiryRecord = {
      id: enquiryId,
      name,
      email,
      phone,
      subject: subject || `${SITE.name} ${type === 'wholesale' ? 'Wholesale / Fleet' : 'General'} Enquiry`,
      message,
      type,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    // 1. Save to enquiry store
    await saveEnquiry(enquiryRecord);

    // 2. Email Admin Desk
    const destEmail =
      type === 'wholesale'
        ? process.env.WHOLESALE_EMAIL || FORMS.destinations?.wholesale || CONTACT.email
        : process.env.CONTACT_EMAIL || FORMS.destinations?.contact || CONTACT.email;

    await sendMail({
      to: destEmail,
      subject: `[Enquiry ${enquiryId}] ${subject || name}`,
      html: enquiryNotificationEmail(enquiryRecord),
      replyTo: email,
    });

    return NextResponse.json({
      success: true,
      enquiryId,
      message: 'Enquiry received. Our Queensland team will respond promptly.',
    });
  } catch (error) {
    console.error('[api/contact] Error processing request:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
