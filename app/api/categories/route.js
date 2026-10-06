import { NextResponse } from 'next/server';
import { SITE } from '@/src/config/site';
import { CATEGORY_TREE } from '@/src/config/categories';
import { PRODUCTS } from '@/src/config/products';
import { inNode } from '@/lib/catalog';

export async function GET() {
  const categories = CATEGORY_TREE.filter((c) => !c.redirectTo).map((c) => ({
    ...c,
    url: c.slug === 'brands' ? `https://${SITE.domain}/brands/` : `https://${SITE.domain}/shop/${c.slug}/`,
    productCount: PRODUCTS.filter((p) => inNode(p, c.slug)).length,
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
