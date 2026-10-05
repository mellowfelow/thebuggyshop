// app/checkout/page.jsx
import React from 'react';
import { SITE } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import CheckoutClient from './CheckoutClient';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Secure Checkout & Machinery Allocation | The Buggy Shop Australia') },
  description: seoDesc('Complete your luxury golf buggy order, calculate freight, select PayID, Bank Wire or 10% Crypto rebate, and receive official payment dispatch instructions.'),
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: `https://${SITE.domain}/checkout/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
  }
};

export default function CheckoutPage() {
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
        "name": "Shop",
        "item": `https://${SITE.domain}/shop/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Checkout",
        "item": `https://${SITE.domain}/checkout/`
      }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <CheckoutClient />
    </>
  );
}
