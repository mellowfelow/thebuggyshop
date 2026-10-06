// app/brands/[slug]/page.jsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/src/config/site';
import { BRANDS, getBrandBySlug, getBrandKind } from '@/src/config/brands';
import { PRODUCTS, getProductsByBrand } from '@/src/config/products';
import { CATEGORY_TREE } from '@/src/config/categories';
import JsonLd from '@/src/components/JsonLd';
import ShopClient from '@/app/shop/ShopClient';
import { ShieldCheck, Award, Wrench, PackageCheck, Truck, Wallet, PhoneCall } from 'lucide-react';
import { CONTACT } from '@/src/config/site';
import { seoTitle, seoDesc } from '@/lib/seo';
import { ogImages } from '@/lib/og';

export async function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: 'Brand Not Found | The Buggy Shop Australia' };
  const noStock = getProductsByBrand(brand.slug).length === 0; // no products: keep the page out of search until stock arrives

  return {
    title: { absolute: seoTitle(brand.pageTitle || `${brand.name} Golf Buggies & Carts Australia | The Buggy Shop`) },
    description: seoDesc(brand.metaDescription || brand.blurb || brand.introCopy),
    ...(noStock ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: `https://${SITE.domain}/brands/${brand.slug}/`,
    },
    openGraph: {
      title: brand.pageTitle || `${brand.name} Golf Buggies Australia`,
      description: brand.metaDescription || brand.blurb,
      url: `https://${SITE.domain}/brands/${brand.slug}/`,
      images: ogImages(getProductsByBrand(brand.slug)[0]?.images?.[0]),
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
  };

  const kind = getBrandKind(brand);
  const highlights = kind === 'vehicle'
    ? [
        { icon: ShieldCheck, title: 'Australian warranty & service', text: 'Local support from The Buggy Shop sales desk' },
        { icon: PackageCheck, title: 'Pre-delivery inspection', text: 'Checked and ready to ride on arrival' },
        { icon: Truck, title: 'Australia-wide delivery', text: 'Hydraulic tail-lift delivery to your property' },
      ]
    : [
        { icon: Truck, title: 'Australia-wide shipping', text: 'Delivered to your door or club' },
        { icon: Wallet, title: 'Flexible payment', text: 'PayID, bank transfer or crypto (10% rebate)' },
        { icon: PhoneCall, title: 'Ask the sales desk', text: `Call ${CONTACT.phoneDisplay} for fitment advice` },
      ];

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
              {brand.country && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123123] text-[#C5A265] text-xs font-black uppercase tracking-wider border border-[#C5A265]/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>Country of Origin: {brand.country}</span>
                </span>
              )}
              <span className="text-xs font-bold text-[#4A5D53] bg-white px-2.5 py-1 rounded-full border border-[#CAD5CE]">
                {brand.origin || 'Stocked by The Buggy Shop'}
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
            {brand.partsCategories?.length > 0 && (
              <Link
                href={`/shop/parts/?q=${encodeURIComponent(brand.name)}`}
                className="py-3 px-5 rounded-2xl bg-[#C5A265]/15 text-[#8A7045] font-black text-xs uppercase tracking-wider hover:bg-[#C5A265]/25 transition-colors border border-[#C5A265]/40 shadow-xs flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-[#8A7045]" />
                <span>{brand.name} Spare Parts</span>
              </Link>
            )}
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
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-[#C5A265] shrink-0" />
              <div>
                <div className="text-xs font-black text-[#0E2A1E]">{title}</div>
                <div className="text-[11px] text-[#4A5D53]">{text}</div>
              </div>
            </div>
          ))}
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
                href={`/shop/parts/?q=${encodeURIComponent(brand.name)}`}
                className="text-xs font-bold text-[#8A7045] hover:underline"
              >
                Browse all spare parts & accessories →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {brand.partsCategories.map((part) => (
                <Link
                  key={part}
                  href={`/shop/parts/?q=${encodeURIComponent(brand.name)}`}
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
