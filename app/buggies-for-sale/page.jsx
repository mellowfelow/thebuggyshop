// app/buggies-for-sale/page.jsx
// Landing page for the generic buying searches ("buggies for sale", "buggy for sale", "buy a buggy", "cheap buggy", "used buggy for sale")
// that no single category owns. It routes each searcher to the right range. Counts and prices come from the product data.
import { pageMeta } from '@/lib/pageMeta';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SITE, SHOP } from '@/src/config/core';
import { getProductsByCategory } from '@/src/config/products';
import { getCategoryBySlug } from '@/src/config/categories';
import JsonLd from '@/src/components/JsonLd';
import FaqSection from '@/src/components/FaqSection';
import RelatedLinks from '@/src/components/RelatedLinks';
import { relatedFor } from '@/src/config/related';
import { faqsForPage } from '@/src/config/faq';

const money = (n) => '$' + Math.round(n).toLocaleString('en-AU');
const ship = money(SHOP.shippingFee);

export const metadata = pageMeta({
  path: '/buggies-for-sale/',
  title: 'Buggies for Sale Australia | Golf, Off Road & Kids',
  description: `Buggies for sale in Australia: golf buggies, golf carts, dune, side by side, farm and kids buggies. New and used, GST included, flat ${ship} delivery.`,
});

// Each range a buyer might mean by "buggy", in the order people search for them.
const TYPES = [
  { slug: 'electric-golf-buggies', label: 'Electric golf buggies', note: 'Remote-control, follow-me and walk-behind buggies with lithium batteries.' },
  { slug: 'push-pull-golf-buggies', label: 'Push golf buggies', note: 'Lightweight 3 and 4 wheel push buggies that fold into a car boot.' },
  { slug: 'luxury-golf-carts', label: 'Golf carts', note: '2 seat and 4 to 6 seat ride-on carts, new and ex-lease.' },
  { slug: 'used-golf-buggies', label: 'Used buggies', note: 'Ex-demo and second hand buggies, checked before sale.' },
  { slug: 'dune-buggies', label: 'Dune buggies', note: 'Petrol beach and sand buggies from small to 300cc.' },
  { slug: 'side-by-side', label: 'Side by side buggies', note: 'Petrol and electric UTVs for farms, stations and recreation.' },
  { slug: 'farm-buggies', label: 'Farm buggies', note: 'Electric and petrol buggies for paddocks and property work.' },
  { slug: 'kids-buggies', label: "Kids' buggies", note: 'Electric and petrol buggies for younger riders.' },
];

export default function BuggiesForSalePage() {
  const rows = TYPES.map((t) => {
    const list = getProductsByCategory(t.slug);
    const prices = list.map((p) => p.price);
    return { ...t, n: list.length, min: Math.min(...prices), max: Math.max(...prices), cat: getCategoryBySlug(t.slug) };
  }).filter((r) => r.n > 0);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Buggies for Sale', item: `https://${SITE.domain}/buggies-for-sale/` },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      <JsonLd schema={breadcrumbSchema} />

      <div className="space-y-4 border-b border-[#DDE4DF] pb-8">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">Buggies for Sale</span>
        </nav>
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Buggies for Sale in Australia: Golf, Off Road &amp; Kids
          </h1>
          <p className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">
            A buggy is a small, light vehicle built for one job, whether that is carrying your clubs round a course, working a farm or running the dunes. We have buggies for sale in {rows.length} ranges, from {money(Math.min(...rows.map((r) => r.min)))}, with GST included and a flat {ship} delivery to every state.
          </p>
        </div>
      </div>

      <section className="space-y-5" aria-labelledby="types-h">
        <h2 id="types-h" className="text-2xl sm:text-3xl font-black text-[#0E2A1E] tracking-tight font-serif">Choose the buggy you are looking for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rows.map((r) => (
            <Link key={r.slug} href={`/shop/${r.slug}/`} className="p-5 rounded-3xl bg-white border border-[#D5DFD9] hover:border-[#C5A265] hover:shadow-lg transition-all group flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-black text-[#0E2A1E] font-serif group-hover:text-[#7A5C22] transition-colors">{r.label}</h3>
                <p className="text-xs text-[#4A5D53] leading-relaxed">{r.note}</p>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-[#0E2A1E] border-t border-[#E8ECE9] pt-3">
                <span>{r.n} {r.n === 1 ? 'model' : 'models'} from {money(r.min)}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A265] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl space-y-3" aria-labelledby="buy-h">
        <h2 id="buy-h" className="text-2xl font-black text-[#0E2A1E] font-serif">How to buy a buggy</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#4A5D53] leading-relaxed">
          <li><strong>Pick the job first.</strong> Golf buggies and carts are for the course, farm and side by side buggies are for property work, and dune and kids buggies are for recreation.</li>
          <li><strong>Compare new against used.</strong> A used or second hand buggy is the cheaper way in, and each used product page shows the matching new model where we list one.</li>
          <li><strong>Check where you will use it.</strong> Off road buggies are sold for private land. For road use read our <Link href="/blog/golf-cart-registration-qld-guide/" className="text-[#7A5C22] underline">Queensland</Link>, <Link href="/blog/golf-cart-registration-nsw-guide/" className="text-[#7A5C22] underline">NSW</Link> and <Link href="/blog/golf-cart-registration-victoria-guide/" className="text-[#7A5C22] underline">Victoria</Link> registration guides first.</li>
          <li><strong>Add up the full cost.</strong> Prices include GST, delivery is a flat {ship} per order, and accessories are 5% off when your order includes a buggy or cart.</li>
        </ul>
        <p className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">
          Want to see everything at once? Browse <Link href="/shop/" className="text-[#7A5C22] underline">all golf buggies for sale</Link>, or look for buggies for sale near you by <Link href="/golf-buggies/" className="text-[#7A5C22] underline">choosing your city</Link>.
        </p>
      </section>

      <FaqSection faqs={faqsForPage('/buggies-for-sale/')} url="/buggies-for-sale/" heading="Buying a buggy: your questions answered" id="buggies-faq" />

      <RelatedLinks links={relatedFor('/buggies-for-sale/')} />
    </div>
  );
}
