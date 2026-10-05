import React from 'react';
import Link from 'next/link';
import { SITE, PRODUCTS } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import CompareClient from './CompareClient';
import { Scale, BatteryCharging, Zap, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Compare Golf Buggy, Battery & Charger Specifications | The Buggy Shop Australia') },
  description: seoDesc('Side-by-side engineering comparison matrix for Australian golf buggies, LiFePO4 lithium batteries, and high-frequency smart chargers. Compare voltage, capacity, charging times, motor power, and warranties.'),
  alternates: {
    canonical: `https://${SITE.domain}/compare/`,
  },
  openGraph: {
    title: 'Compare Golf Buggy, Battery & Charger Specifications | The Buggy Shop',
    description: 'Side-by-side engineering comparison matrix for Australian golf buggies, lithium battery packs, and smart chargers.',
    url: `https://${SITE.domain}/compare/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function ComparePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://${SITE.domain}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Compare Specs",
        "item": `https://${SITE.domain}/compare/`
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Header */}
      <div className="space-y-4">
        <nav className="text-xs text-slate-500 flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Compare Engineering Specifications</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-[#C5A880] text-xs font-black uppercase tracking-wider border border-[#C5A880]/30 shadow-xs">
              <Scale className="w-3.5 h-3.5" />
              <span>Interactive Engineering Matrix · Buggies, Batteries &amp; Chargers</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
              Golf Buggy, Battery &amp; Charger Comparison Matrix
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Evaluate motor power, LiFePO4 battery chemistry, Amp-Hours (Ah), charging speeds (0–100%), continuous controller amps, and payload capacities side-by-side.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop/"
              className="py-3 px-5 rounded-xl bg-slate-900 text-[#C5A880] font-black text-xs uppercase tracking-wider hover:bg-slate-800 transition-all border border-slate-700 shadow-sm flex items-center gap-2"
            >
              <span>Browse Full Inventory &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Quick Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#C5A880] flex items-center justify-center shrink-0 border border-slate-700">
              <BatteryCharging className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <strong className="text-xs font-black text-slate-900 block uppercase">Lithium &amp; Lead-Acid Analysis</strong>
              <span className="text-[11px] text-slate-500">Voltage, Ah capacity, weight &amp; cycle life</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#C5A880] flex items-center justify-center shrink-0 border border-slate-700">
              <Zap className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <strong className="text-xs font-black text-slate-900 block uppercase">Charging Speeds &amp; Amps</strong>
              <span className="text-[11px] text-slate-500">240V mains, onboard &amp; fast desktop chargers</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-[#C5A880] flex items-center justify-center shrink-0 border border-slate-700">
              <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <strong className="text-xs font-black text-slate-900 block uppercase">Up to 7-Yr Warranty</strong>
              <span className="text-[11px] text-slate-500">Commercial &amp; private golf cart protection</span>
            </div>
          </div>
        </div>
      </div>

      <CompareClient allProducts={PRODUCTS} />
    </div>
  );
}
