// scripts/gen-lastmod.mjs
// Honest sitemap <lastmod> dates. src/config/lastmod.json maps each URL path to { h: content hash, d: date it last changed }.
// Run locally on every build (prebuild): if a URL's content hash changed, its date becomes today; otherwise the committed date stays.
// On Vercel (read-only, no commit) the file is left untouched, so deploys never invent a date.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pathToFileURL, fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outFile = path.join(root, 'src/config/lastmod.json');
if (process.env.VERCEL) { console.log('gen-lastmod: Vercel build, keeping committed dates'); process.exit(0); }

const imp = (p) => import(pathToFileURL(path.join(root, p)).href);
const { PRODUCTS, getProductsByCategory } = await imp('src/config/products.js');
const { CATEGORY_TREE, isPage } = await imp('src/config/categories.js');
const { BRANDS } = await imp('src/config/brands.js');
const { LOCATIONS } = await imp('src/config/locations.js');
const { POSTS } = await imp('src/config/posts.js');
const { FAQ_BANK } = await imp('src/config/faq.js');

const h = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);
const file = (p) => (fs.existsSync(path.join(root, p)) ? fs.readFileSync(path.join(root, p), 'utf8').replace(/\r\n/g, '\n') : '');
const today = new Date().toISOString().slice(0, 10);

const hashes = {};
const STATIC = { '/': ['app/page.jsx', 'src/components/HeroSlider.jsx'], '/shop/': ['app/shop/page.jsx'], '/brands/': ['app/brands/page.jsx'], '/golf-buggies/': ['app/golf-buggies/page.jsx'], '/about/': ['app/about/page.jsx'], '/blog/': ['app/blog/page.jsx'], '/compare/': ['app/compare/page.jsx'], '/finance/': ['app/finance/page.jsx'], '/faq/': ['app/faq/page.jsx'], '/wholesale/': ['app/wholesale/page.jsx'], '/contact/': ['app/contact/page.jsx'], '/shipping/': ['app/shipping/page.jsx'], '/returns/': ['app/returns/page.jsx'], '/privacy/': ['app/privacy/page.jsx'], '/terms/': ['app/terms/page.jsx'] };
for (const [u, files] of Object.entries(STATIC)) hashes[u] = h(files.map(file).join('\n') + (u === '/faq/' ? JSON.stringify(FAQ_BANK) : '') + (u === '/' ? JSON.stringify(PRODUCTS.filter((p) => p.featured).map((p) => [p.slug, p.price])) : '') + (u === '/shop/' || u === '/brands/' ? PRODUCTS.length : ''));
for (const c of CATEGORY_TREE.filter((n) => isPage(n))) hashes[`/shop/${c.slug}/`] = h(JSON.stringify(c) + JSON.stringify(getProductsByCategory(c.slug).map((p) => [p.slug, p.price, p.name])));
for (const p of PRODUCTS) hashes[`/shop/${p.category}/${p.slug}/`] = h(JSON.stringify(p));
for (const b of BRANDS) hashes[`/brands/${b.slug}/`] = h(JSON.stringify(b) + JSON.stringify(PRODUCTS.filter((p) => p.brand === b.slug).map((p) => [p.slug, p.price])));
for (const l of LOCATIONS) hashes[`/golf-buggies/${l.slug}/`] = h(JSON.stringify(l));
for (const post of POSTS) hashes[`/blog/${post.slug}/`] = h(JSON.stringify([post.title, post.titleTag, post.metaDescription, post.content, post.image, post.faqIds]));

const prev = fs.existsSync(outFile) ? JSON.parse(fs.readFileSync(outFile, 'utf8')) : {};
const next = {}; let changed = 0; let added = 0;
for (const [u, hash] of Object.entries(hashes)) {
  const p = prev[u];
  if (!p) { next[u] = { h: hash, d: today }; added++; }
  else if (p.h !== hash) { next[u] = { h: hash, d: today }; changed++; }
  else next[u] = p;
}
const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(outFile, JSON.stringify(sorted, null, 1) + '\n');
console.log(`gen-lastmod: ${Object.keys(sorted).length} URLs, ${added} new, ${changed} changed (date ${today})`);
