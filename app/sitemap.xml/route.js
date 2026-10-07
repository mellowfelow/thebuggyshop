// Single flat sitemap with all URLs and image extensions.
import { sitemapXml, XML_HEADERS } from '@/lib/sitemaps';

export const dynamic = 'force-static';

export function GET() {
  return new Response(sitemapXml(), { headers: XML_HEADERS });
}
