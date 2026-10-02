import { NextResponse } from 'next/server';
import { getOrder, markPaymentConfirmed } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { paymentConfirmationNotificationEmail } from '@/utils/emailTemplates';
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
