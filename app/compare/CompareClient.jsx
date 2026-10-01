'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Trash2, 
  ShoppingBag, 
  BatteryCharging, 
  Zap, 
  Scale, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useStore } from '@/src/components/ClientStoreProvider';

export default function CompareClient({ allProducts = [] }) {
  const { comparedProducts, toggleCompare, addToCart } = useStore();
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all-specs'); // 'all-specs' | 'battery-charger' | 'powertrain' | 'chassis'

  // If no products in compare store, choose 3 informative defaults
  const activeProducts = useMemo(() => {
    if (comparedProducts.length > 0) return comparedProducts;
    // Default showcase: 1 luxury cart, 1 high-grade lithium kit, 1 smart charger
    const cart = allProducts.find(p => p.slug === 'grand-tourer-4-seat-luxury-golf-buggy') || allProducts[0];
    const battery = allProducts.find(p => p.slug === 'roypow-48v-105ah-lithium-golf-cart-conversion-kit') || allProducts[1];
    const charger = allProducts.find(p => p.slug === 'delta-q-ic650-48v-sealed-smart-golf-cart-charger') || allProducts[2];
    return [cart, battery, charger].filter(Boolean);
  }, [comparedProducts, allProducts]);

  // Quick category list for selection drawer
  const selectableProducts = useMemo(() => {
    if (selectedFilterCategory === 'all') return allProducts;
    if (selectedFilterCategory === 'buggies') {
      return allProducts.filter(p => 
        p.category === 'luxury-golf-buggies' || 
        p.category === 'off-road-buggies' || 
        p.category === 'remote-push-golf-buggies' ||
        p.category === 'used-golf-buggies' ||
        p.category.includes('carts') ||
        p.category.includes('buggies')
      );
    }
    if (selectedFilterCategory === 'batteries') {
      return allProducts.filter(p => 
        p.slug.includes('battery') || 
        p.slug.includes('lithium') || 
        p.slug.includes('trojan') ||
        p.category.includes('batteries') ||
        p.name.toLowerCase().includes('battery')
      );
    }
    if (selectedFilterCategory === 'chargers') {
      return allProducts.filter(p => 
        p.slug.includes('charger') || 
        p.name.toLowerCase().includes('charger') ||
        p.specs?.chargerIncluded ||
        p.specs?.chargingTime
      );
    }
    return allProducts;
  }, [allProducts, selectedFilterCategory]);

  // Comprehensive Specification Rows structured into logical engineering groups
  const specGroups = [
    {
      groupTitle: '1. Commercial & Pricing Overview',
      id: 'pricing',
      icon: Scale,
      rows: [
        { label: 'Category & Classification', render: (p) => p.category?.replace(/-/g, ' ').toUpperCase() || 'EQUIPMENT' },
        { label: 'Seating / Fitment', render: (p) => p.seats || p.specs?.seating || p.specs?.fitment || 'Universal Cart Fit' },
        { 
          label: 'Drive-Away Price (Inc. GST)', 
          render: (p) => (
            <span className="text-sm font-black text-slate-900 font-serif">
              ${p.price.toLocaleString('en-AU')} AUD
            </span>
          ) 
        },
        { 
          label: '10% Instant Crypto Price', 
          render: (p) => (
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#8A7045] font-serif bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                ${Math.round(p.price * 0.9).toLocaleString('en-AU')} AUD
              </span>
              <span className="text-[10px] text-emerald-700 font-bold">Save ${(p.price * 0.1).toFixed(0)}</span>
            </div>
          ) 
        },
        { label: 'Condition & Certification', render: (p) => p.badge || p.condition || 'New (Australian Fleet Certified)' },
      ]
    },
    {
      groupTitle: '2. Battery & Energy Storage Engineering',
      id: 'battery',
      icon: BatteryCharging,
      rows: [
        { 
          label: 'Battery Chemistry & Technology', 
          render: (p) => p.specs?.chemistry || (p.specs?.battery?.includes('LiFePO4') ? 'LiFePO4 (Lithium Iron Phosphate)' : p.specs?.battery || (p.slug.includes('charger') ? 'Compatible with LiFePO4, AGM, Flooded & GEL' : '48V Deep-Cycle Pack')) 
        },
        { 
          label: 'System Voltage & Nominal Operating Voltage', 
          render: (p) => p.specs?.voltage || (p.specs?.battery?.includes('72V') ? '72V Nominal (76.8V Max)' : p.specs?.battery?.includes('48V') ? '48V Nominal (51.2V Max)' : p.specs?.battery?.includes('24V') ? '24V Nominal (29.4V Max)' : '48V DC Standard') 
        },
        { 
          label: 'Energy Capacity (Ah / Wh)', 
          render: (p) => p.specs?.capacity || (p.specs?.battery?.includes('150Ah') ? '150Ah (11.5 kWh)' : p.specs?.battery?.includes('105Ah') ? '105Ah (5.37 kWh)' : p.specs?.battery?.includes('380Wh') ? '380Wh (12.8Ah)' : p.specs?.battery?.includes('200Ah') ? '200Ah (15.3 kWh)' : 'High-Density Pack') 
        },
        { 
          label: 'Estimated Cycle Life (80% DOD)', 
          render: (p) => p.specs?.cycleLife || (p.specs?.battery?.includes('LiFePO4') || p.specs?.battery?.includes('Lithium') ? '3,500 – 4,000+ Deep Cycles (10+ Years)' : p.specs?.battery?.includes('Trojan') ? '1,200 Cycles with Regular Watering' : 'N/A') 
        },
        { 
          label: 'Battery Management System (BMS)', 
          render: (p) => p.specs?.bms || (p.specs?.battery?.includes('LiFePO4') || p.specs?.battery?.includes('Lithium') ? 'Integrated Smart Microprocessor BMS with Over-Voltage, Low-Temp Cutoff & Active Cell Balancing' : 'External Charge Protection') 
        },
        { 
          label: 'Battery Weight / Tare Savings', 
          render: (p) => p.specs?.weight || (p.specs?.battery?.includes('72V') ? '48 kg (Saves 180 kg vs Lead-Acid)' : p.specs?.battery?.includes('48V') ? '42 kg (Saves 150 kg vs Lead-Acid)' : p.specs?.battery?.includes('24V') ? '2.8 kg Ultra-Light' : 'Lightweight Module') 
        }
      ]
    },
    {
      groupTitle: '3. Charger, Fast-Charging & Electrical Input',
      id: 'charger',
      icon: Zap,
      rows: [
        { 
          label: 'Charger Output Current (Amps)', 
          render: (p) => p.specs?.currentOutput || (p.specs?.chargerIncluded?.includes('22A') ? '22.0 Amps High-Speed Output' : p.specs?.charging?.includes('Delta-Q') ? '13.5 Amps Continuous' : p.slug.includes('titan') ? '4.0 Amps Rapid' : '15–20 Amps Onboard Smart Controller') 
        },
        { 
          label: 'Charge Duration (0% to 100% Full)', 
          render: (p) => p.specs?.chargingTime || p.specs?.chargeTime || '3.5 – 5.0 Hours Fast Charge' 
        },
        { 
          label: 'Input Voltage & Australian Mains Plug', 
          render: (p) => p.specs?.inputVoltage || 'Standard Australian 240V AC 10A 3-Pin Wall Socket (AS/NZS 3112 Certified)' 
        },
        { 
          label: 'Charging Connector / Port Type', 
          render: (p) => p.specs?.connectors || (p.slug.includes('club-car') ? 'Club Car 3-Pin / Anderson SB50' : p.slug.includes('mgi') ? 'MGI Magnetic Click & Go' : 'Heavy-Duty Anderson High-Current Port') 
        },
        { 
          label: 'Energy Efficiency & Conversion Rating', 
          render: (p) => p.specs?.efficiency || '>93.5% Peak High-Frequency Switching Efficiency' 
        },
        { 
          label: 'Ingress Protection (Water & Dust)', 
          render: (p) => p.specs?.ipRating || 'IP65 / IP66 Weather-Sealed Enclosure' 
        },
        { 
          label: 'Regenerative Braking Energy Recovery', 
          render: (p) => p.specs?.brakes?.includes('Electromagnetic') || p.specs?.brakes?.includes('Retarder') ? 'Yes — Recaptures Kinetic Energy on Downhill Descents directly into Battery' : 'Electronic Motor Braking System' 
        }
      ]
    },
    {
      groupTitle: '4. Powertrain, Speed & Operating Range',
      id: 'powertrain',
      icon: Sparkles,
      rows: [
        { label: 'Motor Output & Architecture', render: (p) => p.specs?.motor || p.specs?.power || 'High-Efficiency Electric Drive' },
        { label: 'Real-World Range per Charge', render: (p) => p.specs?.range || (p.batteryRange ? `${p.batteryRange} per charge` : 'N/A') },
        { label: 'Maximum Top Speed', render: (p) => p.specs?.topSpeed || 'Course Regulated / Adjustable' },
        { label: 'Controller & Modulation', render: (p) => p.specs?.controller || 'Curtis AC Programmable Controller' }
      ]
    },
    {
      groupTitle: '5. Chassis, Payload & Road Legal Compliance',
      id: 'chassis',
      icon: Truck,
      rows: [
        { label: 'Payload Capacity', render: (p) => p.specs?.payloadCapacity || p.specs?.payload || 'N/A' },
        { label: 'Towing Capacity (Tow Ball Hitch)', render: (p) => p.specs?.towingCapacity || p.specs?.towing || 'N/A' },
        { label: 'Ground Clearance Under Diff', render: (p) => p.specs?.groundClearance || '175 mm – 210 mm' },
        { label: 'Suspension Configuration', render: (p) => p.specs?.suspension || 'Independent Double A-Arm with Coil-Over Shocks' },
        { label: 'Braking Architecture', render: (p) => p.specs?.brakes || '4-Wheel Hydraulic Disc + Electromagnetic Auto Park Brake' },
        { label: 'State Conditional Road Registration', render: (p) => p.specs?.roadCompliance || 'Available upon request for QLD / NSW / VIC' }
      ]
    },
    {
      groupTitle: '6. Manufacturer Warranties & Guarantees',
      id: 'warranty',
      icon: ShieldCheck,
      rows: [
        { 
          label: 'Battery Warranty & Life Guarantee', 
          render: (p) => (
            <span className="font-bold text-slate-900">
              {p.specs?.warranty?.includes('LiFePO4') ? '5-Year Full Replacement LiFePO4 Guarantee' : p.specs?.warranty || '3 to 5-Year Australian Manufacturer Warranty'}
            </span>
          ) 
        },
        { label: 'Chassis & Electronics Coverage', render: (p) => '3-Year Australian Fleet Protection' },
        { label: 'Nationwide Service & Technical Support', render: (p) => 'Queensland Central Workshop + Nationwide Mobile Technicians' }
      ]
    }
  ];

  // Filter visible spec groups based on activeTab
  const visibleGroups = useMemo(() => {
    if (activeTab === 'all-specs') return specGroups;
    if (activeTab === 'battery-charger') return specGroups.filter(g => g.id === 'battery' || g.id === 'charger' || g.id === 'pricing');
    if (activeTab === 'powertrain') return specGroups.filter(g => g.id === 'powertrain' || g.id === 'pricing');
    if (activeTab === 'chassis') return specGroups.filter(g => g.id === 'chassis' || g.id === 'pricing');
    return specGroups;
  }, [activeTab, specGroups]);

  return (
    <div className="space-y-8">
      {/* 1. Category Switcher for Model Selection */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#8A7045]" />
            <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              Select Items to Compare ({activeProducts.length} Selected · Max 4):
            </h2>
          </div>

          {/* Quick Filter Pill Categories */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 text-[11px] font-bold mr-1">Filter Inventory:</span>
            {[
              { id: 'all', label: 'All Inventory' },
              { id: 'buggies', label: 'Golf Carts & Buggies' },
              { id: 'batteries', label: '🔋 Batteries & Packs' },
              { id: 'chargers', label: '⚡ Smart Chargers' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilterCategory(tab.id)}
                className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedFilterCategory === tab.id
                    ? 'bg-slate-900 text-[#C5A880] border border-[#C5A880]/50 shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clickable Product Chips */}
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
          {selectableProducts.map((p) => {
            const isSelected = activeProducts.some((item) => item.slug === p.slug);
            const isBatteryOrCharger = p.slug.includes('battery') || p.slug.includes('charger') || p.slug.includes('roypow') || p.slug.includes('relion');
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => toggleCompare(p)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-[#C5A880] border-[#C5A880] shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-300'
                }`}
              >
                <span>{isSelected ? '✓ ' : '+ '}</span>
                <span>{p.name}</span>
                {isBatteryOrCharger && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                    isSelected ? 'bg-[#C5A880] text-slate-950 font-black' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {p.slug.includes('charger') ? 'CHARGER' : 'BATTERY'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Specs Group View Mode Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all-specs', label: 'All Specifications & Pricing', icon: Scale },
          { id: 'battery-charger', label: '🔋 Battery & Charger Deep-Dive', icon: BatteryCharging },
          { id: 'powertrain', label: '⚡ Powertrain & Performance', icon: Zap },
          { id: 'chassis', label: '🚜 Chassis, Payload & Road Legal', icon: Truck }
        ].map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-[#C5A880] border border-[#C5A880] shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <IconComponent className="w-4 h-4 text-[#C5A880]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-xl">
        <table className="w-full text-left text-xs border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-900 text-white">
              <th className="py-6 px-4 sm:px-6 font-black uppercase tracking-wider text-[#C5A880] w-1/4 align-top">
                <div className="space-y-1">
                  <span className="block text-sm font-serif">Engineering Matrix</span>
                  <span className="text-[11px] text-slate-400 font-normal">Side-by-side technical breakdown</span>
                </div>
              </th>
              {activeProducts.map((p) => {
                const isBatteryOrCharger = p.slug.includes('battery') || p.slug.includes('charger') || p.slug.includes('roypow') || p.slug.includes('relion');
                return (
                  <th key={p.slug} className="py-6 px-4 w-1/3 align-top">
                    <div className="space-y-3">
                      <div className="product-frame rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 relative shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => toggleCompare(p)}
                          className="absolute top-2 right-2 p-1.5 bg-slate-950/80 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
                          aria-label={`Remove ${p.name} from comparison`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {isBatteryOrCharger && (
                          <span className="absolute bottom-2 left-2 bg-[#C5A880] text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                            {p.slug.includes('charger') ? '⚡ Smart Charger' : '🔋 Lithium Battery'}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-extrabold text-sm text-white leading-tight line-clamp-2 font-serif">
                          {p.name}
                        </h3>
                        <div className="text-base font-black text-[#C5A880] mt-1 font-serif">
                          ${p.price.toLocaleString('en-AU')} AUD
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => addToCart(p, 1)}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </button>

                        <Link
                          href={`/shop/${p.category || 'golf-buggy-accessories'}/${p.slug}/`}
                          className="text-center py-1 text-xs font-bold text-slate-300 hover:text-[#C5A880] transition-colors uppercase tracking-wider"
                        >
                          View Full Specs &rarr;
                        </Link>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {visibleGroups.map((group) => {
              const GroupIcon = group.icon;
              return (
                <React.Fragment key={group.groupTitle}>
                  {/* Group Header Row */}
                  <tr className="bg-slate-100/90 border-t-2 border-slate-300">
                    <td 
                      colSpan={activeProducts.length + 1} 
                      className="py-3 px-4 sm:px-6 font-black text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2"
                    >
                      <GroupIcon className="w-4 h-4 text-[#8A7045]" />
                      <span>{group.groupTitle}</span>
                    </td>
                  </tr>

                  {/* Group Data Rows */}
                  {group.rows.map((row, rIdx) => (
                    <tr key={row.label} className={rIdx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                      <td className="py-3 px-4 sm:px-6 font-bold text-slate-800 bg-slate-100/40 w-1/4">
                        {row.label}
                      </td>
                      {activeProducts.map((p) => (
                        <td key={p.slug} className="py-3 px-4 text-slate-700 font-medium leading-relaxed">
                          {row.render(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom CTA / Support Bar */}
      <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="font-serif font-black text-lg text-white">
            Need Custom Battery Sizing or Commercial Fleet Recommendations?
          </h3>
          <p className="text-xs text-slate-400">
            Our Queensland engineers provide bespoke LiFePO4 conversion quotes and charger compatibility diagnostics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/contact/"
            className="py-3 px-6 rounded-xl bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            Consult Engineering Desk
          </Link>
          <Link
            href="/shop/"
            className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#C5A880] border border-slate-700 font-black text-xs uppercase tracking-wider transition-all"
          >
            Explore All Accessories
          </Link>
        </div>
      </div>
    </div>
  );
}
