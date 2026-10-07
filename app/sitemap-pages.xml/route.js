// Child sitemap: pages. Built by lib/sitemaps.js with real <lastmod> dates.
import { urlsetXml, XML_HEADERS } from '@/lib/sitemaps';

export const dynamic = 'force-static';

export function GET() {
  return new Response(urlsetXml('pages'), { headers: XML_HEADERS });
}
