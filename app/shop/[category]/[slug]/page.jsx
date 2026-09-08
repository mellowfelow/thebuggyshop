// app/shop/[category]/[slug]/page.jsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE, CONTACT, SHOP } from '@/src/config/site';
import { getCategoryBySlug } from '@/src/config/categories';
import { PRODUCTS, getProductBySlug } from '@/src/config/products';
import JsonLd from '@/src/components/JsonLd';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug: prodSlug } = await params;
  const product = getProductBySlug(prodSlug) || PRODUCTS.find((p) => p.slug === prodSlug);
  if (!product) return { title: 'Product Not Found | The Buggy Shop Australia' };

  return {
    title: `${product.name} | The Buggy Shop Australia`,
    description: `${product.shortDescription} Priced at $${product.price.toLocaleString('en-AU')} AUD inc. GST with Australian warranty and hydraulic delivery.`,
    alternates: {
      canonical: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
    },
    openGraph: {
      title: `${product.name} | The Buggy Shop`,
      description: product.shortDescription,
      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
      images: [{ url: product.images[0] }],
    },
    other: {
      'og:updated_time': new Date().toISOString(),
    },
  };
}

export default async function ProductPage({ params }) {
  const { category: catSlug, slug: prodSlug } = await params;
  const product = getProductBySlug(prodSlug) || PRODUCTS.find((p) => p.slug === prodSlug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://${SITE.domain}/shop/${product.category}/${product.slug}/#product`,
        "name": product.name,
        "description": product.description,
        "image": product.images,
        "sku": `TBS-${product.slug.toUpperCase().slice(0, 10)}`,
        "brand": {
          "@type": "Brand",
          "name": product.brandName || SITE.name
        },
        "offers": {
          "@type": "Offer",
          "url": `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
          "priceCurrency": SITE.currency,
          "price": product.price,
          "priceValidUntil": "2027-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": product.condition === 'Used' ? "https://schema.org/UsedCondition" : "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": SITE.name
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating || 4.9,
          "reviewCount": product.reviewCount || 25
        }
      },
      {
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
            "name": category ? category.navLabel : 'Category',
            "item": `https://${SITE.domain}/shop/${product.category}/`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": product.name,
            "item": `https://${SITE.domain}/shop/${product.category}/${product.slug}/`
          }
        ]
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
      <JsonLd schema={productSchema} />

      {/* Breadcrumb */}
      <nav className="text-xs text-[#5C6E66] flex flex-wrap items-center gap-1.5 font-medium" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#1E3A2F]">Home</Link>
        <span>/</span>
        <Link href="/shop/" className="hover:text-[#1E3A2F]">Golf Buggies</Link>
        <span>/</span>
        <Link href={`/shop/${product.category}/`} className="hover:text-[#1E3A2F]">
          {category ? category.navLabel : product.category}
        </Link>
        <span>/</span>
        <span className="text-[#12241D] font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Interactive Product Workspace */}
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
