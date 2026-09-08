// app/shop/ShopClient.jsx
'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/src/components/ProductCard';
import FacetFilter from '@/src/components/FacetFilter';
import { useStore } from '@/src/components/ClientStoreProvider';
import { 
  ArrowUpDown, 
  X, 
  Sparkles, 
  LayoutGrid, 
  List, 
  RotateCcw,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  Tag,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function ShopClient({ 
  initialProducts = [], 
  categories = [], 
  currentCategory = null,
  currentBrand = null,
  currentLocation = null 
}) {
  const [selectedCategory, setSelectedCategory] = useState(currentCategory?.slug || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customMinPrice, setCustomMinPrice] = useState('');
  const [customMaxPrice, setCustomMaxPrice] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState('featured');
  
  const [activeFilters, setActiveFilters] = useState({
    power: [],
    brand: currentBrand?.slug ? [currentBrand.slug] : [],
    wheels: [],
    seats: [],
    condition: [],
    priceRange: [],
    batteryRange: [],
    weight: []
  });

  const { addToCart, toggleCompare, comparedProducts } = useStore();

  const handleFilterChange = (facetKey, value) => {
    setActiveFilters(prev => {
      const currentValues = prev[facetKey] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [facetKey]: newValues };
    });
  };

  const handleClearSection = (facetKey) => {
    setActiveFilters(prev => ({
      ...prev,
      [facetKey]: []
    }));
  };

  const handlePriceCustomChange = (min, max) => {
    setCustomMinPrice(min);
    setCustomMaxPrice(max);
  };

  const handleClearFilters = () => {
    setActiveFilters({
      power: [],
      brand: [],
      wheels: [],
      seats: [],
      condition: [],
      priceRange: [],
      batteryRange: [],
      weight: []
    });
    setSearchQuery('');
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setSelectedCategory('all');
  };

  const removeSpecificFilter = (facetKey, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [facetKey]: (prev[facetKey] || []).filter(v => v !== value)
    }));
  };

  // Extract raw facets list for the filter component
  const facets = useMemo(() => {
    const power = new Set();
    const brand = new Set();
    const wheels = new Set();
    const seats = new Set();
    const condition = new Set();
    const batteryRange = new Set();

    initialProducts.forEach(p => {
      if (p.power) power.add(p.power);
      if (p.brand) brand.add(p.brand);
      if (p.wheels) wheels.add(p.wheels);
      if (p.seats) seats.add(p.seats);
      if (p.condition) condition.add(p.condition);
      if (p.specs?.batteryRange) batteryRange.add(p.specs.batteryRange);
    });

    return {
      power: Array.from(power),
      brand: Array.from(brand),
      wheels: Array.from(wheels),
      seats: Array.from(seats),
      condition: Array.from(condition),
      batteryRange: Array.from(batteryRange)
    };
  }, [initialProducts]);

  // Compute live facet counts based on current category and search query
  const facetCounts = useMemo(() => {
    // Base candidate pool respecting category and search query
    let base = [...initialProducts];
    if (selectedCategory !== 'all') {
      base = base.filter(p => 
        p.category === selectedCategory || 
        p.categoryPath?.includes(selectedCategory)
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      base = base.filter(p => 
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.primaryKeyword?.toLowerCase().includes(q)
      );
    }

    const counts = {
      power: {},
      brand: {},
      wheels: {},
      seats: {},
      condition: {},
      priceRange: {
        'under-1000': 0,
        '1000-2500': 0,
        '2500-10000': 0,
        'over-10000': 0
      },
      batteryRange: {}
    };

    base.forEach(p => {
      if (p.power) counts.power[p.power] = (counts.power[p.power] || 0) + 1;
      if (p.brand) counts.brand[p.brand] = (counts.brand[p.brand] || 0) + 1;
      if (p.wheels) counts.wheels[p.wheels] = (counts.wheels[p.wheels] || 0) + 1;
      if (p.seats) counts.seats[p.seats] = (counts.seats[p.seats] || 0) + 1;
      if (p.condition) counts.condition[p.condition] = (counts.condition[p.condition] || 0) + 1;
      
      const bRange = p.specs?.batteryRange || (p.power === 'Remote control' ? '36 hole' : '27 hole');
      counts.batteryRange[bRange] = (counts.batteryRange[bRange] || 0) + 1;

      if (p.price < 1000) counts.priceRange['under-1000']++;
      else if (p.price <= 2500) counts.priceRange['1000-2500']++;
      else if (p.price <= 10000) counts.priceRange['2500-10000']++;
      else counts.priceRange['over-10000']++;
    });

    return counts;
  }, [initialProducts, selectedCategory, searchQuery]);

  // Filter products based on all active criteria
  const filtered = useMemo(() => {
    let result = [...initialProducts];

    // 1. Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => 
        p.category === selectedCategory || 
        p.categoryPath?.includes(selectedCategory)
      );
    }

    // 2. Keyword Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.primaryKeyword?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    // 3. Power filter
    if (activeFilters.power?.length > 0) {
      result = result.filter(p => activeFilters.power.includes(p.power));
    }

    // 4. Brand filter
    if (activeFilters.brand?.length > 0) {
      result = result.filter(p => activeFilters.brand.includes(p.brand));
    }

    // 5. Wheels filter
    if (activeFilters.wheels?.length > 0) {
      result = result.filter(p => activeFilters.wheels.includes(p.wheels));
    }

    // 6. Seats filter
    if (activeFilters.seats?.length > 0) {
      result = result.filter(p => activeFilters.seats.includes(p.seats));
    }

    // 7. Condition filter
    if (activeFilters.condition?.length > 0) {
      result = result.filter(p => activeFilters.condition.includes(p.condition));
    }

    // 8. Preset Price Ranges
    if (activeFilters.priceRange?.length > 0) {
      result = result.filter(p => {
        return activeFilters.priceRange.some(range => {
          if (range === 'under-1000') return p.price < 1000;
          if (range === '1000-2500') return p.price >= 1000 && p.price <= 2500;
          if (range === '2500-10000') return p.price > 2500 && p.price <= 10000;
          if (range === 'over-10000') return p.price > 10000;
          return true;
        });
      });
    }

    // 9. Custom Min / Max Price
    if (customMinPrice !== '' && !isNaN(Number(customMinPrice))) {
      result = result.filter(p => p.price >= Number(customMinPrice));
    }
    if (customMaxPrice !== '' && !isNaN(Number(customMaxPrice))) {
      result = result.filter(p => p.price <= Number(customMaxPrice));
    }

    // 10. Battery Range
    if (activeFilters.batteryRange?.length > 0) {
      result = result.filter(p => {
        const b = p.specs?.batteryRange || (p.power === 'Remote control' ? '36 hole' : '27 hole');
        return activeFilters.batteryRange.includes(b);
      });
    }

    // Sort results
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [
    initialProducts, 
    selectedCategory, 
    searchQuery, 
    activeFilters, 
    customMinPrice, 
    customMaxPrice, 
    sortBy
  ]);

  // Active filter items list for tag pill rendering
  const activeFilterList = [];
  Object.entries(activeFilters).forEach(([key, values]) => {
    if (Array.isArray(values)) {
      values.forEach(val => activeFilterList.push({ key, value: val }));
    }
  });

  const categoryPills = [
    { slug: 'all', label: 'All Equipment', icon: '⛳' },
    { slug: 'remote-control-buggies', label: 'Remote Control', icon: '🎮' },
    { slug: 'follow-buggies', label: 'GPS Follow', icon: '🤖' },
    { slug: 'electric-golf-buggies', label: 'Walk-Behind Electric', icon: '⚡' },
    { slug: 'push-pull-buggies', label: 'Push Buggies', icon: '🚶' },
    { slug: 'golf-carts', label: 'Golf Carts & Commercial', icon: '🚗' },
    { slug: 'off-road-buggies', label: 'Farm & Dune UTVs', icon: '🚜' },
    { slug: 'parts-accessories', label: 'Batteries & Parts', icon: '🔋' }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Quick Category Navigation Tabs */}
      <div className="overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {categoryPills.map(cat => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer border select-none ${
                  isSelected
                    ? 'bg-[#0E2A1E] text-[#C5A265] border-[#0E2A1E] shadow-sm'
                    : 'bg-white text-[#2A4D3B] border-[#D5DFD9] hover:bg-[#EDF3EF] hover:text-[#0E2A1E]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                {cat.slug !== 'all' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#19402F] text-[#C5A265]' : 'bg-[#EBF1ED] text-[#4A5D53]'
                  }`}>
                    {initialProducts.filter(p => p.category === cat.slug || p.categoryPath?.includes(cat.slug)).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Top Control Bar: Active Summary, View Toggle, Sort */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 sm:p-5 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] shadow-xs">
        {/* Results Counter & Active Filter Pills */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center gap-2 bg-[#0E2A1E] text-[#C5A265] text-xs font-black px-3.5 py-2 rounded-xl shadow-2xs">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>{filtered.length} {filtered.length === 1 ? 'Vehicle' : 'Vehicles'}</span>
          </div>

          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-[#0E2A1E] text-white font-bold hover:bg-[#163E2D] shadow-2xs transition-colors cursor-pointer"
            >
              <span>Category: {selectedCategory.replace(/-/g, ' ')}</span>
              <X className="w-3 h-3 text-[#C5A265]" />
            </button>
          )}

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-[#FFF9ED] text-[#8A7045] border border-[#E5CCA0] font-bold hover:bg-[#F4EADA] shadow-2xs transition-colors cursor-pointer"
            >
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <X className="w-3 h-3 text-[#0E2A1E]" />
            </button>
          )}

          {(customMinPrice || customMaxPrice) && (
            <button
              type="button"
              onClick={() => {
                setCustomMinPrice('');
                setCustomMaxPrice('');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white text-[#0E2A1E] border border-[#CAD5CE] font-bold hover:bg-[#F3F7F4] shadow-2xs transition-colors cursor-pointer"
            >
              <span>Budget: ${customMinPrice || '0'} – ${customMaxPrice || '∞'} AUD</span>
              <X className="w-3 h-3 text-[#8A7045]" />
            </button>
          )}

          {activeFilterList.map(({ key, value }) => (
            <button
              key={`${key}-${value}`}
              type="button"
              onClick={() => removeSpecificFilter(key, value)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white text-[#0E2A1E] border border-[#CAD5CE] font-bold hover:bg-[#F3F7F4] shadow-2xs transition-colors cursor-pointer"
            >
              <span className="capitalize">{key}: {value}</span>
              <X className="w-3 h-3 text-[#8A7045]" />
            </button>
          ))}

          {(activeFilterList.length > 0 || selectedCategory !== 'all' || searchQuery || customMinPrice || customMaxPrice) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1 text-xs text-[#8A7045] hover:text-[#0E2A1E] font-extrabold px-2.5 py-1.5 rounded-xl hover:bg-[#EDF3EF] cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* View Toggle & Sort Controls */}
        <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto">
          {/* Grid / List Mode */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-[#CAD5CE] shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-[#0E2A1E] text-[#C5A265]' 
                  : 'text-[#4A5D53] hover:text-[#0E2A1E]'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'list' 
                  ? 'bg-[#0E2A1E] text-[#C5A265]' 
                  : 'text-[#4A5D53] hover:text-[#0E2A1E]'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-[#CAD5CE] shadow-2xs">
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
              <option value="rating">Customer Rating (Highest)</option>
              <option value="name-asc">Model Name (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main Filter & Product Stage */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Facet Sidebar */}
        <FacetFilter
          facets={facets}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onClearSection={handleClearSection}
          onPriceCustomChange={handlePriceCustomChange}
          customMinPrice={customMinPrice}
          customMaxPrice={customMaxPrice}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={initialProducts.length}
          filteredCount={filtered.length}
          facetCounts={facetCounts}
        />

        {/* Product Cards Display Area */}
        <div className="flex-1 w-full">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border-2 border-dashed border-[#CAD5CE] p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#0E2A1E] text-[#C5A265] flex items-center justify-center mx-auto shadow-md">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-[#0E2A1E] font-serif">No vehicles matched your exact filter combination</h3>
              <p className="text-xs text-[#4A5D53] max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find buggies matching all active filters. Try clearing specific criteria or expanding your price range.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 rounded-xl bg-white text-[#0E2A1E] border border-[#CAD5CE] font-bold text-xs hover:bg-[#F0F4F1] cursor-pointer"
                  >
                    Clear Search Query
                  </button>
                )}
                {activeFilters.brand?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleClearSection('brand')}
                    className="px-4 py-2 rounded-xl bg-white text-[#0E2A1E] border border-[#CAD5CE] font-bold text-xs hover:bg-[#F0F4F1] cursor-pointer"
                  >
                    Clear Brand Filter
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider hover:bg-[#163E2D] shadow-sm transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
          ) : (
            /* Detailed List View */
            <div className="space-y-4">
              {filtered.map((product) => {
                const isCompared = comparedProducts.some((p) => p.slug === product.slug);
                return (
                  <div 
                    key={product.slug}
                    className="bg-white rounded-3xl p-5 border border-[#D5DFD9] hover:border-[#C5A265] transition-all shadow-2xs hover:shadow-md flex flex-col md:flex-row items-center gap-6 group"
                  >
                    <div className="w-full md:w-56 shrink-0 aspect-4/3 bg-[#F4F7F5] rounded-2xl flex items-center justify-center p-4 border border-[#E2E8E4] relative overflow-hidden">
                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs">
                          {product.badge}
                        </span>
                      )}
                      <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                        {product.category === 'golf-carts' ? '🚗' : product.category === 'off-road-buggies' ? '🚜' : product.power === 'Remote control' ? '🎮' : '⚡'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-[#60756B] uppercase tracking-wider">
                        <span>{product.brand}</span>
                        <span>•</span>
                        <span>{product.power}</span>
                        <span>•</span>
                        <span>{product.wheels || '4-wheel'}</span>
                      </div>

                      <h3 className="font-serif font-black text-lg text-[#0E2A1E] group-hover:text-[#8A7045] transition-colors truncate">
                        <Link href={`/shop/${product.category}/${product.slug}/`}>
                          {product.name}
                        </Link>
                      </h3>

                      <p className="text-xs text-[#4A5D53] line-clamp-2 leading-relaxed">
                        {product.shortDescription || product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {product.specs?.motor && (
                          <span className="text-[10px] font-bold bg-[#F4F7F5] text-[#2A4D3B] px-2 py-0.5 rounded-md border border-[#E2E8E4]">
                            ⚡ {product.specs.motor}
                          </span>
                        )}
                        {product.specs?.battery && (
                          <span className="text-[10px] font-bold bg-[#F4F7F5] text-[#2A4D3B] px-2 py-0.5 rounded-md border border-[#E2E8E4]">
                            🔋 {product.specs.battery}
                          </span>
                        )}
                        {product.specs?.weight && (
                          <span className="text-[10px] font-bold bg-[#F4F7F5] text-[#2A4D3B] px-2 py-0.5 rounded-md border border-[#E2E8E4]">
                            ⚖️ {product.specs.weight}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full md:w-48 shrink-0 flex flex-col justify-between items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#E8ECE9] md:pl-6">
                      <div className="text-right">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#60756B] block">Indicative RRP</span>
                        <span className="text-xl font-black text-[#0E2A1E] font-serif">
                          ${product.price.toLocaleString()} <span className="text-xs font-bold text-[#8A7045]">AUD</span>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5 w-full">
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="w-full py-2.5 rounded-xl bg-[#0E2A1E] text-[#C5A265] text-xs font-black uppercase tracking-wider hover:bg-[#163E2D] transition-colors cursor-pointer shadow-2xs"
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCompare(product)}
                          className={`w-full py-1.5 rounded-xl text-[11px] font-bold transition-colors cursor-pointer border ${
                            isCompared 
                              ? 'bg-[#C5A265] text-[#0E2A1E] border-[#C5A265]' 
                              : 'bg-white text-[#4A5D53] border-[#CAD5CE] hover:bg-[#F4F7F5]'
                          }`}
                        >
                          {isCompared ? '✓ Compared' : '+ Compare'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
