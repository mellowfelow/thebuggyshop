// app/brands/page.jsx
import React from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { BRANDS, BRAND_GROUPS, getBrandKind } from '@/src/config/brands';
import { PRODUCTS } from '@/src/config/products';
import JsonLd from '@/src/components/JsonLd';
import { Award, ArrowRight } from 'lucide-react';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Golf Buggy Brands Australia | MGI, Motocaddy, Club Car, ECAR & Clicgear') },
  description: seoDesc('Explore Australia\'s top golf buggy and cart brands. Authorized sales, factory warranty backup, lithium upgrades, and genuine parts for MGI, Motocaddy, Club Car, ECAR and more.'),
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
            <span>Brands we stock</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Golf Buggy & Cart Brands Australia
          </h1>
          <p className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">
            Browse every brand we stock, from electric golf buggies and carts to lithium batteries, rangefinders and golf balls. Pick a brand to see its full range, with Australia-wide delivery from our Queensland sales desk.
          </p>
        </div>
      </div>

      {/* Brand groups */}
      {BRAND_GROUPS.map((group) => {
        const list = BRANDS.filter((br) => getBrandKind(br) === group.kind);
        if (!list.length) return null;
        return (
          <section key={group.kind} className="space-y-5" aria-labelledby={`grp-${group.kind}`}>
            <h2 id={`grp-${group.kind}`} className="text-xl sm:text-2xl font-black text-[#0E2A1E] font-serif">
              {group.title} <span className="text-sm font-bold text-[#6B7E74]">({list.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((brand) => {
                const count = PRODUCTS.filter((p) => p.brand === brand.slug).length;
                return (
                  <Link
                    key={brand.slug}
                    href={`/brands/${brand.slug}/`}
                    className="p-6 rounded-3xl bg-white border border-[#D5DFD9] hover:border-[#C5A265] hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        {brand.country ? (
                          <span className="text-xs font-black text-[#C5A265] uppercase tracking-wider bg-[#0E2A1E] px-3 py-1 rounded-xl">{brand.country}</span>
                        ) : <span />}
                        <span className="text-[11px] font-bold text-[#6B7E74] text-right">{count} {count === 1 ? 'product' : 'products'}</span>
                      </div>
                      <h3 className="text-xl font-black text-[#0E2A1E] font-serif group-hover:text-[#8A7045] transition-colors">{brand.name}</h3>
                      <p className="text-xs text-[#4A5D53] line-clamp-3 leading-relaxed">{brand.introCopy}</p>
                      {brand.popularModels?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {brand.popularModels.slice(0, 2).map((m) => (
                            <span key={`m-${brand.slug}-${m}`} className="text-[10px] bg-[#F1F6F3] text-[#2A4D3B] px-2.5 py-0.5 rounded-lg border border-[#CAD5CE] font-semibold">{m}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="mt-5 pt-4 border-t border-[#E8ECE9] text-xs font-black uppercase tracking-wider text-[#0E2A1E] group-hover:text-[#8A7045] flex items-center justify-between">
                      <span>Explore {brand.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
