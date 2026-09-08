// app/golf-buggies/[city]/page.jsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE, CONTACT } from '@/src/config/site';
import { LOCATIONS, getLocationBySlug } from '@/src/config/locations';
import { PRODUCTS } from '@/src/config/products';
import { CATEGORY_TREE } from '@/src/config/categories';
import JsonLd from '@/src/components/JsonLd';
import ShopClient from '@/app/shop/ShopClient';
import { Truck, MapPin, ShieldCheck, Flag, CheckCircle2 } from 'lucide-react';

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({ params }) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return { title: 'Location Not Found | The Buggy Shop Australia' };

  return {
    title: `${location.title} | The Buggy Shop`,
    description: location.metaDescription,
    alternates: {
      canonical: `https://${SITE.domain}/golf-buggies/${location.slug}/`,
    },
    openGraph: {
      title: location.title,
      description: location.metaDescription,
      url: `https://${SITE.domain}/golf-buggies/${location.slug}/`,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function LocationCityPage({ params }) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

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
        "name": "Locations",
        "item": `https://${SITE.domain}/golf-buggies/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": location.name,
        "item": `https://${SITE.domain}/golf-buggies/${location.slug}/`
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Header */}
      <div className="space-y-4">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <Link href="/golf-buggies/" className="hover:text-[#0E2A1E]">Locations</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">{location.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DDE4DF] pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123123] text-[#C5A265] text-xs font-black uppercase tracking-wider border border-[#C5A265]/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>{location.name}, {location.state} Delivery & Technical Service</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
              {location.h1}
            </h1>

            <p className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">
              {location.introCopy}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/golf-buggies/"
              className="py-3 px-5 rounded-2xl bg-white text-[#0E2A1E] font-black text-xs uppercase tracking-wider hover:bg-[#F0F5F2] transition-colors border border-[#CAD5CE] shadow-2xs"
            >
              ← Other Cities
            </Link>
            <Link
              href="/shop/"
              className="py-3 px-5 rounded-2xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider hover:bg-[#163E2D] transition-colors border border-[#C5A265]/30 shadow-sm"
            >
              View All Buggies →
            </Link>
          </div>
        </div>

        {/* Local Logistics & Clubs Info Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9]">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-[#0E2A1E] uppercase tracking-wider">
              <Truck className="w-4 h-4 text-[#C5A265]" />
              <span>Freight & Tail-Lift Timelines</span>
            </div>
            <p className="text-xs text-[#4A5D53] leading-relaxed">
              <strong>Estimated Delivery:</strong> {location.deliveryTime}. All buggies arrive 95%+ pre-assembled with hydraulic tail-lift direct to your clubhouse, garage or rural gate.
            </p>
          </div>

          {location.popularClubs && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-[#0E2A1E] uppercase tracking-wider">
                <Flag className="w-4 h-4 text-[#C5A265]" />
                <span>Popular Course Deliveries in {location.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {location.popularClubs.map(club => (
                  <span key={club} className="text-[11px] bg-white text-[#0E2A1E] px-2.5 py-1 rounded-lg border border-[#CAD5CE] font-semibold">
                    {club}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Catalog for this Location */}
      <ShopClient 
        initialProducts={PRODUCTS}
        categories={CATEGORY_TREE}
        currentLocation={location}
      />
    </div>
  );
}
