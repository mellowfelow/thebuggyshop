// app/brands/[slug]/page.jsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/src/config/site';
import { BRANDS, getBrandBySlug } from '@/src/config/brands';
import { PRODUCTS, getProductsByBrand } from '@/src/config/products';
import { CATEGORY_TREE } from '@/src/config/categories';
import JsonLd from '@/src/components/JsonLd';
import ShopClient from '@/app/shop/ShopClient';
import { ShieldCheck, Award, ArrowLeft, Sparkles, CheckCircle2, Wrench, PackageCheck } from 'lucide-react';
import { seoTitle, seoDesc } from '@/lib/seo';

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: 'Brand Not Found | The Buggy Shop Australia' };

  return {
    title: { absolute: seoTitle(brand.pageTitle || `${brand.name} Golf Buggies & Carts Australia | The Buggy Shop`) },
    description: seoDesc(brand.metaDescription || brand.blurb || brand.introCopy),
    alternates: {
      canonical: `https://${SITE.domain}/brands/${brand.slug}/`,
    },
    openGraph: {
      title: brand.pageTitle || `${brand.name} Golf Buggies Australia`,
      description: brand.metaDescription || brand.blurb,
      url: `https://${SITE.domain}/brands/${brand.slug}/`,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const brandProducts = getProductsByBrand(brand.slug);

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
        "name": "Brands",
        "item": `https://${SITE.domain}/brands/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": brand.name,
        "item": `https://${SITE.domain}/brands/${brand.slug}/`
      }
    ]
  };

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": brand.name,
    "description": brand.blurb || brand.introCopy,
    "url": `https://${SITE.domain}/brands/${brand.slug}/`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "48"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={brandSchema} />

      {/* Brand Hero Header */}
      <div className="space-y-6">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <Link href="/brands/" className="hover:text-[#0E2A1E]">Brands</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">{brand.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DDE4DF] pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123123] text-[#C5A265] text-xs font-black uppercase tracking-wider border border-[#C5A265]/30">
                <Award className="w-3.5 h-3.5" />
                <span>Country of Origin: {brand.country}</span>
              </span>
              <span className="text-xs font-bold text-[#4A5D53] bg-white px-2.5 py-1 rounded-full border border-[#CAD5CE]">
                {brand.origin || 'Australian Authorized Retailer'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
              {brand.h1 || `${brand.name} Golf Buggies & Carts Australia`}
            </h1>
            
            {brand.blurb && (
              <p className="text-base sm:text-lg font-bold text-[#0E2A1E]">
                {brand.blurb}
              </p>
            )}

            <p className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">
              {brand.introCopy}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/shop/parts-accessories/`}
              className="py-3 px-5 rounded-2xl bg-[#C5A265]/15 text-[#8A7045] font-black text-xs uppercase tracking-wider hover:bg-[#C5A265]/25 transition-colors border border-[#C5A265]/40 shadow-xs flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-[#8A7045]" />
              <span>{brand.name} Spare Parts</span>
            </Link>
            <Link
              href="/brands/"
              className="py-3 px-5 rounded-2xl bg-white text-[#0E2A1E] font-black text-xs uppercase tracking-wider hover:bg-[#F0F5F2] transition-colors border border-[#CAD5CE] shadow-2xs"
            >
              ← All Brands
            </Link>
          </div>
        </div>

        {/* Brand Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C5A265] shrink-0" />
            <div>
              <div className="text-xs font-black text-[#0E2A1E]">Genuine Australian Warranty</div>
              <div className="text-[11px] text-[#4A5D53]">Full local factory service & repair support</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wrench className="w-5 h-5 text-[#C5A265] shrink-0" />
            <div>
              <div className="text-xs font-black text-[#0E2A1E]">Spare Parts & Lithium Upgrades</div>
              <div className="text-[11px] text-[#4A5D53]">OEM fitment parts stocked in Australia</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PackageCheck className="w-5 h-5 text-[#C5A265] shrink-0" />
            <div>
              <div className="text-xs font-black text-[#0E2A1E]">Pre-Delivery Inspection</div>
              <div className="text-[11px] text-[#4A5D53]">Conditioned, calibrated & ready to ride</div>
            </div>
          </div>
        </div>

        {/* Spare Parts Quick Section */}
        {brand.partsCategories && brand.partsCategories.length > 0 && (
          <div className="p-5 bg-white rounded-3xl border border-[#D5DFD9] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8ECE9] pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#8A7045]" />
                <h2 className="text-sm font-black text-[#0E2A1E] uppercase tracking-wider">
                  {brand.name} Genuine Spare Parts & Upgrades
                </h2>
              </div>
              <Link 
                href="/shop/parts-accessories/"
                className="text-xs font-bold text-[#8A7045] hover:underline"
              >
                Browse all spare parts & accessories →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {brand.partsCategories.map((part) => (
                <Link
                  key={part}
                  href={`/shop/parts-accessories/?q=${encodeURIComponent(brand.name)}`}
                  className="text-xs bg-[#F7F9F8] hover:bg-[#E8F0EB] text-[#1E3A2B] px-3 py-1.5 rounded-xl border border-[#CAD5CE] font-semibold transition-colors"
                >
                  {part}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brand Product Listing with Facet Filters */}
      <ShopClient 
        initialProducts={brandProducts}
        categories={CATEGORY_TREE}
        currentBrand={brand}
      />
    </div>
  );
}
