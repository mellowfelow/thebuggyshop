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

// ---------------------------------------------------------------- B13 buggy/cart bundle discount
{
  const { computeTotals } = await imp('lib/bundle.js');
  const { PRODUCTS } = await imp('src/config/products.js');
  const { BUNDLE, SHOP } = await imp('src/config/site.js');
  const pick = (pred) => PRODUCTS.find(pred);
  const line = (p, q = 1) => ({ slug: p.slug, price: p.price, quantity: q, category: p.category, subcategory: p.subcategory });
  const cart = pick((p) => p.category === 'luxury-golf-carts');
  const acc = pick((p) => p.category === 'accessories');
  const part = pick((p) => p.category === 'parts');
  const batt = pick((p) => p.category === 'batteries');
  const kit = pick((p) => p.subcategory === 'conversion-kits');
  const pct = BUNDLE.percent / 100;
  const addons = acc.price + part.price * 2;
  const checks = [];
  const withCart = computeTotals([line(cart), line(acc), line(part, 2)]);
  checks.push(['accessory and part discounted when a cart is in the order', withCart.bundleDiscount === Math.round(addons * pct)]);
  checks.push(['the buggy or cart itself is never discounted', withCart.addonSubtotal === addons]);
  checks.push(['no discount for accessories alone', computeTotals([line(acc), line(part)]).bundleDiscount === 0]);
  checks.push(['batteries are not discounted', computeTotals([line(cart), line(batt)]).bundleDiscount === 0]);
  checks.push(['a conversion kit does not unlock the discount', computeTotals([line(kit), line(acc)]).bundleDiscount === 0]);
  const both = computeTotals([line(cart), line(acc)], { isCrypto: true });
  checks.push(['crypto rebate applies after the bundle discount', both.cryptoDiscount === Math.round((both.subtotal - both.bundleDiscount) * (SHOP.cryptoDiscount / 100))]);
  checks.push(['total = subtotal - discounts + freight', both.total === both.subtotal - both.bundleDiscount - both.cryptoDiscount + both.shipping]);
  checks.push(['offer state: buggy or cart only', computeTotals([line(cart)]).state === 'offer']);
  checks.push(['locked state: accessories only', computeTotals([line(acc)]).state === 'locked']);
  const bad = checks.filter(([, good]) => !good).map(([n]) => n);
  bad.length ? fail('B13', 'bundle discount rules broken: ' + bad.join('; ')) : pass('B13', 'bundle discount rules hold (' + checks.length + ' cases)');
  // the server must recompute totals itself, not trust the browser
  const api = fs.readFileSync(path.join(ROOT, 'app/api/contact/route.js'), 'utf8');
  /computeTotals\(/.test(api) && /PRODUCT_BY_SLUG/.test(api) ? pass('B13b', 'order API recomputes prices and totals server-side') : fail('B13b', 'order API must rebuild items from the catalogue and recompute totals');
}

// ---------------------------------------------------------------- B14 keyword targets and title hygiene (built pages)
{
  const out = path.join(ROOT, '.next/server/app');
  const targetsFile = path.join(ROOT, 'docs/keyword-targets.json');
  if (fs.existsSync(out)) {
    const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
    const strip = (h) => decode(h.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
    const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean).map((w) => ({ buggies: 'buggy', buggys: 'buggy', buggie: 'buggy', carts: 'cart', trolleys: 'trolley', accessories: 'accessory', chargers: 'charger', wheels: 'wheel', three: '3', two: '2', four: '4' }[w] || w)).map((w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w)).filter((w) => !['for', 'the', 'a', 'and', 'of', 'in', 'to', 's'].includes(w));
    const hasAll = (text, phrase, skip = []) => { const T = new Set(norm(text)); return norm(phrase).filter((w) => !skip.includes(w)).every((w) => T.has(w)); };
    const walk = (d, acc = []) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) e.isDirectory() ? walk(path.join(d, e.name), acc) : /\.html$/.test(e.name) && acc.push(path.join(d, e.name)); return acc; };
    // 1. no public title may end in an ellipsis (the title limiter cut it mid-phrase)
    const cut = [];
    for (const file of walk(out)) {
      const rel = path.relative(out, file).replace(/\\/g, '/');
      if (/^(admin|order|_not-found|_global-error|thank-you|404|500)/.test(rel)) continue;
      const title = decode((fs.readFileSync(file, 'utf8').match(/<title>([^<]*)<\/title>/) || [])[1] || '');
      if (/…$/.test(title)) cut.push(rel + ': ' + title);
    }
    cut.length ? fail('B14a', cut.length + ' built titles end in an ellipsis (write them to 60 characters or less): ' + cut.slice(0, 4).join(' | ')) : pass('B14a', 'no built title is cut off with an ellipsis');
    // 2. every keyword target must be in its page title and H1
    if (fs.existsSync(targetsFile)) {
      const { pages } = JSON.parse(fs.readFileSync(targetsFile, 'utf8'));
      const bad = [];
      for (const row of pages) {
        const file = path.join(out, row.url === '/' ? 'index.html' : row.url.replace(/^\/|\/$/g, '') + '.html');
        if (!fs.existsSync(file)) { bad.push(row.url + ' (page not built)'); continue; }
        const html = fs.readFileSync(file, 'utf8');
        const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
        const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
        if (!hasAll(title, row.primary)) bad.push(row.url + ' title lacks "' + row.primary + '"');
        else if (!hasAll(h1, row.primary, ['sale', 'buy', 'australia'])) bad.push(row.url + ' H1 lacks "' + row.primary + '"');
      }
      bad.length ? fail('B14b', bad.length + ' pages miss their primary keyword: ' + bad.slice(0, 5).join(' | ')) : pass('B14b', 'all ' + pages.length + ' keyword targets appear in their page title and H1');
    }
  }
}

// ---------------------------------------------------------------- B15 structure: collections, merges, thin pages
{
  const { PRODUCTS, getProductsByCategory } = await imp('src/config/products.js');
  const { CATEGORY_TREE, isPage } = await imp('src/config/categories.js');
  const trolleys = getProductsByCategory('golf-trolleys').length;
  const expected = PRODUCTS.filter((p) => p.category === 'push-pull-golf-buggies' || p.subcategory === 'walk-behind').length;
  trolleys > 0 && trolleys === expected ? pass('B15a', '/shop/golf-trolleys/ lists all ' + trolleys + ' push and walk-behind buggies') : fail('B15a', 'golf-trolleys should list ' + expected + ' products, lists ' + trolleys);
  const cfg = fs.readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
  /\/shop\/beach-buggies\//.test(cfg) && /\/shop\/used\//.test(cfg) ? pass('B15b', 'beach-buggies and used pages redirect to their merged page') : fail('B15b', 'missing redirects for /shop/beach-buggies/ and /shop/used/');
  const empties = CATEGORY_TREE.filter((c) => isPage(c) && getProductsByCategory(c.slug).length === 0).map((c) => c.slug);
  const body = path.join(ROOT, '.next/server/app/sitemap.xml.body');
  if (fs.existsSync(body)) {
    const sm = fs.readFileSync(body, 'utf8');
    /<urlset/.test(sm) ? pass('B15e', 'sitemap.xml is a flat urlset') : fail('B15e', 'sitemap.xml missing or not a urlset');
    const urlBlocks = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
    const noLm = urlBlocks.filter((b) => !/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/.test(b));
    urlBlocks.length > 200 && !noLm.length ? pass('B15f', 'every one of the ' + urlBlocks.length + ' sitemap URLs carries a lastmod date') : fail('B15f', noLm.length + ' of ' + urlBlocks.length + ' sitemap URLs lack a lastmod date');
    const locs = urlBlocks.map((b) => (b.match(/<loc>([^<]+)/) || [])[1]);
    new Set(locs).size === locs.length ? pass('B15g', 'no duplicate URLs in sitemap') : fail('B15g', 'duplicate URLs in sitemap');
    sm.includes('<image:image>') ? pass('B15h', 'sitemap carries image entries') : fail('B15h', 'no image entries in the sitemap');
    const leaked = empties.filter((s) => sm.includes('/shop/' + s + '/'));
    const folded = CATEGORY_TREE.filter((c) => c.redirectTo).map((c) => c.slug).filter((s) => sm.includes('/shop/' + s + '/'));
    leaked.length || folded.length ? fail('B15c', 'sitemap lists empty or folded pages: ' + [...leaked, ...folded].join(', ')) : pass('B15c', 'sitemap has no empty or folded category pages (' + (empties.length ? empties.join(', ') + ' held back' : 'none empty') + ')');
    const notNoindex = empties.filter((s) => { const h = path.join(ROOT, '.next/server/app/shop/' + s + '.html'); return fs.existsSync(h) && !/noindex/.test(fs.readFileSync(h, 'utf8')); });
    notNoindex.length ? fail('B15d', 'empty category pages are indexable: ' + notNoindex.join(', ')) : pass('B15d', 'empty category pages are set to noindex');
  }
}

// ---------------------------------------------------------------- B16 FAQ bank
{
  const { FAQ_BANK, faqWords } = await imp('src/config/faq.js');
  const badLen = FAQ_BANK.filter((f) => { const n = faqWords(f.answer); return f.home ? n < 40 || n > 55 : n < 40 || n > 65; }).map((f) => f.id + ':' + faqWords(f.answer));
  badLen.length ? fail('B16a', 'FAQ answers outside the word limits (home 40-55, others 40-65): ' + badLen.join(', ')) : pass('B16a', 'all ' + FAQ_BANK.length + ' FAQ answers are within the word limits');
  const noLink = FAQ_BANK.filter((f) => !f.cta?.href || /it depends/i.test(f.answer)).map((f) => f.id);
  noLink.length ? fail('B16b', 'FAQ answers without a link, or that say "it depends": ' + noLink.join(', ')) : pass('B16b', 'every FAQ answer has a link and a concrete answer');
  // every page that should carry FAQ schema does, and the schema matches the bank
  const out = path.join(ROOT, '.next/server/app');
  if (fs.existsSync(out)) {
    const urls = [...new Set(FAQ_BANK.flatMap((f) => f.pages))];
    const miss = [];
    for (const u of urls) {
      const file = path.join(out, u === '/' ? 'index.html' : u.replace(/^\/|\/$/g, '') + '.html');
      if (!fs.existsSync(file)) { miss.push(u + ' (not built)'); continue; }
      const html = fs.readFileSync(file, 'utf8');
      const want = FAQ_BANK.filter((f) => f.pages.includes(u) || (u === '/faq/' && f.home)).length;
      const parsed = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((x) => { try { return JSON.parse(x[1]); } catch { return null; } }).filter(Boolean);
      const flat = parsed.flatMap((j) => (j['@graph'] ? j['@graph'] : [j]));
      const faq = flat.find((j) => j['@type'] === 'FAQPage');
      if (!faq) miss.push(u + ' (no FAQPage)'); else if (faq.mainEntity.length < want) miss.push(u + ' (' + faq.mainEntity.length + ' of ' + want + ' questions)');
      if (!/faq-answer-speakable/.test(html)) miss.push(u + ' (no speakable target)');
    }
    miss.length ? fail('B16c', 'FAQ schema problems: ' + miss.join('; ')) : pass('B16c', 'FAQPage schema and speakable markup present on all ' + urls.length + ' FAQ pages');
  }
}

// ---------------------------------------------------------------- B17 blog posts and internal links
{
  const { POSTS } = await imp('src/config/posts.js');
  const { FAQ_BANK } = await imp('src/config/faq.js');
  const { RELATED } = await imp('src/config/related.js');
  const { PRODUCTS } = await imp('src/config/products.js');
  const { CATEGORY_TREE, isPage } = await imp('src/config/categories.js');
  const { BRANDS } = await imp('src/config/brands.js');
  const { LOCATIONS } = await imp('src/config/locations.js');
  const valid = new Set(['/', '/shop/', '/blog/', '/faq/', '/about/', '/contact/', '/finance/', '/brands/', '/golf-buggies/', '/compare/', '/shipping/', '/returns/', '/wholesale/', '/search/', '/checkout/']);
  CATEGORY_TREE.filter(isPage).forEach((c) => valid.add('/shop/' + c.slug + '/'));
  PRODUCTS.forEach((p) => valid.add('/shop/' + p.category + '/' + p.slug + '/'));
  POSTS.forEach((p) => valid.add('/blog/' + p.slug + '/'));
  BRANDS.forEach((b) => valid.add('/brands/' + b.slug + '/'));
  LOCATIONS.forEach((l) => valid.add('/golf-buggies/' + l.slug + '/'));

  const { GUIDES } = await imp('src/config/guides.js');
  const guideSlugs = new Set(GUIDES.map((g) => g.slug));
  const floors = { 'cheap-golf-buggies-and-carts-australia': 1200, 'best-electric-golf-buggies-australia': 1100, 'aldi-golf-buggy-vs-specialist-buggy': 700, 'electric-golf-carts-australia-guide': 1800, 'electric-buggy-for-adults-australia': 1400, 'golf-buggy-for-sale-buyers-guide-australia': 750, 'conditional-road-registration-guide-qld-nsw-vic': 700, 'lifepo4-vs-lead-acid-battery-lifespan-australian-climate': 750 };
  const problems = [];
  const toks = (s) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean).map((w) => ({ buggies: 'buggy', carts: 'cart' }[w] || w));
  for (const p of POSTS) {
    const words = p.content.split(/\s+/).length;
    if (words < (floors[p.slug] || (guideSlugs.has(p.slug) ? 700 : 250))) problems.push(p.slug + ' has ' + words + ' words, below ' + (floors[p.slug] || (guideSlugs.has(p.slug) ? 700 : 250)));
    if (p.titleTag.length > 60) problems.push(p.slug + ' title tag ' + p.titleTag.length);
    if (p.metaDescription.length < 130 || p.metaDescription.length > 155) problems.push(p.slug + ' meta ' + p.metaDescription.length);
    const first = new Set(toks(p.content.split(/\s+/).slice(0, 150).join(' ')));
    if (!toks(p.keyword).every((w) => first.has(w))) problems.push(p.slug + ' lacks "' + p.keyword + '" in the first 150 words');
    if (/^(cheap|best|electric-golf-carts)/.test(p.slug) && !/\n\| --- \|/.test(p.content)) problems.push(p.slug + ' needs a comparison table');
    for (const id of p.faqIds || []) if (!FAQ_BANK.some((q) => q.id === id)) problems.push(p.slug + ' uses unknown FAQ ' + id);
    for (const m of p.content.matchAll(/\]\((\/[^)\s]*)\)/g)) if (!valid.has(m[1])) problems.push(p.slug + ' links to a missing page ' + m[1]);
    if (!fs.existsSync(path.join(ROOT, 'public' + p.image))) problems.push(p.slug + ' image missing ' + p.image);
  }
  problems.length ? fail('B17a', problems.length + ' blog problems: ' + problems.slice(0, 5).join(' | ')) : pass('B17a', 'all ' + POSTS.length + ' blog posts meet length, title, meta, keyword and link rules');
  const bad = [];
  for (const [page, links] of Object.entries(RELATED)) { if (!valid.has(page)) bad.push('page ' + page); for (const l of links) if (!valid.has(l.href)) bad.push(page + ' -> ' + l.href); }
  for (const q of FAQ_BANK) if (!valid.has(q.cta.href)) bad.push('FAQ ' + q.id + ' -> ' + q.cta.href);
  bad.length ? fail('B17b', 'internal links to missing pages: ' + bad.slice(0, 5).join(' | ')) : pass('B17b', 'all related-page and FAQ links resolve to real pages');
  const noIndexInSitemap = POSTS.filter((p) => !fs.existsSync(path.join(ROOT, '.next/server/app/blog/' + p.slug + '.html')) && fs.existsSync(path.join(ROOT, '.next/server/app')));
  noIndexInSitemap.length ? fail('B17c', 'blog posts not built: ' + noIndexInSitemap.map((p) => p.slug).join(', ')) : pass('B17c', 'every blog post is built');
}

// ---------------------------------------------------------------- B18 keyword engine v2 guards
{
  const { POSTS } = await imp('src/config/posts.js');
  const { PRODUCTS } = await imp('src/config/products.js');
  const { BRANDS } = await imp('src/config/brands.js');
  // lithium battery packs carry the confirmed 5-year warranty (owner, 6 Oct 2026)
  const lith = PRODUCTS.filter((p) => p.category === 'batteries' && p.subcategory !== 'chargers' && /lithium|lifepo4/i.test(p.name) && !/lead-acid/i.test(p.name));
  const badWarr = lith.filter((p) => !/^5-Year/.test(String(p.specs?.warranty || ''))).map((p) => p.slug);
  badWarr.length ? fail('B18a', 'lithium battery products without the 5-year warranty: ' + badWarr.join(', ')) : pass('B18a', 'all ' + lith.length + ' lithium battery products list the 5-year warranty');
  // one primary keyword per post
  const kw = POSTS.map((p) => p.keyword.toLowerCase());
  const dupKw = kw.filter((k, i) => kw.indexOf(k) !== i);
  dupKw.length ? fail('B18b', 'two blog posts share a primary keyword: ' + dupKw.join(', ')) : pass('B18b', 'every blog post has its own primary keyword (' + POSTS.length + ' posts)');
  // the removed repairs page redirects, and brand pages with no stock stay out of search
  const cfg = fs.readFileSync(path.join(ROOT, 'next.config.ts'), 'utf8');
  /\/shop\/golf-buggy-repairs\//.test(cfg) ? pass('B18c', 'removed repairs page redirects to /shop/parts/') : fail('B18c', 'missing redirect for /shop/golf-buggy-repairs/');
  const out = path.join(ROOT, '.next/server/app');
  if (fs.existsSync(out)) {
    const empty = BRANDS.filter((b) => !PRODUCTS.some((p) => p.brand === b.slug)).map((b) => b.slug);
    const leak = empty.filter((s) => { const file = path.join(out, 'brands/' + s + '.html'); return !fs.existsSync(file) || !/noindex/.test(fs.readFileSync(file, 'utf8')); });
    const sm = fs.readdirSync(path.join(ROOT, '.next/server/app')).filter((n) => /^sitemap-[a-z]+\.xml\.body$/.test(n)).map((n) => fs.readFileSync(path.join(ROOT, '.next/server/app/' + n), 'utf8')).join('\n');
    const inMap = empty.filter((s) => sm.includes('/brands/' + s + '/'));
    leak.length || inMap.length ? fail('B18d', 'zero-product brand pages must be noindex and out of the sitemap: ' + [...leak, ...inMap].join(', ')) : pass('B18d', empty.length + ' zero-product brand pages are noindex and out of the sitemap (' + empty.join(', ') + ')');
    // no raw markdown in built posts (a bold marker or link syntax that did not render)
    const bad = [];
    for (const p of POSTS) {
      const file = path.join(out, 'blog/' + p.slug + '.html'); if (!fs.existsSync(file)) continue;
      const body = (fs.readFileSync(file, 'utf8').match(/<article[\s\S]*?<\/article>/) || [''])[0].replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]*>/g, ' ');
      if (/\]\(\/|\*\*[A-Za-z[]/.test(body)) bad.push(p.slug);
    }
    bad.length ? fail('B18e', 'blog posts show raw markdown: ' + bad.join(', ')) : pass('B18e', 'no blog post shows raw markdown (' + POSTS.length + ' posts)');
  }
}

// ---------------------------------------------------------------- B19 agent + security guards (technical audit)
{
  const vj = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
  const allHdr = vj.headers.find((h) => h.source === '/(.*)');
  const csp = (allHdr?.headers || []).find((h) => h.key === 'Content-Security-Policy')?.value || '';
  /default-src 'self'/.test(csp) && /frame-ancestors/.test(csp) && /object-src 'none'/.test(csp) ? pass('B19a', 'vercel.json sets a Content-Security-Policy on every page') : fail('B19a', 'vercel.json has no usable Content-Security-Policy');
  const md = path.join(ROOT, 'public/md');
  const mdCount = fs.existsSync(md) ? fs.readdirSync(md, { recursive: true }).filter((n) => String(n).endsWith('index.md')).length : 0;
  mdCount >= 250 && fs.existsSync(path.join(md, 'index.md')) ? pass('B19b', mdCount + ' markdown twins generated for agents (home, categories, products, brands, posts, FAQ)') : fail('B19b', 'markdown twins missing (' + mdCount + ')');
  const mw = fs.existsSync(path.join(ROOT, 'middleware.js')) ? fs.readFileSync(path.join(ROOT, 'middleware.js'), 'utf8') : '';
  /prefersMarkdownOverHtml/.test(mw) && /q=/.test(mw) && !/accept\.includes\('text\/markdown'\)\s*\)?\s*return/.test(mw) ? pass('B19c', 'middleware negotiates markdown by q-value, never a bare substring check') : fail('B19c', 'markdown negotiation middleware missing or uses a substring check');
  const gen = ['.well-known/mcp/server-card.json', '.well-known/api-catalog', '.well-known/acp.json', '.well-known/ucp'].map((p) => fs.readFileSync(path.join(ROOT, 'public/' + p), 'utf8')).join('\n');
  const bare = (gen.match(/\/api\/(mcp|products|categories|search)(?![\/a-zA-Z])/g) || []);
  bare.length === 0 ? pass('B19d', 'agent endpoints are advertised in trailing-slash form (no 308 hop)') : fail('B19d', bare.length + ' agent endpoints lack the trailing slash');
  const pj = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  Array.isArray(pj.browserslist) && pj.browserslist.length ? pass('B19e', 'browserslist targets modern browsers (no legacy polyfills)') : fail('B19e', 'no browserslist in package.json');
  const lm = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/config/lastmod.json'), 'utf8'));
  Object.keys(lm).length >= 290 ? pass('B19f', 'lastmod ledger covers ' + Object.keys(lm).length + ' URLs') : fail('B19f', 'lastmod ledger incomplete');
}

console.log('\n--- The Buggy Shop crosscheck ---');
ok.forEach((m) => console.log('  OK   ', m));
warns.forEach((m) => console.log('  WARN ', m));
errors.forEach((m) => console.log('  FAIL ', m));
console.log(`\n${ok.length} passed, ${warns.length} warnings, ${errors.length} blocking failures`);
if (errors.length) { console.log('CROSSCHECK FAILED'); process.exit(1); }
console.log('CROSSCHECK PASSED');
