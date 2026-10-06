// lib/announcementStore.js
// Announcement bar content. Stored as one JSON value in Redis, falling back to the defaults in
// src/config/announcements.js whenever Redis is not configured or nothing has been saved yet.
import { getRedis } from './redis';
import { REPLY } from '@/src/config/site';
import { DEFAULT_ANNOUNCEMENTS, sanitizeAnnouncements } from '@/src/config/announcements';

const KEY = `${(REPLY?.orderPrefix || 'TBS').toLowerCase()}:announcements`;

export async function getAnnouncements() {
  const redis = getRedis();
  if (!redis) return { ...DEFAULT_ANNOUNCEMENTS, source: 'default' };
  try {
    const stored = await redis.get(KEY);
    const data = typeof stored === 'string' ? JSON.parse(stored) : stored;
    if (data && Array.isArray(data.slides)) return { ...sanitizeAnnouncements(data), source: 'saved' };
  } catch (err) {
    console.error('[announcements] read failed, using defaults:', err);
  }
  return { ...DEFAULT_ANNOUNCEMENTS, source: 'default' };
}

export async function saveAnnouncements(input) {
  const clean = sanitizeAnnouncements(input);
  const redis = getRedis();
  if (!redis) throw new Error('Saving needs the Redis database (UPSTASH_REDIS_REST_URL / TOKEN) to be configured.');
  await redis.set(KEY, JSON.stringify(clean));
  return clean;
}

export async function resetAnnouncements() {
  const redis = getRedis();
  if (redis) await redis.del(KEY);
  return { ...DEFAULT_ANNOUNCEMENTS };
}
