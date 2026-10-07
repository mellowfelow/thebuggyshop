'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, MessageCircle, Phone, ArrowRight } from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/core';

/**
 * Accordion of FAQs. Every answer stays in the page HTML (hidden when closed) so search engines and
 * AI assistants can read it. The first answer carries `faq-answer-speakable` for voice assistants.
 * Props: faqs, idPrefix (unique per accordion on a page), support (show the contact strip).
 */
export default function CollapsibleFaq({ faqs = [], idPrefix = 'faq', support = true }) {
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto" id={`${idPrefix}-list`}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={`${idPrefix}-item-${faq.id || index}`}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#C5A880] shadow-md ring-1 ring-[#C5A880]/30'
                : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <h3 className="m-0">
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-answer-${index}`}
                className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A880]"
              >
                <span className="flex items-center gap-3.5">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                    isOpen ? 'bg-slate-900 text-[#C5A880]' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug font-serif">
                    {faq.question}
                  </span>
                </span>

                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-[#C5A880] text-slate-950' : 'bg-slate-100 text-slate-500'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </h3>

            <div
              id={`${idPrefix}-answer-${index}`}
              hidden={!isOpen}
              className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80"
            >
              <p className={index === 0 ? 'faq-answer-speakable' : undefined}>{faq.answer}</p>
              {faq.cta && (
                <Link href={faq.cta.href} className="mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#7A5C22] hover:text-slate-900">
                  <span>{faq.cta.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        );
      })}

      {support && (
        <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-lg mt-8">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#C5A880] shrink-0 border border-slate-700">
              <HelpCircle className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-serif">Have a question that is not listed here?</h4>
              <p className="text-xs text-slate-400">Our Queensland sales desk is on standby to help.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hi ${SITE.name}, I have a question about golf buggies and delivery.`)}`}
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
              <span>{CONTACT.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
