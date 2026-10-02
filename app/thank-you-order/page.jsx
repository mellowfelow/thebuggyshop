// app/thank-you-order/page.jsx
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Mail, MessageSquare, ShieldCheck, Truck, Phone } from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site';

function ThankYouOrderContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('orderId') || searchParams.get('ref') || '';

  const waGreeting = `Hi ${SITE.name}, I placed an order ${ref ? `(Ref: ${ref})` : ''} and am ready for payment details.`;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-8">
      {/* Visual Success Icon */}
      <div className="w-20 h-20 bg-slate-900 text-[#C5A880] rounded-3xl flex items-center justify-center mx-auto border border-[#C5A880]/50 shadow-2xl">
        <CheckCircle2 className="w-10 h-10 text-[#C5A880]" />
      </div>

      <div className="space-y-3">
        {ref && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-[#C5A880]/40 text-[#C5A880] text-xs font-mono font-bold uppercase shadow-sm">
            <span>Order Reference:</span>
            <span className="text-white font-black">{ref}</span>
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
          Your Golf Buggy Order Is Registered.
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
          We have generated your order file and sent an immediate confirmation to your email. Please watch your inbox for your official payment and dispatch instructions.
        </p>
      </div>

      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-5 text-left">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-[#C5A880] shrink-0">
            <Mail className="w-5 h-5 text-[#C5A880]" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm uppercase text-slate-900 tracking-wider">
              Watch for Your Payment-Details Email
            </h2>
            <p className="text-xs text-slate-500">
              Our Queensland dispatch desk is preparing your verified settlement instructions.
            </p>
          </div>
        </div>

        <ul className="space-y-3 text-xs text-slate-600">
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-900 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
            <span>Check your email inbox (and spam folder) for formal payment details from <strong>{SITE.name}</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-900 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
            <span>Your email will contain verified Australian Bank Wire / PayID or Crypto settlement instructions.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-900 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
            <span>Once payment is received, your vehicle undergoes final pre-delivery safety inspection before nationwide tail-lift dispatch.</span>
          </li>
        </ul>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(waGreeting)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs uppercase tracking-wider text-center transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-slate-950" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-[#C5A880]" />
            <span>Call Sales: {CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/shop/"
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-xl bg-slate-900 text-[#C5A880] hover:bg-slate-800 font-black text-xs uppercase tracking-wider transition-all border border-slate-700 shadow-md active:scale-95"
        >
          <span>Continue Browsing Fleet</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function ThankYouOrderPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center text-slate-400 text-sm">
        Loading order confirmation...
      </div>
    }>
      <ThankYouOrderContent />
    </Suspense>
  );
}
