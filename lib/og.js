// lib/og.js (server only): Open Graph images that are guaranteed to exist.
// Returns the first candidate that is a real file in /public (or an absolute URL), else the site hero image.
import fs from 'fs';
import path from 'path';
import { absUrl } from './seo';

export const OG_FALLBACK = '/images/hero/hero-1.webp';

export function ogImages(...candidates) {
  for (const c of candidates) {
    if (!c) continue;
    if (/^https?:\/\//i.test(c)) return [{ url: c }];
    if (fs.existsSync(path.join(process.cwd(), 'public', c.replace(/^\//, '')))) return [{ url: absUrl(c) }];
  }
  return [{ url: absUrl(OG_FALLBACK) }];
}
