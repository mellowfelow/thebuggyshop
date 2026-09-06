'use client';

import React, { useState } from 'react';
import ProductCard from '@/src/components/ProductCard';
import { useStore } from '@/src/components/ClientStoreProvider';
import { Filter, ArrowUpDown } from 'lucide-react';

export default function ShopClient({ initialProducts, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart, toggleCompare, comparedProducts } = useStore();

  let filtered = [...initialProducts];
  if (selectedCategory !== 'all') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="space-y-8">
      {/* Category Pills & Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] shadow-sm">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0E2A1E] text-[#C5A265] shadow-md border border-[#C5A265]/40'
                : 'bg-white text-[#2A4D3B] hover:bg-[#EBF1ED] border border-[#CAD5CE]'
            }`}
          >
            All Buggies ({initialProducts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.slug
                  ? 'bg-[#0E2A1E] text-[#C5A265] shadow-md border border-[#C5A265]/40'
                  : 'bg-white text-[#2A4D3B] hover:bg-[#EBF1ED] border border-[#CAD5CE]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0 bg-white px-3.5 py-1.5 rounded-2xl border border-[#CAD5CE] shadow-xs">
          <ArrowUpDown className="w-4 h-4 text-[#8A7045]" />
          <span className="text-xs font-bold text-[#4A5D53]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold bg-transparent text-[#0E2A1E] focus:outline-hidden cursor-pointer"
          >
            <option value="featured">Featured & Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Grid of Products */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] space-y-3">
          <p className="text-sm font-bold text-[#0E2A1E]">No vehicles found in this category.</p>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="text-xs font-black text-[#8A7045] underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
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
  );
}
