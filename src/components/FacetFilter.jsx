// src/components/FacetFilter.jsx
// Filter panel for the shop. Purely presentational: ShopClient owns the state and builds `facets`
// with lib/catalog.js, so every option shown exists in the data and carries a live count.
//  - desktop: sticky sidebar card
//  - mobile / tablet: bottom sheet (scroll lock, Esc to close, focus kept inside, sticky action bar)
//  - small facets render as tappable chips, long ones (brand) as a searchable checklist
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, X, SlidersHorizontal, RotateCcw, Check, Search } from 'lucide-react';

const LIST_LIMIT = 8;

function OptionChip({ facetKey, option, checked, onToggle }) {
  const disabled = option.count === 0 && !checked;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onToggle(facetKey, option.value)}
      className={`inline-flex items-center gap-1.5 min-h-10 lg:min-h-8 px-3 rounded-full border text-[13px] lg:text-xs font-semibold transition-colors ${
        checked
          ? 'bg-slate-900 text-[#E7D3AE] border-slate-900 shadow-sm'
          : disabled
            ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
            : 'bg-white text-slate-800 border-slate-300 hover:border-[#C5A880] hover:bg-[#FAF8F5] cursor-pointer'
      }`}
    >
      {checked && <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={3} />}
      <span>{option.label}</span>
      <span className={`text-[11px] tabular-nums ${checked ? 'text-[#7A5C22]' : 'text-slate-500'}`}>{option.count}</span>
    </button>
  );
}

function OptionRow({ facetKey, option, checked, onToggle }) {
  const disabled = option.count === 0 && !checked;
  const id = `facet-${facetKey}-${option.value}`.replace(/[^a-z0-9-]/gi, '-');
  return (
    <li>
      <label
        htmlFor={id}
        className={`group flex items-center gap-3 rounded-xl px-2.5 py-2.5 lg:py-2 text-[14px] lg:text-[13px] ${
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'
        } ${checked ? 'bg-[#FAF8F5]' : ''}`}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={() => onToggle(facetKey, option.value)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={`flex items-center justify-center w-[18px] h-[18px] rounded-md border shrink-0 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#C5A880] ${
            checked ? 'bg-slate-900 border-slate-900 text-[#E7D3AE]' : 'bg-white border-slate-300 group-hover:border-[#C5A880]'
          }`}
        >
          {checked && <Check className="w-3 h-3" strokeWidth={3.5} />}
        </span>
        <span className={`flex-1 min-w-0 truncate ${checked ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{option.label}</span>
        <span className="text-[11px] font-bold text-slate-500 tabular-nums">{option.count}</span>
      </label>
    </li>
  );
}

function FacetSection({ facet, selected, onToggle, onClear, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const [term, setTerm] = useState('');
  const asList = facet.key === 'brand';
  const opts = facet.options;
  const searchable = asList && opts.length > LIST_LIMIT;
  const matches = term.trim() ? opts.filter((o) => o.label.toLowerCase().includes(term.trim().toLowerCase())) : opts;
  const visible = asList && !showAll && !term.trim() ? matches.filter((o, i) => i < LIST_LIMIT || selected.includes(o.value)) : matches;
  const hidden = matches.length - visible.length;
  const bodyId = `facet-body-${facet.key}`;

  return (
    <section className="border-b border-slate-200/80 last:border-b-0">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={bodyId}
          className="flex-1 flex items-center justify-between gap-2 py-3.5 text-left cursor-pointer"
        >
          <span className="flex items-center gap-2 text-[13px] lg:text-xs font-black uppercase tracking-wider text-slate-900">
            {facet.label}
            {selected.length > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#C5A880] text-slate-950 text-[10px] font-black">
                {selected.length}
              </span>
            )}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        {selected.length > 0 && (
          <button type="button" onClick={onClear} className="ml-2 px-2 py-1 text-[11px] font-bold text-[#7A5C22] hover:underline cursor-pointer">
            Clear
          </button>
        )}
      </div>

      {open && (
        <div id={bodyId} className="pb-4">
          {asList ? (
            <>
              {searchable && (
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <label htmlFor={`facet-search-${facet.key}`} className="sr-only">Search {facet.label.toLowerCase()}</label>
                  <input
                    id={`facet-search-${facet.key}`}
                    type="search"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder={`Find a ${facet.label.toLowerCase()}`}
                    className="w-full pl-8 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[13px] lg:text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/50"
                  />
                </div>
              )}
              <ul className="-mx-1">
                {visible.map((o) => (
                  <OptionRow key={o.value} facetKey={facet.key} option={o} checked={selected.includes(o.value)} onToggle={onToggle} />
                ))}
              </ul>
              {visible.length === 0 && <p className="text-xs text-slate-500 px-1">No match.</p>}
              {!term.trim() && matches.length > LIST_LIMIT && (
                <button type="button" onClick={() => setShowAll((s) => !s)} className="mt-1 px-2 py-1 text-[12px] font-bold text-[#7A5C22] hover:underline cursor-pointer">
                  {showAll ? 'Show fewer' : `Show ${hidden} more`}
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-wrap gap-2" role="group" aria-label={facet.label}>
              {opts.map((o) => (
                <OptionChip key={o.value} facetKey={facet.key} option={o} checked={selected.includes(o.value)} onToggle={onToggle} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function PriceRange({ min, max, onChange }) {
  const field = (label, value, set, placeholder) => (
    <label className="flex-1 relative block">
      <span className="sr-only">{label}</span>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">$</span>
      <input
        type="number"
        inputMode="numeric"
        min="0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => set(e.target.value)}
        className="w-full pl-6 pr-2 py-2.5 lg:py-2 rounded-lg border border-slate-300 text-[14px] lg:text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/50"
      />
    </label>
  );
  return (
    <section className="border-b border-slate-200/80 py-3.5">
      <div className="text-[13px] lg:text-xs font-black uppercase tracking-wider text-slate-900 mb-2.5">Custom price</div>
      <div className="flex items-center gap-2">
        {field('Minimum price', min, (v) => onChange(v, max), 'Min')}
        <span className="text-slate-400">–</span>
        {field('Maximum price', max, (v) => onChange(min, v), 'Max')}
      </div>
    </section>
  );
}

export default function FacetFilter({
  facets, active, min, max, onToggle, onClearFacet, onPriceChange, onClearAll,
  activeCount, resultCount, drawerOpen, onCloseDrawer,
}) {
  const sheetRef = useRef(null);
  const closeRef = useRef(null);

  /* bottom sheet: lock page scroll, close on Esc, keep Tab inside, give focus back afterwards */
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') { onCloseDrawer(); return; }
      if (e.key !== 'Tab' || !sheetRef.current) return;
      const f = sheetRef.current.querySelectorAll('button:not([disabled]), input:not([disabled]), select, a[href]');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [drawerOpen, onCloseDrawer]);

  const body = (
    <div>
      {facets.map((f, i) => (
        <React.Fragment key={f.key}>
          <FacetSection
            facet={f}
            selected={active[f.key] || []}
            onToggle={onToggle}
            onClear={() => onClearFacet(f.key)}
            defaultOpen={i < 3 || (active[f.key] || []).length > 0}
          />
          {f.key === 'price' && <PriceRange min={min} max={max} onChange={onPriceChange} />}
        </React.Fragment>
      ))}
      {!facets.some((f) => f.key === 'price') && <PriceRange min={min} max={max} onChange={onPriceChange} />}
    </div>
  );

  const countLabel = `${resultCount} ${resultCount === 1 ? 'product' : 'products'}`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-72 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        aria-label="Product filters"
      >
        <div className="shrink-0 flex items-center justify-between px-4 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-center gap-2 text-sm font-black tracking-wide">
            <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
            <span>Filters</span>
            {activeCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#C5A880] text-slate-950 text-[10px] font-black">{activeCount}</span>
            )}
          </div>
          {activeCount > 0 && (
            <button type="button" onClick={onClearAll} className="text-[11px] font-bold text-[#E7D3AE] hover:text-white flex items-center gap-1 cursor-pointer">
              <RotateCcw className="w-3 h-3" /> Reset all
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto px-4 overscroll-contain">{body}</div>
        <div className="shrink-0 px-4 py-2.5 border-t border-slate-200 bg-slate-50 text-xs font-bold text-slate-600" aria-live="polite">
          {countLabel} match
        </div>
      </aside>

      {/* Mobile / tablet bottom sheet */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Product filters">
          <button type="button" tabIndex={-1} className="tbs-fade absolute inset-0 bg-slate-950/60" onClick={onCloseDrawer} aria-label="Close filters" />
          <div
            ref={sheetRef}
            className="tbs-sheet absolute inset-x-0 bottom-0 h-[88dvh] max-h-[88dvh] flex flex-col bg-white rounded-t-3xl shadow-2xl"
          >
            <div className="shrink-0 pt-2.5 px-4">
              <div className="mx-auto w-10 h-1 rounded-full bg-slate-300" aria-hidden="true" />
              <div className="flex items-center justify-between pt-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2 text-base font-black text-slate-900">
                  <SlidersHorizontal className="w-4 h-4 text-[#7A5C22]" />
                  <span>Filters</span>
                  {activeCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-[#C5A880] text-slate-950 text-[10px] font-black">{activeCount}</span>
                  )}
                </div>
                <button ref={closeRef} type="button" onClick={onCloseDrawer} className="p-2.5 -mr-2 rounded-full text-slate-600 hover:bg-slate-100 cursor-pointer" aria-label="Close filters">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4">{body}</div>

            <div className="shrink-0 flex items-center gap-3 px-4 pt-3 border-t border-slate-200 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={onClearAll}
                disabled={activeCount === 0}
                className="px-4 py-3.5 rounded-xl border border-slate-300 text-xs font-black uppercase tracking-wider text-slate-700 disabled:opacity-40 cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={onCloseDrawer}
                className="flex-1 py-3.5 rounded-xl bg-slate-900 text-[#E7D3AE] text-xs font-black uppercase tracking-wider cursor-pointer"
                aria-live="polite"
              >
                Show {countLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
