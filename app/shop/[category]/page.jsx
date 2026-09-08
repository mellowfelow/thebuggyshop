// app/shop/[category]/page.jsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE } from '@/src/config/site';
import { 
  CATEGORY_TREE, 
  getCategoryBySlug, 
  getSubcategories 
} from '@/src/config/categories';
import { PRODUCTS, getProductsByCategory } from '@/src/config/products';
import JsonLd from '@/src/components/JsonLd';
import ShopClient from '../ShopClient';
import { ArrowRight, ChevronRight, Layers, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  return CATEGORY_TREE.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: catSlug } = await params;
  const category = getCategoryBySlug(catSlug);
  if (!category) return { title: 'Category Not Found | The Buggy Shop' };

  return {
    title: category.pageTitle || `${category.navLabel} | The Buggy Shop`,
    description: category.metaDescription || category.introCopy,
    alternates: {
      canonical: `https://${SITE.domain}/shop/${category.slug}/`,
    },
    openGraph: {
      title: category.pageTitle,
      description: category.metaDescription,
      url: `https://${SITE.domain}/shop/${category.slug}/`,
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category: catSlug } = await params;
  const category = getCategoryBySlug(catSlug);
  if (!category) notFound();

  const subcategories = getSubcategories(category.slug);
  const categoryProducts = getProductsByCategory(category.slug);

  // Build parent breadcrumb if nested
  let parentCategory = null;
  if (category.parent) {
    parentCategory = getCategoryBySlug(category.parent);
  }

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": `https://${SITE.domain}/`
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Golf Buggies for Sale",
      "item": `https://${SITE.domain}/shop/`
    }
  ];

  if (parentCategory) {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": parentCategory.navLabel,
      "item": `https://${SITE.domain}/shop/${parentCategory.slug}/`
    });
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 4,
      "name": category.navLabel,
      "item": `https://${SITE.domain}/shop/${category.slug}/`
    });
  } else {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 3,
      "name": category.navLabel,
      "item": `https://${SITE.domain}/shop/${category.slug}/`
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-10">
      <JsonLd schema={breadcrumbSchema} />

      {/* Category Header */}
      <div className="space-y-4">
        <nav className="text-xs text-[#4A5D53] flex flex-wrap items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#0E2A1E]">Home</Link>
          <ChevronRight className="w-3 h-3 text-[#A6BCB0]" />
          <Link href="/shop/" className="hover:text-[#0E2A1E]">Golf Buggies</Link>
          {parentCategory && (
            <>
              <ChevronRight className="w-3 h-3 text-[#A6BCB0]" />
              <Link href={`/shop/${parentCategory.slug}/`} className="hover:text-[#0E2A1E]">
                {parentCategory.navLabel}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3 text-[#A6BCB0]" />
          <span className="text-[#0E2A1E] font-bold">{category.navLabel}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#DDE4DF] pb-8">
          <div className="space-y-3 max-w-3xl">
            {category.targetKeywords && category.targetKeywords.length > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123123] text-[#C5A265] text-xs font-black uppercase tracking-wider border border-[#C5A265]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{category.targetKeywords[0]}</span>
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
              {category.h1 || category.pageTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#4A5D53] leading-relaxed">
              {category.introCopy}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop/"
              className="py-3 px-5 rounded-2xl bg-white text-[#0E2A1E] font-black text-xs uppercase tracking-wider hover:bg-[#F0F5F2] transition-colors border border-[#CAD5CE] shadow-2xs"
            >
              ← All Categories
            </Link>
            <Link
              href="/compare/"
              className="py-3 px-5 rounded-2xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider hover:bg-[#163E2D] transition-colors border border-[#C5A265]/30 shadow-sm"
            >
              Compare Specs →
            </Link>
          </div>
        </div>

        {/* Subcategories Hub if Available */}
        {subcategories.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-black text-[#0E2A1E] uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#C5A265]" />
              <span>Explore Subcategories</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {subcategories.map(sub => (
                <Link
                  key={sub.slug}
                  href={`/shop/${sub.slug}/`}
                  className="p-4 rounded-2xl bg-white hover:bg-[#F3F7F4] border border-[#D5DFD9] group transition-all shadow-2xs flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-black text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors">
                      {sub.navLabel}
                    </div>
                    <div className="text-[11px] text-[#6B7E74] mt-0.5 line-clamp-1">
                      {sub.targetKeywords?.[0] || 'View Products'}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C5A265] group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Catalog Component with Facet Filtering */}
      <ShopClient 
        initialProducts={categoryProducts.length > 0 ? categoryProducts : PRODUCTS} 
        categories={CATEGORY_TREE}
        currentCategory={category}
      />
    </div>
  );
}
