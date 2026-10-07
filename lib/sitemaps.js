// lib/sitemaps.js
// Split sitemaps (WebForge v9): an index plus child sitemaps for pages, categories, products (image-aware), brands, locations and blog.
// Every URL carries a real <lastmod> from src/config/lastmod.json (content-hash ledger, see scripts/gen-lastmod.mjs).
import { SITE, POSTS } from '@/src/config/site';
import { CATEGORY_TREE, isPage } from '@/src/config/categories';
import { PRODUCTS, getProductsByCategory } from '@/src/config/products';
import { BRANDS } from '@/src/config/brands';
import { LOCATIONS } from '@/src/config/locations';
import { absUrl, realImages } from '@/lib/seo';
import LASTMOD from '@/src/config/lastmod.json';

const base = () => `https://${SITE.domain}`;
const lm = (p) => LASTMOD[p]?.d || '2026-10-06';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const STATIC_PAGES = [['/', 1.0, 'daily'], ['/shop/', 0.9, 'daily'], ['/brands/', 0.8, 'weekly'], ['/golf-buggies/', 0.8, 'weekly'], ['/about/', 0.7, 'monthly'], ['/blog/', 0.7, 'weekly'], ['/compare/', 0.7, 'weekly'], ['/finance/', 0.7, 'monthly'], ['/faq/', 0.7, 'monthly'], ['/wholesale/', 0.6, 'monthly'], ['/contact/', 0.7, 'monthly'], ['/shipping/', 0.4, 'yearly'], ['/returns/', 0.4, 'yearly'], ['/privacy/', 0.3, 'yearly'], ['/terms/', 0.3, 'yearly']];

const entry = (path, freq, prio, images = []) => ({ path, freq, prio, images });
export const GROUPS = {
  pages: () => STATIC_PAGES.map(([p, prio, f]) => entry(p, f, prio)),
  categories: () => CATEGORY_TREE.filter((c) => isPage(c) && getProductsByCategory(c.slug).length > 0).map((c) => entry(`/shop/${c.slug}/`, 'weekly', c.parent ? 0.7 : 0.8)),
  products: () => PRODUCTS.map((p) => entry(`/shop/${p.category}/${p.slug}/`, 'weekly', 0.85, realImages(p).map(absUrl))),
  brands: () => BRANDS.filter((b) => PRODUCTS.some((p) => p.brand === b.slug)).map((b) => entry(`/brands/${b.slug}/`, 'weekly', 0.75)),
  locations: () => LOCATIONS.map((l) => entry(`/golf-buggies/${l.slug}/`, 'weekly', 0.75)),
  blog: () => POSTS.map((post) => entry(`/blog/${post.slug}/`, 'monthly', 0.65, post.image ? [absUrl(post.image)] : [])),
};

export const urlsetXml = (group) => {
  const items = GROUPS[group]();
  const body = items.map((e) => `<url>\n<loc>${esc(base() + e.path)}</loc>\n<lastmod>${lm(e.path)}</lastmod>\n<changefreq>${e.freq}</changefreq>\n<priority>${e.prio}</priority>${e.images.map((i) => `\n<image:image><image:loc>${esc(i)}</image:loc></image:image>`).join('')}\n</url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
};

export const indexXml = () => {
  const newest = (group) => GROUPS[group]().map((e) => lm(e.path)).sort().at(-1);
  const rows = Object.keys(GROUPS).map((g) => `<sitemap>\n<loc>${base()}/sitemap-${g}.xml</loc>\n<lastmod>${newest(g)}</lastmod>\n</sitemap>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</sitemapindex>\n`;
};

export const XML_HEADERS = { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, must-revalidate' };
