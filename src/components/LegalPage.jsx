import React from 'react';
import Link from 'next/link';
import JsonLd from '@/src/components/JsonLd';
import { SITE } from '@/src/config/site';

/**
 * Shared layout for policy-style pages (shipping, returns, privacy, terms).
 * sections: [{ heading: string, body: (string | string[])[] }]
 */
export default function LegalPage({ title, path, intro, sections, updated }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: title, item: `https://${SITE.domain}${path}` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8">
      <JsonLd schema={breadcrumbSchema} />

      <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
        <span>/</span>
        <span className="text-[#0E2A1E] font-bold">{title}</span>
      </nav>

      <header className="space-y-3 border-b border-[#D5DFD9] pb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">{title}</h1>
        {intro && <p className="text-sm text-[#4A5D53] leading-relaxed">{intro}</p>}
        {updated && <p className="text-xs text-[#60756B]">Last updated: {updated}</p>}
      </header>

      {sections.map((s) => (
        <section key={s.heading} className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-[#0E2A1E] font-serif">{s.heading}</h2>
          {s.body.map((b, i) =>
            Array.isArray(b) ? (
              <ul key={i} className="list-disc pl-5 space-y-1.5 text-sm text-[#2F4439] leading-relaxed">
                {b.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            ) : (
              <p key={i} className="text-sm text-[#2F4439] leading-relaxed">{b}</p>
            )
          )}
        </section>
      ))}
    </div>
  );
}
