// lib/redis.js
// Upstash Redis SDK client for WebForge v11.1
// Checks 5 common credential pairs across Vercel / Upstash integrations
import { Redis } from '@upstash/redis';

let redisInstance = null;

function getRedisCredentials() {
  // Check in exact priority order per WebForge v11.1 spec
  const pairs = [
    { url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN },
    { url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN },
    { url: process.env.STORAGE_REST_API_URL, token: process.env.STORAGE_REST_API_TOKEN },
    { url: process.env.STORAGE_KV_REST_API_URL, token: process.env.STORAGE_KV_REST_API_TOKEN },
    { url: process.env.UPSTASH_REDIS_KV_REST_API_URL, token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN },
  ];

  for (const pair of pairs) {
    if (pair.url && pair.token) {
      return pair;
    }
  }

  return null;
}

export function getRedis() {
  if (redisInstance) return redisInstance;

  const creds = getRedisCredentials();
  if (!creds) {
    return null;
  }

  try {
    redisInstance = new Redis({
      url: creds.url,
      token: creds.token,
    });
    return redisInstance;
  } catch (err) {
    console.error('[redis] Initialization error:', err);
    return null;
  }
}
