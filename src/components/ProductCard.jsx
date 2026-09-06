// src/components/ProductCard.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Zap, BatteryCharging, Gauge, ArrowRight, Scale, Check, ShoppingBag, Users } from 'lucide-react';
import { SITE, SHOP } from '@/src/config/site';

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onToggleCompare, 
  isCompared = false 
}) {
  const cryptoPrice = Math.round(product.price * (1 - SHOP.cryptoDiscount / 100));
  const seatingText = product.seats || product.specs?.seating || product.specs?.seat || '2-Passenger Seating';

  return (
    <div 
      className="bg-gradient-to-b from-[#FCFDFB] to-[#F4F7F5] rounded-2xl border-2 border-[#D5DFD9] overflow-hidden shadow-[0_4px_20px_-4px_rgba(14,42,30,0.06)] hover:shadow-[0_20px_45px_-8px_rgba(197,162,101,0.35),0_10px_20px_-6px_rgba(14,42,30,0.25)] hover:border-[#C5A265] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 flex flex-col group relative"
      id={`product-card-${product.slug}`}
    >
      {/* Top luxury gold hairline accent that expands & glows on hover */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0E2A1E] via-[#C5A265] to-[#0E2A1E] opacity-75 group-hover:opacity-100 group-hover:h-2 group-hover:from-[#C5A265] group-hover:via-[#F1DCA8] group-hover:to-[#C5A265] transition-all duration-300" />

      {/* 4:3 Product Frame Container */}
      <div className="relative product-frame bg-[#EBF0EC] group-hover:bg-[#F2F7F3] overflow-hidden border-b border-[#DDE4DF] group-hover:border-[#E5D2A8] transition-colors duration-300">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#0E2A1E]/95 backdrop-blur-xs text-[#C5A265] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-[#C5A265] shadow-md group-hover:scale-105 group-hover:bg-[#071912] transition-all">
            {product.badge}
          </div>
        )}

        {/* Compare Toggle Pill */}
        <button
          type="button"
          onClick={() => onToggleCompare && onToggleCompare(product)}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full border text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer ${
            isCompared 
              ? 'bg-[#0E2A1E] text-[#C5A265] border-[#C5A265]' 
              : 'bg-[#FCFDFB]/95 text-[#163E2D] hover:bg-white hover:border-[#C5A265] border-[#CAD5CE]'
          }`}
          aria-label={`${isCompared ? 'Remove from' : 'Add to'} comparison matrix`}
        >
          {isCompared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
          <span className="text-[10px] hidden sm:inline">{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>

        {/* Product Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={product.images[0]} 
          alt={`${product.name} - Turnkey Australian Golf Buggy & Cart for Sale`}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Category Tag & Seat Number Pill */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider font-black text-[#8A7045] group-hover:text-[#B38C45] bg-[#EBF1ED] group-hover:bg-[#FFF6E3] px-2.5 py-0.5 rounded-full border border-[#D5DFD9] group-hover:border-[#E5CCA0] transition-colors">
              {product.category.replace(/-/g, ' ')}
            </span>
            <span className="text-[10px] font-extrabold text-[#0E2A1E] bg-[#E2ECE6] group-hover:bg-[#FFF3D6] group-hover:text-[#8A7045] px-2.5 py-0.5 rounded-full border border-[#CAD5CE] group-hover:border-[#E5CCA0] flex items-center gap-1 transition-colors">
              <Users className="w-3 h-3 text-[#8A7045]" />
              <span>{seatingText.split('(')[0].trim()}</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/shop/${product.category}/${product.slug}/`}>
            <h3 className="font-extrabold text-lg sm:text-xl text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors leading-tight font-serif pt-1">
              {product.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-[#4A5D53] group-hover:text-[#2A3E34] line-clamp-2 leading-relaxed transition-colors">
            {product.shortDescription}
          </p>
        </div>

        {/* Key Specs Tinted Grid Box - Including Seat Capacity */}
        <div className="bg-[#EBF1ED]/90 group-hover:bg-[#FFFDF5] rounded-xl p-3 border border-[#D6E0DA] group-hover:border-[#E8D6B2] grid grid-cols-2 gap-2 text-xs text-[#2A4D3B] transition-all duration-300 shadow-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <Users className="w-3.5 h-3.5 text-[#8A7045] group-hover:text-[#C5A265] shrink-0 transition-colors" />
            <span className="truncate text-[11px] font-bold text-[#0E2A1E]">{seatingText}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <BatteryCharging className="w-3.5 h-3.5 text-[#8A7045] group-hover:text-[#C5A265] shrink-0 transition-colors" />
            <span className="truncate text-[11px] font-semibold">{product.specs?.battery || product.specs?.batteryUpgrade || product.specs?.material || 'LiFePO4 Power'}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Gauge className="w-3.5 h-3.5 text-[#8A7045] group-hover:text-[#C5A265] shrink-0 transition-colors" />
            <span className="truncate text-[11px] font-semibold">{product.specs?.range || '36+ Holes Range'}</span>
          </div>
          <div className="flex items-center gap-1.5 min-w-0">
            <Shield className="w-3.5 h-3.5 text-[#8A7045] group-hover:text-[#C5A265] shrink-0 transition-colors" />
            <span className="truncate text-[11px] font-semibold">{product.specs?.warranty || '5-Yr Battery Warranty'}</span>
          </div>
        </div>

        {/* Price & Action Area with Elevated Surface Tint */}
        <div className="space-y-3 pt-2">
          <div className="flex items-baseline justify-between bg-[#FAFBF9] group-hover:bg-[#FFFDF7] p-3 rounded-xl border border-[#DCE4DF] group-hover:border-[#E5D2A8] transition-all duration-300 shadow-xs">
            <div>
              <span className="text-[10px] text-[#60756B] block uppercase tracking-wider font-bold">Driveaway Price</span>
              <span className="text-xl sm:text-2xl font-black text-[#0E2A1E] font-serif group-hover:text-[#0A2218] transition-colors">
                ${product.price.toLocaleString('en-AU')} <span className="text-xs font-bold text-[#60756B]">AUD</span>
              </span>
            </div>

            {/* Crypto 10% Off Tag */}
            <div className="text-right">
              <span className="text-[10px] font-black text-[#C5A265] bg-[#0E2A1E] group-hover:bg-[#071912] px-2.5 py-1 rounded-full border border-[#C5A265] block shadow-xs transition-colors">
                ${cryptoPrice.toLocaleString('en-AU')} BTC/USDT
              </span>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/shop/${product.category}/${product.slug}/`}
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-[#0E2A1E] hover:text-[#C5A265] hover:border-[#C5A265] text-[#0E2A1E] text-xs font-bold text-center border-2 border-[#CAD5CE] transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Full Specs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8A7045] group-hover:text-[#C5A265]" />
            </Link>

            <button
              type="button"
              onClick={() => onAddToCart && onAddToCart(product, 1)}
              className="py-2.5 px-3 rounded-xl bg-[#0E2A1E] hover:bg-[#C5A265] hover:text-[#0E2A1E] hover:border-[#C5A265] text-[#C5A265] text-xs font-black uppercase tracking-wider text-center transition-all shadow-md border-2 border-[#C5A265]/70 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.98]"
              id={`add-to-cart-${product.slug}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
