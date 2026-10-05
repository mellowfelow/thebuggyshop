// lib/rateLimit.js
// Minimal in-memory sliding-window limiter. Best-effort only: on serverless each
// instance has its own memory, so this blunts bursts / brute force but is not a
// substitute for a shared limiter (e.g. Upstash Ratelimit) at high scale.
const buckets = new Map();

export function clientIp(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(key, { limit = 10, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);

  // opportunistic cleanup
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (!v.length || now - v[v.length - 1] > windowMs) buckets.delete(k);
    }
  }
  return { allowed: hits.length <= limit, remaining: Math.max(0, limit - hits.length) };
}
