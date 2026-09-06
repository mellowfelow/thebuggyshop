import { NextResponse } from 'next/server';
import { PRODUCTS, SITE } from '@/src/config/site';

export async function GET(request, { params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(
    {
      ...product,
      currency: SITE.currency,
      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
