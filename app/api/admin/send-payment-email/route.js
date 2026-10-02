import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { paymentDetailsEmail } from '@/utils/emailTemplates';
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
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { orderId, methodId = 'bank-transfer', rawDetail, parsedFields = [], customNote = '' } = body;
    const baseUrl = getRequestBaseUrl(request);

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
