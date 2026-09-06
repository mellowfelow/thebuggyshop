// src/components/ChatHub.jsx
'use client';

import React, { useState } from 'react';
import { MessageCircle, Phone, X, ShieldCheck, Clock } from 'lucide-react';
import { CONTACT } from '@/src/config/site';

export default function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  const defaultWaUrl = `https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
    "G'day! I would like to speak with The Buggy Shop sales desk about golf buggy models for sale, stock availability, freight, or lithium specs."
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3" id="chat-hub-container">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="w-80 sm:w-88 bg-[#0E2A1E] text-white rounded-2xl shadow-2xl border border-[#C5A265]/30 p-5 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between border-b border-[#183B2B] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] text-[#071810] flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white leading-tight">
                  Queensland Dispatch Desk
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#C5A265] mt-0.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online & Ready to Quote</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#A6BCB0] hover:text-white p-1 cursor-pointer"
              aria-label="Close chat window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#D3DFD8] leading-relaxed">
            Need prompt hydraulic freight rates to your property gate, golf club fleet quotes, or custom lithium configurations?
          </p>

          <div className="space-y-2">
            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#071810] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+61 480 811 308)</span>
            </a>

            <a
              href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 px-4 rounded-xl bg-[#163E2D] hover:bg-[#1C4E39] text-[#C5A265] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#C5A265]/30 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Phone: {CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <div className="pt-1 border-t border-[#183B2B] flex items-center justify-between text-[10px] text-[#8BA496]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C5A265]" /> {CONTACT.operatingHours.split('|')[0]}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#C5A265]" /> Est. 2004 QLD
            </span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#071810] font-black text-xs uppercase tracking-wider shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-white cursor-pointer"
        aria-label="Open Queensland WhatsApp live chat"
        id="chat-hub-toggle"
      >
        <MessageCircle className="w-5 h-5 text-[#071810]" />
        <span className="hidden sm:inline">WhatsApp Dispatch</span>
      </button>
    </div>
  );
}
