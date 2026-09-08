// src/components/FacetFilter.jsx
'use client';

import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Search, 
  Check, 
  Zap, 
  DollarSign, 
  Users, 
  Battery, 
  Scale, 
  Sparkles,
  SlidersHorizontal,
  Compass,
  Tag
} from 'lucide-react';

const BRAND_COUNTRY_MAP = {
  mgi: { label: 'MGI', country: '🇦🇺 Australia', origin: 'AU' },
  motocaddy: { label: 'Motocaddy', country: '🇬🇧 UK', origin: 'UK' },
  powakaddy: { label: 'PowaKaddy', country: '🇬🇧 UK', origin: 'UK' },
  'stinger-golf': { label: 'Stinger', country: '🇦🇺 Australia', origin: 'AU' },
  stinger: { label: 'Stinger', country: '🇦🇺 Australia', origin: 'AU' },
  alphard: { label: 'Alphard', country: '🇺🇸 USA', origin: 'US' },
  'stewart-golf': { label: 'Stewart Golf', country: '🇬🇧 UK', origin: 'UK' },
  clicgear: { label: 'Clicgear', country: '🇸🇬 Singapore', origin: 'SG' },
  'big-max': { label: 'Big Max', country: '🇩🇪 Germany', origin: 'DE' },
  'qod-golf': { label: 'QOD', country: '🇦🇺 Australia', origin: 'AU' },
  brosnan: { label: 'Brosnan', country: '🇦🇺 Australia', origin: 'AU' },
  ecar: { label: 'ECAR', country: '🇨🇳 / 🇦🇺 AU Distrib.', origin: 'AU' },
  tomberlin: { label: 'Tomberlin', country: '🇺🇸 USA', origin: 'US' },
  'club-car': { label: 'Club Car', country: '🇺🇸 USA', origin: 'US' },
  yamaha: { label: 'Yamaha', country: '🇯🇵 Japan', origin: 'JP' },
  'ez-go': { label: 'E-Z-GO', country: '🇺🇸 USA', origin: 'US' },
  evolution: { label: 'Evolution', country: '🇺🇸 USA', origin: 'US' },
  tara: { label: 'Tara', country: '🇨🇳 / 🇦🇺 AU Distrib.', origin: 'AU' },
  garia: { label: 'Garia', country: '🇩🇰 Denmark', origin: 'DK' },
  'can-am': { label: 'Can-Am', country: '🇨🇦 Canada', origin: 'CA' },
  polaris: { label: 'Polaris', country: '🇺🇸 USA', origin: 'US' },
  cfmoto: { label: 'CFMOTO', country: '🇨🇳 China', origin: 'CN' },
  kayo: { label: 'Kayo', country: '🇨🇳 / 🇦🇺 AU Distrib.', origin: 'AU' },
  crossfire: { label: 'Crossfire', country: '🇦🇺 Australia', origin: 'AU' },
  gmx: { label: 'GMX', country: '🇨🇳 / 🇦🇺 AU Distrib.', origin: 'AU' },
  hammerhead: { label: 'Hammerhead', country: '🇺🇸 USA', origin: 'US' },
  thomson: { label: 'THOMSON', country: '🇨🇳 / 🇦🇺 AU Distrib.', origin: 'AU' },
  triumph: { label: 'Triumph', country: '🇦🇺 Australia', origin: 'AU' },
  trojan: { label: 'Trojan Battery', country: '🇺🇸 USA', origin: 'US' },
  bennche: { label: 'Bennche', country: '🇺🇸 USA', origin: 'US' },
  kandi: { label: 'Kandi', country: '🇺🇸 USA', origin: 'US' }
};

export default function FacetFilter({ 
  facets = {}, 
  activeFilters = {}, 
  onFilterChange, 
  onClearFilters,
  onClearSection,
  onPriceCustomChange,
  customMinPrice = '',
  customMaxPrice = '',
  searchQuery = '',
  onSearchChange,
  totalCount = 0,
  filteredCount = 0,
  facetCounts = {}
}) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');
  const [minInput, setMinInput] = useState(customMinPrice);
  const [maxInput, setMaxInput] = useState(customMaxPrice);

  const [expandedSections, setExpandedSections] = useState({
    power: true,
    brand: true,
    price: true,
    seats: true,
    wheels: false,
    condition: false,
    batteryRange: false,
    weight: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const hasActiveFilters = Object.entries(activeFilters).some(([k, v]) => {
    if (k === 'priceMin' || k === 'priceMax') return Boolean(v);
    return Array.isArray(v) ? v.length > 0 : Boolean(v);
  }) || Boolean(searchQuery) || Boolean(customMinPrice) || Boolean(customMaxPrice);

  // Count active filters in a specific section
  const getSectionActiveCount = (sectionKey) => {
    if (sectionKey === 'price') {
      let count = activeFilters.priceRange?.length || 0;
      if (customMinPrice || customMaxPrice) count += 1;
      return count;
    }
    const val = activeFilters[sectionKey];
    return Array.isArray(val) ? val.length : 0;
  };

  const handlePriceApply = (e) => {
    e.preventDefault();
    if (onPriceCustomChange) {
      onPriceCustomChange(minInput, maxInput);
    }
  };

  const handlePriceReset = () => {
    setMinInput('');
    setMaxInput('');
    if (onPriceCustomChange) {
      onPriceCustomChange('', '');
    }
  };

  // Filter brand list based on brand search input
  const allBrandIds = useMemo(() => {
    const fromFacets = facets.brand || [];
    const knownKeys = Object.keys(BRAND_COUNTRY_MAP);
    const combined = Array.from(new Set([...fromFacets, ...knownKeys]));
    return combined.sort((a, b) => {
      const countA = facetCounts?.brand?.[a] || 0;
      const countB = facetCounts?.brand?.[b] || 0;
      if (countB !== countA) return countB - countA; // popular brands with stock first
      const nameA = BRAND_COUNTRY_MAP[a]?.label || a;
      const nameB = BRAND_COUNTRY_MAP[b]?.label || b;
      return nameA.localeCompare(nameB);
    });
  }, [facets.brand, facetCounts]);

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return allBrandIds;
    const q = brandSearch.toLowerCase().trim();
    return allBrandIds.filter(b => {
      const info = BRAND_COUNTRY_MAP[b];
      const name = info?.label || b;
      const country = info?.country || '';
      return name.toLowerCase().includes(q) || country.toLowerCase().includes(q) || b.toLowerCase().includes(q);
    });
  }, [allBrandIds, brandSearch]);

  const filterContent = (
    <div className="space-y-5">
      {/* 0. Top Header: Title, Active Badge & Global Reset */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#D5DFD9]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#0E2A1E] text-[#C5A265] flex items-center justify-center shadow-2xs">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider block">Refine Buggies</span>
            <span className="text-[11px] font-bold text-[#4A5D53]">
              {filteredCount} of {totalCount} matching
            </span>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="flex items-center gap-1.5 text-xs text-[#8A7045] hover:text-[#0E2A1E] font-extrabold bg-[#FFF9ED] hover:bg-[#F4EADA] px-2.5 py-1 rounded-lg border border-[#E5CCA0] transition-all cursor-pointer shadow-2xs group"
          >
            <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform duration-300" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* 0.1 In-Filter Instant Keyword Search */}
      {onSearchChange && (
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#8A7045] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search models, brands, specs..."
            className="w-full bg-[#F4F7F5] focus:bg-white text-xs text-[#0E2A1E] font-medium pl-8 pr-7 py-2 rounded-xl border border-[#CAD5CE] focus:border-[#C5A265] focus:outline-hidden transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A7045] hover:text-[#0E2A1E] p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. POWER & PROPULSION */}
      {/* ========================================================================= */}
      <div className="bg-[#FAFBF9] rounded-2xl p-3.5 border border-[#DCE4DF] transition-all">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleSection('power')}
            className="flex-1 flex items-center justify-between py-0.5 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-[#C5A265]" />
              <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider group-hover:text-[#8A7045] transition-colors">
                Power & Drive
              </span>
              {getSectionActiveCount('power') > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black flex items-center justify-center">
                  {getSectionActiveCount('power')}
                </span>
              )}
            </div>
            {expandedSections.power ? <ChevronUp className="w-3.5 h-3.5 text-[#4A5D53]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#4A5D53]" />}
          </button>
          {getSectionActiveCount('power') > 0 && (
            <button
              type="button"
              onClick={() => onClearSection && onClearSection('power')}
              className="text-[10px] font-bold text-[#8A7045] hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {expandedSections.power && (
          <div className="mt-3 pt-2.5 border-t border-[#E8ECE9] space-y-1.5">
            {[
              { id: 'Remote control', label: 'Remote Control', icon: '🎮', desc: 'Hands-free directional wireless' },
              { id: 'Follow / GPS', label: 'Follow & GPS Touchscreen', icon: '🤖', desc: 'Autonomous tracking & yardages' },
              { id: 'Electric', label: 'Walk-Behind Electric & Carts', icon: '⚡', desc: 'Speed-dial & Lithium powered' },
              { id: 'Manual push', label: 'Manual Push & Pull', icon: '🚶', desc: 'Lightweight, 3 & 4 wheel' },
              { id: 'Petrol', label: 'Petrol & Commercial', icon: '⛽', desc: 'Heavy-duty & Dune buggies' }
            ].map(opt => {
              const checked = activeFilters.power?.includes(opt.id);
              const count = facetCounts?.power?.[opt.id] || 0;
              return (
                <label 
                  key={opt.id} 
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                    checked 
                      ? 'bg-[#0E2A1E] text-[#C5A265] shadow-xs' 
                      : 'bg-white hover:bg-[#EDF3EF] text-[#2A4D3B] border border-[#E2E8E4]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onFilterChange('power', opt.id)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      checked 
                        ? 'bg-[#C5A265] border-[#C5A265] text-[#0E2A1E]' 
                        : 'border-[#CAD5CE] bg-white group-hover:border-[#0E2A1E]'
                    }`}>
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div className="truncate">
                      <span className={`text-xs block leading-tight ${checked ? 'font-black text-white' : 'font-semibold text-[#0E2A1E]'}`}>
                        <span className="mr-1">{opt.icon}</span> {opt.label}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${
                    checked ? 'bg-[#19402F] text-[#C5A265]' : 'bg-[#EBF1ED] text-[#4A5D53]'
                  }`}>
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. BRAND & ORIGIN */}
      {/* ========================================================================= */}
      <div className="bg-[#FAFBF9] rounded-2xl p-3.5 border border-[#DCE4DF] transition-all">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleSection('brand')}
            className="flex-1 flex items-center justify-between py-0.5 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#C5A265]" />
              <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider group-hover:text-[#8A7045] transition-colors">
                Brand & Origin
              </span>
              {getSectionActiveCount('brand') > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black flex items-center justify-center">
                  {getSectionActiveCount('brand')}
                </span>
              )}
            </div>
            {expandedSections.brand ? <ChevronUp className="w-3.5 h-3.5 text-[#4A5D53]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#4A5D53]" />}
          </button>
          {getSectionActiveCount('brand') > 0 && (
            <button
              type="button"
              onClick={() => onClearSection && onClearSection('brand')}
              className="text-[10px] font-bold text-[#8A7045] hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {expandedSections.brand && (
          <div className="mt-3 pt-2.5 border-t border-[#E8ECE9] space-y-2">
            {/* Quick Brand Search Input */}
            <div className="relative">
              <Search className="w-3 h-3 text-[#8A7045] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Filter 27 Australian brands..."
                className="w-full bg-white text-[11px] text-[#0E2A1E] pl-7 pr-6 py-1.5 rounded-lg border border-[#CAD5CE] focus:border-[#C5A265] focus:outline-hidden"
              />
              {brandSearch && (
                <button
                  type="button"
                  onClick={() => setBrandSearch('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8A7045] text-xs font-bold"
                >
                  ×
                </button>
              )}
            </div>

            {/* Scrollable Brand List */}
            <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {filteredBrands.map(brandId => {
                const info = BRAND_COUNTRY_MAP[brandId] || { label: brandId, country: 'International' };
                const checked = activeFilters.brand?.includes(brandId);
                const count = facetCounts?.brand?.[brandId] || 0;

                return (
                  <label 
                    key={brandId} 
                    className={`flex items-center justify-between p-1.5 sm:p-2 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                      checked 
                        ? 'bg-[#0E2A1E] text-[#C5A265] shadow-xs' 
                        : 'bg-white hover:bg-[#EDF3EF] text-[#2A4D3B] border border-[#E2E8E4]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onFilterChange('brand', brandId)}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        checked 
                          ? 'bg-[#C5A265] border-[#C5A265] text-[#0E2A1E]' 
                          : 'border-[#CAD5CE] bg-white group-hover:border-[#0E2A1E]'
                      }`}>
                        {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <div className="truncate">
                        <span className={`text-xs block leading-tight ${checked ? 'font-black text-white' : 'font-bold text-[#0E2A1E]'}`}>
                          {info.label}
                        </span>
                        <span className={`text-[9px] block ${checked ? 'text-[#C5A265]/80' : 'text-[#60756B]'}`}>
                          {info.country}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${
                      checked ? 'bg-[#19402F] text-[#C5A265]' : 'bg-[#EBF1ED] text-[#4A5D53]'
                    }`}>
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. PRICE RANGE (AUD) */}
      {/* ========================================================================= */}
      <div className="bg-[#FAFBF9] rounded-2xl p-3.5 border border-[#DCE4DF] transition-all">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleSection('price')}
            className="flex-1 flex items-center justify-between py-0.5 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-[#C5A265]" />
              <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider group-hover:text-[#8A7045] transition-colors">
                Budget / Price (AUD)
              </span>
              {getSectionActiveCount('price') > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black flex items-center justify-center">
                  {getSectionActiveCount('price')}
                </span>
              )}
            </div>
            {expandedSections.price ? <ChevronUp className="w-3.5 h-3.5 text-[#4A5D53]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#4A5D53]" />}
          </button>
          {getSectionActiveCount('price') > 0 && (
            <button
              type="button"
              onClick={() => {
                onClearSection && onClearSection('priceRange');
                handlePriceReset();
              }}
              className="text-[10px] font-bold text-[#8A7045] hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {expandedSections.price && (
          <div className="mt-3 pt-2.5 border-t border-[#E8ECE9] space-y-2.5">
            {/* Quick Price Tier Chips */}
            <div className="space-y-1.5">
              {[
                { id: 'under-1000', label: 'Under $1,000 AUD', desc: 'Push buggies & parts' },
                { id: '1000-2500', label: '$1,000 – $2,500 AUD', desc: 'Electric & Remote buggies' },
                { id: '2500-10000', label: '$2,500 – $10,000 AUD', desc: 'GPS Follow & Entry UTVs' },
                { id: 'over-10000', label: 'Over $10,000 AUD', desc: 'Lithium Course & Estate Carts' }
              ].map(p => {
                const checked = activeFilters.priceRange?.includes(p.id);
                const count = facetCounts?.priceRange?.[p.id] || 0;

                return (
                  <label 
                    key={p.id} 
                    className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                      checked 
                        ? 'bg-[#0E2A1E] text-[#C5A265] shadow-xs' 
                        : 'bg-white hover:bg-[#EDF3EF] text-[#2A4D3B] border border-[#E2E8E4]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onFilterChange('priceRange', p.id)}
                        className="sr-only"
                      />
                      <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        checked 
                          ? 'bg-[#C5A265] border-[#C5A265] text-[#0E2A1E]' 
                          : 'border-[#CAD5CE] bg-white'
                      }`}>
                        {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <div className="truncate">
                        <span className={`text-xs block leading-tight ${checked ? 'font-black text-white' : 'font-bold text-[#0E2A1E]'}`}>
                          {p.label}
                        </span>
                        <span className={`text-[9px] block ${checked ? 'text-[#C5A265]/80' : 'text-[#60756B]'}`}>
                          {p.desc}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${
                      checked ? 'bg-[#19402F] text-[#C5A265]' : 'bg-[#EBF1ED] text-[#4A5D53]'
                    }`}>
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Custom Min/Max Input Form */}
            <form onSubmit={handlePriceApply} className="bg-white p-2.5 rounded-xl border border-[#DCE4DF] space-y-2">
              <div className="text-[10px] font-black text-[#0E2A1E] uppercase tracking-wider">
                Custom Budget (AUD)
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] text-[#4A5D53] block font-bold mb-0.5">Min ($)</label>
                  <input
                    type="number"
                    value={minInput}
                    onChange={(e) => setMinInput(e.target.value)}
                    placeholder="e.g. 1000"
                    min="0"
                    className="w-full text-xs font-bold text-[#0E2A1E] bg-[#F7F9F8] border border-[#CAD5CE] rounded-lg px-2 py-1.5 focus:border-[#C5A265] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-[#4A5D53] block font-bold mb-0.5">Max ($)</label>
                  <input
                    type="number"
                    value={maxInput}
                    onChange={(e) => setMaxInput(e.target.value)}
                    placeholder="e.g. 5000"
                    min="0"
                    className="w-full text-xs font-bold text-[#0E2A1E] bg-[#F7F9F8] border border-[#CAD5CE] rounded-lg px-2 py-1.5 focus:border-[#C5A265] focus:outline-hidden"
                  />
                </div>
              </div>
              <div className="flex gap-1.5 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-1.5 rounded-lg bg-[#0E2A1E] text-[#C5A265] text-xs font-black uppercase tracking-wider hover:bg-[#163E2D] transition-colors cursor-pointer"
                >
                  Apply Range
                </button>
                {(customMinPrice || customMaxPrice) && (
                  <button
                    type="button"
                    onClick={handlePriceReset}
                    className="px-2 py-1.5 rounded-lg bg-[#F0F4F1] text-[#0E2A1E] text-xs font-bold hover:bg-[#E2ECE6] transition-colors cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. SEATING CAPACITY & VEHICLE TYPE */}
      {/* ========================================================================= */}
      <div className="bg-[#FAFBF9] rounded-2xl p-3.5 border border-[#DCE4DF] transition-all">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleSection('seats')}
            className="flex-1 flex items-center justify-between py-0.5 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#C5A265]" />
              <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider group-hover:text-[#8A7045] transition-colors">
                Seating & Body
              </span>
              {getSectionActiveCount('seats') > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black flex items-center justify-center">
                  {getSectionActiveCount('seats')}
                </span>
              )}
            </div>
            {expandedSections.seats ? <ChevronUp className="w-3.5 h-3.5 text-[#4A5D53]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#4A5D53]" />}
          </button>
          {getSectionActiveCount('seats') > 0 && (
            <button
              type="button"
              onClick={() => onClearSection && onClearSection('seats')}
              className="text-[10px] font-bold text-[#8A7045] hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {expandedSections.seats && (
          <div className="mt-3 pt-2.5 border-t border-[#E8ECE9] space-y-1.5">
            {[
              { id: 'Walk-behind', label: 'Walk-Behind (Push / Remote)', icon: '🚶' },
              { id: '2', label: '2-Seat (Course & Private Cart)', icon: '👥' },
              { id: '4', label: '4-Seat (Resort & Cruiser Cart)', icon: '👨‍👩‍👧‍👦' },
              { id: '6', label: '6-Seat (VIP Transporter Cart)', icon: '🚐' }
            ].map(s => {
              const checked = activeFilters.seats?.includes(s.id);
              const count = facetCounts?.seats?.[s.id] || 0;

              return (
                <label 
                  key={s.id} 
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                    checked 
                      ? 'bg-[#0E2A1E] text-[#C5A265] shadow-xs' 
                      : 'bg-white hover:bg-[#EDF3EF] text-[#2A4D3B] border border-[#E2E8E4]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onFilterChange('seats', s.id)}
                      className="sr-only"
                    />
                    <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      checked 
                        ? 'bg-[#C5A265] border-[#C5A265] text-[#0E2A1E]' 
                        : 'border-[#CAD5CE] bg-white'
                    }`}>
                      {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs block leading-tight ${checked ? 'font-black text-white' : 'font-bold text-[#0E2A1E]'}`}>
                      <span className="mr-1">{s.icon}</span> {s.label}
                    </span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${
                    checked ? 'bg-[#19402F] text-[#C5A265]' : 'bg-[#EBF1ED] text-[#4A5D53]'
                  }`}>
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5. WHEEL CONFIGURATION */}
      {/* ========================================================================= */}
      <div className="bg-[#FAFBF9] rounded-2xl p-3.5 border border-[#DCE4DF] transition-all">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleSection('wheels')}
            className="flex-1 flex items-center justify-between py-0.5 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
              <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider group-hover:text-[#8A7045] transition-colors">
                Wheel Configuration
              </span>
              {getSectionActiveCount('wheels') > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black flex items-center justify-center">
                  {getSectionActiveCount('wheels')}
                </span>
              )}
            </div>
            {expandedSections.wheels ? <ChevronUp className="w-3.5 h-3.5 text-[#4A5D53]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#4A5D53]" />}
          </button>
          {getSectionActiveCount('wheels') > 0 && (
            <button
              type="button"
              onClick={() => onClearSection && onClearSection('wheels')}
              className="text-[10px] font-bold text-[#8A7045] hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {expandedSections.wheels && (
          <div className="mt-3 pt-2.5 border-t border-[#E8ECE9] space-y-1.5">
            {[
              { id: '4-wheel', label: '4-Wheel (All-Terrain & Carts)' },
              { id: '3-wheel', label: '3-Wheel (Agile & 360 Swivel)' },
              { id: '2-wheel', label: '2-Wheel (Ultra-Compact Pull)' }
            ].map(w => {
              const checked = activeFilters.wheels?.includes(w.id);
              const count = facetCounts?.wheels?.[w.id] || 0;

              return (
                <label 
                  key={w.id} 
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                    checked 
                      ? 'bg-[#0E2A1E] text-[#C5A265] shadow-xs' 
                      : 'bg-white hover:bg-[#EDF3EF] text-[#2A4D3B] border border-[#E2E8E4]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onFilterChange('wheels', w.id)}
                      className="sr-only"
                    />
                    <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      checked 
                        ? 'bg-[#C5A265] border-[#C5A265] text-[#0E2A1E]' 
                        : 'border-[#CAD5CE] bg-white'
                    }`}>
                      {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs block leading-tight ${checked ? 'font-black text-white' : 'font-bold text-[#0E2A1E]'}`}>
                      {w.label}
                    </span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${
                    checked ? 'bg-[#19402F] text-[#C5A265]' : 'bg-[#EBF1ED] text-[#4A5D53]'
                  }`}>
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 6. CONDITION & CERTIFICATION */}
      {/* ========================================================================= */}
      <div className="bg-[#FAFBF9] rounded-2xl p-3.5 border border-[#DCE4DF] transition-all">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleSection('condition')}
            className="flex-1 flex items-center justify-between py-0.5 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#C5A265]" />
              <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider group-hover:text-[#8A7045] transition-colors">
                Vehicle Condition
              </span>
              {getSectionActiveCount('condition') > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black flex items-center justify-center">
                  {getSectionActiveCount('condition')}
                </span>
              )}
            </div>
            {expandedSections.condition ? <ChevronUp className="w-3.5 h-3.5 text-[#4A5D53]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#4A5D53]" />}
          </button>
          {getSectionActiveCount('condition') > 0 && (
            <button
              type="button"
              onClick={() => onClearSection && onClearSection('condition')}
              className="text-[10px] font-bold text-[#8A7045] hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {expandedSections.condition && (
          <div className="mt-3 pt-2.5 border-t border-[#E8ECE9] space-y-1.5">
            {[
              { id: 'New', label: 'Brand New (Australian Warranty)', desc: 'Factory sealed & certified' },
              { id: 'Ex-demo', label: 'Ex-Demo & Display Stock', desc: 'Lightly tested, full savings' },
              { id: 'Used', label: 'Certified Pre-Owned & Ex-Fleet', desc: 'Workshop inspected & tested' }
            ].map(c => {
              const checked = activeFilters.condition?.includes(c.id);
              const count = facetCounts?.condition?.[c.id] || 0;

              return (
                <label 
                  key={c.id} 
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                    checked 
                      ? 'bg-[#0E2A1E] text-[#C5A265] shadow-xs' 
                      : 'bg-white hover:bg-[#EDF3EF] text-[#2A4D3B] border border-[#E2E8E4]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onFilterChange('condition', c.id)}
                      className="sr-only"
                    />
                    <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      checked 
                        ? 'bg-[#C5A265] border-[#C5A265] text-[#0E2A1E]' 
                        : 'border-[#CAD5CE] bg-white'
                    }`}>
                      {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <div className="truncate">
                      <span className={`text-xs block leading-tight ${checked ? 'font-black text-white' : 'font-bold text-[#0E2A1E]'}`}>
                        {c.label}
                      </span>
                      <span className={`text-[9px] block ${checked ? 'text-[#C5A265]/80' : 'text-[#60756B]'}`}>
                        {c.desc}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${
                    checked ? 'bg-[#19402F] text-[#C5A265]' : 'bg-[#EBF1ED] text-[#4A5D53]'
                  }`}>
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 7. BATTERY ENDURANCE / RANGE */}
      {/* ========================================================================= */}
      <div className="bg-[#FAFBF9] rounded-2xl p-3.5 border border-[#DCE4DF] transition-all">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => toggleSection('batteryRange')}
            className="flex-1 flex items-center justify-between py-0.5 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Battery className="w-3.5 h-3.5 text-[#C5A265]" />
              <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider group-hover:text-[#8A7045] transition-colors">
                Lithium Battery Range
              </span>
              {getSectionActiveCount('batteryRange') > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0E2A1E] text-[#C5A265] text-[10px] font-black flex items-center justify-center">
                  {getSectionActiveCount('batteryRange')}
                </span>
              )}
            </div>
            {expandedSections.batteryRange ? <ChevronUp className="w-3.5 h-3.5 text-[#4A5D53]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#4A5D53]" />}
          </button>
          {getSectionActiveCount('batteryRange') > 0 && (
            <button
              type="button"
              onClick={() => onClearSection && onClearSection('batteryRange')}
              className="text-[10px] font-bold text-[#8A7045] hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {expandedSections.batteryRange && (
          <div className="mt-3 pt-2.5 border-t border-[#E8ECE9] space-y-1.5">
            {[
              { id: '36 hole', label: '36+ Hole Ultra Capacity' },
              { id: '27 hole', label: '27 Hole Standard Lithium' },
              { id: '18 hole', label: '18 Hole Compact Lithium' }
            ].map(b => {
              const checked = activeFilters.batteryRange?.includes(b.id);
              const count = facetCounts?.batteryRange?.[b.id] || 0;

              return (
                <label 
                  key={b.id} 
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 select-none ${
                    checked 
                      ? 'bg-[#0E2A1E] text-[#C5A265] shadow-xs' 
                      : 'bg-white hover:bg-[#EDF3EF] text-[#2A4D3B] border border-[#E2E8E4]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onFilterChange('batteryRange', b.id)}
                      className="sr-only"
                    />
                    <div className={`w-3.5 h-3.5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      checked 
                        ? 'bg-[#C5A265] border-[#C5A265] text-[#0E2A1E]' 
                        : 'border-[#CAD5CE] bg-white'
                    }`}>
                      {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs block leading-tight ${checked ? 'font-black text-white' : 'font-bold text-[#0E2A1E]'}`}>
                      {b.label}
                    </span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ml-1 ${
                    checked ? 'bg-[#19402F] text-[#C5A265]' : 'bg-[#EBF1ED] text-[#4A5D53]'
                  }`}>
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sticky Filter Trigger Button */}
      <div className="lg:hidden mb-4 sticky top-20 z-30">
        <button
          type="button"
          onClick={() => setIsOpenMobile(true)}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-lg border-2 border-[#C5A265]/50 active:scale-[0.99] transition-all cursor-pointer"
        >
          <span className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-[#C5A265]" />
            <span>Filter & Refine ({filteredCount} Vehicles)</span>
          </span>
          <span className="bg-[#C5A265] text-[#0E2A1E] px-2.5 py-1 rounded-full text-[11px] font-black">
            {hasActiveFilters ? 'Filters Active' : 'All Options'}
          </span>
        </button>
      </div>

      {/* Mobile Filter Modal Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity duration-300" 
            onClick={() => setIsOpenMobile(false)} 
          />
          <div className="relative ml-auto w-full max-w-sm bg-white h-full p-5 overflow-y-auto shadow-2xl flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#DDE4DF] mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#8A7045]" />
                  <h3 className="font-serif font-black text-lg text-[#0E2A1E]">Filter Buggies</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpenMobile(false)}
                  className="p-1.5 rounded-xl bg-[#F0F4F1] text-[#4A5D53] hover:text-[#0E2A1E] hover:bg-[#E2ECE6] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {filterContent}
            </div>

            {/* Mobile Drawer Bottom Action Bar */}
            <div className="pt-4 border-t border-[#DDE4DF] mt-6 sticky bottom-0 bg-white space-y-2">
              <button
                type="button"
                onClick={() => setIsOpenMobile(false)}
                className="w-full py-3.5 bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider rounded-xl shadow-md border border-[#C5A265]/40 hover:bg-[#163E2D] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Show {filteredCount} Matching Vehicles</span>
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    onClearFilters();
                  }}
                  className="w-full py-2 bg-transparent text-[#8A7045] font-bold text-xs hover:text-[#0E2A1E] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sticky Filter Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white p-5 rounded-3xl border-2 border-[#D5DFD9] shadow-xs self-start sticky top-28 space-y-4">
        {filterContent}
      </aside>
    </>
  );
}
