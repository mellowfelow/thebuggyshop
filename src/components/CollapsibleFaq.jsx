'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Phone } from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site';
import { HOMEPAGE_FAQS } from '@/src/config/faq';

export default function CollapsibleFaq({ faqs = HOMEPAGE_FAQS }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto" id="homepage-faqs">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.id || index}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#C5A880] shadow-md ring-1 ring-[#C5A880]/30'
                : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
            >
              <div className="flex items-center gap-3.5">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                  isOpen ? 'bg-slate-900 text-[#C5A880]' : 'bg-slate-100 text-slate-700'
                }`}>
                  {index + 1}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug font-serif">
                  {faq.question}
                </h3>
              </div>

              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                isOpen ? 'rotate-180 bg-[#C5A880] text-slate-950' : 'bg-slate-100 text-slate-500'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div
                id={`faq-answer-${index}`}
                className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-in fade-in slide-in-from-top-1 duration-200"
              >
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Direct Contact Support Strip */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-lg mt-8">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#C5A880] shrink-0 border border-slate-700">
            <HelpCircle className="w-5 h-5 text-[#C5A880]" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-white font-serif">Have a technical or freight question not listed above?</h4>
            <p className="text-xs text-slate-400">Our Queensland engineering &amp; sales desk is on standby to assist.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hi ${SITE.name}, I have a technical question regarding buggy specifications and freight.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
          >
            <MessageCircle className="w-3.5 h-3.5 text-slate-950" />
            <span>Chat WhatsApp</span>
          </a>

          <a
            href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
            className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-slate-700"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>0480 811 308</span>
          </a>
        </div>
      </div>
    </div>
  );
}
