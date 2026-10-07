'use client';
import { useState } from 'react';
import { MessageSquare, Copy, Check, ExternalLink } from 'lucide-react';
import { waLinkTo } from '@/lib/whatsapp';

export default function WhatsAppSendPanel({ phone, messageText, customerName = 'Customer' }) {
  const [copied, setCopied] = useState(false);

  const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
  const waUrl = cleanPhone ? waLinkTo(cleanPhone, messageText) : null;

  const handleCopy = async () => {
    if (!messageText) return;
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">WhatsApp Customer Dispatch</h4>
            <p className="text-xs text-slate-400">Send pre-formatted settlement message directly to customer</p>
          </div>
        </div>
        {cleanPhone && (
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
            +{cleanPhone}
          </span>
        )}
      </div>

      <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 mb-4 max-h-40 overflow-y-auto">
        <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
          {messageText}
        </pre>
      </div>

      <div className="flex flex-wrap gap-2">
        {waUrl ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open in WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        ) : (
          <div className="flex-1 text-xs text-amber-400 py-2">
            No valid customer phone number detected for WhatsApp. Use copy fallback:
          </div>
        )}

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg transition-colors border border-slate-700"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-400" />
              <span>Copy Text</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
