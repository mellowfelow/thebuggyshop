import { NextResponse } from 'next/server';
import { SITE } from '@/src/config/site';
import { searchAll } from '@/lib/search';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim().slice(0, 120);
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10) || 50));

  const found = searchAll(q);
  const products = found.results.slice(0, limit).map(({ product: p }) => ({
    ...p,
    currency: SITE.currency,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));
  const posts = found.posts.map((post) => ({ ...post, url: `https://${SITE.domain}/blog/${post.slug}/` }));

  return NextResponse.json(
    {
      query: q,
      match: found.mode,
      products,
      totalProducts: found.results.length,
      categories: found.categories.map((c) => ({ slug: c.slug, name: c.navLabel, url: `https://${SITE.domain}/shop/${c.slug}/` })),
      brands: found.brands.map((b) => ({ slug: b.slug, name: b.name, url: `https://${SITE.domain}/brands/${b.slug}/` })),
      posts,
      totalResults: found.results.length + posts.length,
    },
    { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' } }
  );
}
