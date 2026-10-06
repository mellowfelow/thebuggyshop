// scripts/crosscheck.mjs
// Pre-ship crosscheck for The Buggy Shop. Exits non-zero on any BLOCKING failure.
//   node scripts/crosscheck.mjs                  -> source + generated files (+ build output if .next exists)
//   CROSSCHECK_PRODUCTION=1 node scripts/crosscheck.mjs -> also fails while the domain is still the DOMAIN.com placeholder
//
// This replaces an earlier version that passed while secrets, fake bank details, fake ratings and
// 404 links were all present. Every check below exists because a real defect was found.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imp = (p) => import(pathToFileURL(path.join(ROOT, p)).href);
const PROD = process.env.CROSSCHECK_PRODUCTION === '1';

const errors = [];
const warns = [];
const ok = [];
const fail = (id, msg) => errors.push(`${id} ${msg}`);
const warn = (id, msg) => warns.push(`${id} ${msg}`);
const pass = (id, msg) => ok.push(`${id} ${msg}`);

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const SKIP = new Set(['node_modules', '.next', '.git', 'out', 'coverage']);
const walk = (dir, filter = () => true) => {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs.readdirSync(abs, { withFileTypes: true }).flatMap((e) =>
    SKIP.has(e.name) ? [] : e.isDirectory() ? walk(path.join(dir, e.name), filter) : filter(e.name) ? [path.join(dir, e.name).replace(/\\/g, '/')] : []
  );
};
const codeFiles = [...walk('app', (n) => /\.(jsx?|tsx?|mjs)$/.test(n)), ...walk('src', (n) => /\.(jsx?|tsx?)$/.test(n)), ...walk('lib'), ...walk('utils')].filter((f) => /\.(jsx?|tsx?|mjs)$/.test(f));

const site = await imp('src/config/site.js');
const { PRODUCTS } = await imp('src/config/products.js');
const { CATEGORY_TREE } = await imp('src/config/categories.js');
const { BRANDS } = await imp('src/config/brands.js');

// ---------------------------------------------------------------- B1 secrets / defaults
{
  const envEx = exists('.env.example') ? read('.env.example') : '';
  const bad = envEx.split('\n').filter((l) => /^(SMTP_PASS|ADMIN_PASSCODE|UPSTASH_REDIS_REST_TOKEN|RESEND_API_KEY|GEMINI_API_KEY)\s*=\s*\S+/.test(l));
  bad.length ? fail('B1a', `.env.example contains values for: ${bad.map((l) => l.split('=')[0]).join(', ')}`) : pass('B1a', '.env.example has no secret values');

  const tracked = [...codeFiles, '.env.example', 'README.md', 'CLAUDE.md'].filter(exists);
  const hits = tracked.filter((f) => /orderreply/.test(read(f)));
  hits.length ? fail('B1b', `known leaked passcode string present in: ${hits.join(', ')}`) : pass('B1b', 'no leaked passcode string');

  const auth = read('lib/adminAuth.js');
  /ADMIN_PASSCODE\s*\|\|\s*['"`]/.test(auth) ? fail('B1c', 'adminAuth has a default passcode fallback') : pass('B1c', 'adminAuth has no default passcode');
}

// ---------------------------------------------------------------- B2 fake payment details
{
  const pat = /(\b064-000\b|1234 5678|bc1q[0-9a-z]{20,}|TYDz[A-Za-z0-9]{10,}|Alternative PayID)/;
  const hits = codeFiles.filter((f) => pat.test(read(f)));
  hits.length ? fail('B2', `hard-coded placeholder payment details in: ${hits.join(', ')}`) : pass('B2', 'no hard-coded bank / wallet / PayID values in code');
}

// ---------------------------------------------------------------- B3 retired provider + host trust
{
  const w3 = codeFiles.filter((f) => /web3forms/i.test(read(f)));
  w3.length ? fail('B3a', `Web3Forms referenced in: ${w3.join(', ')}`) : pass('B3a', 'no Web3Forms references');
  const hostTrust = codeFiles.filter((f) => /headers\.get\(['"](origin|referer|x-forwarded-host|host)['"]\)/.test(read(f)) && /baseUrl|BaseUrl/.test(read(f)));
  hostTrust.length ? fail('B3b', `email/base URL derived from request headers in: ${hostTrust.join(', ')}`) : pass('B3b', 'base URL is never taken from request headers');
  const runApp = codeFiles.filter((f) => /\.run\.app|ais-(dev|pre)-/.test(read(f)));
  runApp.length ? fail('B3c', `hard-coded AI Studio preview URL in: ${runApp.join(', ')}`) : pass('B3c', 'no hard-coded preview URLs');
}

// ---------------------------------------------------------------- B4 review integrity (supplied reviews untouched, never invented)
{
  const fallback = codeFiles.filter((f) => /(rating|reviewCount)\s*\|\|\s*[1-9][\d.]*/.test(read(f)));
  fallback.length ? fail('B4', `fallback/invented rating or review count in: ${fallback.join(', ')}`) : pass('B4', 'ratings are only emitted from supplied data (no numeric fallbacks)');
}

// ---------------------------------------------------------------- B5 admin + noindex
{
  const adminRoutes = walk('app/api/admin', (n) => n === 'route.js');
  const unguarded = adminRoutes.filter((f) => !/checkAdminPasscode/.test(read(f)));
  unguarded.length ? fail('B5a', `admin API route without checkAdminPasscode: ${unguarded.join(', ')}`) : pass('B5a', `${adminRoutes.length} admin API routes are all passcode-guarded`);
  const exposed = codeFiles.filter((f) => /NEXT_PUBLIC_ADMIN|NEXT_PUBLIC_.*PASSCODE/.test(read(f)));
  exposed.length ? fail('B5b', `ADMIN_PASSCODE exposed to client in: ${exposed.join(', ')}`) : pass('B5b', 'ADMIN_PASSCODE is server-only');
  for (const l of ['app/admin/layout.jsx', 'app/order/layout.jsx', 'app/thank-you-order/layout.jsx', 'app/thank-you-contact/page.jsx', 'app/thank-you-wholesale/page.jsx']) {
    if (!exists(l)) { fail('B5c', `missing ${l}`); continue; }
    /index:\s*false/.test(read(l)) ? pass('B5c', `${l} is noindex`) : fail('B5c', `${l} is not noindex`);
  }
}

// ---------------------------------------------------------------- B6 robots / required files
{
  exists('app/robots.js') || exists('app/robots.ts') ? fail('B6a', 'app/robots.* conflicts with generated public/robots.txt') : pass('B6a', 'single robots source (public/robots.txt)');
  const must = ['public/robots.txt', 'public/llms.txt', 'public/auth.md', 'public/js/webmcp.js', 'public/apple-touch-icon.png', 'public/.well-known/api-catalog', 'public/.well-known/agent-skills/index.json', 'public/.well-known/mcp/server-card.json', 'public/.well-known/oauth-protected-resource', 'public/.well-known/oauth-authorization-server', 'public/.well-known/openid-configuration', 'public/.well-known/acp.json', 'public/.well-known/ucp', 'vercel.json'];
  const missing = must.filter((f) => !exists(f));
  missing.length ? fail('B6b', `missing required files: ${missing.join(', ')}`) : pass('B6b', 'all agent / config files present');
  if (exists('public/.well-known/ucp')) { JSON.parse(read('public/.well-known/ucp')).ucp === '1.0' ? pass('B6c', 'ucp "1.0" present') : fail('B6c', 'ucp field missing'); }
  exists('public/auth.md') && /^# Auth\.md/.test(read('public/auth.md')) ? pass('B6d', 'auth.md heading ok') : fail('B6d', 'auth.md must start with "# Auth.md"');
  for (const p of ['faq', 'wholesale', 'shipping', 'returns', 'privacy', 'terms']) exists(`app/${p}/page.jsx`) ? 0 : fail('B6e', `missing page /${p}/`);
}

// ---------------------------------------------------------------- B7 taxonomy + product integrity
{
  const roots = CATEGORY_TREE.filter((c) => !c.parent && c.id !== 'brands');
  const rootSlugs = new Set(roots.map((r) => r.slug));
  const idToSlug = Object.fromEntries(CATEGORY_TREE.map((c) => [c.id, c.slug]));
  const childrenOf = (rootSlug) => new Set(CATEGORY_TREE.filter((c) => idToSlug[c.parent] === rootSlug).map((c) => c.slug));
  const slugs = CATEGORY_TREE.map((c) => c.slug);
  slugs.length === new Set(slugs).size ? pass('B7a', 'category slugs are unique') : fail('B7a', 'duplicate category slugs in tree');
  CATEGORY_TREE.some((c) => 'itemCount' in c) ? fail('B7b', 'stored itemCount found in tree (must be computed)') : pass('B7b', 'no stored item counts');

  const badCat = PRODUCTS.filter((p) => !rootSlugs.has(p.category));
  badCat.length ? fail('B7c', `${badCat.length} products use a category that is not a tree root: ${[...new Set(badCat.map((p) => p.category))].join(', ')}`) : pass('B7c', 'every product category is a tree root');
  const badSub = PRODUCTS.filter((p) => { const kids = childrenOf(p.category); return kids.size ? !kids.has(p.subcategory) : false; });
  badSub.length ? fail('B7d', `${badSub.length} products have a subcategory that is not a child of their category: ${badSub.slice(0, 4).map((p) => `${p.slug}(${p.category}>${p.subcategory})`).join(', ')}`) : pass('B7d', 'every subcategory belongs to its category');
  const badPath = PRODUCTS.filter((p) => p.categoryPath !== `/${p.category}/`);
  badPath.length ? fail('B7e', `${badPath.length} products have categoryPath != /<category>/`) : pass('B7e', 'categoryPath consistent');

  const u = new Set(); const dupSlug = PRODUCTS.filter((p) => (u.has(p.slug) ? true : (u.add(p.slug), false)));
  dupSlug.length ? fail('B7f', `duplicate product slugs: ${dupSlug.map((p) => p.slug).join(', ')}`) : pass('B7f', `${PRODUCTS.length} unique product slugs`);
  const d = new Map(); PRODUCTS.forEach((p) => d.set(p.description, (d.get(p.description) || 0) + 1));
  const dupDesc = [...d.values()].filter((n) => n > 1).length;
  dupDesc ? fail('B7g', `${dupDesc} duplicated product descriptions`) : pass('B7g', 'product descriptions are unique');

  const floors = { 'electric-golf-buggies': 1000, 'push-pull-golf-buggies': 450, 'kids-buggies': 850 };
  const below = PRODUCTS.filter((p) => floors[p.category] && p.price < floors[p.category]);
  below.length ? fail('B7h', `price floor violations: ${below.map((p) => `${p.slug} $${p.price}`).join(', ')}`) : pass('B7h', 'price floors respected');
  const badData = PRODUCTS.filter((p) => !(p.price > 0) || !p.shortDescription || !p.description || !p.specs || !Object.keys(p.specs).length || !p.images?.length);
  badData.length ? fail('B7i', `incomplete product data: ${badData.map((p) => p.slug).join(', ')}`) : pass('B7i', 'all products have price, copy, specs and images');
  // 'generic' (aftermarket) and 'various' (mixed) are catch-all labels, not real brands
  const NON_BRANDS = new Set(['generic', 'various']);
  const unknownBrand = new Set(PRODUCTS.filter((p) => !NON_BRANDS.has(p.brand) && !BRANDS.some((b) => b.slug === p.brand)).map((p) => p.brand));
  unknownBrand.size ? warn('W7j', `${unknownBrand.size} product brands have no brand page (${[...unknownBrand].slice(0, 6).join(', ')}...)`) : pass('W7j', 'all brands have pages');

  // tiles in site.js must exist in the tree
  const tileBad = site.CATEGORIES.filter((c) => !CATEGORY_TREE.some((n) => n.slug === c.slug));
  tileBad.length ? fail('B7k', `home tiles not in tree: ${tileBad.map((c) => c.slug).join(', ')}`) : pass('B7k', 'home category tiles all exist in the tree');
}

// ---------------------------------------------------------------- B8 images
{
  const refs = new Set();
  const addRefs = (t) => { for (const m of t.matchAll(/['"`](\/images\/[^'"`\s]+)['"`]/g)) refs.add(m[1]); };
  [...codeFiles, 'src/config/products.js', 'src/config/categories.js', 'src/config/site.js'].filter(exists).forEach((f) => addRefs(read(f)));
  const missing = [...refs].filter((r) => !r.includes('${') && !exists(`public${r}`));
  missing.length ? fail('B8a', `${missing.length} referenced images missing on disk: ${missing.slice(0, 5).join(', ')}`) : pass('B8a', `${refs.size} image references all resolve`);

  const diskFiles = walk('public/images').map((f) => f.replace(/^public/, ''));
  const orphans = diskFiles.filter((f) => !refs.has(f));
  orphans.length ? warn('W8b', `${orphans.length} image files on disk are not referenced (first: ${orphans.slice(0, 3).join(', ')})`) : pass('W8b', 'no orphan image files');
  const jpgDup = diskFiles.filter((f) => f.endsWith('.jpg') && diskFiles.includes(f.replace(/\.jpg$/, '.webp')));
  jpgDup.length ? fail('B8c', `${jpgDup.length} jpg files duplicate a webp: ${jpgDup.slice(0, 3).join(', ')}`) : pass('B8c', 'no jpg/webp duplicates');
  const heavy = diskFiles.filter((f) => /^\/images\/(hero|categories)\//.test(f)).filter((f) => fs.statSync(path.join(ROOT, 'public', f)).size > 500 * 1024);
  heavy.length ? fail('B8d', `hero/category images over 500KB: ${heavy.join(', ')}`) : pass('B8d', 'hero + category images within budget');
  const raw = codeFiles.filter((f) => /<img[\s>]/.test(read(f)) && !/admin|order\/confirm-payment|emailTemplates/.test(f));
  raw.length ? fail('B8e', `raw <img> (use next/image) in: ${raw.join(', ')}`) : pass('B8e', 'public pages use next/image');
  const remote = PRODUCTS.flatMap((p) => p.images).filter((u) => /^https?:/.test(u));
  remote.length ? warn('W8f', `${remote.length} product image refs still hotlink remote stock photos (${[...new Set(remote.map((u) => new URL(u).host))].join(', ')})`) : pass('W8f', 'no remote product images');
  const ph = PRODUCTS.filter((p) => p.images.some((u) => /placeholder/.test(u))).length;
  ph ? warn('W8g', `${ph} products still use the placeholder image`) : pass('W8g', 'no placeholder product images');
}

// ---------------------------------------------------------------- B9 SEO source rules
{
  const pp = read('app/shop/[category]/[slug]/page.jsx');
  /clampTitle/.test(pp) && /clampDesc/.test(pp) ? pass('B9a', 'product title/description are length-clamped') : fail('B9a', 'product page does not clamp title/description');
  /hasRealRating/.test(pp) ? pass('B9b', 'aggregateRating guarded by hasRealRating') : fail('B9b', 'aggregateRating not guarded');
  /productSku/.test(pp) ? pass('B9c', 'unique SKU helper used') : fail('B9c', 'SKU helper not used');
  /\.map\(absUrl\)/.test(pp) ? pass('B9d', 'product schema images are absolute') : fail('B9d', 'product schema images are not absolute');
  /DOMAIN/i.test(site.SITE.domain) ? (PROD ? fail('B9e', 'SITE.domain is still the DOMAIN.com placeholder') : warn('W9e', 'SITE.domain is still DOMAIN.com (set the real domain, then rebuild)')) : pass('B9e', `domain set: ${site.SITE.domain}`);
  const hardDomain = codeFiles.filter((f) => /https:\/\/DOMAIN\.com/.test(read(f)));
  hardDomain.length ? fail('B9f', `hard-coded DOMAIN.com in: ${hardDomain.join(', ')}`) : pass('B9f', 'no hard-coded domain in source');
}

// ---------------------------------------------------------------- B10 internal links
{
  const pages = walk('app', (n) => /^page\.(jsx|tsx|js)$/.test(n)).map((f) => f.replace(/^app/, '').replace(/\/page\.\w+$/, '') || '/');
  const res = pages.map((p) => new RegExp('^' + p.replace(/\[[^\]]+\]/g, '[^/]+').replace(/\//g, '\\/') + '\\/?$'));
  const ex = (u) => { const x = u.replace(/[?#].*$/, ''); return res.some((r) => r.test(x.replace(/\/$/, '') || '/')) || exists(`public${x}`); };
  const bad = new Map();
  for (const f of codeFiles) for (const m of read(f).matchAll(/(?:href|url|action)\s*[=:]\s*\{?\s*['"`](\/[a-zA-Z0-9\-_/.?=&#]*)['"`]/g)) {
    const u = m[1]; if (u.startsWith('//') || /^\/(api|_next|images)/.test(u)) continue;
    if (!ex(u)) bad.set(u, f);
  }
  bad.size ? fail('B10', `internal links with no route: ${[...bad].map(([u, f]) => `${u} (${f})`).join(', ')}`) : pass('B10', 'all literal internal links resolve to a route');
}

// ---------------------------------------------------------------- B11 compliance
{
  const terms = site.COMPLIANCE?.bannedTerms || [];
  const hits = terms.flatMap((t) => PRODUCTS.filter((p) => new RegExp(t, 'i').test(`${p.name} ${p.description}`)).map((p) => `${t}:${p.slug}`));
  hits.length ? fail('B11', `banned terms found: ${hits.join(', ')}`) : pass('B11', terms.length ? 'no banned terms' : 'no banned terms configured');
}

// ---------------------------------------------------------------- B12 build output (only when a build exists)
{
  const out = path.join(ROOT, '.next/server/app');
  if (fs.existsSync(out)) {
    const htmls = []; const w = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? w(path.join(d, e.name)) : /\.html$/.test(e.name) ? htmls.push(path.join(d, e.name)) : 0)); w(out);
    let h1bad = [], barBad = [], entityBad = [], ldbad = [], titleLong = 0, descLong = 0, checked = 0;
    for (const f of htmls) {
      const rel = path.relative(out, f).replace(/\\/g, '/');
      if (/^(admin|order|_not-found|_global-error|thank-you)/.test(rel) || /^(404|500)/.test(rel)) continue;
      const html = fs.readFileSync(f, 'utf8'); checked++;
      const h1 = (html.match(/<h1[\s>]/g) || []).length;
      if (h1 !== 1) h1bad.push(`${rel}(${h1})`);
      const bars = (html.match(/id="announcement-bar"/g) || []).length;
      if (bars !== 1) barBad.push(`${rel}(${bars})`);
      const rawEntity = html.match(/&amp;(check|nearr|NEARR);/);
      if (rawEntity) entityBad.push(rel);
      for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { ldbad.push(rel); } }
      const dec = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
      const t = dec((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
      if (t.length > 60) titleLong++;
      const dm = dec((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
      if (dm.length > 160) descLong++;
    }
    h1bad.length ? fail('B12a', `pages without exactly one <h1>: ${h1bad.slice(0, 8).join(', ')}`) : pass('B12a', `${checked} built pages have exactly one <h1>`);
    barBad.length ? fail('B12b', `pages without exactly one announcement bar: ${barBad.slice(0, 6).join(', ')}`) : pass('B12b', 'every public page has exactly one announcement bar');
    entityBad.length ? fail('B12c', `raw HTML entity text visible on: ${entityBad.slice(0, 6).join(', ')}`) : pass('B12c', 'no unsupported HTML entities rendered as text');
    ldbad.length ? fail('B12b', `invalid JSON-LD on: ${[...new Set(ldbad)].slice(0, 6).join(', ')}`) : pass('B12b', 'all JSON-LD blocks parse');
    titleLong ? warn('W12c', `${titleLong} built pages have <title> over 60 chars`) : pass('W12c', 'all built titles <= 60 chars');
    descLong ? warn('W12d', `${descLong} built pages have a meta description over 160 chars`) : pass('W12d', 'all built meta descriptions <= 160 chars');
  } else warn('W12', 'no .next build found - run `npm run build` first for built-page checks (H1 / JSON-LD)');
}

console.log('\n--- The Buggy Shop crosscheck ---');
ok.forEach((m) => console.log('  OK   ', m));
warns.forEach((m) => console.log('  WARN ', m));
errors.forEach((m) => console.log('  FAIL ', m));
console.log(`\n${ok.length} passed, ${warns.length} warnings, ${errors.length} blocking failures`);
if (errors.length) { console.log('CROSSCHECK FAILED'); process.exit(1); }
console.log('CROSSCHECK PASSED');
