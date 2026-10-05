import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site';
import { seoTitle, seoDesc } from '@/lib/seo';

export const metadata = {
  title: { absolute: seoTitle('Thank You For Your Inquiry | The Buggy Shop Australia') },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
      <div className="w-16 h-16 bg-[#0E2A1E] text-[#C5A265] rounded-full flex items-center justify-center mx-auto border-2 border-[#C5A265]/40 shadow-md">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
          Thank You! Your Inquiry is Received.
        </h1>
        <p className="text-sm text-[#4A5D53] leading-relaxed">
          Our Australian technical sales team will review your golf buggy requirements and respond promptly with vehicle availability, spec sheets, accessories options, and delivery schedules.
        </p>
      </div>

      <div className="p-6 bg-[#0E2A1E] text-white rounded-3xl border border-[#C5A265]/30 space-y-4 text-left shadow-xl">
        <div className="flex items-center gap-2 text-xs font-black uppercase text-[#C5A265] tracking-wider">
          <MessageCircle className="w-4 h-4" /> Need Urgent Answers or Stock Verification?
        </div>
        <p className="text-xs text-[#D3DFD8]">
          Reach our customer desk right now on WhatsApp for immediate pricing, custom specs, and walkaround videos.
        </p>
        <a
          href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
            "G'day! I just submitted an inquiry on the website and would like to follow up directly."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-[#071810] font-black text-xs uppercase tracking-wider block text-center hover:bg-[#20bd5a] transition-colors"
        >
          Connect on WhatsApp ({CONTACT.phoneDisplay})
        </a>
      </div>

      <div className="pt-4">
        <Link
          href="/shop/"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider hover:bg-[#163E2D] transition-colors shadow-sm border border-[#C5A265]/30"
        >
          <span>Return to Golf Buggies Range</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
