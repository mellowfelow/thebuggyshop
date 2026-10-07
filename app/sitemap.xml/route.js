// Sitemap index (WebForge v9): points at the child sitemaps built by lib/sitemaps.js.
import { indexXml, XML_HEADERS } from '@/lib/sitemaps';

export const dynamic = 'force-static';

export function GET() {
  return new Response(indexXml(), { headers: XML_HEADERS });
}
