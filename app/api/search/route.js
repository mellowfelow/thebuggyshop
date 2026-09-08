import { NextResponse } from 'next/server';
import { POSTS, SITE } from '@/src/config/site';
import { PRODUCTS } from '@/src/config/products';
import { CATEGORY_TREE } from '@/src/config/categories';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase().trim();

  let matchedProducts = [...PRODUCTS];
  let matchedPosts = [...POSTS];

  if (q) {
    matchedProducts = matchedProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        (p.brandName && p.brandName.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );

    matchedPosts = matchedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q)
    );
  }

  const enrichedProducts = matchedProducts.map((p) => ({
    ...p,
    currency: SITE.currency,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  const enrichedPosts = matchedPosts.map((post) => ({
    ...post,
    url: `https://${SITE.domain}/blog/${post.slug}/`,
  }));

  return NextResponse.json(
    {
      query: q,
      products: enrichedProducts,
      posts: enrichedPosts,
      totalResults: enrichedProducts.length + enrichedPosts.length,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
