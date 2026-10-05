// lib/adminAuth.js
// Passcode authentication for Reply Portal admin routes.
// Server-side only - never expose ADMIN_PASSCODE to the client.
//
// Hardening vs the previous version:
//  - NO default passcode. If ADMIN_PASSCODE is not configured every admin call is refused (503).
//  - Constant-time comparison.
//  - Per-IP lockout after repeated failures (best-effort, in-memory per server instance).
import { timingSafeEqual } from 'node:crypto';
import { rateLimit, clientIp } from '@/lib/rateLimit';

function safeEqual(a, b) {
  const ab = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ab.length !== bb.length) {
    // still do a comparison so timing does not reveal the length match
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export function checkAdminPasscode(request) {
  const adminPasscode = process.env.ADMIN_PASSCODE;

  if (!adminPasscode || adminPasscode.length < 8) {
    return Response.json(
      { error: 'Admin portal is not configured. Set a strong ADMIN_PASSCODE (8+ characters) in the environment.' },
      { status: 503 }
    );
  }

  const ip = clientIp(request);
  const provided = request.headers.get('x-admin-passcode');

  if (!provided || !safeEqual(provided, adminPasscode)) {
    // Count failures only; successful logins are never throttled.
    const { allowed } = rateLimit(`admin-fail:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 });
    if (!allowed) {
      return Response.json(
        { error: 'Too many failed attempts. Try again in 15 minutes.' },
        { status: 429 }
      );
    }
    return Response.json({ error: 'Invalid or missing administrator passcode.' }, { status: 401 });
  }

  return null; // OK
}
