// app/sitemap.js
// One sitemap is well within protocol limits (a few hundred URLs); no index needed yet.
// lastModified is only emitted where we have a real date (blog posts) - never a fake "now".
import { SITE, POSTS } from '@/src/config/site';
import { CATEGORY_TREE, isPage } from '@/src/config/categories';
import { PRODUCTS, getProductsByCategory } from '@/src/config/products';
import { BRANDS } from '@/src/config/brands';
import { LOCATIONS } from '@/src/config/locations';
import { absUrl, realImages } from '@/lib/seo';

export default function sitemap() {
  const base = `https://${SITE.domain}`;

  const staticPages = [
    ['/', 1.0, 'daily'],
    ['/shop/', 0.9, 'daily'],
    ['/brands/', 0.8, 'weekly'],
    ['/golf-buggies/', 0.8, 'weekly'],
    ['/about/', 0.7, 'monthly'],
    ['/blog/', 0.7, 'weekly'],
    ['/compare/', 0.7, 'weekly'],
    ['/finance/', 0.7, 'monthly'],
    ['/faq/', 0.7, 'monthly'],
    ['/wholesale/', 0.6, 'monthly'],
    ['/contact/', 0.7, 'monthly'],
    ['/shipping/', 0.4, 'yearly'],
    ['/returns/', 0.4, 'yearly'],
    ['/privacy/', 0.3, 'yearly'],
    ['/terms/', 0.3, 'yearly'],
  ].map(([p, priority, changeFrequency]) => ({ url: `${base}${p}`, changeFrequency, priority }));

  // Category + subcategory nodes. The "brands" node is a navigation entry served by /brands/.
  const categoryPages = CATEGORY_TREE.filter((c) => isPage(c) && getProductsByCategory(c.slug).length > 0).map((c) => ({
    url: `${base}/shop/${c.slug}/`,
    changeFrequency: 'weekly',
    priority: c.parent ? 0.7 : 0.8,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${base}/shop/${p.category}/${p.slug}/`,
    changeFrequency: 'weekly',
    priority: 0.85,
    ...(realImages(p).length ? { images: realImages(p).map(absUrl) } : {}),
  }));

  const brandPages = BRANDS.filter((b) => PRODUCTS.some((p) => p.brand === b.slug)).map((b) => ({ url: `${base}/brands/${b.slug}/`, changeFrequency: 'weekly', priority: 0.75 }));
  const locationPages = LOCATIONS.map((l) => ({ url: `${base}/golf-buggies/${l.slug}/`, changeFrequency: 'weekly', priority: 0.75 }));

  const blogPages = POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    ...(post.date && !Number.isNaN(Date.parse(post.date)) ? { lastModified: new Date(post.date) } : {}),
    changeFrequency: 'monthly',
    priority: 0.65,
    ...(post.image ? { images: [absUrl(post.image)] } : {}),
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...brandPages, ...locationPages, ...blogPages];
}
