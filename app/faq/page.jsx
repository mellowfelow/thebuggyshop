import Link from 'next/link';
import JsonLd from '@/src/components/JsonLd';
import CollapsibleFaq from '@/src/components/CollapsibleFaq';
import { SITE } from '@/src/config/site';
import { FAQ_BANK, FAQ_THEMES } from '@/src/config/faq';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Golf Buggy FAQ Australia | Prices, Delivery & Rules') },
  description: seoDesc('Answers on golf buggy and golf cart prices, delivery, payment, speed, range, batteries and road rules from The Buggy Shop in Queensland.'),
  alternates: { canonical: `https://${SITE.domain}/faq/` },
};

export default function FaqPage() {
  const faqs = FAQ_BANK.filter((f) => f.pages.includes('/faq/') || f.home);
  const themes = FAQ_THEMES.map((name) => ({ name, items: faqs.filter((f) => f.theme === name) })).filter((t) => t.items.length);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
      },
      { '@type': 'WebPage', url: `https://${SITE.domain}/faq/`, speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.faq-answer-speakable'] } },
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
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
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
        <p className="text-sm text-[#4A5D53] leading-relaxed faq-intro">
          Golf buggies are wheeled trolleys that carry your clubs, and golf carts are ride-on electric vehicles. Below are straight answers on prices, delivery, payment, warranty, range and road rules. Still need help?{' '}
          <Link href="/contact/" className="underline font-semibold">Contact our Queensland sales desk</Link>.
        </p>
      </header>
      {themes.map((theme, i) => (
        <section key={theme.name} className="space-y-5" aria-labelledby={`faq-theme-${i}`}>
          <h2 id={`faq-theme-${i}`} className="text-xl sm:text-2xl font-black text-[#0E2A1E] font-serif">{theme.name}</h2>
          <CollapsibleFaq faqs={theme.items} idPrefix={`faq-theme-${i}`} support={i === themes.length - 1} />
        </section>
      ))}
    </div>
  );
}
