// lib/orderStore.js
// Single Redis hash per type with in-memory sorting per WebForge v11.1
// Includes resilient fallback cache so orders can always be viewed even when Redis is not configured
import fs from 'fs';
import path from 'path';
import { getRedis } from './redis';
import { REPLY } from '@/src/config/site';

const PREFIX = (REPLY?.orderPrefix || 'TBS').toLowerCase();
const ORDERS_KEY = `${PREFIX}:orders`;
const FALLBACK_CACHE_FILE = path.join('/tmp', `the_buggy_shop_${PREFIX}_orders.json`);

const memoryOrders = new Map();

function loadFallbackCache() {
  try {
    if (fs.existsSync(FALLBACK_CACHE_FILE)) {
      const content = fs.readFileSync(FALLBACK_CACHE_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object') {
        Object.entries(parsed).forEach(([k, v]) => memoryOrders.set(k, v));
      }
    }
  } catch {
    // Ignore cache read errors
  }
}

function persistFallbackCache() {
  try {
    const obj = {};
    for (const [k, v] of memoryOrders.entries()) {
      obj[k] = v;
    }
    fs.writeFileSync(FALLBACK_CACHE_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch {
    // Ignore cache write errors
  }
}

// Initial load
loadFallbackCache();

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

  // Always update memory and persistent fallback cache
  memoryOrders.set(id, record);
  persistFallbackCache();

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
  let orders = [];

  if (redis) {
    try {
      const rawMap = await redis.hgetall(ORDERS_KEY);
      if (rawMap) {
        orders = Object.values(rawMap).map(val => {
          try {
            return typeof val === 'string' ? JSON.parse(val) : val;
          } catch {
            return null;
          }
        }).filter(Boolean);

        // Sync into fallback cache
        orders.forEach(o => {
          if (o && o.id) memoryOrders.set(o.id, o);
        });
        persistFallbackCache();
      }
    } catch (err) {
      console.error('[orderStore] Failed to list orders from Redis:', err);
    }
  }

  // If Redis was empty or unconfigured, read from memory cache
  if (orders.length === 0 && memoryOrders.size > 0) {
    orders = Array.from(memoryOrders.values());
  }

  // In-memory sort by createdAt descending
  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getOrder(id) {
  if (!id) return null;
  const redis = getRedis();

  if (redis) {
    try {
      const raw = await redis.hget(ORDERS_KEY, id);
      if (raw) {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        memoryOrders.set(id, parsed);
        return parsed;
      }
    } catch (err) {
      console.error(`[orderStore] Failed to get order ${id} from Redis:`, err);
    }
  }

  // Fallback to memory / file cache
  if (memoryOrders.has(id)) {
    return memoryOrders.get(id);
  }

  // Try reload cache once
  loadFallbackCache();
  return memoryOrders.get(id) || null;
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

  memoryOrders.set(id, updated);
  persistFallbackCache();

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

  memoryOrders.set(id, updated);
  persistFallbackCache();

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
  memoryOrders.delete(id);
  persistFallbackCache();

  const redis = getRedis();
  if (!redis) return true;

  try {
    await redis.hdel(ORDERS_KEY, id);
    return true;
  } catch (err) {
    console.error(`[orderStore] Failed to delete order ${id}:`, err);
    return false;
  }
}
