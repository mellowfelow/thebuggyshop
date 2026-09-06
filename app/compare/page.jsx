import React from 'react';
import Link from 'next/link';
import { SITE, PRODUCTS } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import CompareClient from './CompareClient';

export const metadata = {
  title: 'Compare Golf Buggy Specifications | The Buggy Shop Australia',
  description: 'Side-by-side engineering comparison matrix for Australian golf buggies for sale. Compare lithium battery capacity, range, towing, payload, and road-legal compliance.',
  alternates: {
    canonical: `https://${SITE.domain}/compare/`,
  },
  openGraph: {
    title: 'Compare Golf Buggy Specifications | The Buggy Shop',
    description: 'Side-by-side engineering comparison matrix for Australian golf buggies for sale.',
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
      <div className="space-y-3">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">Compare Engineering Specs</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DDE4DF] pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
              Golf Buggy Specifications Comparison Matrix
            </h1>
            <p className="text-sm text-[#4A5D53]">
              Evaluate motor power, continuous controller amps, real-world lithium range, and hydraulic payload capacities side-by-side.
            </p>
          </div>

          <Link
            href="/shop/"
            className="py-2.5 px-4 rounded-xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider hover:bg-[#163E2D] transition-colors self-start sm:self-auto border border-[#C5A265]/30"
          >
            ← Browse Full Inventory
          </Link>
        </div>
      </div>

      <CompareClient allProducts={PRODUCTS} />
    </div>
  );
}
