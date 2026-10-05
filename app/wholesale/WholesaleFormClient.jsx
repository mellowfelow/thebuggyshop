'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, AlertCircle } from 'lucide-react';

const field =
  'w-full px-3.5 py-3 rounded-xl bg-[#F0F3F1] border border-[#DDE4DF] text-[#0E2A1E] placeholder:text-[#8A9C92] focus:outline-hidden focus:ring-1 focus:ring-[#C5A265]';

export default function WholesaleFormClient() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const fd = new FormData(e.target);
    const company = String(fd.get('company') || '');
    const units = String(fd.get('units') || '');
    const message = String(fd.get('message') || '');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          formName: 'wholesale',
          type: 'wholesale',
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          subject: `Wholesale / Fleet Application: ${company}`,
          message: `Business: ${company}\nUnits required: ${units}\n\n${message}`,
          website: fd.get('website') || '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) router.push('/thank-you-wholesale/');
      else throw new Error(data.message || 'Submission failed. Please try again or WhatsApp us.');
    } catch (err) {
      setError(err.message || 'Unable to submit right now. Please use WhatsApp or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-xs">
      <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
        <label htmlFor="ws-website">Leave this field empty</label>
        <input id="ws-website" type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center gap-2" role="alert">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="ws-name" className="font-bold text-[#0E2A1E]">Contact name *</label>
          <input id="ws-name" name="name" required className={field} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ws-company" className="font-bold text-[#0E2A1E]">Business / club name *</label>
          <input id="ws-company" name="company" required className={field} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ws-email" className="font-bold text-[#0E2A1E]">Email *</label>
          <input id="ws-email" type="email" name="email" required className={field} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="ws-phone" className="font-bold text-[#0E2A1E]">Phone *</label>
          <input id="ws-phone" type="tel" name="phone" required className={field} />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="ws-units" className="font-bold text-[#0E2A1E]">Approx. units required</label>
        <input id="ws-units" name="units" placeholder="e.g. 6 ride-on carts" className={field} />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="ws-message" className="font-bold text-[#0E2A1E]">Tell us about your fleet needs *</label>
        <textarea id="ws-message" name="message" rows={4} required className={field} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 px-6 rounded-xl bg-[#0E2A1E] hover:bg-[#163E2D] text-[#C5A265] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-70 cursor-pointer shadow-md border border-[#C5A265]/40"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        <span>{submitting ? 'Sending...' : 'Submit wholesale application'}</span>
      </button>
    </form>
  );
}
