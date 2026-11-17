// lib/seo.js
// Shared SEO helpers (pure functions, safe on server and client).
import { SITE } from '@/src/config/core';

export const SITE_ORIGIN = `https://${SITE.domain}`;

/** Make any site-relative path absolute (leaves http(s) URLs untouched). */
export function absUrl(path) {
  if (!path) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
}

function clampAtWord(text, max) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:(\-\/|]+$/, '')}…`;
}

/** Cut a title at a word boundary: no ellipsis, no dangling bracket, no trailing connector word. */
function clampTitleText(text, max = 60) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  let cut = s.slice(0, max);
  const sp = cut.lastIndexOf(' ');
  if (sp > max * 0.5) cut = cut.slice(0, sp);
  const open = cut.lastIndexOf('(');
  if (open >= 0 && cut.indexOf(')', open) < 0) cut = cut.slice(0, open);
  return cut.replace(/(\s+(and|or|for|with|the|a|of|in|to))+\s*$/i, '').replace(/[\s,;:(\-\/|&]+$/, '');
}

/** <title> <= 60 chars. Appends " | The Buggy Shop" only when it fits. Never ends in an ellipsis. */
export function clampTitle(name, suffix = ` | ${SITE.name}`) {
  const full = `${name}${suffix}`;
  if (full.length <= 60) return full;
  return clampTitleText(name, 60);
}

/**
 * Meta description <= 155 chars, never ending in an ellipsis.
 * Prefers the last complete sentence (when that keeps at least 130 characters), else cuts at a word and closes with a full stop.
 */
export function clampDesc(text, max = 155) {
  const t = String(text || '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const window = t.slice(0, max + 1);
  const stop = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '), window.lastIndexOf('? '));
  if (stop >= 130) return window.slice(0, stop + 1);
  let cut = t.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  if (sp > max * 0.6) cut = cut.slice(0, sp);
  cut = cut.replace(/[\s,;:(\-\/|&]+$/, '').replace(/(\s+(and|or|for|with|the|a|an|of|in|to|from|by|on|at|plus))+$/i, '').replace(/[\s,;:(\-\/|&]+$/, '');
  return /[.!?]$/.test(cut) ? cut : `${cut}.`;
}

/** Unique, stable SKU per product (previously truncated and collided). */
export function productSku(slug) {
  const s = String(slug).toUpperCase();
  if (s.length <= 40) return `TBS-${s}`;
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `TBS-${s.slice(0, 32)}-${h.toString(36).toUpperCase().slice(0, 6)}`;
}

/** Descriptive alt text per gallery image. */
export function productImageAlt(product, index = 0) {
  const base = `${product.name}`;
  return index === 0 ? `${base} - main view` : `${base} - gallery image ${index + 1}`;
}

/** True only when the product carries real, supplied review data. */
export function hasRealRating(product) {
  return Number(product?.rating) > 0 && Number(product?.reviewCount) > 0;
}

/** Normalises any page title: removes repeated brand suffixes, appends the brand once, <= 60 chars. */
export function seoTitle(raw) {
  let base = String(raw || '').replace(/&amp;/g, '&');
  base = base.replace(/(\s*\|\s*The Buggy Shop( Australia)?)+\s*$/i, '').trim();
  return clampTitle(base);
}

/** Meta description normaliser, <= 158 chars. */
export function seoDesc(raw) {
  return clampDesc(raw);
}

/** Product images that are real photos (excludes the "Photo coming soon" placeholder). */
export function realImages(product) {
  return (product?.images || []).filter((u) => u && !/placeholder/i.test(u));
}
