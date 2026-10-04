'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Zap, 
  Scale, 
  Calculator,
  Compass,
  Radio,
  SlidersHorizontal
} from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site';

const SLIDES = [
  {
    id: 1,
    isH1: true,
    image: '/images/hero/hero-1.jpg',
    alt: 'Luxury Australian Golf Buggies for Sale - The Buggy Shop Queensland',
    eyebrow: 'AUSTRALIAN LUXURY GOLF BUGGIES • QUEENSLAND EST. 2004',
    titleMain: 'Premium ',
    titleAccent: 'Golf Buggy for Sale',
    titleSuffix: ' Across Australia.',
    subtitle: 'Turnkey Lithium Golf Carts, Remote Trolleys & Off Road Buggies',
    description: "Australia's leading destination for certified luxury golf buggies, motorized remote control golf buggies, 4x4 off road buggies, and verified used golf buggies for sale. Engineered with 5-year LiFePO4 lithium batteries, whisper-quiet AC motors, and nationwide hydraulic tail-lift delivery to your club, estate, or farm.",
    primaryCta: { label: 'Explore Golf Buggies for Sale', href: '/shop/' },
    secondaryCta: { label: 'Compare Specifications', href: '/compare/', icon: Scale },
    extraCta: { label: 'Finance & 10% Crypto Rebate →', href: '/finance/' },
    badge: 'Flagship Lithium Fleet',
  },
  {
    id: 2,
    isH1: false,
    image: '/images/hero/hero-2.jpg',
    alt: 'Remote Control Golf Buggies Australia - Active Gyro Stabilization',
    eyebrow: 'INTELLIGENT GYRO-STABILIZATION & DUAL 230W MOTORS',
    titleMain: 'Next-Gen ',
    titleAccent: 'Remote Control Golf Buggies',
    titleSuffix: ' with Downhill Braking.',
    subtitle: 'Whisper-Quiet 36-Hole Range with True Hands-Free Follow Technology',
    description: 'Master the undulating fairways with digital remote control precision. Features dual whisper-quiet 230W motors, auto-tracking downhill electronic brake system, quick-fold aerospace alloy frame, and luxury scorecard console with integrated seat.',
    primaryCta: { label: 'Shop Remote Buggies', href: '/shop/remote-golf-buggies/' },
    secondaryCta: { label: 'Remote Control Guide', href: '/golf-buggies/remote-control/', icon: Radio },
    extraCta: { label: 'View Electric Accessories →', href: '/shop/accessories/' },
    badge: 'Autonomous & Remote Series',
  },
  {
    id: 3,
    isH1: false,
    image: '/images/hero/hero-3.jpg',
    alt: 'Heavy-Duty 4x4 Off Road Buggies for Sale Australia Acreage & Farm Carts',
    eyebrow: 'HEAVY-DUTY DUAL MOTOR 4X4 • TOW RATED TO 1,200 KG',
    titleMain: 'Rugged ',
    titleAccent: 'Off Road Buggies for Sale',
    titleSuffix: ' for Acreage & Estates.',
    subtitle: 'High Ground Clearance, Heavy Duty Suspension & Conditional Road Compliance',
    description: 'Conquer tough terrain, rural paddocks, and steep homestead tracks. Equipped with heavy-duty independent double A-arm suspension, hydraulic disc brakes on all four wheels, 14-inch beadlock wheels, and steel front nudge bar with heavy winch.',
    primaryCta: { label: 'Explore Off Road 4x4 Carts', href: '/shop/off-road-buggies/' },
    secondaryCta: { label: 'Fleet & Ag Enquiries', href: '/wholesale/', icon: SlidersHorizontal },
    extraCta: { label: 'Conditional Rego Kit Included →', href: '/contact/' },
    badge: 'All-Terrain 4x4 Utility',
  },
  {
    id: 4,
    isH1: false,
    image: '/images/hero/hero-4.jpg',
    alt: 'Luxury Resort Multi-Passenger Golf Carts Australia',
    eyebrow: '5-YEAR LIFEPO4 BATTERY • 95 KM SINGLE-CHARGE RANGE',
    titleMain: 'Luxury ',
    titleAccent: 'Golf Carts for Sale',
    titleSuffix: ' & Resort Cruisers.',
    subtitle: '4-Seat & 6-Seat Forward-Facing Luxury Cruisers with Custom Gold Trim',
    description: 'Premium personal transport for gated golf communities, luxury resorts, and sporting complexes. Features automotive double-stitched diamond marine upholstery, 10.1-inch multimedia touchscreen with reverse camera, and Bluetooth sound system.',
    primaryCta: { label: 'Explore Resort Carts', href: '/shop/luxury-golf-carts/' },
    secondaryCta: { label: 'Speak with Specialist', href: '/contact/', icon: Compass },
    extraCta: { label: 'Nationwide Tail-Lift Delivery →', href: '/about/' },
    badge: 'Commercial & Resort Fleet',
  },
  {
    id: 5,
    isH1: false,
    image: '/images/hero/hero-5.jpg',
    alt: 'Certified Used Golf Buggies for Sale Australia - 5-Year Lithium Retrofits',
    eyebrow: 'WORKSHOP-CERTIFIED PRE-OWNED • COMPREHENSIVE WARRANTY',
    titleMain: 'Certified ',
    titleAccent: 'Used Golf Buggies',
    titleSuffix: ' & Ex-Demo Fleet.',
    subtitle: 'Workshop Inspected, Battery Conditioned & Road-Ready with Nationwide Delivery',
    description: 'Save thousands on premium refurbished golf carts and ex-demo motorized buggies. Every pre-owned vehicle undergoes a rigorous 42-point electrical and mechanical safety inspection, retrofitted with automotive-grade LiFePO4 lithium batteries and full Australian warranty.',
    primaryCta: { label: 'Browse Used Buggies', href: '/shop/used-golf-buggies/' },
    secondaryCta: { label: 'Speak with Workshop', href: '/contact/', icon: Sparkles },
    extraCta: { label: 'View Certified Inventory →', href: '/shop/' },
    badge: 'Certified Pre-Owned',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <section 
      className="relative w-full min-h-[620px] sm:min-h-[680px] lg:min-h-[740px] bg-slate-950 text-white overflow-hidden border-b border-slate-800 flex items-center"
      id="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="The Buggy Shop Featured Fleets Slider"
    >
      {/* Background Image Revolution Layers */}
      {SLIDES.map((s, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={`hero-slide-layer-${s.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={s.alt}
              className={`w-full h-full object-cover object-center transform transition-transform duration-10000 ease-out brightness-[1.06] contrast-[1.02] ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `/images/hero/hero-${s.id}.jpg`;
              }}
            />
            {/* Luminous, soft scrim: keeps images bright and vibrant across the frame while maintaining crystal-clear text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* Foreground Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 relative z-10 w-full">
        <div className="max-w-3xl space-y-6 sm:space-y-7">
          
          {/* Badge & Category Indicator */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-[#C5A880]/60 text-[#C5A880] text-xs font-black uppercase tracking-widest shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
              <span>{slide.eyebrow}</span>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-md bg-[#0F172A]/80 border border-slate-700/80 text-[11px] font-bold text-slate-300">
              {slide.badge}
            </span>
          </div>

          {/* Heading (Mandatory Single <h1> on Slide 1; Styled <div> on other slides) */}
          <div className="space-y-2.5">
            {slide.isH1 ? (
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-serif drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {slide.titleMain}
                <span className="text-[#C5A880]">{slide.titleAccent}</span>
                {slide.titleSuffix}
              </h1>
            ) : (
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] font-serif drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                {slide.titleMain}
                <span className="text-[#C5A880]">{slide.titleAccent}</span>
                {slide.titleSuffix}
              </div>
            )}
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#C5A880] font-serif drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
              {slide.subtitle}
            </p>
          </div>

          {/* Descriptive Copy */}
          <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-normal max-w-2xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
            {slide.description}
          </p>

          {/* CTAs Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={slide.primaryCta.href}
              className="py-4 px-8 rounded-xl bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(197,168,128,0.45)] flex items-center gap-2.5 group cursor-pointer active:scale-[0.98]"
            >
              <span>{slide.primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            {slide.secondaryCta && (
              <Link
                href={slide.secondaryCta.href}
                className="py-4 px-6 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700/80 backdrop-blur-md transition-all flex items-center gap-2 shadow-md hover:border-[#C5A880]/50"
              >
                {slide.secondaryCta.icon && (
                  <slide.secondaryCta.icon className="w-4 h-4 text-[#C5A880]" />
                )}
                <span>{slide.secondaryCta.label}</span>
              </Link>
            )}

            {slide.extraCta && (
              <Link
                href={slide.extraCta.href}
                className="text-xs font-black text-[#C5A880] hover:text-white uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 py-2 px-1"
              >
                <Calculator className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{slide.extraCta.label}</span>
              </Link>
            )}
          </div>

          {/* Bottom Trust Indicators Micro-Bar */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <strong className="text-white block font-bold">Tail-Lift Freight</strong>
                <span className="text-[11px] text-slate-400">All States & Regional</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <strong className="text-white block font-bold">5-Yr Lithium Pack</strong>
                <span className="text-[11px] text-slate-400">3,500+ Deep Cycles</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <strong className="text-white block font-bold">10% Instant Rebate</strong>
                <span className="text-[11px] text-slate-400">Direct Crypto (BTC/USDT)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Slider Controls: Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-[#C5A880] text-white hover:text-slate-950 border border-slate-700 hover:border-[#C5A880] backdrop-blur-md flex items-center justify-center transition-all shadow-xl z-20 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-[#C5A880] text-white hover:text-slate-950 border border-slate-700 hover:border-[#C5A880] backdrop-blur-md flex items-center justify-center transition-all shadow-xl z-20 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Revolution Pagination & Progress Tracker */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20 bg-slate-950/70 backdrop-blur-md px-4 py-2 rounded-full border border-slate-800">
        <span className="text-[11px] font-bold text-[#C5A880] font-mono">
          0{currentSlide + 1}
        </span>
        <div className="flex items-center gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={`hero-bullet-nav-${s.id}`}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${s.titleAccent}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide
                  ? 'w-8 bg-[#C5A880]'
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] font-medium text-slate-400 font-mono">
          / 0{SLIDES.length}
        </span>
      </div>
    </section>
  );
}
