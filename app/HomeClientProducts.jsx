'use client';

import React from 'react';
import ProductCard from '@/src/components/ProductCard';
import { useStore } from '@/src/components/ClientStoreProvider';

export default function HomeClientProducts({ products }) {
  const { addToCart, toggleCompare, comparedProducts } = useStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
      {products.map((product) => {
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
  );
}
