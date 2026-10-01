import { NextResponse } from 'next/server';
import { getOrder } from '@/lib/orderStore';
import { paymentMethodParts, paymentTermsLines, money } from '@/lib/order';
import { REPLY } from '@/src/config/site';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const order = await getOrder(id);

    if (!order) {
      // Return 404 if not found
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const methodId = order.paymentMethodId || 'bank-transfer';
    const { opening, closing } = paymentMethodParts(methodId, order.total, order.orderNumber || order.id);
    const terms = paymentTermsLines(order.orderNumber || order.id);

    return NextResponse.json({
      orderNumber: order.orderNumber || order.id,
      total: order.total,
      formattedTotal: money(order.total),
      status: order.status,
      customerName: order.customer?.name || '',
      paymentMethodId: methodId,
      parsedFields: order.parsedPaymentFields || [],
      opening,
      closing,
      terms,
      paymentDetailsSentAt: order.paymentDetailsSentAt || null,
    });
  } catch (err) {
    console.error('[api/order/payment-details] Error:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve order payment details' },
      { status: 500 }
    );
  }
}
