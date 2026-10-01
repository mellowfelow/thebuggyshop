import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { paymentDetailsEmail } from '@/utils/emailTemplates';
import { CONTACT, FORMS } from '@/src/config/site';

export async function POST(request) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { orderId, methodId, rawDetail, parsedFields = [], customNote = '' } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
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
      html: paymentDetailsEmail(order, { methodId, parsedFields, rawDetail, customNote }),
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
