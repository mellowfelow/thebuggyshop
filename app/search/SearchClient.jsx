'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, ArrowRight, ShoppingBag } from 'lucide-react';
import ProductCard from '@/src/components/ProductCard';
import { useStore } from '@/src/components/ClientStoreProvider';

export default function SearchClient({ products, posts, categories }) {
  const searchParams = useSearchParams();
  const urlQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(urlQ);
  const { addToCart, toggleCompare, comparedProducts } = useStore();

  const cleanQ = query.trim().toLowerCase();

  const matchedProducts = cleanQ
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQ) ||
          p.shortDescription?.toLowerCase().includes(cleanQ) ||
          p.category.toLowerCase().includes(cleanQ) ||
          (p.specs?.motor && p.specs.motor.toLowerCase().includes(cleanQ)) ||
          (p.specs?.battery && p.specs.battery.toLowerCase().includes(cleanQ)) ||
          (p.specs?.makeModel && p.specs.makeModel.toLowerCase().includes(cleanQ))
      )
    : products;

  const matchedPosts = cleanQ
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(cleanQ) ||
          post.excerpt.toLowerCase().includes(cleanQ) ||
          post.category.toLowerCase().includes(cleanQ)
      )
    : posts;

  return (
    <div className="space-y-10">
      {/* Search Input Box */}
      <div className="relative max-w-2xl">
        <SearchIcon className="w-5 h-5 text-[#8A7045] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by model, golf buggy, remote control, off road, push buggy..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#CAD5CE] text-sm text-[#0E2A1E] placeholder:text-[#8A9C92] focus:outline-hidden focus:ring-2 focus:ring-[#C5A265]/50 shadow-sm"
        />
      </div>

      {/* Results Header */}
      <div className="text-xs text-[#4A5D53] font-medium bg-[#EBF1ED] px-4 py-2 rounded-xl inline-block border border-[#D5DFD9]">
        Showing <strong>{matchedProducts.length}</strong> golf buggy models and <strong>{matchedPosts.length}</strong> guides matching &ldquo;{query || 'All'}&rdquo;
      </div>

      {/* Vehicle Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#D5DFD9] pb-3">
          <h2 className="text-xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Matching Golf Buggies ({matchedProducts.length})
          </h2>
          <Link href="/shop/" className="text-xs font-black text-[#0E2A1E] hover:text-[#8A7045] uppercase tracking-wider">
            View All in Shop →
          </Link>
        </div>

        {matchedProducts.length === 0 ? (
          <div className="p-10 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] text-center text-xs text-[#4A5D53] space-y-2">
            <p className="font-bold text-[#0E2A1E]">No vehicle models match your search query.</p>
            <p>Try searching &ldquo;remote&rdquo;, &ldquo;push&rdquo;, &ldquo;off road&rdquo;, &ldquo;seat&rdquo;, or &ldquo;lithium&rdquo;.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedProducts.map((product) => {
              const isCompared = comparedProducts.some((p) => p.slug === product.slug);
              return (
                <ProductCard
                  key={product.slug}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleCompare={toggleCompare}
                  isCompared={isCompared}
                />
              );
            })}
          </div>
        )}
      </div>

      {matchedPosts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#D5DFD9]">
          <h2 className="text-xl font-black text-[#0E2A1E] tracking-tight font-serif">
            Matching Guides & Articles ({matchedPosts.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] shadow-sm hover:shadow-lg hover:border-[#C5A265] transition-all space-y-3 block group"
              >
                <span className="text-[10px] font-black uppercase text-[#8A7045] block bg-white px-2.5 py-1 rounded-md border border-[#D5DFD9] inline-block shadow-2xs">
                  {post.category}
                </span>
                <h3 className="font-extrabold text-sm text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors leading-snug line-clamp-2 font-serif">
                  {post.title}
                </h3>
                <p className="text-xs text-[#4A5D53] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="text-xs font-black text-[#0E2A1E] group-hover:text-[#8A7045] pt-2 flex items-center gap-1 uppercase tracking-wider">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A265] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
