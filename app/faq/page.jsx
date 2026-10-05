import Link from 'next/link';
import JsonLd from '@/src/components/JsonLd';
import CollapsibleFaq from '@/src/components/CollapsibleFaq';
import { SITE } from '@/src/config/site';
import { HOMEPAGE_FAQS } from '@/src/config/faq';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Golf Buggy FAQ Australia') },
  description: seoDesc('Answers on road-legal golf buggies, freight, lithium batteries, finance and warranty from The Buggy Shop.'),
  alternates: { canonical: `https://${SITE.domain}/faq/` },
};

export default function FaqPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: HOMEPAGE_FAQS.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
          { '@type': 'ListItem', position: 2, name: 'FAQ', item: `https://${SITE.domain}/faq/` },
        ],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8">
      <JsonLd schema={schema} />
      <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
        <span>/</span>
        <span className="text-[#0E2A1E] font-bold">FAQ</span>
      </nav>
      <header className="space-y-3 border-b border-[#D5DFD9] pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
          Golf Buggy Questions, Answered
        </h1>
        <p className="text-sm text-[#4A5D53] leading-relaxed">
          Road registration, freight, batteries and finance. Still need help?{' '}
          <Link href="/contact/" className="underline font-semibold">Contact our Queensland sales desk</Link>.
        </p>
      </header>
      <CollapsibleFaq faqs={HOMEPAGE_FAQS} />
    </div>
  );
}
