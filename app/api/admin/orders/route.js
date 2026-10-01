import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { listOrders } from '@/lib/orderStore';

export async function GET(request) {
  const authError = checkAdminPasscode(request);
  if (authError) return authError;

  try {
    const orders = await listOrders();
    return NextResponse.json({ orders });
  } catch (err) {
    console.error('[api/admin/orders] Error listing orders:', err);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
