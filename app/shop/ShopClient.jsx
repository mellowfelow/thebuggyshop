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
      brand: currentBrand?.slug ? [currentBrand.slug] : [],
      wheels: [],
      seats: [],
      condition: [],
      priceRange: [],
      batteryRange: [],
      weight: []
    });
    setCustomMinPrice('');
    setCustomMaxPrice('');
    setSearchQuery('');
  };

  // 1. Build Multi-facet dynamic catalogue filter
  const filtered = useMemo(() => {
    return initialProducts.filter(product => {
      // Category match
      if (selectedCategory !== 'all') {
        const catObj = categories.find(c => c.slug === selectedCategory);
        if (catObj && catObj.subcategories && catObj.subcategories.length > 0) {
          const validSlugs = [catObj.slug, ...catObj.subcategories.map(s => s.slug)];
          if (!validSlugs.includes(product.category) && !validSlugs.includes(product.subcategory)) return false;
        } else {
          if (product.category !== selectedCategory && product.subcategory !== selectedCategory) return false;
        }
      }

      // Keyword Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = product.name?.toLowerCase().includes(q);
        const matchDesc = product.description?.toLowerCase().includes(q);
        const matchBrand = product.brand?.toLowerCase().includes(q);
        const matchCategory = product.category?.toLowerCase().includes(q);
        const matchKeywords = product.keywords?.some(k => k.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchBrand && !matchCategory && !matchKeywords) {
          return false;
        }
      }

      // Power Type Facet
      if (activeFilters.power?.length > 0) {
        if (!activeFilters.power.includes(product.power)) return false;
      }

      // Brand Facet
      if (activeFilters.brand?.length > 0) {
        const productBrandSlug = (product.brand || '').toLowerCase().replace(/\s+/g, '-');
        if (!activeFilters.brand.includes(productBrandSlug) && !activeFilters.brand.includes(product.brand)) {
          return false;
        }
      }

      // Wheels Facet
      if (activeFilters.wheels?.length > 0) {
        if (!activeFilters.wheels.includes(product.wheels)) return false;
      }

      // Seats Facet
      if (activeFilters.seats?.length > 0) {
        if (!activeFilters.seats.includes(product.seats)) return false;
      }

      // Condition Facet
      if (activeFilters.condition?.length > 0) {
        if (!activeFilters.condition.includes(product.condition)) return false;
      }

      // Battery Range Facet
      if (activeFilters.batteryRange?.length > 0) {
        const rangeStr = product.specs?.range || '';
        const rangeNum = parseInt(rangeStr.replace(/\D/g, ''), 10) || 0;
        const matchesAnyRange = activeFilters.batteryRange.some(bKey => {
          if (bKey === 'under-30km') return rangeNum > 0 && rangeNum < 30;
          if (bKey === '30-60km') return rangeNum >= 30 && rangeNum <= 60;
          if (bKey === '60km-plus') return rangeNum > 60;
          return false;
        });
        if (!matchesAnyRange) return false;
      }

      // Weight Facet
      if (activeFilters.weight?.length > 0) {
        const weightStr = product.specs?.weight || '';
        const weightNum = parseFloat(weightStr.replace(/[^0-9.]/g, '')) || 0;
        const matchesAnyWeight = activeFilters.weight.some(wKey => {
          if (wKey === 'under-15kg') return weightNum > 0 && weightNum < 15;
          if (wKey === '15-35kg') return weightNum >= 15 && weightNum <= 35;
          if (wKey === 'heavy-over-35kg') return weightNum > 35;
          return false;
        });
        if (!matchesAnyWeight) return false;
      }

      // Preset Price Range Facet
      if (activeFilters.priceRange?.length > 0) {
        const p = product.price || 0;
        const matchesAnyPriceTier = activeFilters.priceRange.some(tier => {
          if (tier === 'under-1000') return p < 1000;
          if (tier === '1000-2500') return p >= 1000 && p <= 2500;
          if (tier === '2500-5000') return p > 2500 && p <= 5000;
          if (tier === '5000-10000') return p > 5000 && p <= 10000;
          if (tier === 'over-10000') return p > 10000;
          return false;
        });
        if (!matchesAnyPriceTier) return false;
      }

      // Custom Exact Price Inputs
      if (customMinPrice !== '' && !isNaN(customMinPrice)) {
        if (product.price < Number(customMinPrice)) return false;
      }
      if (customMaxPrice !== '' && !isNaN(customMaxPrice)) {
        if (product.price > Number(customMaxPrice)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 4.8) - (a.rating || 4.8);
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      // 'featured' default: prioritize featured items then price
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.price - b.price;
    });
  }, [
    initialProducts, 
    categories, 
    selectedCategory, 
    searchQuery, 
    activeFilters, 
    customMinPrice, 
    customMaxPrice, 
    sortBy
  ]);

  // Compute facet item counts dynamically
  const facetCounts = useMemo(() => {
    const counts = {};
    initialProducts.forEach(p => {
      // power
      if (p.power) counts[`power:${p.power}`] = (counts[`power:${p.power}`] || 0) + 1;
      // brand
      if (p.brand) {
        const bSlug = p.brand.toLowerCase().replace(/\s+/g, '-');
        counts[`brand:${bSlug}`] = (counts[`brand:${bSlug}`] || 0) + 1;
      }
      // wheels
      if (p.wheels) counts[`wheels:${p.wheels}`] = (counts[`wheels:${p.wheels}`] || 0) + 1;
      // seats
      if (p.seats) counts[`seats:${p.seats}`] = (counts[`seats:${p.seats}`] || 0) + 1;
      // condition
      if (p.condition) counts[`condition:${p.condition}`] = (counts[`condition:${p.condition}`] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  // Facet configuration definition
  const facets = [
    {
      key: 'power',
      label: 'Propulsion & Drive System',
      options: [
        { label: 'Remote Control Motored', value: 'Remote control' },
        { label: 'Electric Motorized Trolley', value: 'Electric' },
        { label: 'Non-Motorized Push Buggy', value: 'Manual' },
        { label: 'Gas / Petrol Powered Cart', value: 'Petrol' },
      ]
    },
    {
      key: 'brand',
      label: 'Manufacturer & Brand',
      options: [
        { label: 'MGI Golf Australia', value: 'mgi' },
        { label: 'Motocaddy', value: 'motocaddy' },
        { label: 'Clicgear', value: 'clicgear' },
        { label: 'Club Car', value: 'club-car' },
        { label: 'EZGO', value: 'ezgo' },
        { label: 'Yamaha Golf-Car', value: 'yamaha' },
        { label: 'Concourse Golf', value: 'concourse' },
        { label: 'Hill Billy Buggies', value: 'hill-billy' },
        { label: 'Axglo Sports', value: 'axglo' },
      ]
    },
    {
      key: 'wheels',
      label: 'Chassis & Wheel Geometry',
      options: [
        { label: '3-Wheel Lightweight Push', value: '3-wheel' },
        { label: '4-Wheel Heavy Stability Platform', value: '4-wheel' },
      ]
    },
    {
      key: 'seats',
      label: 'Passenger Capacity',
      options: [
        { label: 'Walking Follow / Remote (0-Seat)', value: '0' },
        { label: '2-Seater Executive Golf Cart', value: '2' },
        { label: '4-Seater Forward/Rear Resort', value: '4' },
        { label: '6-Seater Hospitality Shuttle', value: '6' },
      ]
    },
    {
      key: 'condition',
      label: 'Vehicle Lifecycle Condition',
      options: [
        { label: 'Brand New (Full 5-Yr Battery Warranty)', value: 'Brand New' },
        { label: 'Certified Pre-Owned & Inspected', value: 'Certified Pre-Owned' },
      ]
    },
    {
      key: 'priceRange',
      label: 'Price Range (AUD Inc. GST)',
      options: [
        { label: 'Under $1,000 AUD', value: 'under-1000' },
        { label: '$1,000 – $2,500 AUD', value: '1000-2500' },
        { label: '$2,500 – $5,000 AUD', value: '2500-5000' },
        { label: '$5,000 – $10,000 AUD', value: '5000-10000' },
        { label: '$10,000+ Luxury & Carts', value: 'over-10000' },
      ]
    },
    {
      key: 'batteryRange',
      label: 'Single-Charge Endurance',
      options: [
        { label: '18 Holes (~15-25 km)', value: 'under-30km' },
        { label: '36 Holes (~35-60 km)', value: '30-60km' },
        { label: 'Extended Estate (60-100 km)', value: '60km-plus' },
      ]
    },
    {
      key: 'weight',
      label: 'Chassis Tare Weight',
      options: [
        { label: 'Ultra-Lightweight (<15 kg)', value: 'under-15kg' },
        { label: 'Standard Motorized (15–35 kg)', value: '15-35kg' },
        { label: 'Ride-On Golf Cart (>35 kg)', value: 'heavy-over-35kg' },
      ]
    }
  ];

  // Active filter pills calculation
  const activeFilterPills = useMemo(() => {
    const pills = [];
    Object.entries(activeFilters).forEach(([key, values]) => {
      const facetObj = facets.find(f => f.key === key);
      values.forEach(val => {
        const optionObj = facetObj?.options?.find(o => o.value === val);
        pills.push({
          facetKey: key,
          value: val,
          label: optionObj?.label || val,
          categoryLabel: facetObj?.label || key
        });
      });
    });
    if (customMinPrice || customMaxPrice) {
      pills.push({
        facetKey: 'customPrice',
        value: 'custom',
        label: `$${customMinPrice || 0} - $${customMaxPrice || '∞'}`
      });
    }
    return pills;
  }, [activeFilters, customMinPrice, customMaxPrice]);

  return (
    <div className="space-y-6">
      {/* 1. Category Pill Header Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-[#C5A880] border border-[#C5A880]/50 shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All Golf Buggies ({initialProducts.length})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setSelectedCategory(cat.slug)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.slug
                ? 'bg-slate-900 text-[#C5A880] border border-[#C5A880]/50 shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.navLabel || cat.name || cat.slug}
          </button>
        ))}
      </div>

      {/* 2. Search, Stats, Sort Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
        {/* Results Counter & Active Query */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-900">
            Showing <strong className="text-[#8A7045] font-black">{filtered.length}</strong> of {initialProducts.length} Vehicles
          </span>

          {activeFilterPills.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 ml-2">
              {activeFilterPills.map((pill, idx) => (
                <span
                  key={`active-filter-pill-${pill.facetKey}-${pill.value}-${idx}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-[#C5A880] text-[11px] font-bold border border-[#C5A880]/30 shadow-xs"
                >
                  <span>{pill.label}</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (pill.facetKey === 'customPrice') {
                        setCustomMinPrice('');
                        setCustomMaxPrice('');
                      } else {
                        handleFilterChange(pill.facetKey, pill.value);
                      }
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[11px] font-bold text-rose-600 hover:underline ml-1 cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* View Toggle & Sort Controls */}
        <div className="flex items-center gap-3 shrink-0 self-end lg:self-auto">
          {/* Grid / List Mode */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                viewMode === 'grid' 
                  ? 'bg-slate-900 text-[#C5A880]' 
                  : 'text-slate-500 hover:text-slate-900'
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
                  ? 'bg-slate-900 text-[#C5A880]' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-slate-200 shadow-xs">
            <ArrowUpDown className="w-4 h-4 text-[#8A7045]" />
            <span className="text-xs font-bold text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold bg-transparent text-slate-900 focus:outline-hidden cursor-pointer"
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
            <div className="text-center py-20 bg-gradient-to-b from-white to-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-8 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-[#C5A880] flex items-center justify-center mx-auto shadow-md">
                <SlidersHorizontal className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-slate-900 font-serif">No vehicles matched your exact filter combination</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find buggies matching all active filters. Try clearing specific criteria or expanding your price range.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Clear Search Query
                  </button>
                )}
                {activeFilters.brand?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleClearSection('brand')}
                    className="px-4 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                  >
                    Clear Brand Filter
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-[#C5A880] font-black text-xs uppercase tracking-wider hover:bg-slate-800 shadow-sm transition-colors cursor-pointer"
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
                    className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-[#C5A880] transition-all shadow-xs hover:shadow-md flex flex-col md:flex-row items-center gap-6 group"
                  >
                    <div className="w-full md:w-60 shrink-0 aspect-4/3 bg-white rounded-2xl flex items-center justify-center p-3 border border-slate-200 relative overflow-hidden">
                      {product.badge && (
                        <span className="absolute top-2.5 left-2.5 z-10 bg-slate-900 text-[#C5A880] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                          {product.badge}
                        </span>
                      )}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <span>{product.brand}</span>
                        <span>•</span>
                        <span>{product.power}</span>
                        <span>•</span>
                        <span>{product.wheels || '4-wheel'}</span>
                      </div>

                      <h3 className="font-serif font-black text-lg text-slate-900 group-hover:text-[#8A7045] transition-colors truncate">
                        <Link href={`/shop/${product.category}/${product.slug}/`}>
                          {product.name}
                        </Link>
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {product.shortDescription || product.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {product.specs?.motor && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                            ⚡ {product.specs.motor}
                          </span>
                        )}
                        {product.specs?.battery && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                            🔋 {product.specs.battery}
                          </span>
                        )}
                        {product.specs?.weight && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                            ⚖️ {product.specs.weight}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="w-full md:w-48 shrink-0 flex flex-col justify-between items-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-200 md:pl-6">
                      <div className="text-right">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">Indicative RRP</span>
                        <span className="text-xl font-black text-slate-900 font-serif">
                          ${product.price.toLocaleString()} <span className="text-xs font-bold text-[#8A7045]">AUD</span>
                        </span>
                      </div>

                      <div className="flex flex-col gap-1.5 w-full">
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="w-full py-2.5 rounded-xl bg-slate-900 text-[#C5A880] text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-all cursor-pointer shadow-xs"
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCompare(product)}
                          className={`w-full py-1.5 rounded-xl text-[11px] font-bold transition-colors cursor-pointer border ${
                            isCompared 
                              ? 'bg-[#C5A880] text-slate-950 border-[#C5A880]' 
                              : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
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
