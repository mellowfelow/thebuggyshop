// lib/pageMeta.js (server only)
// ONE builder for every page's <head>: title, description, canonical, Open Graph and Twitter are always derived from the
// same values, so og:url can never fall back to the home page and og:description can never drift from the meta description.
import LASTMOD from '@/src/config/lastmod.json';
import { SITE } from '@/src/config/core';
import { seoTitle, seoDesc } from './seo';
import { ogImages } from './og';

/** Date (YYYY-MM-DD) the page content last changed, from the committed lastmod map. Never the build time. */
export const modifiedDate = (path) => LASTMOD[path]?.d || null;

/**
 * @param {object} o
 * @param {string} o.path         site-relative path with trailing slash, e.g. '/shop/'
 * @param {string} o.title        page title (brand suffix is added when it fits in 60 characters)
 * @param {string} o.description  meta description (clamped to 155 characters at a sentence or word boundary)
 * @param {string} [o.image]      site-relative image; falls back to the hero image when missing on disk
 * @param {'website'|'article'} [o.type]
 * @param {boolean} [o.noindex]
 * @param {string} [o.publishedTime] article only
 */
export function pageMeta({ path, title, description, image, type = 'website', noindex = false, publishedTime }) {
  const url = `https://${SITE.domain}${path}`;
  const t = seoTitle(title);
  const d = seoDesc(description);
  const images = ogImages(image).map((i) => ({ ...i, alt: t }));
  const modifiedTime = modifiedDate(path);
  return {
    title: { absolute: t },
    description: d,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      locale: 'en_AU',
      title: t,
      description: d,
      images,
      ...(type === 'article' ? { ...(publishedTime ? { publishedTime } : {}), ...(modifiedTime ? { modifiedTime } : {}) } : {}),
    },
    twitter: { card: 'summary_large_image', title: t, description: d, images: images.map((i) => i.url) },
  };
}
