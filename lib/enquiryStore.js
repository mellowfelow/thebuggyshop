// lib/enquiryStore.js
// Single Redis hash for enquiries with in-memory sorting per WebForge v11.1
import { getRedis } from './redis';
import { REPLY } from '@/src/config/site';

const PREFIX = (REPLY?.orderPrefix || 'TBS').toLowerCase();
const ENQUIRIES_KEY = `${PREFIX}:enquiries`;

export function generateEnquiryRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
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
  if (!redis) return [];

  try {
    const rawMap = await redis.hgetall(ENQUIRIES_KEY);
    if (!rawMap) return [];

    const enquiries = Object.values(rawMap).map(val => {
      try {
        return typeof val === 'string' ? JSON.parse(val) : val;
      } catch {
        return null;
      }
    }).filter(Boolean);

    // In-memory sort by createdAt descending
    return enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error('[enquiryStore] Failed to list enquiries:', err);
    return [];
  }
}

export async function getEnquiry(id) {
  const redis = getRedis();
  if (!redis || !id) return null;

  try {
    const raw = await redis.hget(ENQUIRIES_KEY, id);
    if (!raw) return null;
    return typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch (err) {
    console.error(`[enquiryStore] Failed to get enquiry ${id}:`, err);
    return null;
  }
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
  const redis = getRedis();
  if (!redis) return false;

  try {
    await redis.hdel(ENQUIRIES_KEY, id);
    return true;
  } catch (err) {
    console.error(`[enquiryStore] Failed to delete enquiry ${id}:`, err);
    return false;
  }
}
