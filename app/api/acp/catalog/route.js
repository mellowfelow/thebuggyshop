import { NextResponse } from 'next/server';
import { PRODUCTS, CATEGORIES, SHOP, SITE } from '@/src/config/site';
import { inNode } from '@/lib/catalog';

export async function GET() {
  return NextResponse.json(
    {
      catalog: CATEGORIES.map((c) => ({
        ...c,
        url: c.slug === 'brands' ? `https://${SITE.domain}/brands/` : `https://${SITE.domain}/shop/${c.slug}/`,
        products: PRODUCTS.filter((p) => inNode(p, c.slug)).map((p) => ({
          slug: p.slug,
          name: p.name,
          price: p.price,
          currency: SITE.currency,
          url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
        })),
      })),
      currency: SITE.currency,
      minimumOrder: SHOP.minOrder,
      paymentMethods: SHOP.paymentMethods,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
