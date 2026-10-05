import Link from 'next/link';
import JsonLd from '@/src/components/JsonLd';
import { SITE, CONTACT } from '@/src/config/site';
import WholesaleFormClient from './WholesaleFormClient';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Fleet & Wholesale Golf Buggies') },
  description: seoDesc('Fleet, club, resort and farm pricing on golf buggies, ride-on carts and utility vehicles. Apply for wholesale terms with The Buggy Shop.'),
  alternates: { canonical: `https://${SITE.domain}/wholesale/` },
};

export default function WholesalePage() {
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
    </div>
  );
}
