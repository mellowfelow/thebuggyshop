import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, deleteOrder, markOrderSent, markPaymentConfirmed } from '@/lib/orderStore';

export async function GET(request, { params }) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function DELETE(request, { params }) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  const { id } = await params;
  const success = await deleteOrder(id);

  if (!success) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request, { params }) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  const { id } = await params;
  const body = await request.json();

  if (body.action === 'mark_sent') {
    const updated = await markOrderSent(id, body.parsedFields, body.paymentMethodId);
    return NextResponse.json({ success: true, order: updated });
  }

  if (body.action === 'mark_confirmed') {
    const updated = await markPaymentConfirmed(id, body.note, body.screenshotUrl);
    return NextResponse.json({ success: true, order: updated });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
