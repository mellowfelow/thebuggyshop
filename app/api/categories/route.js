import { NextResponse } from 'next/server';
import { SITE } from '@/src/config/site';
import { CATEGORY_TREE } from '@/src/config/categories';
import { PRODUCTS } from '@/src/config/products';

export async function GET() {
  const categories = CATEGORY_TREE.map((c) => ({
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
