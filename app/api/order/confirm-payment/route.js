import { NextResponse } from 'next/server';
import { getSiteBaseUrl } from '@/lib/siteUrl';
import { getOrder, markPaymentConfirmed } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { paymentConfirmationNotificationEmail } from '@/utils/emailTemplates';
import { CONTACT, FORMS, SITE } from '@/src/config/site';

function getRequestBaseUrl() {
  return getSiteBaseUrl();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, note = '', screenshotUrl = '' } = body;
    const baseUrl = getRequestBaseUrl(request);

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // 1. Mark status in Redis
    const updated = await markPaymentConfirmed(orderId, note, screenshotUrl);

    // 2. Send notification to shop admin
    const adminDest = process.env.ORDER_EMAIL || FORMS.destinations?.order || CONTACT.email;
    await sendMail({
      to: adminDest,
      subject: `[Payment Submitted] Order ${order.orderNumber || order.id} - ${order.customer?.name || 'Customer'}`,
      html: paymentConfirmationNotificationEmail(order, note, screenshotUrl, baseUrl),
      replyTo: order.customer?.email,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment confirmation received. Our dispatch team will verify settlement.',
      order: updated,
    });
  } catch (err) {
    console.error('[api/order/confirm-payment] Error:', err);
    return NextResponse.json(
      { error: 'Failed to record payment confirmation' },
      { status: 500 }
    );
  }
}
