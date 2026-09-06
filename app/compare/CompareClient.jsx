'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '@/src/components/ClientStoreProvider';

export default function CompareClient({ allProducts }) {
  const { comparedProducts, toggleCompare, addToCart } = useStore();

  // If no products selected, pre-populate with first 3 products
  const activeProducts =
    comparedProducts.length > 0 ? comparedProducts : allProducts.slice(0, 3);

  const specRows = [
    { label: 'Category', render: (p) => p.category.replace(/-/g, ' ') },
    { label: 'Seating Capacity', render: (p) => p.seats || p.specs?.seating || '2-Passenger' },
    { label: 'Drive-Away Price', render: (p) => `$${p.price.toLocaleString('en-AU')} AUD` },
    { label: '10% Crypto Price', render: (p) => `$${Math.round(p.price * 0.9).toLocaleString('en-AU')} AUD` },
    { label: 'Motor & Power', render: (p) => p.specs?.motor || p.specs?.makeModel || p.specs?.frame || 'N/A' },
    { label: 'Lithium Battery Pack', render: (p) => p.specs?.battery || p.specs?.batteryUpgrade || p.specs?.material || 'N/A' },
    { label: 'Real-World Range', render: (p) => p.specs?.range || 'N/A' },
    { label: 'Top Speed', render: (p) => p.specs?.topSpeed || 'N/A' },
    { label: 'Payload Capacity', render: (p) => p.specs?.payloadCapacity || p.specs?.weight || 'N/A' },
    { label: 'Towing Capacity', render: (p) => p.specs?.towingCapacity || 'N/A' },
    { label: 'Ground Clearance', render: (p) => p.specs?.groundClearance || 'N/A' },
    { label: 'Braking System', render: (p) => p.specs?.brakes || 'Standard Safety Brakes' },
    { label: 'Suspension', render: (p) => p.specs?.suspension || 'Turf Suspension' },
    { label: 'State Road Compliance', render: (p) => p.specs?.roadCompliance || 'Private Property / Golf Course' },
    { label: 'Battery Warranty', render: (p) => p.specs?.warranty || 'Standard Warranty' },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Add Model Select */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] rounded-3xl border border-[#D5DFD9] shadow-sm">
        <span className="text-xs font-black text-[#0E2A1E] uppercase tracking-wider">
          Comparing {activeProducts.length} Buggy Models:
        </span>

        <div className="flex flex-wrap gap-2">
          {allProducts.map((p) => {
            const isSelected = activeProducts.some((item) => item.slug === p.slug);
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => toggleCompare(p)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E2A1E] text-[#C5A265] border-[#C5A265]/40 shadow-xs'
                    : 'bg-white text-[#2A4D3B] hover:bg-[#EBF1ED] border-[#CAD5CE]'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}
                {p.name.split(' ')[1] || p.name.slice(0, 14)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-[#D5DFD9] shadow-md">
        <table className="w-full text-left text-xs border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#D5DFD9] bg-gradient-to-b from-[#F7FAF8] to-[#EDF3EF]">
              <th className="py-6 px-4 font-black uppercase tracking-wider text-[#4A5D53] w-1/4">
                Specification Matrix
              </th>
              {activeProducts.map((p) => (
                <th key={p.slug} className="py-6 px-4 w-1/3 align-top">
                  <div className="space-y-3">
                    <div className="product-frame rounded-2xl overflow-hidden border border-[#D5DFD9] bg-white relative shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => toggleCompare(p)}
                        className="absolute top-2 right-2 p-1.5 bg-black/75 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                        aria-label={`Remove ${p.name} from comparison`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm text-[#0E2A1E] leading-tight line-clamp-2 font-serif">
                        {p.name}
                      </h3>
                      <div className="text-base font-black text-[#8A7045] mt-1 font-serif">
                        ${p.price.toLocaleString('en-AU')} AUD
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => addToCart(p, 1)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#0E2A1E] hover:bg-[#163E2D] text-[#C5A265] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-[#C5A265]/40 shadow-xs active:scale-[0.98]"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#C5A265]" />
                        <span>Add to Order</span>
                      </button>

                      <Link
                        href={`/shop/${p.category}/${p.slug}/`}
                        className="text-center py-1.5 text-xs font-black text-[#0E2A1E] hover:text-[#8A7045] transition-colors uppercase tracking-wider"
                      >
                        View Full Details →
                      </Link>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D5DFD9]">
            {specRows.map((row, idx) => (
              <tr key={row.label} className={idx % 2 === 0 ? 'bg-[#F9FBFA]' : 'bg-white'}>
                <td className="py-3.5 px-4 font-black text-[#0E2A1E] bg-[#EEF4F0]/60">
                  {row.label}
                </td>
                {activeProducts.map((p) => (
                  <td key={p.slug} className="py-3.5 px-4 text-[#0E2A1E] font-medium leading-relaxed">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
