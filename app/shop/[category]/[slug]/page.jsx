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
import { getBrandBySlug } from '@/src/config/brands';

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category, slug: p.slug }));
}

// Title: the product name plus its price when it fits in 60 characters (a price in the snippet lifts click-through).
// Always read from the product data, so it updates with the price.
// A used or ex-demo product is compared with the new product it matches (same brand, same model words), from the data.
const GENERIC = new Set(['ex', 'demo', 'certified', 'used', 'lease', 'fleet', 'buggy', 'golf', 'electric', 'remote', 'control', 'cart', 'the']);
const tokens = (name) => String(name).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean);
function newEquivalent(product) {
  if (product.condition === 'New') return null;
  const mine = new Set(tokens(product.name));
  const key = [...mine].filter((t) => !GENERIC.has(t));
  let best = null; let bestScore = 0;
  for (const p of PRODUCTS) {
    if (p.condition !== 'New' || p.brand !== product.brand || p.slug === product.slug) continue;
    const theirs = new Set(tokens(p.name));
    if (!key.every((t) => theirs.has(t))) continue;
    const inter = [...mine].filter((t) => theirs.has(t)).length;
    const score = inter / (mine.size + theirs.size - inter);
    if (score > bestScore) { best = p; bestScore = score; }
  }
  // A listing that covers several variants at one price (for example "2 / 2+2 / 4 Seat") is not a like-for-like comparison.
  return bestScore >= 0.45 && !/ \/ /.test(best.name) && best.price > product.price ? { name: best.name, href: `/shop/${best.category}/${best.slug}/`, price: best.price } : null;
}

function productTitle(product) {
  const price = `$${product.price.toLocaleString('en-AU')}`;
  return [`${product.name} | ${price} inc. GST`, `${product.name} | ${price}`].find((t) => t.length <= 60) || product.name;
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
    title: product.titleTag || productTitle(product),
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
  const subcategory = getCategoryBySlug(product.subcategory);
  // Six similar products, same subcategory first. Rendering every product in the category (up to 28 cards) bloated the HTML, DOM and hydration cost.
  const sameCategory = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug);
  const relatedProducts = [...sameCategory.filter((p) => p.subcategory === product.subcategory), ...sameCategory.filter((p) => p.subcategory !== product.subcategory)].slice(0, 6);

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
        ...(product.brandName && !/^(various|generic)$/i.test(product.brandName) ? { "brand": { "@type": "Brand", "name": product.brandName } } : {}),
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
      <ProductDetailClient product={product} newEquivalent={newEquivalent(product)} relatedProducts={relatedProducts} brandHref={getBrandBySlug(product.brand) ? `/brands/${product.brand}/` : null} subcategory={subcategory && subcategory.slug !== product.category ? { href: `/shop/${subcategory.slug === 'used' ? 'used-golf-buggies' : subcategory.slug}/`, label: subcategory.slug === 'used' ? 'Used golf buggies and carts' : subcategory.navLabel } : null} />
    </div>
  );
}
