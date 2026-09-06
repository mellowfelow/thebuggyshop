import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE, CATEGORIES, PRODUCTS } from '@/src/config/site';
import JsonLd from '@/src/components/JsonLd';
import ShopClient from '../ShopClient';

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: catSlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === catSlug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `${category.name} | Golf Buggy For Sale | The Buggy Shop Australia`,
    description: category.description,
    alternates: {
      canonical: `https://${SITE.domain}/shop/${category.slug}/`,
    },
    openGraph: {
      title: `${category.name} | The Buggy Shop`,
      description: category.description,
      url: `https://${SITE.domain}/shop/${category.slug}/`,
      images: [{ url: category.heroImage }],
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: catSlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === catSlug);
  if (!category) notFound();

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.slug);

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
        "name": "Golf Buggies",
        "item": `https://${SITE.domain}/shop/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `https://${SITE.domain}/shop/${category.slug}/`
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Header */}
      <div className="space-y-3">
        <nav className="text-xs text-[#4A5D53] flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <span>/</span>
          <Link href="/shop/" className="hover:text-[#0E2A1E]">Golf Buggies</Link>
          <span>/</span>
          <span className="text-[#0E2A1E] font-bold">{category.name}</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#DDE4DF] pb-6">
          <div className="space-y-1 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
              {category.name}
            </h1>
            <p className="text-sm text-[#4A5D53] leading-relaxed">
              {category.description}
            </p>
          </div>

          <Link
            href="/shop/"
            className="py-2.5 px-4 rounded-xl border border-[#0E2A1E] text-[#0E2A1E] font-black text-xs uppercase tracking-wider hover:bg-[#0E2A1E] hover:text-[#C5A265] transition-colors self-start sm:self-auto"
          >
            ← View All Categories
          </Link>
        </div>
      </div>

      {/* Product List for this category */}
      <ShopClient initialProducts={categoryProducts} categories={CATEGORIES} />
    </div>
  );
}
