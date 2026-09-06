import { NextResponse } from 'next/server';
import { CATEGORIES, PRODUCTS, SITE } from '@/src/config/site';

export async function GET() {
  const categories = CATEGORIES.map((c) => ({
    ...c,
    url: `https://${SITE.domain}/shop/${c.slug}/`,
    productCount: PRODUCTS.filter((p) => p.category === c.slug).length,
  }));

  return NextResponse.json(
    { categories, total: categories.length },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
