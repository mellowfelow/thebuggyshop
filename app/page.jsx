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
  HelpCircle
} from 'lucide-react';
import { SITE, BRAND, CONTACT, CATEGORIES, PRODUCTS, POSTS, SHOP, REVIEW_STATS } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import HomeClientProducts from './HomeClientProducts';
import ReviewsCarousel from '@/src/components/ReviewsCarousel';
import HeroSlider from '@/src/components/HeroSlider';
import CollapsibleFaq from '@/src/components/CollapsibleFaq';
import { HOMEPAGE_FAQS } from '@/src/config/faq';
import Image from 'next/image';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Golf Buggy for Sale Australia | Luxury, Remote & Off Road Buggies') },
  description: seoDesc('Explore premium golf buggies for sale in Australia. From remote control golf buggies and off road buggies to luxury golf carts with seats and used golf buggies for sale with 5-year warranty.'),
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
  // Select top 8 featured products (2 neat rows of 4 cards = 4/4 grid)
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 8);
  if (featuredProducts.length < 8) {
    const additional = PRODUCTS.filter(p => !p.featured).slice(0, 8 - featuredProducts.length);
    featuredProducts.push(...additional);
  }

  // Full Homepage JSON-LD with FAQPage schema
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
          "lowPrice": 449,
          "highPrice": 62500,
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
      },
      {
        "@type": "FAQPage",
        "@id": `https://${SITE.domain}/#faq`,
        "mainEntity": HOMEPAGE_FAQS.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <JsonLd schema={homeSchema} />

      {/* SECTION 1: FULL-WIDTH 4-SLIDE HERO REVOLUTION SLIDER */}
      <HeroSlider />

      {/* SECTION 2: TRUST BAR (4 PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#C5A880] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-[#C5A880] border border-slate-700 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-all">
              <Truck className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm text-slate-900 group-hover:text-[#C5A880] font-serif transition-colors">Hydraulic Tail-Lift Freight</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct to your door, golf club pro-shop, or rural property across regional QLD, NSW, VIC, SA &amp; WA.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#C5A880] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-[#C5A880] border border-slate-700 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-all">
              <FileCheck2 className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm text-slate-900 group-hover:text-[#C5A880] font-serif transition-colors">Turnkey Road Rego</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-fitted state-certified LED lighting, safety mirrors, amber beacon, and pre-filled QLD/NSW/VIC registration forms.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#C5A880] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-[#C5A880] border border-slate-700 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-all">
              <BatteryCharging className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm text-slate-900 group-hover:text-[#C5A880] font-serif transition-colors">5-Year Lithium Guarantee</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full 5-year transferable LiFePO4 lithium battery guarantee tested specifically for the Australian summer climate.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#C5A880] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-[#C5A880] border border-slate-700 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-all">
              <Wrench className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-sm text-slate-900 group-hover:text-[#C5A880] font-serif transition-colors">48-Hour Parts Dispatch</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive golf buggy accessories, tyres, windscreens, chargers, and controllers dispatched from Queensland.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CATEGORY EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#C5A880] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block">
            Complete Australian Buggy Inventory
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            Browse Golf Buggies for Sale by Category
          </h2>
          <p className="text-sm text-slate-600">
            From luxury golf resort carts and <strong>remote control golf buggies</strong> to heavy-duty <strong>off road buggies</strong> and quality <strong>used golf buggies for sale</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}/`}
              className="group relative rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-[#C5A880] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="product-frame relative overflow-hidden bg-slate-900">
                <Image
                  src={category.heroImage}
                  alt={`${category.name} - Golf Buggy for Sale`}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C5A880] bg-slate-950/90 px-2.5 py-1 rounded-full border border-[#C5A880]/40 inline-block mb-1">
                    {category.itemCount} Vehicles Available
                  </span>
                  <h3 className="font-extrabold text-lg sm:text-xl font-serif text-white group-hover:text-[#C5A880] transition-colors leading-tight">
                    {category.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {category.description}
                </p>
                <div className="text-xs font-black text-slate-900 group-hover:text-[#C5A880] transition-colors flex items-center justify-between pt-3 border-t border-slate-100 uppercase tracking-wider">
                  <span>Explore {category.name}</span>
                  <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#C5A880] group-hover:text-slate-950 flex items-center justify-center transition-all font-black shadow-xs">
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: FEATURED VEHICLES GRID (4/4 LAYOUT) */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#C5A880] bg-white px-3 py-1 rounded-full border border-slate-200 inline-block shadow-2xs">
                In Stock &amp; Ready for Immediate Dispatch
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
                Featured Golf Buggies &amp; Carts for Sale
              </h2>
            </div>

            <Link
              href="/shop/"
              className="inline-flex items-center gap-2 text-xs font-black text-slate-900 hover:text-[#C5A880] uppercase tracking-wider transition-colors bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs hover:border-[#C5A880]"
            >
              <span>View All Golf Buggy Sales ({PRODUCTS.length} Models)</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </Link>
          </div>

          <HomeClientProducts products={featuredProducts} />
        </div>
      </section>

      {/* SECTION 5: TURNKEY STATE ROAD REGISTRATION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-[#C5A880] text-xs font-bold uppercase tracking-wider border border-[#C5A880]/40 shadow-sm">
                <FileCheck2 className="w-4 h-4 text-[#C5A880]" />
                <span>Queensland &bull; NSW &bull; Victoria Conditional Rego</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight font-serif">
                Drive Turnkey Road-Legal Between Golf Courses, Estates &amp; Farms.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Navigating conditional buggy registration across Australian states is straightforward with our turnkey compliance packages. Every road-ready golf buggy arrives pre-fitted with automotive LED lighting, horn, panoramic mirrors, safety beacon, and pre-filled registration paperwork ready for your local transport authority.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>QLD TMR Code GOLF &amp; UTILITY Compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Transport for NSW Conditional Scheme</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>VicRoads Special Purpose Vehicle Permits</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Pre-filled State Transport Documentation</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/blog/conditional-road-registration-guide-qld-nsw-vic/"
                  className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.98]"
                >
                  <span>Read Australian Conditional Rego Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-inner">
              <h3 className="text-xs font-black text-[#C5A880] uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                <span>Factory Road Inclusions:</span>
              </h3>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C5A880] font-black">1.</span>
                  <span><strong>Automotive LED Lighting:</strong> Projector headlights, daytime running lights, brake lights, and turn indicators.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C5A880] font-black">2.</span>
                  <span><strong>Safety Warning Suite:</strong> Electric horn, reversing audio beeper, and flashing amber roof beacon.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C5A880] font-black">3.</span>
                  <span><strong>Dual Panoramic Mirrors:</strong> Convex adjustable side mirrors and wide-angle central mirror.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#C5A880] font-black">4.</span>
                  <span><strong>Australian Compliance Documentation:</strong> Certified vehicle identification plate and pre-filled registration application.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: AUSTRALIAN CUSTOMER REVIEWS (REAL VERIFIED EXPERIENCES) */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#C5A880] bg-white px-3 py-1 rounded-full border border-slate-200 inline-block shadow-2xs">
                Real Australian Golfers &amp; Property Owners
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
                Verified Reviews from Across Australia
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex text-amber-500 text-sm">
                {'★'.repeat(5)}
              </div>
              <span className="text-xs font-bold text-slate-700">
                {REVIEW_STATS.averageRating} / 5.0 Average ({REVIEW_STATS.totalReviews.toLocaleString('en-AU')}+ Verified Reviews Since 2014)
              </span>
            </div>
          </div>

          <ReviewsCarousel />
        </div>
      </section>

      {/* SECTION 7: INTERACTIVE COLLAPSIBLE FAQ ACCORDION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8" id="faq">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#C5A880] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            Golf Buggy Sales, Freight &amp; Lithium Tech FAQ
          </h2>
          <p className="text-sm text-slate-600">
            Answers to common questions regarding conditional road permits, remote gyroscope control, lithium warranties, and nationwide delivery.
          </p>
        </div>

        <CollapsibleFaq faqs={HOMEPAGE_FAQS} />
      </section>

      {/* SECTION 8: LATEST BUYING GUIDES & TECH ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#C5A880] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block">
              Australian Golf Buggy Guides
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
              Expert Advice &amp; Technical Insights
            </h2>
          </div>

          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-xs font-black text-slate-900 hover:text-[#C5A880] uppercase tracking-wider transition-colors"
          >
            <span>View All Guides &amp; Articles</span>
            <ArrowRight className="w-4 h-4 text-[#C5A880]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A880] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              <div className="product-frame relative overflow-hidden bg-slate-900">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={450}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 ease-out"
                />
                <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-xs text-[#C5A880] text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-[#C5A880]/40">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 font-medium">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}/`}>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#C5A880] transition-colors leading-snug font-serif">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <Link
                  href={`/blog/${post.slug}/`}
                  className="text-xs font-black text-slate-900 group-hover:text-[#C5A880] transition-colors inline-flex items-center justify-between pt-3 border-t border-slate-100 uppercase tracking-wider"
                >
                  <span>Read Guide</span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#C5A880] group-hover:text-slate-950 flex items-center justify-center transition-all font-black">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 9: INSTANT DISPATCH & WHATSAPP SETTLEMENT CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#C5A880] block bg-slate-950 px-4 py-1.5 rounded-full border border-slate-800 inline-block shadow-sm">
              Direct Australian Dispatch &amp; Quotes
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-serif">
              Looking for a Golf Buggy for Sale?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Connect directly with our Queensland technical sales desk via WhatsApp or phone for immediate stock availability, hydraulic tail-lift freight quotes, or fleet pricing.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                `Hi ${SITE.name}, I would like to inquire about golf buggies for sale, stock availability, and nationwide delivery.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 active:scale-[0.98]"
            >
              <span>Instant WhatsApp ({CONTACT.phoneDisplay})</span>
            </a>

            <a
              href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
              className="py-4 px-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#C5A880] font-bold text-sm uppercase tracking-wider border border-slate-700 transition-all flex items-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Sales Desk: {CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <div className="text-xs text-slate-400 pt-4 flex flex-wrap items-center justify-center gap-4">
            <span>&check; Australian PayID Direct</span>
            <span>&bull;</span>
            <span>&check; Direct Bank Transfer (Osko / Fast EFT)</span>
            <span>&bull;</span>
            <span className="text-[#C5A880] font-bold">&check; 10% Crypto Rebate (BTC/USDT)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
