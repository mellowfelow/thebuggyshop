// src/components/FaqSection.jsx
// A page-level FAQ block: the visible accordion plus FAQPage and speakable JSON-LD (server component).
import React from 'react';
import JsonLd from '@/src/components/JsonLd';
import CollapsibleFaq from '@/src/components/CollapsibleFaq';
import { SITE } from '@/src/config/site';

export default function FaqSection({ faqs, heading = 'Frequently asked questions', url = '/', id = 'page-faq' }) {
  if (!faqs?.length) return null;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  };
  const speakable = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `https://${SITE.domain}${url}`,
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.faq-answer-speakable'] },
  };
  return (
    <section className="space-y-6 pt-4" aria-labelledby={`${id}-heading`} id={id}>
      <JsonLd schema={faqSchema} />
      <JsonLd schema={speakable} />
      <h2 id={`${id}-heading`} className="text-2xl sm:text-3xl font-black text-[#0E2A1E] tracking-tight font-serif text-center">
        {heading}
      </h2>
      <CollapsibleFaq faqs={faqs} idPrefix={id} support={false} />
    </section>
  );
}
