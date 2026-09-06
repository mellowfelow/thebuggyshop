import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site';

export const metadata = {
  title: 'Order Draft Prepared | The Buggy Shop Australia',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouOrderPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
      <div className="w-16 h-16 bg-[#0E2A1E] text-[#C5A265] rounded-full flex items-center justify-center mx-auto border-2 border-[#C5A265]/40 shadow-md">
        <CheckCircle2 className="w-8 h-8 text-[#C5A265]" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0E2A1E] tracking-tight font-serif">
          Your Golf Buggy Order Draft Has Been Prepared.
        </h1>
        <p className="text-sm text-[#4A5D53] leading-relaxed">
          Per Australian luxury asset standards, we confirm all golf buggy specifications, battery configurations, accessories, and delivery arrangements directly with you before payment settlement.
        </p>
      </div>

      <div className="p-6 bg-white rounded-3xl border border-[#DDE4DF] shadow-xs space-y-4 text-left">
        <h3 className="font-extrabold text-sm uppercase text-[#0E2A1E]">Next Settlement Steps:</h3>
        <ul className="space-y-2 text-xs text-[#4A5D53]">
          <li className="flex items-start gap-2">
            <span className="font-black text-[#8A7045]">1.</span>
            <span>Our sales desk generates your formal commercial tax invoice with verified options.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-black text-[#8A7045]">2.</span>
            <span>Choose Australian PayID, Bank Transfer (EFT), or save 10% with Bitcoin/USDT.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-black text-[#8A7045]">3.</span>
            <span>Your golf buggy undergoes comprehensive pre-delivery inspection and dispatch.</span>
          </li>
        </ul>

        <div className="pt-2">
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
              "G'day! I have prepared an order draft on the website and would like to confirm invoice settlement."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-[#071810] font-black text-xs uppercase tracking-wider block text-center hover:bg-[#20bd5a] transition-colors"
          >
            Instant WhatsApp Confirmation ({CONTACT.phoneDisplay})
          </a>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/shop/"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#0E2A1E] text-[#C5A265] font-black text-xs uppercase tracking-wider hover:bg-[#163E2D] transition-colors border border-[#C5A265]/30"
        >
          <span>Continue Browsing Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
