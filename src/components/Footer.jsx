// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { SITE, CONTACT, BRAND, CATEGORIES, ENTITY } from '@/src/config/site';
import { Phone, Mail, MapPin, Shield, Truck, Clock, Sparkles, ExternalLink } from 'lucide-react';
import Logo from '@/src/components/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

          {/* Column 2: Vehicle Ranges */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A265]">
              Golf Buggy Ranges
            </h3>
            <ul className="space-y-2 text-sm text-[#D3DFD8]">
              <li>
                <Link href="/shop/" className="hover:text-[#C5A265] transition-colors font-medium">
                  All Golf Buggies for Sale
                </Link>
              </li>
              {CATEGORIES.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/shop/${cat.slug}/`} className="hover:text-[#C5A265] transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/compare/" className="text-[#C5A265] hover:underline font-bold transition-colors">
                  Side-by-Side Specs Matrix →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ownership & Guides */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A265]">
              Heritage & Guides
            </h3>
            <ul className="space-y-2 text-sm text-[#D3DFD8]">
              <li>
                <Link href="/blog/conditional-road-registration-guide-qld-nsw-vic/" className="hover:text-[#C5A265] transition-colors">
                  QLD/NSW/VIC Conditional Rego
                </Link>
              </li>
              <li>
                <Link href="/blog/lifepo4-vs-lead-acid-battery-lifespan-australian-climate/" className="hover:text-[#C5A265] transition-colors">
                  5-Year LiFePO4 Lithium Guarantee
                </Link>
              </li>
              <li>
                <Link href="/blog/diesel-utv-vs-electric-buggy-running-cost-comparison/" className="hover:text-[#C5A265] transition-colors">
                  Electric vs Diesel ROI Analysis
                </Link>
              </li>
              <li>
                <Link href="/#customer-reviews-section" className="hover:text-[#C5A265] transition-colors font-semibold flex items-center gap-1 text-[#C5A265]">
                  <span>★ 4.6/5.0 Verified Reviews (43)</span>
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-[#C5A265] transition-colors">
                  Australian Heritage (Est. 2004)
                </Link>
              </li>
              <li>
                <Link href="/finance/" className="hover:text-[#C5A265] transition-colors">
                  Commercial Fleet Finance
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment & Delivery Guarantees */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#C5A265]">
              Freight & Guarantees
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#0E2A1E] border border-[#C5A265]/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C5A265]" />
                  <span>Hydraulic Tail-Lift Delivery</span>
                </div>
                <p className="text-[11px] text-[#A6BCB0]">
                  Direct delivery to private properties, golf resorts, and regional depots across Australia with complete pre-delivery testing.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#0E2A1E] border border-[#C5A265]/20 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
                  <span>10% Crypto Rebate (BTC / USDT)</span>
                </div>
                <p className="text-[11px] text-[#A6BCB0]">
                  Instant Bitcoin (BTC) and Tether (USDT) settlement discount automatically applied on order drafts. PayID and Wire accepted.
                </p>
              </div>
            </div>
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
