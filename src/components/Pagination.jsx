// src/components/Pagination.jsx
'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pageWindow } from '@/lib/catalog';

export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const btn = 'min-w-10 h-10 px-3 rounded-xl text-xs font-black border transition-colors cursor-pointer flex items-center justify-center';

  return (
    <nav aria-label="Product pages" className="flex flex-wrap items-center justify-center gap-2 pt-8">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={`${btn} gap-1 bg-white text-slate-900 border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pageWindow(page, pages).map((n, i) =>
        n === '…' ? (
          <span key={`gap-${i}`} className="px-1 text-slate-400" aria-hidden="true">…</span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`Page ${n}`}
            aria-current={n === page ? 'page' : undefined}
            className={`${btn} ${n === page ? 'bg-slate-900 text-[#C5A880] border-slate-900' : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50'}`}
          >
            {n}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === pages}
        className={`${btn} gap-1 bg-white text-slate-900 border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
