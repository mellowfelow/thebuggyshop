// app/brands/page.jsx
import React from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { BRANDS } from '@/src/config/brands';
import JsonLd from '@/src/components/JsonLd';
import { ShieldCheck, Award, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Golf Buggy Brands Australia | MGI, Motocaddy, Club Car, ECAR & Clicgear',
  description: 'Explore Australia\'s top golf buggy and cart brands. Authorized sales, factory warranty backup, lithium upgrades, and genuine parts for MGI, Motocaddy, Club Car, ECAR and more.',
  alternates: {
    canonical: `https://${SITE.domain}/brands/`,
  },
  openGraph: {
    title: 'Golf Buggy Brands Australia | The Buggy Shop',
    description: 'Explore Australia\'s top golf buggy and cart brands with factory warranty backup and nationwide delivery.',
    url: `https://${SITE.domain}/brands/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function BrandsIndexPage() {
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
        "name": "Golf Buggy Brands",
        "item": `https://${SITE.domain}/brands/`
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      <JsonLd schema={breadcrumbSchema} />

      {/* Header */}
      <div className="space-y-4 border-b border-[#DDE4DF] pb-8">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">Brands</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123123] text-[#C5A265] text-xs font-black uppercase tracking-wider border border-[#C5A265]/30">
            <Award className="w-3.5 h-3.5" />
            <span>Authorized Australian Dealers & Specialists</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Golf Buggy & Cart Brands Australia
          </h1>
          <p className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">
            We partner with Australia&apos;s and the world&apos;s leading motorized golf buggy, push cart, and luxury estate vehicle manufacturers. Every brand we sell includes full Australian warranty coverage, genuine spare parts, and pre-delivery inspection.
          </p>
        </div>
      </div>

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BRANDS.map((brand) => (
          <div
            key={brand.slug}
            className="p-6 rounded-3xl bg-white border border-[#D5DFD9] hover:border-[#C5A265] hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#C5A265] uppercase tracking-wider bg-[#0E2A1E] px-3 py-1 rounded-xl">
                  {brand.country}
                </span>
                <span className="text-[11px] font-bold text-[#6B7E74]">
                  {brand.origin}
                </span>
              </div>

              <div>
                <h2 className="text-xl font-black text-[#0E2A1E] font-serif group-hover:text-[#8A7045] transition-colors">
                  {brand.name}
                </h2>
                <p className="text-xs text-[#4A5D53] mt-2 line-clamp-3 leading-relaxed">
                  {brand.introCopy}
                </p>
              </div>

              {brand.popularModels && brand.popularModels.length > 0 && (
                <div className="pt-2">
                  <div className="text-[10px] font-black text-[#0E2A1E] uppercase tracking-wider mb-1.5">
                    Popular Models:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.popularModels.slice(0, 3).map((m) => (
                      <span key={m} className="text-[10px] bg-[#F1F6F3] text-[#2A4D3B] px-2.5 py-0.5 rounded-lg border border-[#CAD5CE] font-semibold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 mt-4 border-t border-[#E8ECE9]">
              <Link
                href={`/brands/${brand.slug}/`}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0E2A1E] group-hover:bg-[#163E2D] text-[#C5A265] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <span>Explore {brand.name} Range</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
