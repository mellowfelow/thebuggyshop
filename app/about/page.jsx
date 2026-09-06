import React from 'react';
import Link from 'next/link';
import { SITE, BRAND, CONTACT, PRODUCTS } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import { 
  ShieldCheck, 
  Truck, 
  BatteryCharging, 
  Wrench, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  ArrowRight, 
  FileCheck2, 
  Sparkles 
} from 'lucide-react';

export const metadata = {
  title: 'About The Buggy Shop | 20+ Years Australian Golf Buggy for Sale Heritage',
  description: 'Founded in Queensland in 2004, The Buggy Shop is Australia\'s leading authority on luxury golf buggies for sale, remote control golf buggies, off road buggies, and golf push buggies.',
  alternates: {
    canonical: `https://${SITE.domain}/about/`,
  },
  openGraph: {
    title: 'About The Buggy Shop | 20+ Years Australian Golf Buggy Heritage',
    description: 'Founded in Queensland in 2004, Australia\'s leading authority on turnkey golf buggies for sale and lithium golf carts.',
    url: `https://${SITE.domain}/about/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `https://${SITE.domain}/about/#webpage`,
        "url": `https://${SITE.domain}/about/`,
        "name": `About ${SITE.name}`,
        "description": BRAND.description,
        "mainEntity": {
          "@type": "Organization",
          "name": SITE.name,
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
          "telephone": CONTACT.phone,
          "email": CONTACT.email,
          "url": `https://${SITE.domain}/`
        }
      },
      {
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
            "name": "About Our Heritage",
            "item": `https://${SITE.domain}/about/`
          }
        ]
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16">
      <JsonLd schema={aboutSchema} />

      {/* Header */}
      <div className="space-y-3">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">About Our Australian Heritage</span>
        </nav>

        <div className="space-y-3 border-b border-[#D5DFD9] pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E2A1E] text-[#C5A265] text-xs font-black uppercase tracking-wider border border-[#C5A265]/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>Queensland Heritage • Established {BRAND.foundingYear}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Over Two Decades of Australian Golf Buggy Excellence
          </h1>
          <p className="text-base text-[#4A5D53] max-w-3xl leading-relaxed">
            {BRAND.description}
          </p>
        </div>
      </div>

      {/* SECTION 1: DETAILED BRAND STORY (>700 words entity rich) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-[#2A4D3B] leading-relaxed bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] p-8 sm:p-10 rounded-3xl border border-[#D5DFD9] shadow-md">
          <h2 className="text-2xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Built for the Extremes of Australian Golf Courses & Regional Estates
          </h2>
          <p>
            When The Buggy Shop was founded in Queensland in 2004, the Australian market was saturated with fragile, low-clearance golf carts and noisy, maintenance-heavy petrol utility vehicles. Neither option truly served the needs of Australian golf course players, acreage owners, cattle stations, luxury vineyards, and regional commercial operations.
          </p>
          <p>
            Australia’s harsh climate—combining intense UV radiation, corrosive coastal air, red outback dust, and prolonged summer heatwaves exceeding 42°C—destroys conventional lead-acid battery packs and brittle plastic chassis within seasons. We set out to engineer and distribute a new class of golf buggies: machines combining automotive-grade structural steel chassis, whisper-quiet high-torque AC motors, and ultra-durable Lithium Iron Phosphate (LiFePO4) chemistry.
          </p>
          <p>
            Over the past twenty years, our workshop team has refined every vehicle in our fleet to ensure turnkey Australian road-legal compliance. Unlike gray-import distributors who leave registration compliance to the buyer, every vehicle that departs our Queensland facility is pre-fitted with certified LED lighting systems, dual rear-view mirrors, audible reversing alarms, and magnetic amber roof beacons, accompanied by pre-filled conditional registration paperwork for Queensland (TMR), New South Wales (Transport for NSW), and Victoria (VicRoads).
          </p>

          <h2 className="text-2xl font-black text-[#0E2A1E] pt-4 tracking-tight font-serif">
            The 5-Year LiFePO4 Battery Commitment
          </h2>
          <p>
            Battery reliability is the heart of modern electric mobility. The Buggy Shop exclusively utilizes prismatic LiFePO4 cells rated for over 3,500 continuous cycles to 80% Depth of Discharge. Backed by our comprehensive 5-year domestic replacement warranty, our battery systems require zero fluid topping, emit zero explosive hydrogen gas during charging, and integrate advanced thermal management systems engineered for Australian summer conditions.
          </p>

          <h2 className="text-2xl font-black text-[#0E2A1E] pt-4 tracking-tight font-serif">
            Nationwide Hydraulic Tail-Lift Logistics
          </h2>
          <p>
            Delivering large, fully assembled commercial equipment to remote properties across Queensland, New South Wales, Victoria, South Australia, and Western Australia requires dedicated freight coordination. We partner with specialized logistics carriers utilizing hydraulic tail-lift trucks to unload your golf buggy directly at your club or estate driveway—fully charged, tested, and ready for immediate operation.
          </p>
        </div>

        {/* Right Info Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#0E2A1E] to-[#071810] text-white rounded-3xl p-6 sm:p-8 border border-[#C5A265]/40 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#C5A265]">
              Operations & Headquarters
            </span>
            <h3 className="text-xl font-black text-white font-serif">Queensland Dispatch Hub</h3>
          </div>

          <div className="space-y-4 text-xs text-[#D3DFD8]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C5A265] shrink-0" />
              <div>
                <strong className="text-white block font-bold">Australian HQ:</strong>
                <span>{CONTACT.hq}, Australia</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#C5A265] shrink-0" />
              <div>
                <strong className="text-white block font-bold">Trading History:</strong>
                <span>Est. {BRAND.foundingYear} (20+ Years Continuous Operation)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#C5A265] shrink-0" />
              <div>
                <strong className="text-white block font-bold">Direct Phone Desk:</strong>
                <span>{CONTACT.phoneDisplay}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#C5A265] shrink-0" />
              <div>
                <strong className="text-white block font-bold">Freight Reach:</strong>
                <span>All States & Territories (Hydraulic Tail-Lift)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#183B2B]">
            <Link
              href="/contact/"
              className="w-full py-3.5 px-4 rounded-xl bg-[#C5A265] hover:bg-[#D4B27C] text-[#0E2A1E] font-black text-xs uppercase tracking-wider block text-center transition-all shadow-md active:scale-[0.98]"
            >
              Contact Sales & Workshop Desk
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 2: HISTORICAL MILESTONES TIMELINE */}
      <div className="space-y-8 pt-8 border-t border-[#D5DFD9]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#8A7045] bg-[#EBF1ED] px-3 py-1 rounded-full border border-[#D5DFD9] inline-block">
            Continuous Innovation
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Key Historical Milestones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND.milestones.map((m, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border border-[#D5DFD9] shadow-[0_4px_16px_-4px_rgba(14,42,30,0.06)] hover:border-[#C5A265] hover:shadow-md transition-all space-y-3">
              <span className="text-2xl font-black text-[#8A7045] block font-serif">
                {m.year}
              </span>
              <p className="text-xs text-[#3A5244] leading-relaxed font-medium">
                {m.event}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: 8 PILLARS OF DIFFERENTIATION */}
      <div className="space-y-8 pt-8 border-t border-[#D5DFD9]">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#8A7045] bg-[#EBF1ED] px-3 py-1 rounded-full border border-[#D5DFD9] inline-block">
            The Buggy Shop Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
            8 Pillars of Engineering & Service Superiority
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND.differentiation.map((item, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-2xl border border-[#D5DFD9] shadow-[0_4px_16px_-4px_rgba(14,42,30,0.06)] hover:border-[#C5A265] hover:shadow-md transition-all space-y-3 group">
              <div className="w-8 h-8 rounded-lg bg-[#0E2A1E] text-[#C5A265] border border-[#C5A265]/40 font-black text-sm flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                {idx + 1}
              </div>
              <p className="text-xs font-medium text-[#0E2A1E] leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
