import { NextResponse } from 'next/server';
import { SITE } from '@/src/config/site';
import { PRODUCTS } from '@/src/config/products';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const q = searchParams.get('q');
  const limit = searchParams.get('limit');

  let results = [...PRODUCTS];

  if (category) {
    results = results.filter((p) => p.category === category);
  }

  if (brand) {
    results = results.filter((p) => p.brand === brand);
  }

  if (q) {
    const cleanQ = q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(cleanQ) ||
        p.shortDescription.toLowerCase().includes(cleanQ) ||
        (p.brandName && p.brandName.toLowerCase().includes(cleanQ))
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
