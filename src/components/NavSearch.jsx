// src/components/NavSearch.jsx
// Header search: icon -> drop-down panel with a type-ahead (products + categories).
// Enter or "See all results" opens /search/?q=...
'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { suggest } from '@/lib/search';
import { productImageAlt } from '@/lib/seo';

export default function NavSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const box = useRef(null);
  const input = useRef(null);

  const sug = useMemo(() => (q.trim().length >= 2 ? suggest(q, 6) : { products: [], categories: [] }), [q]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onDown = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const go = (e) => {
    e?.preventDefault();
    const term = q.trim();
    setOpen(false);
    router.push(term ? `/search/?q=${encodeURIComponent(term)}` : '/search/');
  };

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="p-2.5 text-slate-300 hover:text-[#C5A880] hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
        aria-label="Search golf buggies, carts, batteries and parts"
        aria-expanded={open}
        id="nav-search-btn"
      >
        <Search className="w-4 h-4" />
      </button>

      {open && (
        <div className="fixed sm:absolute left-3 right-3 sm:left-auto sm:right-0 top-20 sm:top-full sm:mt-2 sm:w-[28rem] z-[60] bg-white rounded-2xl border border-slate-200 shadow-2xl p-3">
          <form role="search" onSubmit={go} className="relative">
            <Search className="w-4 h-4 text-[#8A7045] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <label htmlFor="nav-search-input" className="sr-only">Search the shop</label>
            <input
              ref={input}
              id="nav-search-input"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search models, brands, batteries, parts..."
              autoComplete="off"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/50"
            />
            {q && (
              <button type="button" onClick={() => { setQ(''); input.current?.focus(); }} aria-label="Clear" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {q.trim().length >= 2 && (
            <div className="pt-2">
              {sug.categories.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-1 pb-2">
                  {sug.categories.map((c) => (
                    <Link key={c.slug} href={c.slug === 'brands' ? '/brands/' : `/shop/${c.slug}/`} onClick={() => setOpen(false)} className="px-2.5 py-1 rounded-lg bg-slate-900 text-[#C5A880] text-[11px] font-bold hover:bg-slate-800">
                      {c.navLabel}
                    </Link>
                  ))}
                </div>
              )}
              {sug.products.length === 0 ? (
                <p className="px-2 py-3 text-xs text-slate-500">No products match &ldquo;{q}&rdquo;. Press Enter to search the whole site.</p>
              ) : (
                <ul>
                  {sug.products.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/shop/${p.category}/${p.slug}/`} onClick={() => setOpen(false)} className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50">
                        <span className="w-12 h-12 shrink-0 rounded-lg border border-slate-100 bg-white flex items-center justify-center overflow-hidden">
                          <Image src={p.images[0]} alt={productImageAlt(p, 0)} width={96} height={96} sizes="48px" className="max-w-full max-h-full object-contain" />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-[13px] font-bold text-slate-900 truncate">{p.name}</span>
                          <span className="block text-[11px] text-slate-500">{p.brandName || p.brand}</span>
                        </span>
                        <span className="text-[13px] font-black text-slate-900 shrink-0">${p.price.toLocaleString('en-AU')}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <button type="button" onClick={go} className="mt-1 w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 text-[#C5A880] text-xs font-black uppercase tracking-wider hover:bg-slate-800 cursor-pointer">
                See all results <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
