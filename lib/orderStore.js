// lib/orderStore.js
// Single Redis hash per type with in-memory sorting per WebForge v11.1
import { getRedis } from './redis';
import { REPLY } from '@/src/config/site';

const PREFIX = (REPLY?.orderPrefix || 'TBS').toLowerCase();
const ORDERS_KEY = `${PREFIX}:orders`;

/**
 * Generate an unambiguous alphanumeric order reference
 * Alphabet: ABCDEFGHJKLMNPQRSTUVWXYZ23456789 (no 0, O, 1, I, L)
 */
export function generateOrderRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const prefix = REPLY?.orderPrefix || 'TBS';
  return `${prefix}-${rand}`;
}

export async function saveOrder(orderData) {
  const redis = getRedis();
  const id = orderData.id || orderData.orderNumber || generateOrderRef();
  const now = new Date().toISOString();

  const record = {
    ...orderData,
    id,
    orderNumber: id,
    status: orderData.status || 'pending',
    channel: orderData.channel || 'email', // 'email' | 'whatsapp'
    createdAt: orderData.createdAt || now,
    updatedAt: now,
  };

  if (redis) {
    try {
      await redis.hset(ORDERS_KEY, { [id]: JSON.stringify(record) });
    } catch (err) {
      console.error('[orderStore] Failed to save order to Redis:', err);
    }
  }

  return record;
}

export async function listOrders() {
  const redis = getRedis();
  if (!redis) return [];

  try {
    const rawMap = await redis.hgetall(ORDERS_KEY);
    if (!rawMap) return [];

    const orders = Object.values(rawMap).map(val => {
      try {
        return typeof val === 'string' ? JSON.parse(val) : val;
      } catch {
        return null;
      }
    }).filter(Boolean);

    // In-memory sort by createdAt descending
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('[orderStore] Failed to list orders:', err);
    return [];
  }
}

export async function getOrder(id) {
  const redis = getRedis();
  if (!redis || !id) return null;

  try {
    const raw = await redis.hget(ORDERS_KEY, id);
    if (!raw) return null;
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (err) {
    console.error(`[orderStore] Failed to get order ${id}:`, err);
    return null;
  }
}

export async function markOrderSent(id, parsedFields, methodId = null) {
  const existing = await getOrder(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    status: 'payment_sent',
    paymentDetailsSentAt: new Date().toISOString(),
    parsedPaymentFields: parsedFields || existing.parsedPaymentFields,
    paymentMethodId: methodId || existing.paymentMethodId,
    updatedAt: new Date().toISOString(),
  };

  const redis = getRedis();
  if (redis) {
    try {
      await redis.hset(ORDERS_KEY, { [id]: JSON.stringify(updated) });
    } catch (err) {
      console.error(`[orderStore] Failed to update order status ${id}:`, err);
    }
  }

  return updated;
}

export async function markPaymentConfirmed(id, note = '', screenshotUrl = '') {
  const existing = await getOrder(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    status: 'payment_confirmed',
    paymentConfirmedAt: new Date().toISOString(),
    paymentNote: note,
    screenshotUrl,
    updatedAt: new Date().toISOString(),
  };

  const redis = getRedis();
  if (redis) {
    try {
      await redis.hset(ORDERS_KEY, { [id]: JSON.stringify(updated) });
    } catch (err) {
      console.error(`[orderStore] Failed to mark payment confirmed ${id}:`, err);
    }
  }

  return updated;
}

export async function deleteOrder(id) {
  const redis = getRedis();
  if (!redis) return false;

  try {
    await redis.hdel(ORDERS_KEY, id);
    return true;
  } catch (err) {
    console.error(`[orderStore] Failed to delete order ${id}:`, err);
    return false;
  }
}
