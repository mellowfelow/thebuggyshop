// lib/search.js
// One search engine for the whole site (search page, in-shop search box, /api/search, MCP tool).
//
// What it does that a plain `includes()` does not:
//  - every word must match (so "mgi remote" finds the MGI remote buggies), words can be in any order
//  - searches name, brand, category + subcategory, short copy, specs and full description, ranked
//  - understands plurals, partial words ("lith" finds lithium), and synonyms (buggy / cart / trolley)
//  - forgives common misspellings ("golf buggie", "glof cart", "troley", "golfbuggy") and 1-2 typos
//  - ignores filler words ("for sale", "australia", "buy")
//  - if nothing matches every word it relaxes to "most words" and says so
import { CATEGORY_TREE } from '../src/config/categories.js';
import { PRODUCTS } from '../src/config/products.js';
import { BRANDS } from '../src/config/brands.js';
import { POSTS } from '../src/config/site.js';

const STOP = new Set(['a', 'an', 'the', 'for', 'and', 'in', 'of', 'to', 'with', 'on', 'sale', 'buy', 'cheap', 'online', 'best', 'australia', 'australian', 'au', 'near', 'me', 'shop']);

// Known misspellings / run-together words -> canonical tokens
const FIXES = {
  glof: ['golf'], gold: ['golf'], golfbuggy: ['golf', 'buggy'], golfbuggies: ['golf', 'buggy'], golfcart: ['golf', 'cart'],
  buggie: ['buggy'], buggys: ['buggy'], troley: ['trolley'], trolly: ['trolley'], trollies: ['trolley'], caddie: ['caddy'],
  tires: ['tyre'], tire: ['tyre'], lithum: ['lithium'], litium: ['lithium'], motocady: ['motocaddy'], powercaddy: ['powakaddy'],
};

// Words that mean (roughly) the same thing for a shopper. Matching via a synonym scores lower.
const SYNONYM_GROUPS = [
  ['buggy', 'cart', 'trolley', 'caddy', 'utv'],
  ['remote', 'wireless', 'handset'],
  ['follow', 'autonomous', 'gps'],
  ['battery', 'lithium', 'lifepo4'],
  ['electric', 'motorised', 'motorized', 'motor'],
  ['push', 'manual', 'pull'],
  ['kids', 'kid', 'child', 'children', 'junior', 'teen'],
  ['used', 'secondhand', 'second-hand', 'preowned', 'ex-demo', 'exdemo'],
  ['rangefinder', 'laser'],
];
const SYN = new Map();
SYNONYM_GROUPS.forEach((g) => g.forEach((w) => SYN.set(w, g.filter((x) => x !== w))));

const singular = (w) => {
  if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y'; // buggies -> buggy, batteries -> battery
  if (w.length > 4 && /(ches|shes|xes|ses)$/.test(w)) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us')) return w.slice(0, -1);
  return w;
};

export function tokenize(text) {
  const raw = String(text || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9+\-\s]/g, ' ').split(/\s+/).filter(Boolean);
  const out = [];
  raw.forEach((w) => {
    const parts = w.includes('-') && !/^\d+-/.test(w) ? [w.replace(/-/g, ''), ...w.split('-')] : [w.replace(/-/g, ' ')];
    parts.join(' ').split(/\s+/).filter(Boolean).forEach((t) => {
      const fixed = FIXES[t] || [t];
      fixed.forEach((f) => out.push(singular(f)));
    });
  });
  return out;
}

const queryTokens = (q) => {
  const toks = tokenize(q);
  // "gold buggy" -> "golf buggy" only handled via FIXES; drop filler
  return toks.filter((t) => !STOP.has(t));
};

/* edit distance with an early exit (<= limit) */
function within(a, b, limit) {
  if (Math.abs(a.length - b.length) > limit) return false;
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let cur = [i], min = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      min = Math.min(min, cur[j]);
    }
    if (min > limit) return false;
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
  }
  return prev[b.length] <= limit;
}

/** Quality of matching a query token against a doc token set: 1 exact, .8 prefix, .55 synonym, .5 fuzzy, 0 none. */
function matchQuality(qt, docTokens) {
  let best = 0;
  const syns = SYN.get(qt) || [];
  for (const d of docTokens) {
    if (d === qt) return 1;
    if (qt.length >= 3 && d.startsWith(qt)) best = Math.max(best, 0.8);
    else if (syns.includes(d)) best = Math.max(best, 0.55);
    else if (qt.length >= 5 && d.length >= 4 && within(qt, d, qt.length >= 8 ? 2 : 1)) best = Math.max(best, 0.5);
  }
  return best;
}

/* ------------------------------------------------------------- product index */
const nodeLabel = (slug) => CATEGORY_TREE.find((c) => c.slug === slug)?.navLabel || String(slug || '').replace(/-/g, ' ');
const indexCache = new WeakMap();

function indexFor(products) {
  if (indexCache.has(products)) return indexCache.get(products);
  const idx = products.map((p) => {
    const fields = {
      name: tokenize(p.name),
      brand: tokenize(`${p.brandName || ''} ${p.brand || ''}`),
      category: tokenize(`${nodeLabel(p.category)} ${nodeLabel(p.subcategory)} ${p.condition || ''} ${p.power || ''} ${p.wheels || ''}`),
      short: tokenize(p.shortDescription),
      specs: tokenize(Object.values(p.specs || {}).join(' ') + ' ' + (p.seats || '') + ' ' + (p.batteryRange || '')),
      desc: tokenize(p.description),
    };
    return { p, fields, nameText: p.name.toLowerCase() };
  });
  indexCache.set(products, idx);
  return idx;
}

const WEIGHTS = { name: 10, brand: 6, category: 5, short: 3, specs: 2, desc: 1 };

/**
 * Rank products for a query.
 * Three passes, so precise queries stay precise but nothing dead-ends:
 *   1. "exact"   every word matches strongly (exact / partial word in name, brand, category, short copy, specs)
 *   2. "related" every word matches somewhere, including synonyms, typos and the long description
 *   3. "partial" at least half of the words match
 * @returns {{ results: {product, score}[], mode: 'exact'|'related'|'partial'|'all', relaxed: boolean, tokens: string[] }}
 */
export function searchProducts(query, products = PRODUCTS) {
  const tokens = queryTokens(query);
  if (!tokens.length) return { results: products.map((p) => ({ product: p, score: 0 })), mode: 'all', relaxed: false, tokens };

  const idx = indexFor(products);
  const q = String(query).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const STRONG_FIELDS = ['name', 'brand', 'category', 'short', 'specs'];

  const scored = idx.map(({ p, fields, nameText }) => {
    let total = 0, matched = 0, strong = 0;
    for (const t of tokens) {
      let best = 0, bestStrong = 0;
      for (const [f, w] of Object.entries(WEIGHTS)) {
        const quality = matchQuality(t, fields[f]);
        if (!quality) continue;
        best = Math.max(best, quality * w);
        if (quality >= 0.8 && STRONG_FIELDS.includes(f)) bestStrong = Math.max(bestStrong, quality * w);
      }
      if (best > 0) { matched++; total += best; }
      if (bestStrong > 0) strong++;
    }
    if (q.length > 2 && nameText.includes(q)) total += 20; // whole phrase in the name
    if (q.length > 2 && nameText.startsWith(q)) total += 6;
    return { product: p, score: total, matched, strong };
  });

  const rank = (list) => list.sort((a, b) => b.score - a.score || (b.product.featured ? 1 : 0) - (a.product.featured ? 1 : 0) || a.product.price - b.product.price);
  const out = (list, mode) => ({ results: rank(list).map(({ product, score }) => ({ product, score })), mode, relaxed: mode !== 'exact', tokens });

  const needStrong = tokens.length <= 3 ? tokens.length : Math.ceil(tokens.length * 0.75);
  let hits = scored.filter((x) => x.matched === tokens.length && x.strong >= needStrong);
  if (hits.length) return out(hits, 'exact');
  hits = scored.filter((x) => x.matched === tokens.length);
  if (hits.length) return out(hits, 'related');
  if (tokens.length > 1) {
    const need = Math.max(1, Math.ceil(tokens.length / 2));
    hits = scored.filter((x) => x.matched >= need);
    if (hits.length) return out(hits, 'partial');
  }
  return { results: [], mode: 'exact', relaxed: false, tokens };
}

/* ------------------------------------------------------------- everything else */
const simpleScore = (tokens, text, weight = 1) => {
  const toks = tokenize(text);
  let s = 0;
  for (const t of tokens) { const q = matchQuality(t, toks); if (!q) return 0; s += q * weight; }
  return s;
};

export function searchCategories(query) {
  const tokens = queryTokens(query);
  if (!tokens.length) return [];
  return CATEGORY_TREE.filter((c) => c.id !== 'brands')
    .map((c) => ({ node: c, score: simpleScore(tokens, `${c.navLabel} ${c.h1 || ''} ${(c.targetKeywords || []).join(' ')}`) }))
    .filter((x) => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 6).map((x) => x.node);
}

export function searchBrands(query) {
  const tokens = queryTokens(query);
  if (!tokens.length) return [];
  return BRANDS.map((b) => ({ brand: b, score: simpleScore(tokens, `${b.name}`) })).filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score).slice(0, 6).map((x) => x.brand);
}

export function searchPosts(query, posts = POSTS) {
  const tokens = queryTokens(query);
  if (!tokens.length) return posts;
  return posts.map((p) => ({ post: p, score: simpleScore(tokens, `${p.title} ${p.excerpt} ${p.category}`) }))
    .filter((x) => x.score > 0).sort((a, b) => b.score - a.score).map((x) => x.post);
}

export function searchAll(query) {
  const prod = searchProducts(query);
  return { ...prod, categories: searchCategories(query), brands: searchBrands(query), posts: searchPosts(query) };
}

/** Quick suggestions for a type-ahead box. */
export function suggest(query, limit = 6) {
  const tokens = queryTokens(query);
  if (!tokens.length) return { products: [], categories: [] };
  const { results } = searchProducts(query);
  return { products: results.slice(0, limit).map((r) => r.product), categories: searchCategories(query).slice(0, 3) };
}
