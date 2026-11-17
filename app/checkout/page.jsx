// app/checkout/page.jsx
import { pageMeta } from '@/lib/pageMeta';
import React from 'react';
import { SITE } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import CheckoutClient from './CheckoutClient';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = pageMeta({
  path: '/checkout/',
  title: 'Secure Checkout & Machinery Allocation | The Buggy Shop Australia',
  description: 'Complete your luxury golf buggy order, calculate freight, select PayID, Bank Wire or 10% Crypto rebate, and receive official payment dispatch instructions.',
  noindex: true,
});

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
