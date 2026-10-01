// src/components/ChatHub.jsx
'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, X, ShieldCheck, Clock } from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultWaUrl = `https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
    `Hi ${SITE.name}, I would like to speak with your sales desk about golf buggy models for sale, stock availability, freight, or lithium specs.`
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3" id="chat-hub-container">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="w-80 sm:w-88 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-slate-950 text-[#C5A880] border border-[#C5A880]/60 flex items-center justify-center font-bold shadow-xs">
                <MessageCircle className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white leading-tight font-serif">
                  Queensland Dispatch Desk
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#C5A880] mt-0.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
                  <span>Online &amp; Ready to Quote</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Need prompt hydraulic freight rates to your property gate, golf club fleet quotes, or custom lithium configurations?
          </p>

          <div className="space-y-2">
            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>Chat on WhatsApp ({CONTACT.phoneDisplay})</span>
            </a>

            <a
              href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Direct Phone: {CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C5A880]" /> {CONTACT.operatingHours.split('|')[0]}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#C5A880]" /> Est. 2004 QLD
            </span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 py-3 px-4 sm:px-5 rounded-full bg-slate-950 text-[#C5A880] font-black text-xs uppercase tracking-wider shadow-2xl hover:shadow-[#C5A880]/20 transition-all duration-200 hover:scale-105 active:scale-95 border border-[#C5A880] cursor-pointer group"
        aria-label="Open Queensland WhatsApp live chat"
        id="chat-hub-toggle"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-[#C5A880] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#C5A880] animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#C5A880]" />
        </div>
        <span className="font-serif tracking-wide font-extrabold group-hover:text-white transition-colors">
          WhatsApp Dispatch
        </span>
      </button>
    </div>
  );
}
