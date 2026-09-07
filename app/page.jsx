import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Truck, 
  BatteryCharging, 
  Wrench, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  FileCheck2, 
  Scale, 
  Calculator, 
  Sparkles,
  Award,
  Navigation,
  Check
} from 'lucide-react';
import { SITE, BRAND, CONTACT, CATEGORIES, PRODUCTS, POSTS, SHOP, REVIEW_STATS } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import HomeClientProducts from './HomeClientProducts';
import ReviewsCarousel from '@/src/components/ReviewsCarousel';

export const metadata = {
  title: 'Golf Buggy for Sale Australia | Luxury, Remote & Off Road Buggies',
  description: 'Explore premium golf buggies for sale in Australia. From remote control golf buggies and off road buggies to luxury golf carts with seats and used golf buggies for sale with 5-year warranty.',
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  openGraph: {
    title: 'Golf Buggy for Sale Australia | The Buggy Shop',
    description: 'Australia\'s premier destination for luxury golf buggies for sale, remote control golf buggies, off road buggies, and golf push buggies.',
    url: `https://${SITE.domain}/`,
    images: [{ url: 'https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80' }]
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  // Full Homepage JSON-LD
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Store", "Organization"],
        "@id": `https://${SITE.domain}/#organization`,
        "name": SITE.name,
        "description": BRAND.description,
        "foundingDate": BRAND.foundingYear,
        "foundingLocation": {
          "@type": "Place",
          "name": BRAND.foundingLocation
        },
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AU",
          "addressRegion": "QLD"
        },
        "url": `https://${SITE.domain}/`,
        "telephone": CONTACT.phone,
        "email": CONTACT.email,
        "priceRange": "$$$$",
        "areaServed": ["Australia", "Queensland", "New South Wales", "Victoria", "Western Australia", "South Australia", "Tasmania", "Northern Territory"],
        "numberOfItems": PRODUCTS.length,
        "knowsAbout": [
          "Golf Buggy for Sale",
          "Remote Control Golf Buggy",
          "Off Road Buggies for Sale",
          "Used Golf Buggy for Sale",
          "Golf Push Buggy with Seat",
          "LiFePO4 Lithium Batteries",
          "Golf Buggy Accessories",
          "Queensland Conditional Road Registration"
        ],
        "brand": {
          "@type": "Brand",
          "name": SITE.name
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": REVIEW_STATS.averageRating.toString(),
          "reviewCount": REVIEW_STATS.totalReviews.toString(),
          "bestRating": "5",
          "worstRating": "1"
        },
        "makesOffer": {
          "@type": "AggregateOffer",
          "priceCurrency": SITE.currency,
          "lowPrice": 690,
          "highPrice": 24800,
          "offerCount": PRODUCTS.length
        }
      },
      {
        "@type": "WebSite",
        "@id": `https://${SITE.domain}/#website`,
        "url": `https://${SITE.domain}/`,
        "name": SITE.name,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `https://${SITE.domain}/search/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <JsonLd schema={homeSchema} />

      {/* SECTION 1: HERO SECTION */}
      <section className="relative bg-gradient-to-b from-[#091D15] via-[#0E2A1E] to-[#071810] text-white pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-[#1A3D2D]" id="hero-section">
        {/* Ambient Luxury Atmospheric Light Rings */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C5A265]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#163E2D]/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(197,162,101,0.12),rgba(0,0,0,0))] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-7">
              {/* Brand Heritage Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#071810]/90 border border-[#C5A265]/50 text-[#C5A265] text-xs font-black uppercase tracking-widest shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
                <span>Australian Luxury Golf Buggies • Queensland Est. 2004</span>
              </div>

              {/* Single Mandatory H1 featuring Primary Keyword */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-serif">
                  Premium <span className="text-[#C5A265]">Golf Buggy for Sale</span> Across Australia.
                </h1>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#C5A265]/90 font-serif">
                  Turnkey Lithium Golf Carts, Remote Trolleys & Off Road Buggies
                </p>
              </div>

              {/* Sub-headline & Factual Entity Statement */}
              <p className="text-base sm:text-lg text-[#D3DFD8] leading-relaxed font-normal max-w-2xl">
                Australia&apos;s leading destination for certified <strong>luxury golf buggies</strong>, motorized <strong>remote control golf buggies</strong>, 4x4 <strong>off road buggies</strong>, and verified <strong>used golf buggies for sale</strong>. Engineered with 5-year LiFePO4 lithium batteries, whisper-quiet AC motors, and nationwide hydraulic tail-lift delivery to your club, estate, or farm.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop/"
                  className="py-4 px-8 rounded-xl bg-gradient-to-r from-[#C5A265] to-[#D4B27C] hover:from-[#D4B27C] hover:to-[#E0C392] text-[#0E2A1E] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_20px_rgba(197,162,101,0.35)] flex items-center gap-2.5 group cursor-pointer active:scale-[0.98]"
                >
                  <span>Explore Golf Buggies for Sale</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/compare/"
                  className="py-4 px-6 rounded-xl bg-[#143929]/80 hover:bg-[#1A4732] text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#C5A265]/40 transition-all flex items-center gap-2 shadow-sm"
                >
                  <Scale className="w-4 h-4 text-[#C5A265]" />
                  <span>Compare Specifications</span>
                </Link>

                <Link
                  href="/finance/"
                  className="text-xs font-black text-[#C5A265] hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 py-2 px-1"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#C5A265]" />
                  <span>Finance & 10% Crypto Rebate →</span>
                </Link>
              </div>

              {/* Key Trust Metrics Micro-Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#183B2B] text-xs text-[#D3DFD8]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#071810] border border-[#C5A265]/30 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-[#C5A265]" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">Tail-Lift Freight</strong>
                    <span className="text-[11px] text-[#A6BCB0]">All States & Regional</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#071810] border border-[#C5A265]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#C5A265]" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">5-Yr Lithium Pack</strong>
                    <span className="text-[11px] text-[#A6BCB0]">3,500+ Deep Cycles</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#071810] border border-[#C5A265]/30 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-[#C5A265]" />
                  </div>
                  <div>
                    <strong className="text-white block font-bold">10% Instant Rebate</strong>
                    <span className="text-[11px] text-[#A6BCB0]">PayID & Crypto (BTC/USDT)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase (Luxurious, Expansive & Card-Free) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-[#C5A265]/40 bg-gradient-to-b from-[#0E2A1E] to-[#071810] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
                {/* Visual Frame */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1594495894542-a46cc73e081a?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury Australian Golf Buggy for Sale - The Buggy Shop Queensland"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out brightness-95"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071810] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#0E2A1E]/90 backdrop-blur-md text-[#C5A265] text-[10px] font-black uppercase px-3.5 py-1.5 rounded-full border border-[#C5A265]/50 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-[#C5A265] animate-pulse" />
                    <span>Australian Fleet Showcase • Queensland HQ</span>
                  </div>

                  {/* Floating Engineering Highlights Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                    <div className="bg-[#071810]/85 backdrop-blur-md border border-[#C5A265]/30 rounded-xl p-2.5 text-center shadow-lg">
                      <span className="text-[10px] uppercase font-bold text-[#A6BCB0] block">Range</span>
                      <span className="text-sm sm:text-base font-black text-[#C5A265] font-serif">95 km</span>
                    </div>

                    <div className="bg-[#071810]/85 backdrop-blur-md border border-[#C5A265]/30 rounded-xl p-2.5 text-center shadow-lg">
                      <span className="text-[10px] uppercase font-bold text-[#A6BCB0] block">Battery</span>
                      <span className="text-sm sm:text-base font-black text-white font-serif">72V LiFePO4</span>
                    </div>

                    <div className="bg-[#071810]/85 backdrop-blur-md border border-[#C5A265]/30 rounded-xl p-2.5 text-center shadow-lg">
                      <span className="text-[10px] uppercase font-bold text-[#A6BCB0] block">Compliance</span>
                      <span className="text-sm sm:text-base font-black text-[#C5A265] font-serif">Road Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Luxury Accents */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#C5A265]/40 rounded-br-3xl pointer-events-none hidden sm:block" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[#C5A265]/40 rounded-tl-3xl pointer-events-none hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TRUST BAR (4 PILLARS) - BEAUTIFIED WITH LUXURY TINT & GOLD CREST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border-2 border-[#D5DFD9] shadow-[0_4px_16px_-4px_rgba(14,42,30,0.06)] flex items-start gap-4 hover:border-[#C5A265] hover:shadow-[0_15px_30px_-5px_rgba(197,162,101,0.25)] hover:-translate-y-1.5 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E2A1E] to-[#184432] text-[#C5A265] border border-[#C5A265]/60 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-[#C5A265] transition-all">
              <Truck className="w-5 h-5 text-[#C5A265]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm text-[#0E2A1E] group-hover:text-[#8A7045] font-serif transition-colors">Australia-Wide Freight</h3>
              <p className="text-xs text-[#4A5D53] group-hover:text-[#2A3E34] leading-relaxed transition-colors">
                Direct hydraulic tail-lift delivery to golf clubs, private homesteads, and regional depots nationwide.
              </p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border-2 border-[#D5DFD9] shadow-[0_4px_16px_-4px_rgba(14,42,30,0.06)] flex items-start gap-4 hover:border-[#C5A265] hover:shadow-[0_15px_30px_-5px_rgba(197,162,101,0.25)] hover:-translate-y-1.5 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E2A1E] to-[#184432] text-[#C5A265] border border-[#C5A265]/60 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-[#C5A265] transition-all">
              <FileCheck2 className="w-5 h-5 text-[#C5A265]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm text-[#0E2A1E] group-hover:text-[#8A7045] font-serif transition-colors">Turnkey Road Rego</h3>
              <p className="text-xs text-[#4A5D53] group-hover:text-[#2A3E34] leading-relaxed transition-colors">
                Pre-fitted state-certified LED lighting, safety mirrors, amber beacon, and pre-filled QLD/NSW/VIC registration forms.
              </p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border-2 border-[#D5DFD9] shadow-[0_4px_16px_-4px_rgba(14,42,30,0.06)] flex items-start gap-4 hover:border-[#C5A265] hover:shadow-[0_15px_30px_-5px_rgba(197,162,101,0.25)] hover:-translate-y-1.5 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E2A1E] to-[#184432] text-[#C5A265] border border-[#C5A265]/60 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-[#C5A265] transition-all">
              <BatteryCharging className="w-5 h-5 text-[#C5A265]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm text-[#0E2A1E] group-hover:text-[#8A7045] font-serif transition-colors">5-Year Lithium Guarantee</h3>
              <p className="text-xs text-[#4A5D53] group-hover:text-[#2A3E34] leading-relaxed transition-colors">
                Full 5-year transferable LiFePO4 lithium battery guarantee tested specifically for the Australian summer climate.
              </p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border-2 border-[#D5DFD9] shadow-[0_4px_16px_-4px_rgba(14,42,30,0.06)] flex items-start gap-4 hover:border-[#C5A265] hover:shadow-[0_15px_30px_-5px_rgba(197,162,101,0.25)] hover:-translate-y-1.5 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E2A1E] to-[#184432] text-[#C5A265] border border-[#C5A265]/60 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:border-[#C5A265] transition-all">
              <Wrench className="w-5 h-5 text-[#C5A265]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm text-[#0E2A1E] group-hover:text-[#8A7045] font-serif transition-colors">48-Hour Parts Dispatch</h3>
              <p className="text-xs text-[#4A5D53] group-hover:text-[#2A3E34] leading-relaxed transition-colors">
                Comprehensive golf buggy accessories, tyres, windscreens, chargers, and controllers dispatched from Queensland.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CATEGORY EXPLORER - ELEVATED LUXURY TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#8A7045] bg-[#EBF1ED] px-3 py-1 rounded-full border border-[#D5DFD9] inline-block">
            Complete Australian Buggy Inventory
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Browse Golf Buggies for Sale by Category
          </h2>
          <p className="text-sm text-[#4A5D53]">
            From luxury golf resort carts and <strong>remote control golf buggies</strong> to heavy-duty <strong>off road buggies</strong> and quality <strong>used golf buggies for sale</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}/`}
              className="group relative rounded-3xl overflow-hidden border-2 border-[#D5DFD9] bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] shadow-[0_4px_20px_-4px_rgba(14,42,30,0.08)] hover:shadow-[0_20px_45px_-8px_rgba(197,162,101,0.35),0_10px_20px_-6px_rgba(14,42,30,0.2)] hover:border-[#C5A265] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 flex flex-col"
            >
              <div className="product-frame relative overflow-hidden bg-[#0A2016]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.heroImage}
                  alt={`${category.name} - Golf Buggy for Sale`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-95 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2A1E] via-[#0E2A1E]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-black text-[#C5A265] bg-[#071810]/80 px-2.5 py-0.5 rounded-full border border-[#C5A265] uppercase tracking-wider inline-block mb-1 shadow-sm">
                    {category.itemCount} Buggies Available
                  </span>
                  <h3 className="text-xl font-black tracking-tight leading-snug font-serif text-white">
                    {category.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-[#4A5D53] group-hover:text-[#2A3E34] leading-relaxed transition-colors">
                  {category.description}
                </p>
                <div className="text-xs font-black text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors flex items-center justify-between pt-3 border-t border-[#DDE4DF] group-hover:border-[#E5D2A8] uppercase tracking-wider">
                  <span>Explore {category.name}</span>
                  <span className="w-7 h-7 rounded-full bg-[#EBF1ED] group-hover:bg-[#C5A265] group-hover:text-[#0E2A1E] flex items-center justify-center transition-all font-black shadow-xs">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: FEATURED VEHICLES GRID (CLIENT INTERACTIVE) */}
      <section className="bg-gradient-to-b from-[#EBF0EC] to-[#E3EAE5] py-16 sm:py-20 border-y border-[#D5DFD9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#8A7045] bg-[#FAFBF9] px-3 py-1 rounded-full border border-[#D5DFD9] inline-block">
                In Stock & Ready for Immediate Dispatch
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
                Featured Golf Buggies & Carts for Sale
              </h2>
            </div>

            <Link
              href="/shop/"
              className="inline-flex items-center gap-2 text-xs font-black text-[#0E2A1E] hover:text-[#8A7045] uppercase tracking-wider transition-colors bg-white px-4 py-2.5 rounded-xl border border-[#D5DFD9] shadow-xs hover:border-[#C5A265]"
            >
              <span>View All Golf Buggy Sales ({PRODUCTS.length} Models)</span>
              <ArrowRight className="w-4 h-4 text-[#8A7045]" />
            </Link>
          </div>

          <HomeClientProducts products={featuredProducts} />
        </div>
      </section>

      {/* SECTION 5: TURNKEY STATE ROAD REGISTRATION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#0E2A1E] to-[#071810] text-white rounded-3xl p-8 sm:p-12 border border-[#C5A265]/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071810] text-[#C5A265] text-xs font-bold uppercase tracking-wider border border-[#C5A265]/40 shadow-sm">
                <FileCheck2 className="w-4 h-4 text-[#C5A265]" />
                <span>Queensland • NSW • Victoria Conditional Rego</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight font-serif">
                Drive Turnkey Road-Legal Between Golf Courses, Estates & Farms.
              </h2>

              <p className="text-sm text-[#D3DFD8] leading-relaxed">
                Navigating conditional buggy registration across Australian states is straightforward with our turnkey compliance packages. Every road-ready golf buggy arrives pre-fitted with automotive LED lighting, horn, panoramic mirrors, safety beacon, and pre-filled registration paperwork ready for your local transport authority.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#D3DFD8]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A265] shrink-0" />
                  <span>QLD TMR Code GOLF & UTILITY Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A265] shrink-0" />
                  <span>Transport for NSW Conditional Scheme</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A265] shrink-0" />
                  <span>VicRoads Special Purpose Vehicle Permits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A265] shrink-0" />
                  <span>Pre-filled State Transport Documentation</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/blog/conditional-road-registration-guide-qld-nsw-vic/"
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[#C5A265] hover:bg-[#D4B27C] text-[#0E2A1E] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.98]"
                >
                  <span>Read Australian Conditional Rego Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#071810]/90 p-6 rounded-2xl border border-[#C5A265]/40 space-y-4 shadow-inner">
              <h3 className="text-xs font-black text-[#C5A265] uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A265]" />
                <span>Factory Road Inclusions:</span>
              </h3>
              <ul className="space-y-3 text-xs text-[#D3DFD8]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C5A265] font-black">1.</span>
                  <span><strong>Automotive LED Lighting:</strong> Projector headlights, daytime running lights, brake lights, and turn indicators.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C5A265] font-black">2.</span>
                  <span><strong>Safety Warning Suite:</strong> Electric horn, reversing audio beeper, and flashing amber roof beacon.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C5A265] font-black">3.</span>
                  <span><strong>Dual Panoramic Mirrors:</strong> Convex adjustable side mirrors and wide-angle central mirror.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C5A265] font-black">4.</span>
                  <span><strong>DOT Fold-Down Windscreen:</strong> Impact-resistant tinted acrylic windscreen with optional electric wiper.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMMERCIAL ASSET FINANCE & CRYPTO REBATE - BEAUTIFIED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl p-8 sm:p-12 border border-[#D5DFD9] shadow-lg flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#0E2A1E] via-[#C5A265] to-[#0E2A1E]" />

          <div className="space-y-3 max-w-2xl pl-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF1ED] text-[#0E2A1E] text-xs font-black uppercase tracking-wider border border-[#D5DFD9]">
              <Calculator className="w-3.5 h-3.5 text-[#8A7045]" />
              <span>Australian Commercial & Private Finance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0E2A1E] tracking-tight font-serif">
              Commercial Fleet Leasing & Instant 10% Crypto Settlement
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5D53] leading-relaxed">
              Acquire single golf buggies or entire club fleets with tax-effective equipment chattel mortgages and asset leasing. Plus, save an instant 10% discount when settling via Bitcoin (BTC), Tether (USDT), or PayID.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Link
              href="/finance/"
              className="py-3.5 px-6 rounded-xl bg-[#0E2A1E] hover:bg-[#163E2D] text-[#C5A265] font-black text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 shadow-sm border border-[#C5A265]/40"
            >
              <Calculator className="w-4 h-4" />
              <span>Finance Calculator</span>
            </Link>

            <Link
              href="/contact/"
              className="py-3.5 px-6 rounded-xl bg-white hover:bg-[#EBF1ED] text-[#0E2A1E] border border-[#CAD5CE] font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-xs"
            >
              Request Commercial Invoice
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: BRAND AUTHORITY & QUEENSLAND HERITAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10" id="about-authority-section">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#8A7045] bg-[#EBF1ED] px-3 py-1 rounded-full border border-[#D5DFD9] inline-block">
            The Buggy Shop Difference
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Why Australian Golfers & Estate Owners Choose Us
          </h2>
          <p className="text-sm text-[#4A5D53]">
            Over 20 years of real field experience delivering purpose-engineered golf buggies, push trolleys, and off road buggies across Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND.differentiation.map((point, index) => (
            <div 
              key={index} 
              className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border-2 border-[#D5DFD9] shadow-[0_4px_16px_-4px_rgba(14,42,30,0.06)] hover:border-[#C5A265] hover:shadow-[0_15px_30px_-5px_rgba(197,162,101,0.25)] hover:-translate-y-1.5 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#0E2A1E] text-[#C5A265] border border-[#C5A265]/60 font-black text-xs flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-[#071912] group-hover:border-[#C5A265] transition-all">
                  0{index + 1}
                </div>
                <p className="text-xs text-[#0E2A1E] group-hover:text-[#2A3E34] leading-relaxed font-medium transition-colors">
                  {point}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: VERIFIED AUSTRALIAN REVIEWS SLIDING CAROUSEL (TRUSTPILOT GRADE) */}
      <ReviewsCarousel />

      {/* SECTION 9: LATEST BUYER'S GUIDES - BEAUTIFIED CARDS */}
      <section className="bg-gradient-to-b from-[#EBF0EC] to-[#E3EAE5] py-16 border-y border-[#D5DFD9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#8A7045] bg-[#FAFBF9] px-3 py-1 rounded-full border border-[#D5DFD9] inline-block">
                Australian Buyer&apos;s Guides
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
                Golf Buggy Reviews, Comparisons & Advice
              </h2>
            </div>

            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-xs font-black text-[#0E2A1E] hover:text-[#8A7045] uppercase tracking-wider transition-colors bg-white px-4 py-2.5 rounded-xl border border-[#D5DFD9] shadow-xs hover:border-[#C5A265]"
            >
              <span>View All Guides</span>
              <ArrowRight className="w-4 h-4 text-[#8A7045]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POSTS.map((post) => (
              <article 
                key={post.slug} 
                className="bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border-2 border-[#D5DFD9] overflow-hidden shadow-[0_4px_20px_-4px_rgba(14,42,30,0.06)] hover:shadow-[0_20px_45px_-8px_rgba(197,162,101,0.35),0_10px_20px_-6px_rgba(14,42,30,0.2)] hover:border-[#C5A265] hover:-translate-y-2 hover:bg-gradient-to-b hover:from-white hover:to-[#FFFDF7] transition-all duration-300 flex flex-col group"
              >
                <div className="product-frame relative overflow-hidden bg-[#0A2016]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0E2A1E]/95 backdrop-blur-xs text-[#C5A265] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-[#C5A265] shadow-sm">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#60756B] block font-bold">
                      {post.date} • {post.readTime}
                    </span>
                    <Link href={`/blog/${post.slug}/`}>
                      <h3 className="font-extrabold text-base text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors leading-snug line-clamp-2 font-serif">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#4A5D53] group-hover:text-[#2A3E34] line-clamp-2 leading-relaxed transition-colors">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}/`}
                    className="text-xs font-black text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors inline-flex items-center justify-between pt-3 border-t border-[#DDE4DF] group-hover:border-[#E5D2A8] uppercase tracking-wider"
                  >
                    <span>Read Guide</span>
                    <span className="w-6 h-6 rounded-full bg-[#EBF1ED] group-hover:bg-[#C5A265] group-hover:text-[#0E2A1E] flex items-center justify-center transition-all font-black">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: INSTANT DISPATCH & WHATSAPP SETTLEMENT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-br from-[#0E2A1E] via-[#123325] to-[#071810] text-white rounded-3xl p-8 sm:p-14 border border-[#C5A265]/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#C5A265] block bg-[#071810]/70 px-4 py-1.5 rounded-full border border-[#C5A265]/30 inline-block shadow-sm">
              Direct Australian Dispatch & Quotes
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-serif">
              Looking for a Golf Buggy for Sale?
            </h2>
            <p className="text-sm sm:text-base text-[#D3DFD8] max-w-2xl mx-auto leading-relaxed">
              Connect directly with our Queensland technical sales desk via WhatsApp or phone for immediate stock availability, hydraulic tail-lift freight quotes, or fleet pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                "G'day! I would like to inquire about golf buggies for sale, stock availability, and nationwide delivery."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#071810] font-black text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 active:scale-[0.98]"
            >
              <span>Instant WhatsApp (+61 480 811 308)</span>
            </a>

            <a
              href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
              className="py-4 px-8 rounded-xl bg-[#163E2D] hover:bg-[#1C4E39] text-[#C5A265] font-bold text-sm uppercase tracking-wider border border-[#C5A265]/40 transition-all flex items-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Sales Desk: {CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <div className="text-xs text-[#A6BCB0] pt-4 flex flex-wrap items-center justify-center gap-4">
            <span>✓ Australian PayID Direct</span>
            <span>•</span>
            <span>✓ Direct Bank Transfer</span>
            <span>•</span>
            <span className="text-[#C5A265] font-bold">✓ 10% Crypto Rebate (BTC/USDT)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
