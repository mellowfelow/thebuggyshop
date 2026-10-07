// app/shop/ShopClient.jsx
// Shop listing used by /shop, /shop/[category], /brands/[slug] and /golf-buggies/[city].
//  - 16 products per page, 4 columns on desktop (4 x 4), numbered pages below the grid
//  - filters are built from the real product data (lib/catalog.js) with live counts
//  - in-page search uses the same engine as the site search (lib/search.js)
//  - view state (category, filters, sort, search, page) lives in the URL so it can be shared
'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpDown, X, LayoutGrid, List, RotateCcw, SlidersHorizontal, Search, Info } from 'lucide-react';
import ProductCard from '@/src/components/ProductCard';
import FacetFilter from '@/src/components/FacetFilter';
import Pagination from '@/src/components/Pagination';
import { useStore } from '@/src/components/ClientStoreProvider';
import { productImageAlt } from '@/lib/seo';
import { searchProducts } from '@/lib/search';
import {
  PAGE_SIZE, SORTS, emptyFilters, buildFacets, filterProducts, sortProducts, paginate,
  productsInNode, childNodes, rootNodes, encodeState, decodeState, getNode,
} from '@/lib/catalog';

const chipClass = (on) =>
  `shrink-0 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
    on ? 'bg-slate-900 text-[#C5A880] border-[#C5A880]/50 shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
  }`;

export default function ShopClient({ initialProducts = [], currentCategory = null }) {
  const { addToCart, toggleCompare, comparedProducts } = useStore();

  const [chip, setChip] = useState(null);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('featured');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [active, setActive] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const [view, setView] = useState('grid');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const gridTop = useRef(null);

  /* ---- read shared state from the URL once, after hydration (keeps server HTML = page 1, no filters) ---- */
  useEffect(() => {
    const s = decodeState(window.location.search);
    /* eslint-disable react-hooks/set-state-in-effect -- one-time sync from the URL on mount */
    setChip(s.chip); setQ(s.q); setSort(s.sort); setMin(s.min); setMax(s.max); setActive(s.active); setPage(s.page);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  /* ---- keep the URL in step with the view (no navigation, no scroll jump) ---- */
  useEffect(() => {
    if (!ready) return;
    const next = `${window.location.pathname}${encodeState({ chip, q, sort, min, max, active, page })}`;
    if (next !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(null, '', next);
  }, [ready, chip, q, sort, min, max, active, page]);

  /* ---- category chips: children of the current category, otherwise the root categories ---- */
  const chips = useMemo(() => {
    const nodes = currentCategory ? childNodes(currentCategory.slug) : rootNodes();
    return nodes
      .map((n) => ({ slug: n.slug, label: n.navLabel || n.slug, count: productsInNode(initialProducts, n.slug).length }))
      .filter((c) => c.count > 0);
  }, [currentCategory, initialProducts]);

  /* ---- scope -> search -> filter -> sort -> paginate ---- */
  const scoped = useMemo(() => (chip ? productsInNode(initialProducts, chip) : initialProducts), [initialProducts, chip]);

  const searched = useMemo(() => {
    if (!q.trim()) return { list: scoped, relevance: null, mode: 'all' };
    const r = searchProducts(q, scoped);
    return { list: r.results.map((x) => x.product), relevance: new Map(r.results.map((x) => [x.product.slug, x.score])), mode: r.mode };
  }, [scoped, q]);

  const range = useMemo(() => ({ min, max }), [min, max]);
  const facets = useMemo(() => buildFacets(searched.list, active, range), [searched.list, active, range]);

  const filtered = useMemo(() => {
    const list = filterProducts(searched.list, active, range);
    const by = q.trim() && sort === 'featured' ? 'relevance' : sort;
    return sortProducts(list, by, searched.relevance);
  }, [searched, active, range, sort, q]);

  const pg = useMemo(() => paginate(filtered, page), [filtered, page]);

  const activeCount = useMemo(
    () => Object.values(active).reduce((n, v) => n + v.length, 0) + (min !== '' || max !== '' ? 1 : 0),
    [active, min, max]
  );

  // nothing to filter on (e.g. a brand with one or two products): hide the panel and the mobile button
  const showFilters = facets.length > 0 || activeCount > 0;

  const pills = useMemo(() => {
    const out = [];
    Object.entries(active).forEach(([key, values]) => {
      const f = facets.find((x) => x.key === key);
      values.forEach((v) => out.push({ key, value: v, label: f?.options.find((o) => o.value === v)?.label || v }));
    });
    if (min !== '' || max !== '') out.push({ key: 'price-range', value: 'custom', label: `$${min || 0} – ${max ? `$${max}` : 'any'}` });
    return out;
  }, [active, facets, min, max]);

  /* ---- handlers: any change that alters the result set returns to page 1 ---- */
  const toggleFacet = useCallback((key, value) => {
    setActive((prev) => {
      const cur = prev[key] || [];
      return { ...prev, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
    });
    setPage(1);
  }, []);
  const clearFacet = useCallback((key) => { setActive((p) => ({ ...p, [key]: [] })); setPage(1); }, []);
  const setPrice = useCallback((a, b) => { setMin(a); setMax(b); setPage(1); }, []);
  const clearAll = useCallback(() => { setActive(emptyFilters()); setMin(''); setMax(''); setQ(''); setPage(1); }, []);
  const pickChip = (slug) => { setChip(slug); setActive(emptyFilters()); setMin(''); setMax(''); setPage(1); };

  const goToPage = (n) => {
    setPage(n);
    requestAnimationFrame(() => gridTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const scopeLabel = chip ? getNode(chip)?.navLabel : currentCategory?.navLabel;

  if (initialProducts.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 space-y-3">
        <h3 className="text-xl font-black text-slate-900 font-serif">No products in this section yet</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          We are adding stock here soon. <Link href="/shop/" className="underline font-semibold">Browse the full range</Link> or{' '}
          <Link href="/contact/" className="underline font-semibold">ask our sales desk</Link> about availability.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={gridTop} style={{ scrollMarginTop: '6rem' }}>
      {/* 1. Category chips */}
      {chips.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1" role="group" aria-label="Browse categories">
          <button type="button" onClick={() => pickChip(null)} className={chipClass(!chip)} aria-pressed={!chip}>
            {currentCategory ? `All ${currentCategory.navLabel}` : 'All products'} ({initialProducts.length})
          </button>
          {chips.map((c) => (
            <button key={c.slug} type="button" onClick={() => pickChip(c.slug)} className={chipClass(chip === c.slug)} aria-pressed={chip === c.slug}>
              {c.label} ({c.count})
            </button>
          ))}
        </div>
      )}

      {/* 2. Toolbar: search, filters (mobile), sort, view, result count and active filters */}
      <div className="flex flex-col gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-[#7A5C22] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <label htmlFor="shop-search" className="sr-only">Search these products</label>
            <input
              id="shop-search"
              type="search"
              value={q}
              onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder={`Search ${scopeLabel ? scopeLabel.toLowerCase() : 'all products'}...`}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-[15px] sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/50"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {showFilters && <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-haspopup="dialog"
              className="lg:hidden shrink-0 h-11 flex items-center gap-2 px-4 rounded-xl bg-slate-900 text-[#E7D3AE] text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
              <span>Filters</span>
              {activeCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#C5A880] text-slate-950 text-[10px] font-black">{activeCount}</span>
              )}
            </button>}

            <div className="flex-1 lg:flex-none min-w-0 h-11 flex items-center gap-2 bg-slate-50 px-3 rounded-xl border border-slate-200">
              <ArrowUpDown className="w-4 h-4 text-[#7A5C22] shrink-0" />
              <label htmlFor="shop-sort" className="text-xs font-bold text-slate-500 shrink-0">Sort</label>
              <select
                id="shop-sort"
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                className="flex-1 min-w-0 text-[13px] sm:text-xs font-bold bg-transparent text-slate-900 focus:outline-hidden cursor-pointer"
              >
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            <div className="hidden sm:flex items-center bg-slate-50 p-1 rounded-xl border border-slate-200" role="group" aria-label="View mode">
              {[['grid', LayoutGrid, 'Grid view'], ['list', List, 'List view']].map(([m, Icon, label]) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setView(m)}
                  aria-label={label}
                  aria-pressed={view === m}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${view === m ? 'bg-slate-900 text-[#C5A880]' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2" aria-live="polite">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-900">
              {pg.total === 0 ? 'No products' : <>Showing <strong className="text-[#7A5C22] font-black">{pg.from}–{pg.to}</strong> of {pg.total} {pg.total === 1 ? 'product' : 'products'}</>}
            </span>
            {(activeCount > 0 || q) && (
              <button type="button" onClick={clearAll} className="shrink-0 text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer">
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
          {pills.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap sm:overflow-visible pb-0.5">
              {pills.map((p) => (
                <span key={`${p.key}-${p.value}`} className="shrink-0 inline-flex items-center gap-1 pl-3 pr-1.5 py-1 rounded-full bg-slate-900 text-[#E7D3AE] text-[11px] font-bold whitespace-nowrap">
                  {p.label}
                  <button
                    type="button"
                    aria-label={`Remove filter ${p.label}`}
                    onClick={() => (p.key === 'price-range' ? setPrice('', '') : toggleFacet(p.key, p.value))}
                    className="p-1 rounded-full hover:bg-slate-700 hover:text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {q.trim() && searched.mode !== 'exact' && searched.mode !== 'all' && filtered.length > 0 && (
        <div className="flex items-start gap-2 text-xs text-[#4A5D53] bg-[#EBF1ED] border border-[#D5DFD9] rounded-xl px-4 py-2.5">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#7A5C22]" />
          <span>No exact matches for &ldquo;{q}&rdquo;, showing the closest {searched.mode === 'partial' ? 'partial matches' : 'related products'}.</span>
        </div>
      )}

      {/* 3. Filters + product grid */}
      <div className="flex gap-6 items-start">
        {showFilters && <FacetFilter
          facets={facets}
          active={active}
          min={min}
          max={max}
          onToggle={toggleFacet}
          onClearFacet={clearFacet}
          onPriceChange={setPrice}
          onClearAll={clearAll}
          activeCount={activeCount}
          resultCount={filtered.length}
          drawerOpen={drawerOpen}
          onCloseDrawer={() => setDrawerOpen(false)}
        />}

        <div className="flex-1 min-w-0">
          <h2 className="sr-only">Products</h2>
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-[#C5A880] flex items-center justify-center mx-auto shadow-md">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-serif">
                {q.trim() ? `Nothing matched “${q}”` : 'No products match these filters'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Try fewer or different filters{q.trim() ? ', or check the spelling' : ''}. You can also{' '}
                <Link href="/search/" className="underline font-semibold">search the whole site</Link> or{' '}
                <Link href="/contact/" className="underline font-semibold">ask our sales desk</Link>.
              </p>
              <button type="button" onClick={clearAll} className="px-6 py-2.5 rounded-xl bg-slate-900 text-[#C5A880] font-black text-xs uppercase tracking-wider hover:bg-slate-800 cursor-pointer">
                Reset all filters
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" data-testid="product-grid">
              {pg.items.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleCompare={toggleCompare}
                  isCompared={comparedProducts.some((p) => p.slug === product.slug)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {pg.items.map((product) => {
                const isCompared = comparedProducts.some((p) => p.slug === product.slug);
                return (
                  <div key={product.slug} className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-[#C5A880] transition-all shadow-xs flex flex-col sm:flex-row items-center gap-5 group">
                    <Link href={`/shop/${product.category}/${product.slug}/`} className="w-full sm:w-48 shrink-0 aspect-4/3 bg-white rounded-xl flex items-center justify-center p-2 border border-slate-100 overflow-hidden">
                      <Image src={product.images[0]} alt={productImageAlt(product, 0)} width={400} height={300} sizes="(max-width: 640px) 90vw, 192px" className="max-w-full max-h-full object-contain" />
                    </Link>
                    <div className="flex-1 min-w-0 space-y-1.5 w-full">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{product.brandName || product.brand} • {product.condition}</div>
                      <h3 className="font-serif font-black text-base text-slate-900 group-hover:text-[#7A5C22] transition-colors">
                        <Link href={`/shop/${product.category}/${product.slug}/`}>{product.name}</Link>
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{product.shortDescription || product.description}</p>
                    </div>
                    <div className="w-full sm:w-44 shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2">
                      <span className="text-xl font-black text-slate-900 font-serif">${product.price.toLocaleString('en-AU')} <span className="text-xs font-bold text-[#7A5C22]">AUD</span></span>
                      <div className="flex sm:flex-col gap-1.5 sm:w-full">
                        <button type="button" onClick={() => addToCart(product)} className="px-4 py-2 rounded-xl bg-slate-900 text-[#C5A880] text-xs font-black uppercase tracking-wider hover:bg-slate-800 cursor-pointer">Add to cart</button>
                        <button
                          type="button"
                          onClick={() => toggleCompare(product)}
                          className={`px-4 py-1.5 rounded-xl text-[11px] font-bold border cursor-pointer ${isCompared ? 'bg-[#C5A880] text-slate-950 border-[#C5A880]' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                        >
                          {isCompared ? '✓ Compared' : '+ Compare'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <Pagination page={pg.page} pages={pg.pages} onChange={goToPage} />
          {pg.pages > 1 && (
            <p className="text-center text-[11px] text-slate-500 pt-2">Page {pg.page} of {pg.pages} · {PAGE_SIZE} products per page</p>
          )}
        </div>
      </div>
    </div>
  );
}
