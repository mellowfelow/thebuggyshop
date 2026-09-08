// app/sitemap.js
import { SITE } from '@/src/config/site';
import { CATEGORY_TREE } from '@/src/config/categories';
import { PRODUCTS } from '@/src/config/products';
import { BRANDS } from '@/src/config/brands';
import { LOCATIONS } from '@/src/config/locations';
import { POSTS } from '@/src/config/site';

export default async function sitemap() {
  const baseUrl = `https://${SITE.domain}`;
  const now = new Date().toISOString();

  // Core static pages
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/shop/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/brands/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/golf-buggies/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/compare/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/finance/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/search/`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ];

  // 35 Categories
  const categoryPages = CATEGORY_TREE.map((cat) => ({
    url: `${baseUrl}/shop/${cat.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Products with Image Sitemap Data
  const productPages = PRODUCTS.map((prod) => ({
    url: `${baseUrl}/shop/${prod.category}/${prod.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    images: prod.images.map((img) => `${img}`),
  }));

  // Brands (16 Brands)
  const brandPages = BRANDS.map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Locations (Australian Cities & Regions)
  const locationPages = LOCATIONS.map((loc) => ({
    url: `${baseUrl}/golf-buggies/${loc.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Blog Posts
  const blogPages = POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
    images: [post.image],
  }));

  return [
    ...staticPages, 
    ...categoryPages, 
    ...productPages, 
    ...brandPages, 
    ...locationPages, 
    ...blogPages
  ];
}
