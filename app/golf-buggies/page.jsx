// app/golf-buggies/page.jsx
import React from 'react';
import Link from 'next/link';
import { SITE } from '@/src/config/site';
import { LOCATIONS } from '@/src/config/locations';
import JsonLd from '@/src/components/JsonLd';
import { Truck, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { seoTitle, seoDesc } from '@/lib/seo';
import { ogImages } from '@/lib/og';
import FaqSection from '@/src/components/FaqSection';
import { faqsForPage } from '@/src/config/faq';

export const metadata = {
  title: { absolute: seoTitle('Golf Buggies for Sale Near Me | By City & State') },
  description: seoDesc('Golf buggies for sale near me? Choose your city for electric buggies, push buggies and golf carts with tail-lift delivery to Melbourne, Sydney, Brisbane and Perth.'),
  alternates: {
    canonical: `https://${SITE.domain}/golf-buggies/`,
  },
  openGraph: {
    title: 'Golf Buggies Australia by City | The Buggy Shop',
    description: 'Direct hydraulic tail-lift delivery across Melbourne, Sydney, Brisbane, Gold Coast, Perth, Adelaide and all Australian states.',
    url: `https://${SITE.domain}/golf-buggies/`,
    images: ogImages(),
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function GolfBuggiesLocationsIndexPage() {
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
          <span className="text-[#0E2A1E] font-bold">Australian Locations</span>
        </nav>

        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123123] text-[#C5A265] text-xs font-black uppercase tracking-wider border border-[#C5A265]/30">
            <Truck className="w-3.5 h-3.5" />
            <span>Australia-Wide Direct Hydraulic Delivery</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Golf Buggies for Sale Near Me: Choose Your City
          </h1>
          <p className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">
            Looking for golf buggies for sale near me? Select your city or region below to see local delivery times, nearby golf course deliveries and buggies suited to your climate and terrain.
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {LOCATIONS.map((loc) => (
          <Link
            key={loc.slug}
            href={`/golf-buggies/${loc.slug}/`}
            className="p-6 rounded-3xl bg-white border border-[#D5DFD9] hover:border-[#C5A265] hover:shadow-lg transition-all group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0E2A1E] bg-[#E8F0EC] px-2.5 py-0.5 rounded-md font-mono">
                  {loc.state}
                </span>
                <MapPin className="w-4 h-4 text-[#C5A265]" />
              </div>

              <h2 className="text-lg font-black text-[#0E2A1E] font-serif group-hover:text-[#8A7045] transition-colors">
                {loc.name}
              </h2>

              <p className="text-xs text-[#4A5D53] line-clamp-2">
                {loc.introCopy}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#E8ECE9] flex items-center justify-between text-xs font-bold text-[#0E2A1E] group-hover:text-[#8A7045]">
              <span>View {loc.name} Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <FaqSection faqs={faqsForPage('/golf-buggies/')} url="/golf-buggies/" heading="Delivery: your questions answered" id="delivery-faq" />
    </div>
  );
}
