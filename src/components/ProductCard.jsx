// src/components/ProductCard.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BatteryCharging, 
  Gauge, 
  Check, 
  ShoppingBag, 
  Users, 
  Plus, 
  Minus,
  Scale
} from 'lucide-react';
import { SHOP } from '@/src/config/site';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleCompare, 
  isCompared = false 
}) {
  const [qty, setQty] = useState(1);
  const discountPercent = SHOP.cryptoDiscount || 10;
  const savings = Math.round(product.price * (discountPercent / 100));
  const cryptoPrice = product.price - savings;
  const seatingText = product.seats || product.specs?.seating || product.specs?.seat || '2-Seat';

  const handleDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQty((prev) => prev + 1);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product, qty);
    }
  };

  return (
    <div 
      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-[#C5A880] transition-all duration-200 flex flex-col group relative"
      id={`product-card-${product.slug}`}
    >
      {/* Top gold accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-slate-900 via-[#C5A880] to-slate-900 opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Compact Image Frame */}
      <div className="relative aspect-[4/3] max-h-36 sm:max-h-40 bg-slate-50 overflow-hidden border-b border-slate-100">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-1.5 left-1.5 z-10 bg-slate-950/90 text-[#C5A880] text-[8px] sm:text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border border-[#C5A880]/50 shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Compare Button */}
        <button
          type="button"
          onClick={() => onToggleCompare && onToggleCompare(product)}
          className={`absolute top-1.5 right-1.5 z-10 p-1 rounded-full border text-[9px] transition-all shadow-xs cursor-pointer ${
            isCompared 
              ? 'bg-slate-950 text-[#C5A880] border-[#C5A880]' 
              : 'bg-white/90 text-slate-600 hover:bg-white hover:border-[#C5A880] border-slate-200'
          }`}
          aria-label={`${isCompared ? 'Remove from' : 'Add to'} comparison`}
        >
          {isCompared ? <Check className="w-2.5 h-2.5" /> : <Scale className="w-2.5 h-2.5" />}
        </button>

        {/* Image Link */}
        <Link href={`/shop/${product.category}/${product.slug}/`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.images[0]} 
            alt={`${product.name} - Australian Golf Buggy`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Compact Content Body */}
      <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1">
          {/* Category & Seating Tag */}
          <div className="flex items-center justify-between gap-1 text-[8px] sm:text-[9px]">
            <span className="uppercase tracking-wider font-bold text-[#C5A880] truncate">
              {product.category.replace(/-/g, ' ')}
            </span>
            <span className="font-semibold text-slate-600 bg-slate-100 px-1 py-0.2 rounded flex items-center gap-0.5 shrink-0">
              <Users className="w-2.5 h-2.5 text-[#C5A880]" />
              <span>{seatingText.split('(')[0].trim()}</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/shop/${product.category}/${product.slug}/`}>
            <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-1 font-serif">
              {product.name}
            </h3>
          </Link>

          {/* Inline Micro Specs */}
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 pt-0.5">
            <span className="inline-flex items-center gap-0.5 truncate font-medium">
              <BatteryCharging className="w-2.5 h-2.5 text-[#C5A880] shrink-0" />
              <span className="truncate">{product.specs?.battery || 'LiFePO4'}</span>
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="inline-flex items-center gap-0.5 truncate font-medium">
              <Gauge className="w-2.5 h-2.5 text-[#C5A880] shrink-0" />
              <span className="truncate">{product.specs?.range || '36+ Holes'}</span>
            </span>
          </div>
        </div>

        {/* Pricing & Crypto Banner */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          {/* Price Header */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-slate-950 font-serif">
                ${product.price.toLocaleString('en-AU')}
              </span>
              <span className="text-[9px] font-bold text-slate-500">AUD</span>
            </div>
            <span className="text-[8px] font-semibold text-slate-500 bg-slate-100 px-1 py-0.2 rounded">
              Inc. GST
            </span>
          </div>

          {/* Compact Crypto Pill */}
          <div className="bg-[#FAF8F5] border border-[#C5A880]/60 px-1.5 py-0.5 rounded flex items-center justify-between gap-1 text-[9px]">
            <div className="flex items-center gap-1 min-w-0 truncate">
              <span className="w-3.5 h-3.5 rounded-full bg-slate-950 text-[#C5A880] flex items-center justify-center font-bold text-[8px] shrink-0">
                ₿
              </span>
              <span className="font-semibold text-slate-800 truncate">
                Pay <strong className="text-emerald-700 font-mono font-bold">${cryptoPrice.toLocaleString('en-AU')}</strong>
              </span>
            </div>
            <span className="text-[8px] font-bold text-[#8E6E3E] shrink-0">
              Save ${savings}
            </span>
          </div>

          {/* Action Row: Stepper + Add Button */}
          <div className="flex items-center gap-1.5 pt-1">
            {/* Compact Stepper */}
            <div className="flex items-center border border-slate-200 rounded bg-slate-50 overflow-hidden shrink-0">
              <button
                type="button"
                onClick={handleDecrease}
                className="px-1.5 py-1 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <span className="px-1 text-[10px] font-black text-slate-900 min-w-[14px] text-center">{qty}</span>
              <button
                type="button"
                onClick={handleIncrease}
                className="px-1.5 py-1 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Compact Add to Order Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-1 px-2 rounded bg-slate-950 hover:bg-[#C5A880] hover:text-slate-950 text-[#C5A880] text-[10px] font-bold uppercase tracking-wider text-center transition-all border border-[#C5A880]/30 flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
              id={`add-to-cart-${product.slug}`}
            >
              <ShoppingBag className="w-2.5 h-2.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
