// src/components/Nav.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Phone, 
  Scale, 
  ShieldCheck, 
  Truck, 
  ChevronDown,
  Award
} from 'lucide-react';
import { SITE, CONTACT, ENTITY } from '@/src/config/site';
import { getRootCategories } from '@/src/config/categories';
import { BRANDS } from '@/src/config/brands';
import Logo from '@/src/components/Logo';

export default function Nav({ cartCount = 0, onOpenCart, compareCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const rootCategories = getRootCategories();

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    setBrandsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0E2A1E] text-white shadow-lg border-b border-[#1A3D2D]" id="site-header">
      {/* Top Luxury Utility Bar */}
      <div className="bg-[#071810] border-b border-[#143224] text-xs py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4 text-[#D3DFD8]">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#C5A265]" />
              <span>Australia-Wide Hydraulic Tail-Lift Delivery to Your Property or Club</span>
            </span>
            <span className="hidden md:inline text-[#2A4D3B]">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-[#D3DFD8]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A265]" />
              <span>5-Year LiFePO4 Lithium Guarantee · Est. 2004</span>
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <a 
              href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-[#C5A265] hover:text-[#E5CCA0] font-semibold transition-colors"
              aria-label={`Call Queensland Sales Desk at ${CONTACT.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Sales: {CONTACT.phoneDisplay}</span>
            </a>
            <span className="text-[#2A4D3B]">|</span>
            <span className="text-[#C5A265] font-semibold bg-[#123123] px-2.5 py-0.5 rounded-full border border-[#C5A265]/30">
              10% Crypto / PayID Rebate
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo onClick={closeMenus} />

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6" aria-label="Main Navigation">
          {/* Shop Categories Mega Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <Link 
              href="/shop/" 
              className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider py-2 transition-colors ${
                pathname.startsWith('/shop') ? 'text-[#C5A265]' : 'text-slate-100 hover:text-[#C5A265]'
              }`}
              id="nav-shop-link"
            >
              <span>SHOP</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`} />
            </Link>

            {shopDropdownOpen && (
              <div className="absolute top-full left-0 w-96 bg-[#0A2016] border border-[#C5A265]/30 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[10px] font-black text-[#C5A265] uppercase tracking-widest px-2 py-1 border-b border-[#183B2B] flex items-center justify-between">
                  <span>Golf & All-Terrain Categories</span>
                  <span className="text-[9px] text-[#A6BCB0]">35 Specialist Sectors</span>
                </div>
                <div className="mt-2 space-y-1">
                  {rootCategories.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/shop/${cat.slug}/`}
                      className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#133726] text-slate-100 hover:text-[#C5A265] transition-colors"
                      onClick={closeMenus}
                    >
                      <span className="font-bold text-xs">{cat.navLabel}</span>
                      <span className="text-[10px] text-[#A6BCB0] opacity-70">Browse →</span>
                    </Link>
                  ))}
                  <div className="border-t border-[#183B2B] pt-2.5 mt-2 flex items-center justify-between px-2">
                    <Link
                      href="/shop/"
                      className="text-xs text-[#C5A265] hover:underline font-bold"
                      onClick={closeMenus}
                    >
                      View All 35 Categories →
                    </Link>
                    <Link
                      href="/compare/"
                      className="text-xs text-[#A6BCB0] hover:text-white"
                      onClick={closeMenus}
                    >
                      Compare Specs
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Brands Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setBrandsDropdownOpen(true)}
            onMouseLeave={() => setBrandsDropdownOpen(false)}
          >
            <Link 
              href="/brands/" 
              className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider py-2 transition-colors ${
                pathname.startsWith('/brands') ? 'text-[#C5A265]' : 'text-slate-100 hover:text-[#C5A265]'
              }`}
              id="nav-brands-link"
            >
              <Award className="w-3.5 h-3.5 text-[#C5A265]" />
              <span>BRANDS</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${brandsDropdownOpen ? 'rotate-180' : ''}`} />
            </Link>

            {brandsDropdownOpen && (
              <div className="absolute top-full left-0 w-80 bg-[#0A2016] border border-[#C5A265]/30 rounded-2xl shadow-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="text-[10px] font-black text-[#C5A265] uppercase tracking-widest px-2 py-1 border-b border-[#183B2B]">
                  Featured Manufacturers
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {BRANDS.map(b => (
                    <Link
                      key={b.slug}
                      href={`/brands/${b.slug}/`}
                      className="px-2.5 py-1.5 rounded-lg hover:bg-[#133726] text-slate-200 hover:text-[#C5A265] text-xs font-medium transition-colors"
                      onClick={closeMenus}
                    >
                      {b.name}
                    </Link>
                  ))}
                </div>
                <div className="border-t border-[#183B2B] pt-2 mt-2 px-2">
                  <Link
                    href="/brands/"
                    className="block text-xs text-[#C5A265] hover:underline font-bold"
                    onClick={closeMenus}
                  >
                    All 27 Partner Brands →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link 
            href="/compare/" 
            className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname === '/compare/' ? 'text-[#C5A265]' : 'text-slate-100 hover:text-[#C5A265]'
            }`}
            id="nav-compare-link"
          >
            <Scale className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>COMPARE</span>
            {compareCount > 0 && (
              <span className="bg-[#C5A265] text-[#0E2A1E] text-[10px] font-black px-1.5 py-0.2 rounded-full">
                {compareCount}
              </span>
            )}
          </Link>

          <Link 
            href="/about/" 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname === '/about/' ? 'text-[#C5A265]' : 'text-slate-100 hover:text-[#C5A265]'
            }`}
            id="nav-about-link"
          >
            HERITAGE
          </Link>

          <Link 
            href="/blog/" 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname.startsWith('/blog') ? 'text-[#C5A265]' : 'text-slate-100 hover:text-[#C5A265]'
            }`}
            id="nav-blog-link"
          >
            GUIDES
          </Link>

          <Link 
            href="/contact/" 
            className={`text-xs font-bold uppercase tracking-wider transition-colors ${
              pathname === '/contact/' ? 'text-[#C5A265]' : 'text-slate-100 hover:text-[#C5A265]'
            }`}
            id="nav-contact-link"
          >
            SALES DESK
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            href="/search/"
            className="p-2.5 text-[#D3DFD8] hover:text-[#C5A265] hover:bg-[#163E2D] rounded-xl transition-colors"
            aria-label="Search Golf Buggies and Accessories"
            id="nav-search-btn"
          >
            <Search className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2 sm:px-3 sm:py-2 text-[#D3DFD8] hover:text-white bg-[#143929] hover:bg-[#1A4732] border border-[#C5A265]/30 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            aria-label={`View order draft with ${cartCount} items`}
            id="nav-cart-btn"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A265]" />
            <span className="hidden sm:inline text-xs font-black tracking-wider text-slate-100">ORDER DRAFT</span>
            {cartCount > 0 && (
              <span className="bg-[#C5A265] text-[#0E2A1E] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-[#D3DFD8] hover:text-white hover:bg-[#163E2D] rounded-xl"
            aria-label="Toggle navigation menu"
            id="nav-mobile-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#C5A265]" />}
          </button>
        </div>
      </div>

      {/* Official ABN Credential & ABR Verification Bar under Nav */}
      <div className="bg-gradient-to-r from-[#071810] via-[#0B2317] to-[#071810] border-t border-b border-[#1A3D2D] text-[11px] py-1.5 px-4 sm:px-8 text-[#D3DFD8] shadow-inner" id="abn-verification-bar">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <span className="font-extrabold text-[#C5A265] uppercase tracking-wider text-[10px] bg-[#123123] px-2 py-0.5 rounded border border-[#C5A265]/40">
              Corporate Entity
            </span>
            <span className="font-bold text-white font-serif">{ENTITY.legalName}</span>
            <span className="text-[#2A4D3B] hidden sm:inline">•</span>
            <span className="text-[#D3DFD8]">
              ABN: <strong className="text-white font-mono tracking-wide">{ENTITY.abn}</strong>
            </span>
            <a
              href={ENTITY.abnLookupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#C5A265] hover:bg-[#D4B27C] text-[#0E2A1E] font-black text-[10px] uppercase tracking-wider transition-all shadow-xs group cursor-pointer"
              title="Verify TBS NO.2 PTY LTD on Australian Business Register (ABR)"
              id="nav-abn-verify-link"
            >
              <ShieldCheck className="w-3 h-3 text-[#0E2A1E]" />
              <span>Verify on ABR</span>
              <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3 text-[11px] text-[#A6BCB0]">
            <span className="flex items-center gap-1 text-[#C5A265]">
              <span>✓ ASIC / ABR Registered</span>
            </span>
            <span className="text-[#2A4D3B]">•</span>
            <span>Queensland Workshop & Dispatch Hub</span>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A2016] border-t border-[#183B2B] px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200" id="nav-mobile-drawer">
          <div className="space-y-2">
            <Link
              href="/shop/"
              onClick={closeMenus}
              className="block font-black text-sm uppercase tracking-wider text-white hover:text-[#C5A265] py-2 border-b border-[#183B2B]"
            >
              🏌️ ALL GOLF BUGGIES & CARTS FOR SALE
            </Link>
            <div className="pl-3 space-y-2 text-xs">
              {rootCategories.map(cat => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}/`}
                  onClick={closeMenus}
                  className="block text-[#D3DFD8] hover:text-[#C5A265] py-1"
                >
                  • {cat.navLabel}
                </Link>
              ))}
            </div>

            <Link
              href="/brands/"
              onClick={closeMenus}
              className="block font-bold text-xs uppercase tracking-wider text-white hover:text-[#C5A265] py-2.5 border-b border-[#183B2B]"
            >
              🏆 GOLF BUGGY BRANDS (MGI, MOTOCADDY, CLUB CAR)
            </Link>

            <Link
              href="/compare/"
              onClick={closeMenus}
              className="flex items-center justify-between font-bold text-xs uppercase tracking-wider text-white hover:text-[#C5A265] py-2.5 border-b border-[#183B2B]"
            >
              <span>⚖️ VEHICLE COMPARISON MATRIX</span>
              {compareCount > 0 && (
                <span className="bg-[#C5A265] text-[#0E2A1E] text-[10px] font-black px-2 py-0.5 rounded-full">
                  {compareCount} Selected
                </span>
              )}
            </Link>

            <Link
              href="/about/"
              onClick={closeMenus}
              className="block font-bold text-xs uppercase tracking-wider text-white hover:text-[#C5A265] py-2.5 border-b border-[#183B2B]"
            >
              🏛️ ABOUT OUR AUSTRALIAN HERITAGE
            </Link>

            <Link
              href="/blog/"
              onClick={closeMenus}
              className="block font-bold text-xs uppercase tracking-wider text-white hover:text-[#C5A265] py-2.5 border-b border-[#183B2B]"
            >
              📰 BUYER&apos;S GUIDES & REGISTRATION
            </Link>

            <Link
              href="/contact/"
              onClick={closeMenus}
              className="block font-bold text-xs uppercase tracking-wider text-white hover:text-[#C5A265] py-2.5 border-b border-[#183B2B]"
            >
              📞 QUEENSLAND SALES DESK
            </Link>
          </div>

          <div className="pt-4 border-t border-[#183B2B] space-y-3 text-xs text-[#D3DFD8]">
            <div>📍 Queensland Distribution & Workshop: {CONTACT.hq}</div>
            <div>⚡ Direct Dispatch: {CONTACT.phoneDisplay}</div>
            <a 
              href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent("Hello! I would like to inquire about golf buggy models for sale, stock availability, and nationwide tail-lift freight.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full py-3 bg-[#C5A265] hover:bg-[#D4B27C] text-[#0E2A1E] font-black rounded-xl uppercase tracking-wider transition-all shadow-md mt-2"
            >
              Connect on WhatsApp Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
