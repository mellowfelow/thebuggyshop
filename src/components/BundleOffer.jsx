// src/components/BundleOffer.jsx
// Upsell for the buggy / cart bundle (5% off accessories and parts).
//  - <BundleOfferModal>  pop-up shown once per session when a client with a buggy or cart in the order
//                        presses "Proceed to checkout" without any accessory or part yet
//  - <BundleNote>        small inline note used in the cart drawer and on the checkout page
'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Tag, ArrowRight, Check, Plus } from 'lucide-react';
import { BUNDLE, PRODUCTS } from '@/src/config/site';
import { useStore } from '@/src/components/ClientStoreProvider';

const SESSION_KEY = 'tbs-bundle-offer-seen';
export const offerSeen = () => { try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; } };
export const markOfferSeen = () => { try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* private mode: just show it again */ } };

// popular add-ons to tempt with: one big-ticket, one mid, one impulse (falls back to the cheapest if one is renamed)
const PICKS = ['bushnell-tour-v5-golf-rangefinder', 'golf-cart-bag-14-way-divider', 'golf-buggy-umbrella-holder'];
function suggestions() {
  const ok = (p) => BUNDLE.addonCategories.includes(p.category) && p.images?.[0] && !/placeholder/.test(p.images[0]);
  const picked = PICKS.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean).filter(ok);
  if (picked.length >= 3) return picked;
  const extra = PRODUCTS.filter(ok).sort((a, b) => a.price - b.price).filter((p) => !picked.includes(p));
  return [...picked, ...extra].slice(0, 3);
}

const dollars = (n) => `$${Math.round(n).toLocaleString('en-AU')}`;

export function BundleOfferModal({ open, onClose, onContinue, totals }) {
  const { cart, addToCart } = useStore();
  const items = useMemo(suggestions, []);
  const sheet = useRef(null);
  const first = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    first.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !sheet.current) return;
      const f = sheet.current.querySelectorAll('button:not([disabled]), a[href]');
      if (!f.length) return;
      const a = f[0]; const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; opener?.focus?.(); };
  }, [open, onClose]);

  if (!open) return null;
  const inCart = (slug) => cart.some((c) => c.slug === slug);
  const applied = totals.state === 'applied';

  return (
    <div className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="bundle-offer-title">
      <button type="button" tabIndex={-1} aria-label="Close offer" onClick={onClose} className="tbs-fade absolute inset-0 bg-slate-950/70" />
      <div ref={sheet} className="tbs-sheet relative w-full sm:max-w-lg max-h-[92dvh] overflow-y-auto overscroll-contain bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl">
        <div className="relative bg-gradient-to-br from-slate-950 to-slate-800 text-white px-6 pt-7 pb-6">
          <button ref={first} type="button" onClick={onClose} aria-label="Close offer" className="absolute top-3 right-3 p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          <div className="w-11 h-11 rounded-xl bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] mb-3">
            <Tag className="w-5 h-5" />
          </div>
          <h2 id="bundle-offer-title" className="text-xl sm:text-2xl font-black font-serif leading-tight">
            {applied ? `${BUNDLE.percent}% off is on your accessories` : `Take ${BUNDLE.percent}% off accessories & parts`}
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {applied
              ? `Nice. You are saving ${dollars(totals.bundleDiscount)} on this order. Add more and it grows.`
              : `Because you are buying a buggy or cart, every accessory and part you add to this order is ${BUNDLE.percent}% off. Applied automatically, nothing to enter.`}
          </p>
        </div>

        <div className="px-6 py-5 space-y-3">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">Popular add-ons</div>
          <ul className="space-y-2.5">
            {items.map((p) => {
              const added = inCart(p.slug);
              const save = Math.round(p.price * (BUNDLE.percent / 100));
              return (
                <li key={p.slug} className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-200">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                    <Image src={p.images[0]} alt="" width={112} height={112} sizes="56px" loading="eager" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold text-slate-900 leading-snug line-clamp-2">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      <span className="font-black text-slate-900">{dollars(p.price)}</span>{' '}
                      <span className="text-emerald-700 font-bold">save {dollars(save)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { if (!added) addToCart(p, 1); }}
                    disabled={added}
                    className={`shrink-0 min-h-11 px-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${added ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-900 text-[#E7D3AE] hover:bg-slate-800 cursor-pointer'}`}
                  >
                    {added ? <><Check className="w-4 h-4" /> Added</> : <><Plus className="w-4 h-4" /> Add</>}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <Link href="/shop/accessories/" onClick={onClose} className="min-h-11 flex items-center justify-center rounded-xl border border-slate-300 text-xs font-black uppercase tracking-wider text-slate-800 hover:bg-slate-50">All accessories</Link>
            <Link href="/shop/parts/" onClick={onClose} className="min-h-11 flex items-center justify-center rounded-xl border border-slate-300 text-xs font-black uppercase tracking-wider text-slate-800 hover:bg-slate-50">All parts</Link>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="w-full min-h-12 mt-1 rounded-xl bg-slate-950 text-[#E7D3AE] text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-800"
          >
            <span>{applied ? 'Continue to checkout' : 'No thanks, continue to checkout'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/** Inline note for the cart drawer / checkout, driven by computeTotals().state */
export function BundleNote({ totals, onNavigate, className = '' }) {
  const { state, bundleDiscount, percent } = totals;
  if (state === 'none') return null;
  const base = 'rounded-xl border px-3.5 py-3 text-xs leading-relaxed flex items-start gap-2.5';
  if (state === 'applied') {
    return (
      <div className={`${base} bg-emerald-50 border-emerald-200 text-emerald-900 ${className}`}>
        <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-600" />
        <span><strong>{percent}% bundle discount applied:</strong> you are saving {dollars(bundleDiscount)} on accessories and parts.</span>
      </div>
    );
  }
  if (state === 'offer') {
    return (
      <div className={`${base} bg-[#FAF8F5] border-[#E8DDC4] text-slate-800 ${className}`}>
        <Tag className="w-4 h-4 mt-0.5 shrink-0 text-[#7A5C22]" />
        <span>
          <strong>Save {percent}% on accessories &amp; parts</strong> when you add them to this order.{' '}
          <Link href="/shop/accessories/" onClick={onNavigate} className="font-black text-[#7A5C22] underline">Accessories</Link>
          {' · '}
          <Link href="/shop/parts/" onClick={onNavigate} className="font-black text-[#7A5C22] underline">Parts</Link>
        </span>
      </div>
    );
  }
  return (
    <div className={`${base} bg-slate-50 border-slate-200 text-slate-700 ${className}`}>
      <Tag className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
      <span>Add a <strong>buggy or cart</strong> to this order and these accessories and parts are {percent}% off.{' '}
        <Link href="/shop/" onClick={onNavigate} className="font-black text-[#7A5C22] underline">Browse buggies &amp; carts</Link>
      </span>
    </div>
  );
}
