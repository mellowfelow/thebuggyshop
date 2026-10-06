// src/components/RelatedLinks.jsx
// "Related guides and pages" row: the internal links from the keyword map (src/config/related.js).
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function RelatedLinks({ links, heading = 'Guides and related pages' }) {
  if (!links?.length) return null;
  return (
    <section aria-labelledby="related-links-heading" className="space-y-4 pt-2">
      <h2 id="related-links-heading" className="text-xl sm:text-2xl font-black text-[#0E2A1E] font-serif">{heading}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group flex items-center justify-between gap-3 rounded-2xl border border-[#D5DFD9] bg-white px-4 py-3.5 text-sm font-bold text-[#0E2A1E] hover:border-[#C5A265] hover:shadow-sm transition-all">
              <span>{l.label}</span>
              <ArrowRight className="w-4 h-4 shrink-0 text-[#C5A265] group-hover:translate-x-1 transition-transform" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
