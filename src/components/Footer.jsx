// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { SITE, CONTACT, BRAND, ENTITY } from '@/src/config/site';
import { getRootCategories } from '@/src/config/categories';
import { BRANDS } from '@/src/config/brands';
import { LOCATIONS } from '@/src/config/locations';
import { Phone, Mail, MapPin, Shield, Truck, Clock, Sparkles, ExternalLink, Award } from 'lucide-react';
import Logo from '@/src/components/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const rootCategories = getRootCategories();

  return (
    <footer className="bg-[#070B14] text-slate-300 border-t border-slate-800 pt-16 pb-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Authority Statement (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" showTagline={true} />

            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              {BRAND.description}
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Queensland Headquarters: {CONTACT.hq}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} 
                  className="hover:text-[#C5A880] transition-colors font-semibold"
                >
                  Direct Sales &amp; Technical Desk: {CONTACT.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Dispatch &amp; Quotes: <span dangerouslySetInnerHTML={{ __html: 'sales&#64;thebuggyshoppty.com.au' }} /></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Hours: {CONTACT.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Vehicle Categories */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A880]">
              Golf Buggy Categories
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/shop/" className="hover:text-[#C5A880] transition-colors font-medium">
                  All Golf Buggies for Sale
                </Link>
              </li>
              {rootCategories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/shop/${cat.slug}/`} className="hover:text-[#C5A880] transition-colors">
                    {cat.navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/compare/" className="text-[#C5A880] hover:underline font-bold transition-colors">
                  Side-by-Side Specs Matrix &rarr;
                </Link>
              </li>
              <li>
                <Link href="/finance/" className="hover:text-[#C5A880] transition-colors">
                  Commercial Fleet Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner Brands */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A880]">
              Partner Brands (27)
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link href="/brands/" className="hover:text-[#C5A880] transition-colors font-medium text-[#C5A880]">
                  View All 27 Brands &rarr;
                </Link>
              </li>
              <li>
                <Link href="/brands/mgi/" className="hover:text-[#C5A880] transition-colors">
                  MGI Golf Australia
                </Link>
              </li>
              <li>
                <Link href="/brands/motocaddy/" className="hover:text-[#C5A880] transition-colors">
                  Motocaddy UK
                </Link>
              </li>
              <li>
                <Link href="/brands/powakaddy/" className="hover:text-[#C5A880] transition-colors">
                  PowaKaddy Electric
                </Link>
              </li>
              <li>
                <Link href="/brands/clicgear/" className="hover:text-[#C5A880] transition-colors">
                  Clicgear &amp; Rovic
                </Link>
              </li>
              <li>
                <Link href="/brands/stewart-golf/" className="hover:text-[#C5A880] transition-colors">
                  Stewart Golf Follow
                </Link>
              </li>
              <li>
                <Link href="/brands/club-car/" className="hover:text-[#C5A880] transition-colors">
                  Club Car Resort Carts
                </Link>
              </li>
              <li>
                <Link href="/brands/yamaha/" className="hover:text-[#C5A880] transition-colors">
                  Yamaha Golf &amp; UTV
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Guarantees & Freight */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A880]">
              Freight &amp; Guarantees
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Hydraulic Tail-Lift Freight</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Direct delivery to private properties, golf resorts, and regional depots across Australia with complete pre-delivery testing.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>10% Crypto Rebate</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Instant Bitcoin (BTC) and Tether (USDT) settlement discount automatically applied on order drafts. PayID and Wire accepted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Australian City Delivery Hubs Strip */}
        <div className="py-8 border-b border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A880] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Australian State &amp; City Delivery Hubs</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Specialist golf buggy freight, pre-delivery setup, and factory warranty backup across major metro &amp; regional centres:
              </p>
            </div>
            <Link
              href="/golf-buggies/"
              className="text-xs text-[#C5A880] hover:underline font-bold whitespace-nowrap"
            >
              Explore All Delivery Hubs &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            {LOCATIONS.map(loc => (
              <Link
                key={loc.slug}
                href={`/golf-buggies/${loc.slug}/`}
                className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-[#C5A880]/40 text-slate-300 hover:text-[#C5A880] transition-colors block"
              >
                <div className="font-semibold">{loc.name}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">{loc.state} Hub</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {currentYear} {SITE.name} ({ENTITY.legalName}).</span>
            <span>ABN: <strong className="text-slate-300 font-mono">{ENTITY.abn}</strong></span>
            <span>&bull;</span>
            <a
              href={ENTITY.abnLookupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A880] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>Verify on ABR</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>&bull;</span>
            <span>All Prices Include 10% Australian GST</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/about/" className="hover:text-[#C5A880] transition-colors">
              Our Heritage
            </Link>
            <Link href="/contact/" className="hover:text-[#C5A880] transition-colors">
              Queensland Sales Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
