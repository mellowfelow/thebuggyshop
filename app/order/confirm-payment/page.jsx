'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle, 
  Upload, 
  ShieldCheck, 
  Loader2, 
  MessageSquare, 
  ArrowLeft, 
  Image as ImageIcon, 
  X, 
  Camera, 
  CheckCircle2, 
  FileCheck 
} from 'lucide-react';
import { SITE, CONTACT } from '@/src/config/site';

function ConfirmPaymentContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(orderIdParam);
  const [note, setNote] = useState('');
  const [receiptImage, setReceiptImage] = useState(null); // base64 string
  const [receiptFileName, setReceiptFileName] = useState('');
  const [receiptFileSize, setReceiptFileSize] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image (JPG, PNG, WebP, or HEIC).');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image file size must be under 8MB.');
      return;
    }

    setError('');
    setReceiptFileName(file.name);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    setReceiptFileSize(`${sizeInMb} MB`);

    const reader = new FileReader();
    reader.onload = (e) => {
      setReceiptImage(e.target?.result);
    };
    reader.onerror = () => {
      setError('Failed to read image file from your device.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setReceiptImage(null);
    setReceiptFileName('');
    setReceiptFileSize('');
    const input = document.getElementById('receipt-upload-input');
    if (input) input.value = '';
  };

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
          screenshotUrl: receiptImage || '',
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to submit payment confirmation.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Network error submitting payment verification. Please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 font-serif">
          Payment Receipt Uploaded!
        </h1>
        <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm leading-relaxed">
          Thank you. Our Queensland finance and dispatch workshop have received your payment verification for order{' '}
          <strong className="text-slate-900 font-mono font-bold">{orderId}</strong>. We will reconcile settlement and schedule your vehicle for hydraulic tail-lift freight.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
          >
            Return to Homepage
          </Link>
          <a
            href={`https://wa.me/${(CONTACT.whatsapp || CONTACT.phone || '61480811308').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${SITE.name}, I have just uploaded my payment receipt for order ${orderId}.`)}`}
            className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 fill-slate-950" />
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
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          Upload Payment Receipt
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
          Upload a screenshot or photo of your payment receipt directly from your device gallery to expedite your golf buggy dispatch.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880] text-sm"
            />
          </div>

          {/* Photo / Gallery Upload Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Payment Receipt Photo / Screenshot (From Gallery)
            </label>

            <input
              id="receipt-upload-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {!receiptImage ? (
              <label
                htmlFor="receipt-upload-input"
                className="w-full border-2 border-dashed border-slate-300 hover:border-[#C5A880] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-slate-50/60 hover:bg-[#FAF8F5] group"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-[#C5A880] group-hover:border-[#C5A880] transition-colors mb-3">
                  <Camera className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-900 group-hover:text-[#C5A880] transition-colors">
                  Tap to choose receipt from gallery or camera
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Supports JPG, PNG, WebP, HEIC &bull; Max 8MB
                </p>
                <span className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs group-hover:bg-[#C5A880] group-hover:text-slate-950 group-hover:border-[#C5A880] transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Select Image</span>
                </span>
              </label>
            ) : (
              <div className="border border-emerald-300 bg-emerald-50/50 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-emerald-300 shrink-0 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={receiptImage}
                        alt="Receipt Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="truncate">Receipt Image Attached</span>
                      </div>
                      <p className="text-xs text-slate-600 font-mono truncate mt-0.5">
                        {receiptFileName || 'receipt-image.jpg'}
                      </p>
                      <span className="text-[11px] text-slate-500">
                        {receiptFileSize}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                    title="Remove Image"
                    aria-label="Remove Image"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-200/60">
                  <label
                    htmlFor="receipt-upload-input"
                    className="text-xs text-emerald-800 hover:text-emerald-950 font-bold cursor-pointer underline flex items-center gap-1"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Change Photo</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Payment Transaction / Bank Reference Note (Optional)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Transferred from Commonwealth Bank under name David Thompson, or crypto transaction ID."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-[#C5A880]"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Uploading Receipt...</span>
              </>
            ) : (
              <>
                <FileCheck className="w-4 h-4 text-slate-950" />
                <span>Submit Payment Receipt</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="text-center mt-6">
        <Link
          href={`/order/payment-details/?id=${encodeURIComponent(orderId || '')}`}
          className="text-xs text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 font-semibold"
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
