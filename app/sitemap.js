import { SITE, PRODUCTS, CATEGORIES, POSTS } from '@/src/config/site';

export default async function sitemap() {
  const baseUrl = `https://${SITE.domain}`;
  const now = new Date().toISOString();

  // Core static pages
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/shop/`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/compare/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/finance/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/search/`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
  ];

  // Categories
  const categoryPages = CATEGORIES.map((cat) => ({
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

  // Blog Posts
  const blogPages = POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
    images: [post.image],
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
