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
    <footer className="bg-[#071810] text-[#D3DFD8] border-t border-[#143224] pt-16 pb-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#143224]">
          {/* Column 1: Brand & Authority Statement (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" showTagline={true} />

            <p className="text-sm text-[#A6BCB0] leading-relaxed pt-2">
              {BRAND.description}
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-[#D3DFD8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A265] shrink-0 mt-0.5" />
                <span>Queensland Headquarters: {CONTACT.hq}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A265] shrink-0" />
                <a 
                  href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`} 
                  className="hover:text-[#C5A265] transition-colors font-semibold"
                >
                  Direct Sales & Technical Desk: {CONTACT.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A265] shrink-0" />
                <span>Dispatch & Quotes: <span dangerouslySetInnerHTML={{ __html: 'sales&#64;thebuggyshop.com.au' }} /></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C5A265] shrink-0" />
                <span>Hours: {CONTACT.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Vehicle Categories */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A265]">
              Golf Buggy Categories
            </h3>
            <ul className="space-y-2 text-sm text-[#D3DFD8]">
              <li>
                <Link href="/shop/" className="hover:text-[#C5A265] transition-colors font-medium">
                  All Golf Buggies for Sale
                </Link>
              </li>
              {rootCategories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/shop/${cat.slug}/`} className="hover:text-[#C5A265] transition-colors">
                    {cat.navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/compare/" className="text-[#C5A265] hover:underline font-bold transition-colors">
                  Side-by-Side Specs Matrix →
                </Link>
              </li>
              <li>
                <Link href="/finance/" className="hover:text-[#C5A265] transition-colors">
                  Commercial Fleet Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Partner Brands */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A265]">
              Partner Brands (27)
            </h3>
            <ul className="space-y-2 text-sm text-[#D3DFD8]">
              <li>
                <Link href="/brands/" className="hover:text-[#C5A265] transition-colors font-medium text-[#C5A265]">
                  View All 27 Brands →
                </Link>
              </li>
              <li>
                <Link href="/brands/mgi/" className="hover:text-[#C5A265] transition-colors">
                  MGI Golf Australia
                </Link>
              </li>
              <li>
                <Link href="/brands/motocaddy/" className="hover:text-[#C5A265] transition-colors">
                  Motocaddy UK
                </Link>
              </li>
              <li>
                <Link href="/brands/powakaddy/" className="hover:text-[#C5A265] transition-colors">
                  PowaKaddy Electric
                </Link>
              </li>
              <li>
                <Link href="/brands/clicgear/" className="hover:text-[#C5A265] transition-colors">
                  Clicgear & Rovic
                </Link>
              </li>
              <li>
                <Link href="/brands/stewart-golf/" className="hover:text-[#C5A265] transition-colors">
                  Stewart Golf Follow
                </Link>
              </li>
              <li>
                <Link href="/brands/club-car/" className="hover:text-[#C5A265] transition-colors">
                  Club Car Resort Carts
                </Link>
              </li>
              <li>
                <Link href="/brands/yamaha/" className="hover:text-[#C5A265] transition-colors">
                  Yamaha Golf & UTV
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Guarantees & Freight */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A265]">
              Freight & Guarantees
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#0E2A1E] border border-[#C5A265]/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C5A265]" />
                  <span>Hydraulic Tail-Lift Freight</span>
                </div>
                <p className="text-[11px] text-[#A6BCB0]">
                  Direct delivery to private properties, golf resorts, and regional depots across Australia with complete pre-delivery testing.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0E2A1E] border border-[#C5A265]/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
                  <span>10% Crypto / PayID Rebate</span>
                </div>
                <p className="text-[11px] text-[#A6BCB0]">
                  Instant Bitcoin (BTC) and Tether (USDT) settlement discount automatically applied on order drafts. PayID and Wire accepted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Australian City Delivery Hubs Strip */}
        <div className="py-8 border-b border-[#143224]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A265] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A265]" />
                <span>Australian State & City Delivery Hubs</span>
              </h3>
              <p className="text-xs text-[#8BA496] mt-0.5">
                Specialist golf buggy freight, pre-delivery setup, and factory warranty backup across major metro & regional centres:
              </p>
            </div>
            <Link
              href="/golf-buggies/"
              className="text-xs text-[#C5A265] hover:underline font-bold whitespace-nowrap"
            >
              Explore All Delivery Hubs →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            {LOCATIONS.map(loc => (
              <Link
                key={loc.slug}
                href={`/golf-buggies/${loc.slug}/`}
                className="p-2.5 rounded-lg bg-[#0E2A1E]/70 hover:bg-[#133726] border border-[#183B2B] hover:border-[#C5A265]/40 text-[#D3DFD8] hover:text-[#C5A265] transition-colors block"
              >
                <div className="font-semibold">{loc.name}</div>
                <div className="text-[10px] text-[#8BA496] font-mono mt-0.5">{loc.state} Hub</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8BA496]">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {currentYear} {SITE.name} ({ENTITY.legalName}).</span>
            <span>ABN: <strong className="text-white font-mono">{ENTITY.abn}</strong></span>
            <span>•</span>
            <a
              href={ENTITY.abnLookupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A265] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>Verify on ABR</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span>All Prices Include 10% Australian GST</span>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/faq/" className="hover:text-[#C5A265] transition-colors">
              FAQ
            </Link>
            <Link href="/about/" className="hover:text-[#C5A265] transition-colors">
              Our Heritage
            </Link>
            <Link href="/contact/" className="hover:text-[#C5A265] transition-colors">
              Queensland Sales Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
