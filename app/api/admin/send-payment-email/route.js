import { NextResponse } from 'next/server';
import { getSiteBaseUrl } from '@/lib/siteUrl';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { paymentDetailsEmail } from '@/utils/emailTemplates';
import { CONTACT, FORMS, SITE } from '@/src/config/site';

function getRequestBaseUrl() {
  return getSiteBaseUrl();
}

export async function POST(request) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { orderId, methodId = 'bank-transfer', rawDetail, parsedFields = [], customNote = '' } = body;
    const baseUrl = getRequestBaseUrl(request);

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // Safety: never email a customer blank / template-only payment details.
    const meaningful = (Array.isArray(parsedFields) ? parsedFields : []).filter(
      (f) => f && String(f.value || '').trim() && !/reference|plan|instal/i.test(String(f.label || ''))
    );
    if (meaningful.length === 0) {
      return NextResponse.json(
        { error: 'Enter the real payment details (account / PayID / wallet) before sending. Blank templates cannot be emailed.' },
        { status: 400 }
      );
    }

    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (!order.customer?.email) {
      return NextResponse.json({ error: 'Order does not have a customer email address.' }, { status: 400 });
    }

    // 1. Send Email to Customer
    const adminFrom = process.env.ORDER_EMAIL || FORMS.destinations?.order || CONTACT.email;
    const sendResult = await sendMail({
      to: order.customer.email,
      subject: `Payment Details: Order ${order.orderNumber || order.id} - The Buggy Shop`,
      html: paymentDetailsEmail(order, { methodId, parsedFields, rawDetail, customNote, customBaseUrl: baseUrl }),
      replyTo: adminFrom,
    });

    // 2. Mark order status as payment_sent in store
    const updated = await markOrderSent(orderId, parsedFields, methodId);

    return NextResponse.json({
      success: true,
      emailSent: sendResult.sent,
      reason: sendResult.reason || null,
      order: updated,
      message: sendResult.sent
        ? 'Payment details email sent successfully to customer.'
        : 'Payment details saved to order, but email could not be sent (SMTP not configured or rejected).',
    });
  } catch (err) {
    console.error('[api/admin/send-payment-email] Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to send payment email' },
      { status: 500 }
    );
  }
}
