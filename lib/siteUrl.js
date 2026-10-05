// lib/siteUrl.js
// Single place that decides the public base URL used in outbound emails / links.
// It NEVER trusts request headers (Origin / Host / Referer) - those are
// attacker-controlled and previously allowed forged links in payment emails.
import { SITE } from '@/src/config/site';

const isPlaceholder = (v) => !v || /DOMAIN/i.test(v);

export function getSiteBaseUrl() {
  const fromEnv = [process.env.SITE_URL, process.env.NEXT_PUBLIC_SITE_URL].find(
    (v) => v && !isPlaceholder(v)
  );
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (!isPlaceholder(SITE.domain)) return `https://${SITE.domain}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}
