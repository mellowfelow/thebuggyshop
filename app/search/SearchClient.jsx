'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, ArrowRight, X, Info, Layers, Tag } from 'lucide-react';
import ProductCard from '@/src/components/ProductCard';
import Pagination from '@/src/components/Pagination';
import { useStore } from '@/src/components/ClientStoreProvider';
import { searchAll } from '@/lib/search';
import { paginate, PAGE_SIZE } from '@/lib/catalog';

const POPULAR = ['remote control golf buggy', 'push buggy', 'MGI', 'lithium battery', 'used golf cart', 'off road buggy', 'kids buggy', 'rangefinder', 'wheels'];

export default function SearchClient() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [page, setPage] = useState(Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1));
  const { addToCart, toggleCompare, comparedProducts } = useStore();
  const top = useRef(null);

  // keep the address bar shareable: /search/?q=remote&page=2
  useEffect(() => {
    const qs = new URLSearchParams();
    if (query.trim()) qs.set('q', query.trim());
    if (page > 1) qs.set('page', String(page));
    const next = `${window.location.pathname}${qs.toString() ? `?${qs}` : ''}`;
    if (next !== `${window.location.pathname}${window.location.search}`) window.history.replaceState(null, '', next);
  }, [query, page]);

  const clean = query.trim();
  const found = useMemo(() => searchAll(clean), [clean]);
  const pg = paginate(found.results.map((r) => r.product), page);

  const goToPage = (n) => {
    setPage(n);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <div className="space-y-8" ref={top} style={{ scrollMarginTop: '6rem' }}>
      {/* Search box */}
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative max-w-2xl">
        <SearchIcon className="w-5 h-5 text-[#7A5C22] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        <label htmlFor="site-search" className="sr-only">Search golf buggies, carts, batteries, parts and accessories</label>
        <input
          id="site-search"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="Search by model, brand, battery, part..."
          className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border border-[#CAD5CE] text-sm text-[#0E2A1E] placeholder:text-[#8A9C92] focus:outline-hidden focus:ring-2 focus:ring-[#C5A265]/50 shadow-sm"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(''); setPage(1); }} aria-label="Clear search" className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        )}
      </form>

      {!clean ? (
        <section className="space-y-3" aria-label="Popular searches">
          <h2 className="text-sm font-black text-[#0E2A1E] uppercase tracking-wider">Popular searches</h2>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map((s) => (
              <button key={s} type="button" onClick={() => { setQuery(s); setPage(1); }} className="px-3.5 py-2 rounded-xl bg-white border border-[#D5DFD9] text-xs font-bold text-[#0E2A1E] hover:border-[#C5A265] hover:bg-[#FAF8F5] cursor-pointer">
                {s}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#4A5D53] pt-2">
            Or <Link href="/shop/" className="underline font-semibold">browse the whole shop</Link>.
          </p>
        </section>
      ) : (
        <>
          <div className="text-xs text-[#4A5D53] font-medium bg-[#EBF1ED] px-4 py-2 rounded-xl inline-block border border-[#D5DFD9]" aria-live="polite">
            <strong>{found.results.length}</strong> {found.results.length === 1 ? 'product' : 'products'}
            {found.posts.length > 0 && <> and <strong>{found.posts.length}</strong> {found.posts.length === 1 ? 'guide' : 'guides'}</>} for &ldquo;{clean}&rdquo;
          </div>

          {found.mode !== 'exact' && found.results.length > 0 && (
            <div className="flex items-start gap-2 text-xs text-[#4A5D53] bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl px-4 py-2.5 max-w-3xl">
              <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#7A5C22]" />
              <span>No exact matches, so these are the closest {found.mode === 'partial' ? 'partial matches' : 'related products'}.</span>
            </div>
          )}

          {(found.categories.length > 0 || found.brands.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              {found.categories.map((c) => (
                <Link key={c.slug} href={c.slug === 'brands' ? '/brands/' : `/shop/${c.slug}/`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-[#C5A880] text-[11px] font-bold hover:bg-slate-800">
                  <Layers className="w-3 h-3" /> {c.navLabel}
                </Link>
              ))}
              {found.brands.map((b) => (
                <Link key={b.slug} href={`/brands/${b.slug}/`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D5DFD9] text-[#0E2A1E] text-[11px] font-bold hover:border-[#C5A265]">
                  <Tag className="w-3 h-3 text-[#7A5C22]" /> {b.name}
                </Link>
              ))}
            </div>
          )}

          <section className="space-y-6" aria-label="Product results">
            <div className="flex items-center justify-between border-b border-[#D5DFD9] pb-3">
              <h2 className="text-xl font-black text-[#0E2A1E] tracking-tight font-serif">
                Products {pg.total > 0 && <span className="text-sm font-bold text-[#4A5D53]">({pg.from}–{pg.to} of {pg.total})</span>}
              </h2>
              <Link href="/shop/" className="text-xs font-black text-[#0E2A1E] hover:text-[#7A5C22] uppercase tracking-wider">View all in shop →</Link>
            </div>

            {pg.total === 0 ? (
              <div className="p-10 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] text-center text-xs text-[#4A5D53] space-y-3">
                <p className="font-bold text-[#0E2A1E] text-sm">Nothing matched &ldquo;{clean}&rdquo;.</p>
                <p>Check the spelling or try a broader word, for example one of these:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {POPULAR.slice(0, 6).map((s) => (
                    <button key={s} type="button" onClick={() => { setQuery(s); setPage(1); }} className="px-3 py-1.5 rounded-lg bg-white border border-[#D5DFD9] font-bold text-[#0E2A1E] hover:border-[#C5A265] cursor-pointer">{s}</button>
                  ))}
                </div>
                <p>
                  Still stuck? <Link href="/contact/" className="underline font-semibold">Ask our sales desk</Link>.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
                <Pagination page={pg.page} pages={pg.pages} onChange={goToPage} />
                {pg.pages > 1 && <p className="text-center text-[11px] text-slate-500">Page {pg.page} of {pg.pages} · {PAGE_SIZE} products per page</p>}
              </>
            )}
          </section>

          {found.posts.length > 0 && (
            <section className="space-y-6 pt-6 border-t border-[#D5DFD9]" aria-label="Guides">
              <h2 className="text-xl font-black text-[#0E2A1E] tracking-tight font-serif">Guides &amp; articles ({found.posts.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {found.posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}/`} className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] shadow-sm hover:shadow-lg hover:border-[#C5A265] transition-all space-y-3 block group">
                    <span className="text-[10px] font-black uppercase text-[#7A5C22] bg-white px-2.5 py-1 rounded-md border border-[#D5DFD9] inline-block">{post.category}</span>
                    <h3 className="font-extrabold text-sm text-[#0E2A1E] group-hover:text-[#7A5C22] transition-colors leading-snug line-clamp-2 font-serif">{post.title}</h3>
                    <p className="text-xs text-[#4A5D53] line-clamp-2 leading-relaxed">{post.excerpt}</p>
                    <div className="text-xs font-black text-[#0E2A1E] group-hover:text-[#7A5C22] pt-2 flex items-center gap-1 uppercase tracking-wider">
                      <span>Read article</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A265] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
