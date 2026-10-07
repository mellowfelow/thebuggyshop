import React from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { SITE } from '@/src/config/site';

export const metadata = {
  title: '404 - Page Not Found | The Buggy Shop Australia',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 bg-[#F0F3F1] text-[#7A5C22] rounded-full flex items-center justify-center mx-auto border border-[#DDE4DF]">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h1 className="text-3xl sm:text-5xl font-black text-[#0E2A1E] tracking-tight font-serif">
        404 — Page Not Found
      </h1>

      <p className="text-sm text-[#4A5D53] max-w-md mx-auto leading-relaxed">
        The golf buggy model, accessories category, or technical guide you are looking for may have been moved or updated.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          href="/"
          className="py-3.5 px-6 rounded-xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider hover:bg-[#163E2D] transition-colors shadow-sm border border-[#C5A265]/30"
        >
          Return to Homepage
        </Link>
        <Link
          href="/shop/"
          className="py-3.5 px-6 rounded-xl border border-[#DDE4DF] text-[#0E2A1E] font-black text-xs uppercase tracking-wider hover:bg-[#F0F3F1] transition-colors"
        >
          Browse Golf Buggies Range
        </Link>
      </div>
    </div>
  );
}
