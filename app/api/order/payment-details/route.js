import { NextResponse } from 'next/server';
import { getOrder } from '@/lib/orderStore';
import { paymentMethodParts, paymentTermsLines, money } from '@/lib/order';

/**
 * Public, token-by-order-number endpoint behind /order/payment-details/?id=...
 *
 * IMPORTANT: this route NEVER invents payment details. Account / PayID / wallet
 * details are only returned once the shop admin has sent them from the Reply
 * Portal (stored on the order as `parsedPaymentFields`). Until then the page
 * tells the customer the details will arrive by email.
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const cleanRef = String(id).trim().toUpperCase().slice(0, 40);
    let order = await getOrder(cleanRef);
    if (!order && cleanRef !== id) {
      order = await getOrder(String(id).slice(0, 40));
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const methodId = order.paymentMethodId || 'bank-transfer';
    const ref = order.orderNumber || order.id || cleanRef;
    const parsedFields = Array.isArray(order.parsedPaymentFields) ? order.parsedPaymentFields : [];
    const awaitingDetails = parsedFields.length === 0;

    const { opening, closing } = paymentMethodParts(methodId, order.total, ref);
    const firstName = String(order.customer?.name || '').trim().split(/\s+/)[0] || '';

    return NextResponse.json({
      orderNumber: ref,
      total: order.total,
      formattedTotal: money(order.total),
      status: order.status,
      customerName: firstName,
      paymentMethodId: methodId,
      awaitingDetails,
      parsedFields,
      opening: awaitingDetails ? '' : order.opening || opening,
      closing: awaitingDetails ? '' : order.closing || closing,
      terms: awaitingDetails ? [] : paymentTermsLines(ref),
      paymentDetailsSentAt: order.paymentDetailsSentAt || null,
    });
  } catch (err) {
    console.error('[api/order/payment-details] Error:', err);
    return NextResponse.json({ error: 'Failed to retrieve order payment details' }, { status: 500 });
  }
}
