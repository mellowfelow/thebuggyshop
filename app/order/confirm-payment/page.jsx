'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Upload, ShieldCheck, Loader2, MessageSquare, ArrowLeft } from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site';

function ConfirmPaymentContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(orderIdParam);
  const [note, setNote] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      setError('Please provide your Order Reference Number.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/order/confirm-payment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderId.trim(),
          note: note.trim(),
          screenshotUrl: screenshotUrl.trim(),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to submit payment confirmation.');
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('Network error submitting payment verification.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 font-serif">
          Payment Confirmation Submitted!
        </h1>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          Thank you. Our Queensland finance and dispatch team have been notified for order{' '}
          <strong className="text-slate-900 font-mono">{orderId}</strong>. We will verify settlement and prepare your vehicle for hydraulic tail-lift loading.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Return to Homepage
          </Link>
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hi ${SITE.name}, I have just uploaded payment confirmation for order ${orderId}.`)}`}
            className="px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-500 transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Notify on WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Payment Notification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Confirm Your Settlement
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Let our dispatch workshop know that payment has been transferred so we can release your buggy immediately.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Order Reference Number *
            </label>
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. TBS-X7K9M2"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Payment Transaction / Bank Reference Note (Optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Sent from Commonwealth Bank account ending in 4920 under name David Thompson, or crypto transaction hash."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Receipt / Screenshot Link (Optional)
            </label>
            <div className="relative">
              <input
                type="url"
                value={screenshotUrl}
                onChange={(e) => setScreenshotUrl(e.target.value)}
                placeholder="https://imgur.com/... or Google Drive / Cloud link"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880]"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              You can also send your screenshot directly via WhatsApp to {CONTACT.phoneDisplay}.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting Confirmation...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Submit Payment Confirmation</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="text-center mt-6">
        <Link
          href={`/order/payment-details/?id=${encodeURIComponent(orderId || '')}`}
          className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to payment details</span>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmPaymentPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin" />
        </div>
      }>
        <ConfirmPaymentContent />
      </Suspense>
    </div>
  );
}
