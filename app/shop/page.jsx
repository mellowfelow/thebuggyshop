import React from 'react';
import Link from 'next/link';
import { SITE, PRODUCTS, CATEGORIES } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Golf Buggy for Sale | Luxury, Remote, Push & Off Road Buggies Australia',
  description: 'Browse our full catalog of premium golf buggies for sale in Australia. Including 72V lithium electric estate carts, remote control golf buggies, off road buggies, and quality used golf buggies.',
  alternates: {
    canonical: `https://${SITE.domain}/shop/`,
  },
  openGraph: {
    title: 'Golf Buggy for Sale | The Buggy Shop Australia',
    description: 'Explore turnkey luxury golf buggies for sale, remote trolleys, and all-terrain buggies with 5-year LiFePO4 battery warranties.',
    url: `https://${SITE.domain}/shop/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function ShopPage() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Header */}
      <div className="space-y-3">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">Golf Buggies for Sale</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DDE4DF] pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
              Golf Buggy for Sale Australia
            </h1>
            <p className="text-sm text-[#4A5D53]">
              Showing all {PRODUCTS.length} Australian-specified luxury golf carts, remote control buggies, push buggies with seats, and off road buggies for sale.
            </p>
          </div>

          <Link
            href="/compare/"
            className="py-2.5 px-4 rounded-xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider hover:bg-[#163E2D] transition-colors self-start sm:self-auto border border-[#C5A265]/30 shadow-xs"
          >
            Open Specs Comparison Matrix →
          </Link>
        </div>
      </div>

      {/* Interactive Catalog Component */}
      <ShopClient initialProducts={PRODUCTS} categories={CATEGORIES} />
    </div>
  );
}
