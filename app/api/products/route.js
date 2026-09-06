import { NextResponse } from 'next/server';
import { PRODUCTS, SITE } from '@/src/config/site';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q');
  const limit = searchParams.get('limit');

  let results = [...PRODUCTS];

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (q) {
    const cleanQ = q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(cleanQ) ||
        p.shortDescription.toLowerCase().includes(cleanQ)
    );
  }

  if (limit) {
    results = results.slice(0, parseInt(limit, 10));
  }

  const enriched = results.map((p) => ({
    ...p,
    currency: SITE.currency,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  return NextResponse.json(
    { products: enriched, total: enriched.length, currency: SITE.currency },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
