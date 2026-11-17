// app/shop/[category]/[slug]/page.jsx
import { pageMeta } from '@/lib/pageMeta';
import React from 'react';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { SITE, CONTACT, SHOP, BUNDLE } from '@/src/config/core';
import { modifiedDate } from '@/lib/pageMeta';
import { getCategoryBySlug } from '@/src/config/categories';
import { PRODUCTS, getProductBySlug } from '@/src/config/products';
import JsonLd from '@/src/components/JsonLd';
import { absUrl, clampTitle, clampDesc, productSku, hasRealRating, realImages } from '@/lib/seo';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category, slug: p.slug }));
}

// Meta description in the 130-155 band: the product's own sentence, the price once, then payment/delivery facts until it is long enough.
function productMetaDescription(product, price) {
  let d = product.shortDescription.replace(/s+$/, '');
  if (!d.includes(price)) d += ` ${price} inc. GST.`;
  const fillers = ['Pay by PayID, bank transfer or crypto.', 'Delivered Australia-wide.', 'Ask us on WhatsApp for stock and timing.'];
  for (const x of fillers) { if (d.length >= 132) break; if (!d.includes(x.slice(0, 12))) d += ` ${x}`; }
  return d;
}

export async function generateMetadata({ params }) {
  const { slug: prodSlug } = await params;
  const product = getProductBySlug(prodSlug) || PRODUCTS.find((p) => p.slug === prodSlug);
  if (!product) return { title: 'Product Not Found | The Buggy Shop Australia' };

  const price = `$${product.price.toLocaleString('en-AU')}`;
  return pageMeta({
    path: `/shop/${product.category}/${product.slug}/`,
    title: product.titleTag || product.name,
    description: productMetaDescription(product, price),
    image: realImages(product)[0],
  });
}

export default async function ProductPage({ params }) {
  const { category: catSlug, slug: prodSlug } = await params;
  const product = getProductBySlug(prodSlug) || PRODUCTS.find((p) => p.slug === prodSlug);
  if (!product) notFound();
  if (catSlug !== product.category) {
    permanentRedirect(`/shop/${product.category}/${product.slug}/`);
  }

  const category = getCategoryBySlug(product.category);
  const isVehicleProduct = BUNDLE.vehicleCategories.includes(product.category) && !BUNDLE.vehicleExcludedSubcategories.includes(product.subcategory);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug);

  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://${SITE.domain}/shop/${product.category}/${product.slug}/#product`,
        "name": product.name,
        "description": product.description,
        ...(realImages(product).length ? { "image": realImages(product).map(absUrl) } : {}),
        "sku": productSku(product.slug),
        "brand": {
          "@type": "Brand",
          "name": product.brandName || SITE.name
        },
        "offers": {
          "@type": "Offer",
          "url": `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
          "priceCurrency": SITE.currency,
          "price": product.price,
          "priceValidUntil": `${new Date().getFullYear() + 1}-12-31`,
          ...(modifiedDate(`/shop/${product.category}/${product.slug}/`) ? { "validFrom": modifiedDate(`/shop/${product.category}/${product.slug}/`) } : {}),
          ...(isVehicleProduct ? { "shippingDetails": { "@type": "OfferShippingDetails", "shippingRate": { "@type": "MonetaryAmount", "value": SHOP.shippingFee, "currency": SITE.currency }, "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "AU" } } } : {}),
          "hasMerchantReturnPolicy": { "@type": "MerchantReturnPolicy", "applicableCountry": "AU", "returnPolicyCategory": "https://schema.org/MerchantReturnUnspecified", "url": `https://${SITE.domain}/returns/` },
          "availability": "https://schema.org/InStock",
          "itemCondition": product.condition === 'Used' || product.condition === 'Ex-Demo' ? "https://schema.org/UsedCondition" : "https://schema.org/NewCondition",
          "seller": {
            "@type": "Organization",
            "name": SITE.name
          }
        },
        ...(hasRealRating(product)
          ? {
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviewCount
              }
            }
          : {})
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
