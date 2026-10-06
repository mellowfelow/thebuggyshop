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
import { SHOP, BUNDLE } from '@/src/config/site';
import Image from 'next/image';
import { productImageAlt } from '@/lib/seo';

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
  // Only vehicles have seating / battery / range. Parts, accessories, clubs and batteries show brand + a short description instead.
  const isVehicle = ['electric-golf-buggies', 'push-pull-golf-buggies', 'luxury-golf-carts', 'off-road-buggies', 'kids-buggies', 'used-golf-buggies'].includes(product.category);
  const seatingRaw = isVehicle ? product.seats || product.specs?.seating || product.specs?.seat || '' : '';
  const tagText = seatingRaw ? seatingRaw.split('(')[0].trim() : product.brandName || product.brand || '';
  const microSpecs = [
    product.specs?.battery && { Icon: BatteryCharging, text: product.specs.battery },
    product.specs?.range && { Icon: Gauge, text: product.specs.range },
  ].filter(Boolean);

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

      {/* Uniform Fixed-Height Image Frame for Clean Grid Alignment */}
      <div className="relative h-56 sm:h-64 w-full bg-white overflow-hidden border-b border-slate-100 flex items-center justify-center p-2 sm:p-3">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-slate-950/90 text-[#C5A880] text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-[#C5A880]/50 shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Compare Button */}
        <button
          type="button"
          onClick={() => onToggleCompare && onToggleCompare(product)}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full border text-[10px] transition-all shadow-xs cursor-pointer ${
            isCompared 
              ? 'bg-slate-950 text-[#C5A880] border-[#C5A880]' 
              : 'bg-white/90 text-slate-600 hover:bg-white hover:border-[#C5A880] border-slate-200'
          }`}
          aria-label={`${isCompared ? 'Remove from' : 'Add to'} comparison`}
        >
          {isCompared ? <Check className="w-3 h-3" /> : <Scale className="w-3 h-3" />}
        </button>

        {/* Image Link */}
        <Link href={`/shop/${product.category}/${product.slug}/`} className="w-full h-full flex items-center justify-center relative">
          <Image
            src={product.images[0]}
            alt={productImageAlt(product, 0)}
            width={800}
            height={600}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
          />
        </Link>
      </div>

      {/* Spacious Content Body */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Category & Seating Tag */}
          <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px]">
            <span className="uppercase tracking-wider font-bold text-[#C5A880] truncate">
              {product.category.replace(/-/g, ' ')}
            </span>
            {tagText && (
              <span className="font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1 min-w-0 max-w-[55%]">
                {seatingRaw && <Users className="w-3 h-3 text-[#C5A880] shrink-0" />}
                <span className="truncate">{tagText}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/shop/${product.category}/${product.slug}/`}>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2 font-serif min-h-[2.5rem]">
              {product.name}
            </h3>
          </Link>

          {/* Inline specs (only when the product has them) or its short description */}
          {microSpecs.length > 0 ? (
            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 pt-0.5">
              {microSpecs.map(({ Icon, text }, i) => (
                <React.Fragment key={text}>
                  {i > 0 && <span className="text-slate-300">&bull;</span>}
                  <span className="inline-flex items-center gap-1 truncate font-medium">
                    <Icon className="w-3 h-3 text-[#C5A880] shrink-0" />
                    <span className="truncate">{text}</span>
                  </span>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <p className="text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-2 pt-0.5">{product.shortDescription}</p>
          )}
        </div>

        {/* Pricing & Crypto Banner */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          {/* Price Header */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-slate-950 font-serif">
                ${product.price.toLocaleString('en-AU')}
              </span>
              <span className="text-[10px] font-bold text-slate-500">AUD</span>
            </div>
            <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              Inc. GST
            </span>
          </div>

          {/* Eye-Catching Green Crypto Pill */}
          <div className="bg-emerald-50/90 border border-emerald-500/60 px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-1 text-[10px] sm:text-xs shadow-2xs">
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 shadow-xs">
                ₿
              </span>
              <span className="font-semibold text-emerald-950 truncate">
                Pay <strong className="text-emerald-800 font-mono font-black">${cryptoPrice.toLocaleString('en-AU')}</strong> with Crypto
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight bg-emerald-600 text-white px-1.5 py-0.5 rounded shrink-0 shadow-2xs">
              Save ${savings}
            </span>
          </div>

          {BUNDLE.addonCategories.includes(product.category) && (
            <div className="text-[10px] sm:text-[11px] font-bold text-[#8A7045] bg-[#FAF8F5] border border-[#E8DDC4] rounded-lg px-2.5 py-1 text-center">
              {BUNDLE.percent}% off when you buy a buggy or cart
            </div>
          )}

          {/* Action Row: Stepper + Add Button */}
          <div className="flex items-center gap-2 pt-1">
            {/* Stepper */}
            <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 overflow-hidden shrink-0">
              <button
                type="button"
                onClick={handleDecrease}
                className="px-2 py-1.5 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-1.5 text-xs font-black text-slate-900 min-w-[16px] text-center">{qty}</span>
              <button
                type="button"
                onClick={handleIncrease}
                className="px-2 py-1.5 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add to Order Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-1.5 px-3 rounded-md bg-slate-950 hover:bg-[#C5A880] hover:text-slate-950 text-[#C5A880] text-xs font-bold uppercase tracking-wider text-center transition-all border border-[#C5A880]/30 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
              id={`add-to-cart-${product.slug}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
