import React from 'react';
import Link from 'next/link';
import { SITE, CONTACT } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import FinanceCalculatorClient from './FinanceCalculatorClient';
import { seoTitle, seoDesc } from '@/lib/seo';
import { ogImages } from '@/lib/og';

export const metadata = {
  title: { absolute: seoTitle('Pay in 4 & Commercial Asset Finance | The Buggy Shop Australia') },
  description: seoDesc('Calculate flexible Pay in 4 split payments or primary producer commercial equipment leasing for Australian all-terrain buggies with instant calculations.'),
  alternates: {
    canonical: `https://${SITE.domain}/finance/`,
  },
  openGraph: {
    title: 'Pay in 4 & Commercial Asset Finance | The Buggy Shop Australia',
    description: 'Calculate flexible Pay in 4 split payments or commercial equipment leasing.',
    url: `https://${SITE.domain}/finance/`,
    images: ogImages(),
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function FinancePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://${SITE.domain}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Finance Calculator",
        "item": `https://${SITE.domain}/finance/`
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      <JsonLd schema={breadcrumbSchema} />

      {/* Header */}
      <div className="space-y-3">
        <nav className="text-xs text-[#64748B] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1D4ED8]">Home</Link>
          <span>/</span>
          <span className="text-[#0F172A]">Finance Calculator</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Pay in 4 & Equipment Finance Calculator
            </h1>
            <p className="text-sm text-[#475569]">
              Estimate installment splits, commercial agricultural lease repayments, and explore our 10% crypto discount.
            </p>
          </div>

          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
              "G'day! I would like to discuss finance options and receive a formal commercial invoice."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 rounded-xl bg-[#25D366] text-[#0B1E13] font-black text-xs uppercase tracking-wider hover:bg-[#20bd5a] transition-colors self-start sm:self-auto"
          >
            WhatsApp Finance Desk →
          </a>
        </div>
      </div>

      <FinanceCalculatorClient />
    </div>
  );
}
