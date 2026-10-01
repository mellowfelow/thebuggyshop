'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-[#C5A880]/50 transition-colors gap-3">
      <div className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          {label}
        </span>
        <span className="block text-base sm:text-lg font-mono font-bold text-slate-900 break-all select-all">
          {value}
        </span>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shrink-0 cursor-pointer ${
          copied
            ? 'bg-emerald-600 text-white shadow-sm'
            : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
        }`}
        aria-label={`Copy ${label}`}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-[#C5A880]" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}
