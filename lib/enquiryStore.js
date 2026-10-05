import { randomInt } from 'node:crypto';
// lib/enquiryStore.js
// Single Redis hash for enquiries with in-memory sorting per WebForge v11.1
// Includes resilient fallback cache so enquiries can always be viewed even when Redis is not configured
import fs from 'fs';
import path from 'path';
import { getRedis } from './redis';
import { REPLY } from '@/src/config/site';

const PREFIX = (REPLY?.orderPrefix || 'TBS').toLowerCase();
const ENQUIRIES_KEY = `${PREFIX}:enquiries`;
const FALLBACK_CACHE_FILE = path.join('/tmp', `the_buggy_shop_${PREFIX}_enquiries.json`);

const memoryEnquiries = new Map();

function loadFallbackCache() {
  try {
    if (fs.existsSync(FALLBACK_CACHE_FILE)) {
      const content = fs.readFileSync(FALLBACK_CACHE_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === 'object') {
        Object.entries(parsed).forEach(([k, v]) => memoryEnquiries.set(k, v));
      }
    }
  } catch {
    // Ignore cache read errors
  }
}

function persistFallbackCache() {
  try {
    const obj = {};
    for (const [k, v] of memoryEnquiries.entries()) {
      obj[k] = v;
    }
    fs.writeFileSync(FALLBACK_CACHE_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch {
    // Ignore cache write errors
  }
}

// Initial load
loadFallbackCache();

export function generateEnquiryRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(randomInt(chars.length));
  }
  return `ENQ-${rand}`;
}

export async function saveEnquiry(enquiryData) {
  const redis = getRedis();
  const id = enquiryData.id || generateEnquiryRef();
  const now = new Date().toISOString();

  const record = {
    ...enquiryData,
    id,
    type: enquiryData.type || 'contact', // 'contact' | 'wholesale' | 'custom'
    status: enquiryData.status || 'new', // 'new' | 'replied'
    createdAt: enquiryData.createdAt || now,
    updatedAt: now,
  };

  memoryEnquiries.set(id, record);
  persistFallbackCache();

  if (redis) {
    try {
      await redis.hset(ENQUIRIES_KEY, { [id]: JSON.stringify(record) });
    } catch (err) {
      console.error('[enquiryStore] Failed to save enquiry to Redis:', err);
    }
  }

  return record;
}

export async function listEnquiries() {
  const redis = getRedis();
  let enquiries = [];

  if (redis) {
    try {
      const rawMap = await redis.hgetall(ENQUIRIES_KEY);
      if (rawMap) {
        enquiries = Object.values(rawMap).map(val => {
          try {
            return typeof val === 'string' ? JSON.parse(val) : val;
          } catch {
            return null;
          }
        }).filter(Boolean);

        enquiries.forEach(e => {
          if (e && e.id) memoryEnquiries.set(e.id, e);
        });
        persistFallbackCache();
      }
    } catch (err) {
      console.error('[enquiryStore] Failed to list enquiries:', err);
    }
  }

  if (enquiries.length === 0 && memoryEnquiries.size > 0) {
    enquiries = Array.from(memoryEnquiries.values());
  }

  // In-memory sort by createdAt descending
  return enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getEnquiry(id) {
  if (!id) return null;
  const redis = getRedis();

  if (redis) {
    try {
      const raw = await redis.hget(ENQUIRIES_KEY, id);
      if (raw) {
        const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
        memoryEnquiries.set(id, parsed);
        return parsed;
      }
    } catch (err) {
      console.error(`[enquiryStore] Failed to get enquiry ${id}:`, err);
    }
  }

  if (memoryEnquiries.has(id)) {
    return memoryEnquiries.get(id);
  }

  loadFallbackCache();
  return memoryEnquiries.get(id) || null;
}

export async function markEnquiryReplied(id, replyText = '') {
  const existing = await getEnquiry(id);
  if (!existing) return null;

  const updated = {
    ...existing,
    status: 'replied',
    repliedAt: new Date().toISOString(),
    lastReply: replyText,
    updatedAt: new Date().toISOString(),
  };

  memoryEnquiries.set(id, updated);
  persistFallbackCache();

  const redis = getRedis();
  if (redis) {
    try {
      await redis.hset(ENQUIRIES_KEY, { [id]: JSON.stringify(updated) });
    } catch (err) {
      console.error(`[enquiryStore] Failed to update enquiry status ${id}:`, err);
    }
  }

  return updated;
}

export async function deleteEnquiry(id) {
  memoryEnquiries.delete(id);
  persistFallbackCache();

  const redis = getRedis();
  if (!redis) return true;

  try {
    await redis.hdel(ENQUIRIES_KEY, id);
    return true;
  } catch (err) {
    console.error(`[enquiryStore] Failed to delete enquiry ${id}:`, err);
    return false;
  }
}
