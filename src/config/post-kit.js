// src/config/post-kit.js
// Shared helpers for the blog guide files (guides-*.js). Every price, model name and spec used in a guide is read from the
// product data here, so a post cannot quote a stale number. Format of post content: see src/components/ArticleBody.jsx.
import { PRODUCTS } from './products.js';
import { FACTS as F, money as $ } from './faq.js';

export { F, $ };
export const P = Object.fromEntries(PRODUCTS.map((p) => [p.slug, p]));
export const need = (slug) => { if (!P[slug]) throw new Error(`guide references a missing product: ${slug}`); return P[slug]; };
export const price = (slug) => $(need(slug).price);
export const pl = (slug, label) => { const p = need(slug); return `[${label || p.name}](/shop/${p.category}/${p.slug}/)`; };
export const cell = (s) => String(s ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim() || '-';
export const table = (head, rows) => [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`)].join('\n');
export const byPrice = (list) => [...list].sort((a, b) => a.price - b.price);
export const inSub = (cat, sub) => PRODUCTS.filter((p) => p.category === cat && (!sub || p.subcategory === sub));
export const lo = (list) => $(Math.min(...list.map((p) => p.price)));
export const hi = (list) => $(Math.max(...list.map((p) => p.price)));
export const spec = (p, k) => String(p.specs?.[k] ?? '-').replace(/\s*\(.*$/, '');
export const TODAY = '2026-10-06';
export const wc = (s) => s.trim().split(/\s+/).length;
export const mk = (o) => ({ ...o, content: o.content.trim(), readTime: `${Math.max(3, Math.round(wc(o.content) / 200))} min read`, words: wc(o.content), updated: TODAY, date: o.date || TODAY });
export const img = (slug) => `/images/products/${slug}/main.webp`;
