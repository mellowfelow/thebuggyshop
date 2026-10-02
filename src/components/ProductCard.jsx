// src/components/ProductCard.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, BatteryCharging, Gauge, ArrowRight, Scale, Check, ShoppingBag, Users, Plus, Minus } from 'lucide-react';
import { SHOP } from '@/src/config/site';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleCompare, 
  isCompared = false 
}) {
  const [qty, setQty] = useState(1);
  const cryptoPrice = Math.round(product.price * (1 - SHOP.cryptoDiscount / 100));
  const seatingText = product.seats || product.specs?.seating || product.specs?.seat || '2-Passenger Seating';

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
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A880] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative"
      id={`product-card-${product.slug}`}
    >
      {/* Top luxury gold hairline accent that glows on hover */}
      <div className="h-1.5 w-full bg-gradient-to-r from-slate-900 via-[#C5A880] to-slate-900 opacity-80 group-hover:opacity-100 group-hover:h-2 group-hover:from-[#C5A880] group-hover:via-[#F1DCA8] group-hover:to-[#C5A880] transition-all duration-300" />

      {/* 4:3 Product Frame Container */}
      <div className="relative product-frame bg-slate-50 group-hover:bg-slate-100 overflow-hidden border-b border-slate-200 transition-colors duration-300">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-slate-950/95 backdrop-blur-xs text-[#C5A880] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-[#C5A880] shadow-md group-hover:scale-105 transition-all">
            {product.badge}
          </div>
        )}

        {/* Compare Toggle Pill */}
        <button
          type="button"
          onClick={() => onToggleCompare && onToggleCompare(product)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full border text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer ${
            isCompared 
              ? 'bg-slate-950 text-[#C5A880] border-[#C5A880]' 
              : 'bg-white/95 text-slate-800 hover:bg-white hover:border-[#C5A880] border-slate-300'
          }`}
          aria-label={`${isCompared ? 'Remove from' : 'Add to'} comparison matrix`}
        >
          {isCompared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
          <span className="text-[10px] hidden sm:inline">{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>

        {/* Product Image Link */}
        <Link href={`/shop/${product.category}/${product.slug}/`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.images[0]} 
            alt={`${product.name} - Turnkey Australian Golf Buggy & Cart for Sale`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category Tag & Seat Number Pill */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#C5A880] bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#C5A880]/30 transition-colors">
              {product.category.replace(/-/g, ' ')}
            </span>
            <span className="text-[10px] font-extrabold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 flex items-center gap-1">
              <Users className="w-3 h-3 text-[#C5A880]" />
              <span>{seatingText.split('(')[0].trim()}</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/shop/${product.category}/${product.slug}/`}>
            <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-[#C5A880] transition-colors leading-tight font-serif pt-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Key Specs Tinted Grid Box */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 grid grid-cols-2 gap-2 text-xs text-slate-700 transition-all duration-300">
          <div className="flex items-center gap-1.5 min-w-0">
            <Users className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate text-[11px] font-bold text-slate-900">{seatingText}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <BatteryCharging className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate text-[11px] font-semibold">{product.specs?.battery || product.specs?.batteryUpgrade || product.specs?.material || 'LiFePO4 Power'}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Gauge className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate text-[11px] font-semibold">{product.specs?.range || '36+ Holes Range'}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Shield className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate text-[11px] font-semibold">{product.specs?.warranty || '5-Yr Battery Warranty'}</span>
          </div>
        </div>

        {/* Price & Action Area with Elevated Surface Tint */}
        <div className="space-y-3 pt-2">
          <div className="flex items-baseline justify-between bg-[#F8F9FA] p-3 rounded-xl border border-slate-200 transition-all duration-300">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider font-bold">Driveaway Price</span>
              <span className="text-xl sm:text-2xl font-black text-slate-950 font-serif">
                ${product.price.toLocaleString('en-AU')} <span className="text-xs font-bold text-slate-500">AUD</span>
              </span>
            </div>

            {/* Crypto 10% Off Tag */}
            <div className="text-right">
              <span className="text-[10px] font-black text-[#C5A880] bg-slate-950 px-2.5 py-1 rounded-full border border-[#C5A880] block shadow-xs">
                ${cryptoPrice.toLocaleString('en-AU')} BTC/USDT
              </span>
            </div>
          </div>

          {/* Stepper & Action Buttons */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={handleDecrease}
                  className="px-2.5 py-2 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-black text-slate-900 min-w-[24px] text-center">{qty}</span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  className="px-2.5 py-2 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Order Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-[#C5A880] hover:text-slate-950 text-[#C5A880] text-xs font-black uppercase tracking-wider text-center transition-all shadow-sm border border-[#C5A880]/50 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
                id={`add-to-cart-${product.slug}`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add {qty > 1 ? `(${qty}) ` : ''}to Order</span>
              </button>
            </div>

            {/* View Specs Link */}
            <Link
              href={`/shop/${product.category}/${product.slug}/`}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 text-xs font-semibold text-center border border-slate-200 transition-all flex items-center justify-center gap-1"
            >
              <span>View Full Engineering Specifications</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
