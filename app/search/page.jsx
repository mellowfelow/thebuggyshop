import React, { Suspense } from 'react';
import Link from 'next/link';
import { SITE, PRODUCTS, POSTS, CATEGORIES } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import SearchClient from './SearchClient';

export const metadata = {
  title: 'Search Golf Buggies For Sale | The Buggy Shop Australia',
  description: 'Search our range of premium golf buggies for sale, remote control buggies, push buggies, and golf accessories across Australia.',
  alternates: {
    canonical: `https://${SITE.domain}/search/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function SearchPage() {
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
        "name": "Search",
        "item": `https://${SITE.domain}/search/`
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
          <span className="text-[#0E2A1E] font-bold">Search</span>
        </nav>

        <div className="border-b border-[#DDE4DF] pb-6 space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Search Golf Buggies For Sale & Technical Guides
          </h1>
          <p className="text-sm text-[#4A5D53]">
            Find models by keyword, motor capacity, seating, or battery type across our entire Australian golf buggy inventory.
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-xs text-[#4A5D53]">Loading search interface...</div>}>
        <SearchClient products={PRODUCTS} posts={POSTS} categories={CATEGORIES} />
      </Suspense>
    </div>
  );
}
