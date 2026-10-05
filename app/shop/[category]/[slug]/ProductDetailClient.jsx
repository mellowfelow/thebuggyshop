'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Truck, 
  BatteryCharging, 
  Zap, 
  Gauge, 
  Scale, 
  MessageCircle, 
  ShoppingBag, 
  FileCheck2, 
  Check, 
  Share2, 
  Calculator,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '@/src/components/ClientStoreProvider';
import { SITE, CONTACT, SHOP } from '@/src/config/site';
import ProductCard from '@/src/components/ProductCard';
import Image from 'next/image';
import { productImageAlt } from '@/lib/seo';

export default function ProductDetailClient({ product, relatedProducts }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);
  const { addToCart, toggleCompare, comparedProducts } = useStore();

  const isCompared = comparedProducts.some((p) => p.slug === product.slug);
  const payIn4Amount = Math.round(product.price / 4);
  const cryptoPrice = Math.round(product.price * (1 - SHOP.cryptoDiscount / 100));

  const waQuoteUrl = `https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
    `G'day! I would like to check stock, freight timing, and conditional registration paperwork for *${product.name}* ($${product.price.toLocaleString('en-AU')} AUD).`
  )}`;

  const motorDisplay = product.specs?.motor ? product.specs.motor.split('(')[0] : (product.specs?.makeModel || product.specs?.frame || 'High Output AC Electric');
  const batteryDisplay = product.specs?.battery ? product.specs.battery.split('(')[0] : (product.specs?.batteryUpgrade || product.specs?.material || 'LiFePO4 Lithium');
  const rangeDisplay = product.specs?.range || 'Full 36+ Holes Range';
  const speedDisplay = product.specs?.topSpeed || 'Regulated Course Speed';
  const payloadDisplay = product.specs?.payloadCapacity || product.specs?.weight || '350kg+';
  const clearanceDisplay = product.specs?.groundClearance || 'Course Turf Spec';

  return (
    <div className="space-y-16">
      {/* Top Layout Grid: Gallery & Purchase Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Image Frame */}
          <div className="product-frame bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] relative group aspect-[4/3]">
            {product.badge && (
              <div className="absolute top-4 left-4 z-10 bg-slate-950/90 backdrop-blur-xs text-[#C5A880] text-xs font-black uppercase px-3.5 py-1.5 rounded-full border border-[#C5A880]/50 shadow-md">
                {product.badge}
              </div>
            )}
            <Image
              src={product.images[activeImageIndex]}
              alt={productImageAlt(product, activeImageIndex)}
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={activeImageIndex === 0}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={`product-thumb-${product.slug}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 h-18 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#C5A880] ring-2 ring-[#C5A880]/40 shadow-sm'
                      : 'border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-300'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail`} width={120} height={90} sizes="96px" className="w-full h-full object-contain p-1" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantee Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-4 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border border-[#D5DFD9] space-y-1 text-center shadow-[0_2px_10px_-2px_rgba(14,42,30,0.05)] hover:border-[#C5A265] transition-colors">
              <ShieldCheck className="w-5 h-5 text-[#8A7045] mx-auto" />
              <div className="font-black text-xs text-[#0E2A1E]">5-Yr LiFePO4 Warranty</div>
              <div className="text-[10px] text-[#4A5D53]">Transferable battery pack</div>
            </div>
            <div className="p-4 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border border-[#D5DFD9] space-y-1 text-center shadow-[0_2px_10px_-2px_rgba(14,42,30,0.05)] hover:border-[#C5A265] transition-colors">
              <Truck className="w-5 h-5 text-[#8A7045] mx-auto" />
              <div className="font-black text-xs text-[#0E2A1E]">Tail-Lift Freight</div>
              <div className="text-[10px] text-[#4A5D53]">Direct to your property across AU</div>
            </div>
            <div className="p-4 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border border-[#D5DFD9] space-y-1 text-center shadow-[0_2px_10px_-2px_rgba(14,42,30,0.05)] hover:border-[#C5A265] transition-colors">
              <FileCheck2 className="w-5 h-5 text-[#8A7045] mx-auto" />
              <div className="font-black text-xs text-[#0E2A1E]">State Road Legal Kit</div>
              <div className="text-[10px] text-[#4A5D53]">QLD / NSW / VIC pre-filled</div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Details, Pricing & Checkout */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#8A7045] bg-[#EBF1ED] px-3 py-1 rounded-full border border-[#D5DFD9]">
                {product.category.replace(/-/g, ' ')}
              </span>
              <button
                type="button"
                onClick={() => toggleCompare(product)}
                className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isCompared
                    ? 'bg-[#0E2A1E] text-[#C5A265] border-[#0E2A1E] shadow-xs'
                    : 'bg-[#FCFDFB] text-[#2A4D3B] hover:bg-[#EBF1ED] border-[#CAD5CE]'
                }`}
              >
                {isCompared ? <Check className="w-3.5 h-3.5" /> : <Scale className="w-3.5 h-3.5" />}
                <span>{isCompared ? 'In Compare Matrix' : 'Compare Specs'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0E2A1E] tracking-tight leading-tight font-serif pt-1">
              {product.name}
            </h1>

            <p className="text-sm text-[#4A5D53] leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing Box - BEAUTIFIED WITH LUXURY TINT & ACCENT */}
          <div className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] shadow-[0_6px_24px_-4px_rgba(14,42,30,0.08)] space-y-5 relative overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-[#0E2A1E] via-[#C5A265] to-[#0E2A1E] absolute top-0 left-0" />

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-xs text-[#4A5D53] font-semibold uppercase tracking-wider block">Drive-Away Price (inc. GST):</span>
                <span className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
                  ${product.price.toLocaleString('en-AU')} <span className="text-sm font-bold text-[#60756B]">AUD</span>
                </span>
              </div>
              <span className="text-xs font-black text-[#0E2A1E] bg-[#EBF1ED] px-3 py-1 rounded-full border border-[#CAD5CE]">
                In Stock Australia
              </span>
            </div>

            {/* Crypto & Finance Split Details */}
            <div className="space-y-2 pt-2 border-t border-[#DDE4DF] text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-950 text-white border border-emerald-500 shadow-md">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-xs">₿</span>
                  <div>
                    <span className="font-bold text-emerald-100 block text-xs">Pay with Crypto (BTC / USDT):</span>
                    <span className="text-[11px] font-bold text-emerald-300">Save ${(product.price - cryptoPrice).toLocaleString('en-AU')} (10% Instant Rebate)</span>
                  </div>
                </div>
                <span className="font-black text-base text-emerald-400 font-mono">
                  ${cryptoPrice.toLocaleString('en-AU')} AUD
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white text-[#4A5D53] border border-[#CAD5CE]">
                <span className="flex items-center gap-1.5 font-medium text-xs">
                  <Calculator className="w-3.5 h-3.5 text-[#8A7045]" /> Or 4 commercial instalments of:
                </span>
                <span className="font-black text-[#0E2A1E] text-xs">
                  ${payIn4Amount.toLocaleString('en-AU')} AUD
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => addToCart(product, selectedQty)}
                className="w-full py-4 px-6 rounded-xl bg-[#C5A265] hover:bg-[#D4B27C] text-[#0E2A1E] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order Draft & Quote</span>
              </button>

              <a
                href={waQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-[#0E2A1E] hover:bg-[#163E2D] text-[#C5A265] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors text-center border border-[#C5A265]/40 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry (+61 480 811 308)</span>
              </a>
            </div>
          </div>

          {/* Quick Specifications Highlights */}
          <div className="p-5 bg-gradient-to-b from-[#FAFBF9] to-[#EBF1ED] rounded-2xl border border-[#D5DFD9] space-y-2.5 text-xs text-[#0E2A1E] shadow-xs">
            <div className="font-black uppercase tracking-wider text-[#8A7045] text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8A7045]" />
              <span>Key Australian Highlights:</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 text-[11px]">
              <div>• <strong>Drive:</strong> {motorDisplay}</div>
              <div>• <strong>Battery / Power:</strong> {batteryDisplay}</div>
              <div>• <strong>Max Range:</strong> {rangeDisplay}</div>
              <div>• <strong>Top Speed:</strong> {speedDisplay}</div>
              <div>• <strong>Capacity:</strong> {payloadDisplay}</div>
              <div>• <strong>Clearance:</strong> {clearanceDisplay}</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: FULL ENGINEERING SPECIFICATIONS & COMPLIANCE TABLE */}
      <div className="bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-3xl p-6 sm:p-10 border border-[#D5DFD9] shadow-lg space-y-8">
        <div className="border-b border-[#D5DFD9] pb-5">
          <span className="text-xs font-black uppercase tracking-wider text-[#8A7045] bg-[#EBF1ED] px-3 py-1 rounded-full border border-[#D5DFD9] inline-block">
            Full Engineering Transparency
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A1E] tracking-tight font-serif mt-2">
            Detailed Machine Specifications
          </h2>
          <p className="text-xs text-[#4A5D53] mt-1">
            We publish continuous controller ratings, certified cycle life, and chassis specs competitors omit.
          </p>
        </div>

        {/* Narrative Description */}
        <div className="prose max-w-none text-xs sm:text-sm text-[#2A4D3B] leading-relaxed space-y-3 bg-white p-5 rounded-2xl border border-[#D5DFD9]">
          <p>{product.description}</p>
        </div>

        {/* Technical Specs Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#D5DFD9] shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0E2A1E] text-white">
                <th className="py-3.5 px-5 font-bold uppercase tracking-wider w-1/3 text-[#C5A265]">Component</th>
                <th className="py-3.5 px-5 font-bold uppercase tracking-wider text-[#D3DFD8]">Manufacturer Rating & Spec</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D5DFD9]">
              {Object.entries(product.specs || {}).map(([key, value], idx) => {
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase());
                return (
                  <tr key={key} className={idx % 2 === 0 ? 'bg-[#FCFDFB]' : 'bg-[#EBF1ED]/70'}>
                    <td className="py-3.5 px-5 font-black text-[#0E2A1E]">{label}</td>
                    <td className="py-3.5 px-5 text-[#3A5244] font-medium leading-relaxed">{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: RELATED BUGGY MODELS */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-[#D5DFD9] pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#8A7045]">
                Compare Alternatives
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0E2A1E] tracking-tight font-serif">
                Similar Golf Buggies & Carts for Sale
              </h3>
            </div>
            <Link href={`/shop/${product.category}/`} className="text-xs font-black text-[#0E2A1E] hover:text-[#8A7045] uppercase tracking-wider bg-white px-3.5 py-1.5 rounded-xl border border-[#D5DFD9]">
              View Category →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => {
              const isRelCompared = comparedProducts.some((p) => p.slug === rel.slug);
              return (
                <ProductCard
                  key={rel.slug}
                  product={rel}
                  onAddToCart={addToCart}
                  onToggleCompare={toggleCompare}
                  isCompared={isRelCompared}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
