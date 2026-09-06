'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { PRODUCTS } from '@/src/config/site';

export default function ContactFormClient({ web3formsKey }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    const form = e.target;
    const accessKey = form.querySelector('[name="access_key"]')?.value || '';

    // Key-Pending Fallback per Rule 10
    if (!accessKey || accessKey.startsWith('YOUR-') || accessKey === '') {
      setTimeout(() => {
        router.push('/thank-you-contact/');
      }, 400);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          // NO Content-Type header when submitting FormData
        },
        body: new FormData(form),
      });

      const resData = await response.json();

      if (response.status === 200 && resData.success) {
        router.push('/thank-you-contact/');
      } else {
        throw new Error(resData.message || 'Submission failed. Please try again or WhatsApp us.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Unable to submit inquiry at this moment. Please use WhatsApp or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      {/* Required Web3Forms hidden inputs */}
      <input type="hidden" name="access_key" value={web3formsKey || ''} />
      <input type="hidden" name="subject" value="New Golf Buggy Inquiry from The Buggy Shop Website" />
      <input type="hidden" name="from_name" value="The Buggy Shop Online Desk" />
      <input type="hidden" name="replyto" value={emailValue} />
      {/* Honeypot */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      {errorMessage && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="font-bold text-[#0E2A1E]">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            placeholder="e.g. Lachlan Murdoch"
            className="w-full px-3.5 py-3 rounded-xl bg-[#F0F3F1] border border-[#DDE4DF] text-[#0E2A1E] placeholder:text-[#8A9C92] focus:outline-hidden focus:ring-1 focus:ring-[#C5A265]"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="font-bold text-[#0E2A1E]">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="e.g. lachlan@station.com.au"
            className="w-full px-3.5 py-3 rounded-xl bg-[#F0F3F1] border border-[#DDE4DF] text-[#0E2A1E] placeholder:text-[#8A9C92] focus:outline-hidden focus:ring-1 focus:ring-[#C5A265]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone / Mobile */}
        <div className="space-y-1.5">
          <label htmlFor="contact-phone" className="font-bold text-[#0E2A1E]">
            Phone / Mobile <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            required
            placeholder="e.g. 0480 811 308"
            className="w-full px-3.5 py-3 rounded-xl bg-[#F0F3F1] border border-[#DDE4DF] text-[#0E2A1E] placeholder:text-[#8A9C92] focus:outline-hidden focus:ring-1 focus:ring-[#C5A265]"
          />
        </div>

        {/* State / Postcode */}
        <div className="space-y-1.5">
          <label htmlFor="contact-location" className="font-bold text-[#0E2A1E]">
            Property Location / Postcode <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-location"
            type="text"
            name="location"
            required
            placeholder="e.g. Toowoomba QLD 4350"
            className="w-full px-3.5 py-3 rounded-xl bg-[#F0F3F1] border border-[#DDE4DF] text-[#0E2A1E] placeholder:text-[#8A9C92] focus:outline-hidden focus:ring-1 focus:ring-[#C5A265]"
          />
        </div>
      </div>

      {/* Model of Interest */}
      <div className="space-y-1.5">
        <label htmlFor="contact-model" className="font-bold text-[#0E2A1E]">
          Model of Interest
        </label>
        <select
          id="contact-model"
          name="model_interest"
          className="w-full px-3.5 py-3 rounded-xl bg-[#F0F3F1] border border-[#DDE4DF] text-[#0E2A1E] focus:outline-hidden focus:ring-1 focus:ring-[#C5A265]"
        >
          <option value="General Inquiry">General Golf Buggy Inquiry</option>
          {PRODUCTS.map((p) => (
            <option key={p.slug} value={p.name}>
              {p.name} (${p.price.toLocaleString('en-AU')} AUD)
            </option>
          ))}
          <option value="Commercial Fleet">Commercial Fleet / Multi-Unit Order</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="font-bold text-[#0E2A1E]">
          Your Property / Golf Course Requirements <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="Tell us about your golf club, acreage terrain, road registration needs, or preferred freight delivery window..."
          className="w-full px-3.5 py-3 rounded-xl bg-[#F0F3F1] border border-[#DDE4DF] text-[#0E2A1E] placeholder:text-[#8A9C92] focus:outline-hidden focus:ring-1 focus:ring-[#C5A265]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 px-6 rounded-xl bg-[#0E2A1E] hover:bg-[#163E2D] text-[#C5A265] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors disabled:opacity-70 cursor-pointer shadow-md border border-[#C5A265]/40"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#C5A265]" />
            <span>Sending Inquiry to Queensland Desk...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 text-[#C5A265]" />
            <span>Submit Inquiry for Immediate Response</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-[#60756B] text-center pt-2">
        🔒 Your contact information is kept strictly private and used solely for vehicle quote communication.
      </p>
    </form>
  );
}
