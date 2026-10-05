// src/components/FacetFilter.jsx
// Filter panel for the shop. It is purely presentational: ShopClient owns the state and builds
// `facets` with lib/catalog.js, so every option shown exists in the data and carries a live count.
'use client';

import React, { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal, RotateCcw } from 'lucide-react';

function FacetGroup({ facet, selected, onToggle, onClear, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  const [showAll, setShowAll] = useState(false);
  const LIMIT = 6;
  const opts = facet.options;
  const visible = showAll ? opts : opts.filter((o, i) => i < LIMIT || selected.includes(o.value));
  const hiddenCount = opts.length - visible.length;

  return (
    <fieldset className="border-b border-slate-200 py-3 last:border-b-0">
      <legend className="sr-only">{facet.label}</legend>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex-1 flex items-center justify-between text-left text-xs font-black uppercase tracking-wider text-slate-900 cursor-pointer"
        >
          <span>
            {facet.label}
            {selected.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-slate-900 text-[#C5A880] text-[10px] font-black">
                {selected.length}
              </span>
            )}
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="ml-3 text-[11px] font-bold text-[#8A7045] hover:underline cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {open && (
        <ul className="mt-2.5 space-y-1">
          {visible.map((o) => {
            const checked = selected.includes(o.value);
            const disabled = o.count === 0 && !checked;
            const id = `facet-${facet.key}-${o.value}`.replace(/[^a-z0-9-]/gi, '-');
            return (
              <li key={o.value}>
                <label
                  htmlFor={id}
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] ${
                    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'
                  } ${checked ? 'bg-[#FAF8F5]' : ''}`}
                >
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => onToggle(facet.key, o.value)}
                    className="w-4 h-4 rounded border-slate-300 accent-slate-900 shrink-0"
                  />
                  <span className="flex-1 min-w-0 truncate text-slate-800 font-medium">{o.label}</span>
                  <span className="text-[11px] font-bold text-slate-500 tabular-nums">{o.count}</span>
                </label>
              </li>
            );
          })}
          {(hiddenCount > 0 || showAll) && opts.length > LIMIT && (
            <li>
              <button
                type="button"
                onClick={() => setShowAll((s) => !s)}
                className="px-2 py-1 text-[11px] font-bold text-[#8A7045] hover:underline cursor-pointer"
              >
                {showAll ? 'Show fewer' : `Show ${hiddenCount} more`}
              </button>
            </li>
          )}
        </ul>
      )}
    </fieldset>
  );
}

function PriceRange({ min, max, onChange }) {
  return (
    <div className="border-b border-slate-200 py-3">
      <div className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2">Custom price</div>
      <div className="flex items-center gap-2">
        <label className="flex-1">
          <span className="sr-only">Minimum price</span>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Min $"
            value={min}
            onChange={(e) => onChange(e.target.value, max)}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/50"
          />
        </label>
        <span className="text-slate-400">–</span>
        <label className="flex-1">
          <span className="sr-only">Maximum price</span>
          <input
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="Max $"
            value={max}
            onChange={(e) => onChange(min, e.target.value)}
            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#C5A880]/50"
          />
        </label>
      </div>
    </div>
  );
}

export default function FacetFilter({
  facets,
  active,
  min,
  max,
  onToggle,
  onClearFacet,
  onPriceChange,
  onClearAll,
  activeCount,
  resultCount,
  drawerOpen,
  onCloseDrawer,
}) {
  const body = (
    <div>
      {facets.map((f, i) => (
        <React.Fragment key={f.key}>
          <FacetGroup
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

  const header = (
    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
      <div className="flex items-center gap-2 text-sm font-black text-slate-900">
        <SlidersHorizontal className="w-4 h-4 text-[#8A7045]" />
        <span>Filters</span>
        {activeCount > 0 && <span className="text-xs font-bold text-slate-500">({activeCount} active)</span>}
      </div>
      {activeCount > 0 && (
        <button type="button" onClick={onClearAll} className="text-[11px] font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer">
          <RotateCcw className="w-3 h-3" />
          <span>Reset all</span>
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto bg-white rounded-2xl border border-slate-200 p-4 shadow-xs" aria-label="Product filters">
        {header}
        {body}
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-[70] flex" role="dialog" aria-modal="true" aria-label="Product filters">
          <button type="button" className="absolute inset-0 bg-slate-950/60" onClick={onCloseDrawer} aria-label="Close filters" />
          <div className="relative ml-auto h-full w-[88%] max-w-sm bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="flex-1 pr-3">{header}</div>
              <button type="button" onClick={onCloseDrawer} className="p-2 -mr-2 text-slate-600 cursor-pointer" aria-label="Close filters">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4">{body}</div>
            <div className="p-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onCloseDrawer}
                className="w-full py-3 rounded-xl bg-slate-900 text-[#C5A880] text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Show {resultCount} {resultCount === 1 ? 'product' : 'products'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
