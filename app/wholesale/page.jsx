import { pageMeta } from '@/lib/pageMeta';
import Link from 'next/link';
import JsonLd from '@/src/components/JsonLd';
import { SITE, CONTACT } from '@/src/config/site';
import { PRODUCTS } from '@/src/config/products';
import { SHOP } from '@/src/config/core';
import WholesaleFormClient from './WholesaleFormClient';
import FaqSection from '@/src/components/FaqSection';
import { faqsForPage } from '@/src/config/faq';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = pageMeta({
  path: '/wholesale/',
  title: 'Fleet & Wholesale Golf Buggies',
  description: 'Fleet, club, resort and farm pricing on golf buggies, ride-on carts and utility vehicles. Apply for wholesale terms with The Buggy Shop.',
});

const money = (n) => `$${Number(n).toLocaleString('en-AU')}`;
const minPrice = (fn) => Math.min(...PRODUCTS.filter(fn).map((p) => p.price));

export default function WholesalePage() {
  // Starting prices come from the product data, so this page never carries a hand-typed number.
  const ranges = [
    { label: 'Ride-on golf carts (new)', from: minPrice((p) => p.category === 'luxury-golf-carts' && p.condition === 'New'), href: '/shop/luxury-golf-carts/' },
    { label: 'Used and ex-lease carts', from: minPrice((p) => p.category === 'luxury-golf-carts' && p.condition !== 'New'), href: '/shop/used-golf-buggies/' },
    { label: 'Electric and remote golf buggies', from: minPrice((p) => p.category === 'electric-golf-buggies'), href: '/shop/electric-golf-buggies/' },
    { label: 'Off-road buggies and side-by-sides', from: minPrice((p) => p.category === 'off-road-buggies'), href: '/shop/off-road-buggies/' },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Wholesale', item: `https://${SITE.domain}/wholesale/` },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={schema} />
      <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
        <span>/</span>
        <span className="text-[#0E2A1E] font-bold">Wholesale</span>
      </nav>

      <header className="space-y-3 border-b border-[#D5DFD9] pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
          Fleet &amp; Wholesale Golf Buggies
        </h1>
        <p className="text-sm text-[#4A5D53] leading-relaxed max-w-2xl">
          Clubs, resorts, retirement villages, wineries and farms buying more than one vehicle can apply for fleet pricing. Tell us what you need and our commercial team will come back within 1 business day with options.
          You can also call or WhatsApp {CONTACT.phoneDisplay}.
        </p>
      </header>

      <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#D5DFD9] shadow-md">
        <WholesaleFormClient />
      </div>

      <section className="space-y-4 max-w-3xl" aria-labelledby="ws-range">
        <h2 id="ws-range" className="text-xl sm:text-2xl font-black text-[#0E2A1E] tracking-tight font-serif">What fleet buyers ask us to quote</h2>
        <p className="text-sm text-[#2F4439] leading-relaxed">
          Starting prices below are single-unit prices including GST. Fleet pricing is confirmed in writing after you send the form, once we know the models and quantities.
        </p>
        <ul className="grid sm:grid-cols-2 gap-3">
          {ranges.map((r) => (
            <li key={r.label} className="bg-white rounded-2xl border border-[#D5DFD9] p-4">
              <Link href={r.href} className="text-sm font-bold text-[#0E2A1E] hover:text-[#7A5C22] underline underline-offset-2">{r.label}</Link>
              <div className="text-xs text-[#4A5D53] mt-1">from {money(r.from)}</div>
            </li>
          ))}
        </ul>
        <h2 className="text-xl sm:text-2xl font-black text-[#0E2A1E] tracking-tight font-serif pt-2">How it works</h2>
        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-[#2F4439] leading-relaxed">
          <li>Send the form with your business name, the models you are considering and roughly how many units.</li>
          <li>Our commercial team replies within 1 business day with options.</li>
          <li>Pay by bank transfer, PayID or commercial invoice, or take {SHOP.cryptoDiscount}% off with Bitcoin or USDT. Delivery for multi-vehicle orders is quoted with your fleet pricing.</li>
        </ol>
      </section>

      <FaqSection faqs={faqsForPage('/wholesale/')} url="/wholesale/" heading="Fleet orders: delivery, payment and warranty" id="wholesale-faq" />
    </div>
  );
}
