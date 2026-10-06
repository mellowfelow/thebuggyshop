// lib/catalog.js
// Pure catalogue logic shared by the shop pages: category membership, normalised filter
// attributes, faceted counts, sorting and pagination. No React, no DOM, so it can be unit-tested.
//
// Why "normalised attributes"? Product data holds free text in fields like `power`
// ("Electric", "Electric Remote", "Follow / GPS" ...). Filtering on raw strings produced
// near-empty filters, so every product is mapped onto a small, consistent vocabulary here.
import { CATEGORY_TREE } from '../src/config/categories.js';

export const PAGE_SIZE = 16;

/* ----------------------------------------------------------------- categories */
const byId = Object.fromEntries(CATEGORY_TREE.map((c) => [c.id, c]));

export function getNode(slug) {
  return CATEGORY_TREE.find((c) => c.slug === slug || c.id === slug) || null;
}

/** Child nodes of a category (by slug). */
export function childNodes(slug) {
  const parent = getNode(slug);
  return parent ? CATEGORY_TREE.filter((c) => c.parent === parent.id) : [];
}

/** Root nodes shown as shop navigation (the "brands" node is a page of its own). */
export function rootNodes() {
  return CATEGORY_TREE.filter((c) => !c.parent && c.id !== 'brands');
}

export function parentOf(slug) {
  const n = getNode(slug);
  return n?.parent ? byId[n.parent] : null;
}

/** Does a product belong to a category-tree node? */
export function inNode(product, slug) {
  if (!slug) return true;
  if (product.category === slug || product.subcategory === slug) return true;
  if (slug === 'used-golf-buggies') return product.condition === 'Used' || product.condition === 'Ex-Demo';
  if (slug === 'golf-trolleys') return product.category === 'push-pull-golf-buggies' || product.subcategory === 'walk-behind';
  return false;
}

export function productsInNode(products, slug) {
  return products.filter((p) => inNode(p, slug));
}

/* ----------------------------------------------------------------- price tiers */
export const PRICE_TIERS = [
  { value: 'under-100', label: 'Under $100', min: 0, max: 99.99 },
  { value: '100-500', label: '$100 – $500', min: 100, max: 500 },
  { value: '500-1000', label: '$500 – $1,000', min: 500.01, max: 1000 },
  { value: '1000-2500', label: '$1,000 – $2,500', min: 1000.01, max: 2500 },
  { value: '2500-5000', label: '$2,500 – $5,000', min: 2500.01, max: 5000 },
  { value: '5000-15000', label: '$5,000 – $15,000', min: 5000.01, max: 15000 },
  { value: '15000-35000', label: '$15,000 – $35,000', min: 15000.01, max: 35000 },
  { value: 'over-35000', label: '$35,000 +', min: 35000.01, max: Infinity },
];

const tierOf = (price) => PRICE_TIERS.find((t) => price >= t.min && price <= t.max)?.value || null;

/* ----------------------------------------------------------------- normalised attributes */
const POWER = (raw) => {
  const s = String(raw || '').toLowerCase();
  if (!s) return null;
  if (/remote/.test(s)) return 'Remote control';
  if (/follow|gps|autonomous/.test(s)) return 'GPS / auto-follow';
  if (/manual/.test(s)) return 'Manual push';
  if (/petrol/.test(s)) return 'Petrol';
  if (/electric|battery/.test(s)) return 'Electric';
  return null;
};

const SEATS = (raw) => {
  const s = String(raw || '').toLowerCase();
  if (!s) return null;
  if (/walk|remote|autonomous|manual/.test(s)) return 'Walk-behind (no seat)';
  if (/^part$/.test(s)) return null;
  const n = s.match(/(\d)/);
  return n ? `${n[1]} seats` : null;
};

const BATTERY = (raw) => {
  const m = String(raw || '').toLowerCase().match(/(\d+)\s*hole/);
  return m ? `${m[1]} hole` : null;
};

const WEIGHT = (raw) => {
  const s = String(raw || '').toLowerCase();
  if (!s) return null;
  if (/under 7|under 10/.test(s)) return 'Under 10 kg';
  if (/10.13/.test(s)) return '10 – 13 kg';
  if (/13 kg\+|14\+|over 13/.test(s)) return 'Over 13 kg';
  return null;
};

const FOLD = (raw) => {
  const s = String(raw || '').toLowerCase();
  if (!s) return null;
  return /standard/.test(s) ? 'Standard fold' : 'Compact / flat fold';
};

export function attrsOf(p) {
  return {
    brand: p.brand ? { value: p.brand, label: p.brandName || p.brand } : null,
    condition: p.condition || null,
    price: tierOf(p.price),
    power: POWER(p.power),
    wheels: /^[34]-wheel$/.test(p.wheels || '') ? p.wheels.replace('-', ' ') : null, // "3 wheel" / "4 wheel"
    seats: SEATS(p.seats),
    battery: BATTERY(p.batteryRange),
    weight: WEIGHT(p.weightCategory),
    fold: FOLD(p.foldSize),
  };
}

/* ----------------------------------------------------------------- facet definitions */
export const FACETS = [
  { key: 'brand', label: 'Brand' },
  { key: 'condition', label: 'Condition' },
  { key: 'price', label: 'Price (AUD inc. GST)' },
  { key: 'power', label: 'Power' },
  { key: 'wheels', label: 'Wheels' },
  { key: 'seats', label: 'Seating' },
  { key: 'battery', label: 'Battery range' },
  { key: 'weight', label: 'Weight' },
  { key: 'fold', label: 'Fold size' },
];

export const emptyFilters = () => Object.fromEntries(FACETS.map((f) => [f.key, []]));

const valuesOf = (attrs, key) => {
  const v = attrs[key];
  if (v == null) return [];
  return [key === 'brand' ? v.value : v];
};

/**
 * Apply all active filters. `skip` leaves one facet out (used for faceted counts).
 */
export function filterProducts(products, active, { min = '', max = '', skip = null, attrCache } = {}) {
  const cache = attrCache || new Map();
  return products.filter((p) => {
    let a = cache.get(p.slug);
    if (!a) { a = attrsOf(p); cache.set(p.slug, a); }
    for (const f of FACETS) {
      if (f.key === skip) continue;
      const sel = active[f.key] || [];
      if (sel.length && !valuesOf(a, f.key).some((v) => sel.includes(v))) return false;
    }
    if (skip !== 'price') {
      if (min !== '' && !Number.isNaN(Number(min)) && p.price < Number(min)) return false;
      if (max !== '' && !Number.isNaN(Number(max)) && p.price > Number(max)) return false;
    }
    return true;
  });
}

/**
 * Build the filter sidebar model for a product scope.
 * - options come from the whole scope, so a selected option never disappears
 * - counts are "faceted": they respect every OTHER active filter
 * - a facet with fewer than 2 distinct options is hidden (nothing to choose)
 */
export function buildFacets(scope, active, range = { min: '', max: '' }) {
  const attrCache = new Map();
  scope.forEach((p) => attrCache.set(p.slug, attrsOf(p)));

  return FACETS.map((f) => {
    const universe = new Map(); // value -> label
    scope.forEach((p) => {
      const a = attrCache.get(p.slug);
      if (f.key === 'brand') { if (a.brand) universe.set(a.brand.value, a.brand.label); }
      else if (f.key === 'price') { if (a.price) universe.set(a.price, PRICE_TIERS.find((t) => t.value === a.price).label); }
      else if (a[f.key]) universe.set(a[f.key], a[f.key]);
    });
    if (universe.size < 2) return { ...f, options: [], hidden: true };

    const others = filterProducts(scope, active, { ...range, skip: f.key, attrCache });
    const counts = {};
    others.forEach((p) => valuesOf(attrCache.get(p.slug), f.key).forEach((v) => { counts[v] = (counts[v] || 0) + 1; }));

    let options = [...universe].map(([value, label]) => ({ value, label, count: counts[value] || 0 }));
    if (f.key === 'price') options.sort((x, y) => PRICE_TIERS.findIndex((t) => t.value === x.value) - PRICE_TIERS.findIndex((t) => t.value === y.value));
    else if (f.key === 'brand') options.sort((x, y) => y.count - x.count || x.label.localeCompare(y.label));
    else options.sort((x, y) => x.label.localeCompare(y.label, 'en', { numeric: true }));
    return { ...f, options, hidden: false };
  }).filter((f) => !f.hidden);
}

/* ----------------------------------------------------------------- sorting */
export const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'rating', label: 'Customer rating' },
];

export function sortProducts(list, sortBy, relevance = null) {
  const arr = [...list];
  const feat = (p) => (p.featured ? 1 : 0);
  switch (sortBy) {
    case 'price-asc': return arr.sort((a, b) => a.price - b.price);
    case 'price-desc': return arr.sort((a, b) => b.price - a.price);
    case 'name-asc': return arr.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating': return arr.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewCount || 0) - (a.reviewCount || 0));
    case 'relevance': return relevance ? arr.sort((a, b) => (relevance.get(b.slug) || 0) - (relevance.get(a.slug) || 0)) : arr;
    default: // featured: featured first, products with real photos before placeholders, then price
      return arr.sort((a, b) => feat(b) - feat(a) || Number(hasPhoto(b)) - Number(hasPhoto(a)) || a.price - b.price);
  }
}

export const hasPhoto = (p) => (p.images || []).some((u) => u && !/placeholder/i.test(u));

/* ----------------------------------------------------------------- pagination */
export function paginate(list, page, size = PAGE_SIZE) {
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(Math.max(1, Number(page) || 1), pages);
  const start = (current - 1) * size;
  return { items: list.slice(start, start + size), page: current, pages, total, from: total ? start + 1 : 0, to: Math.min(total, start + size) };
}

/** Compact page list with ellipses: [1, '…', 4, 5, 6, '…', 12] */
export function pageWindow(current, pages) {
  if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
  const set = new Set([1, pages, current - 1, current, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((n) => set.add(n));
  if (current >= pages - 2) [pages - 1, pages - 2, pages - 3].forEach((n) => set.add(n));
  const nums = [...set].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => { if (i && n - nums[i - 1] > 1) out.push('…'); out.push(n); });
  return out;
}

/* ----------------------------------------------------------------- URL state */
export function encodeState(s) {
  const q = new URLSearchParams();
  if (s.chip) q.set('cat', s.chip);
  if (s.q) q.set('q', s.q);
  if (s.sort && s.sort !== 'featured') q.set('sort', s.sort);
  if (s.min !== '' && s.min != null) q.set('min', s.min);
  if (s.max !== '' && s.max != null) q.set('max', s.max);
  FACETS.forEach((f) => { if (s.active[f.key]?.length) q.set(f.key, s.active[f.key].join('|')); });
  if (s.page > 1) q.set('page', String(s.page));
  const str = q.toString();
  return str ? `?${str}` : '';
}

export function decodeState(search) {
  const q = new URLSearchParams(search || '');
  const active = emptyFilters();
  FACETS.forEach((f) => { const v = q.get(f.key); if (v) active[f.key] = v.split('|').filter(Boolean); });
  return {
    chip: q.get('cat') || null,
    q: q.get('q') || '',
    sort: SORTS.some((x) => x.value === q.get('sort')) ? q.get('sort') : 'featured',
    min: q.get('min') || '',
    max: q.get('max') || '',
    page: Math.max(1, parseInt(q.get('page') || '1', 10) || 1),
    active,
  };
}
