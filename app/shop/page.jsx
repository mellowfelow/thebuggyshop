// app/shop/page.jsx
import React from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { CATEGORY_TREE, getRootCategories } from '@/src/config/categories';
import { PRODUCTS } from '@/src/config/products';
import JsonLd from '@/src/components/JsonLd';
import ShopClient from './ShopClient';
import { ShieldCheck, Truck, Sparkles, Scale, Calculator } from 'lucide-react';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Golf Buggy for Sale Australia | Electric, Remote, Push & Golf Carts') },
  description: seoDesc('Browse Australia\'s comprehensive range of golf buggies for sale. Electric, remote-control, manual push buggies, 2-seat to 6-seat resort carts, and 4x4 off-road UTVs.'),
  alternates: {
    canonical: `https://${SITE.domain}/shop/`,
  },
  openGraph: {
    title: 'Golf Buggy for Sale Australia | The Buggy Shop',
    description: 'Explore turnkey luxury golf buggies for sale, remote trolleys, and all-terrain buggies with 5-year LiFePO4 battery warranties.',
    url: `https://${SITE.domain}/shop/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function ShopPage() {
  const rootCategories = getRootCategories();

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
        "name": "Golf Buggies for Sale",
        "item": `https://${SITE.domain}/shop/`
      }
    ]
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Header & Quick Category Shortcuts */}
      <div className="space-y-6">
        <nav className="text-xs text-slate-500 flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Golf Buggies for Sale</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-[#C5A880] text-xs font-black uppercase tracking-wider border border-[#C5A880]/30 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Australian Fleet · Pricing Inc. GST</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-serif">
              Golf Buggy for Sale Australia
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore our complete Australian fleet of remote-control motorized buggies, lightweight 3-wheel push buggies, 2-seat to 6-seat luxury estate carts, and heavy-duty 4x4 off-road UTVs. Flat-rate hydraulic tail-lift delivery across Australia.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/compare/"
              className="py-3 px-5 rounded-xl bg-slate-900 text-[#C5A880] font-black text-xs uppercase tracking-wider hover:bg-slate-800 transition-all border border-slate-700 shadow-sm flex items-center gap-2"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Specs Matrix &rarr;</span>
            </Link>
            <Link
              href="/finance/"
              className="py-3 px-5 rounded-xl bg-white text-slate-900 font-black text-xs uppercase tracking-wider hover:bg-slate-50 transition-all border border-slate-300 shadow-xs flex items-center gap-2"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Finance Calculator</span>
            </Link>
          </div>
        </div>

        {/* Root Category Quick Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {rootCategories.map(cat => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}/`}
              className="p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#C5A880] text-center group transition-all shadow-xs"
            >
              <div className="text-xs font-black text-slate-900 group-hover:text-[#8A7045] transition-colors">
                {cat.navLabel}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                {cat.targetKeywords?.[0] || 'Explore Range'}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Interactive Catalog Component with Facet Filtering */}
      <ShopClient initialProducts={PRODUCTS} categories={CATEGORY_TREE} />
    </div>
  );
}
