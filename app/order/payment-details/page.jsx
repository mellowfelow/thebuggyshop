'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, MessageSquare, Loader2, Sparkles, Truck, Upload } from 'lucide-react';
import CopyField from '@/src/components/CopyField';
import { SITE, CONTACT } from '@/src/config/site';

function PaymentDetailsContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError('No order reference provided in URL.');
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/order/payment-details/?id=${encodeURIComponent(orderId)}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError(`Order "${orderId}" was not found. Please verify your reference number or contact dispatch.`);
          } else {
            setError('Failed to load payment details from server.');
          }
          setLoading(false);
          return;
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        setError('Connection error loading order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <Loader2 className="w-10 h-10 text-[#C5A880] animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Retrieving verified settlement details...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Not Found</h1>
        <p className="text-slate-600 mb-6">{error || 'Unable to display payment details.'}</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Return to Store
          </Link>
          <a
            href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}`}
            className="px-5 py-2.5 bg-emerald-700 text-white text-sm font-semibold rounded-xl hover:bg-emerald-600 transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact WhatsApp Desk</span>
          </a>
        </div>
      </div>
    );
  }

  const parsedFields = data.parsedFields || [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Header Badge */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C5A880]/15 text-[#8F7246] text-xs font-bold uppercase tracking-wider mb-3 border border-[#C5A880]/30">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Settlement Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
          Payment Details: {data.orderNumber}
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-lg mx-auto">
          Tap each verified detail below to copy directly to your Australian bank app or crypto wallet.
        </p>
      </div>

      {/* Amount Due Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A880]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A880]">
              Total Settlement Amount
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white mt-1 tracking-tight font-sans">
              {data.formattedTotal}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Order Ref: <span className="font-mono font-bold text-white">{data.orderNumber}</span>
              {data.customerName ? ` • Customer: ${data.customerName}` : ''}
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800">
              <Truck className="w-3.5 h-3.5" />
              <span>Tail-Lift Freight Reserved</span>
            </span>
          </div>
        </div>

        {data.opening && (
          <div className="mt-6 pt-6 border-t border-slate-800 text-sm text-slate-300 leading-relaxed">
            {data.opening}
          </div>
        )}
      </div>

      {/* Copy Fields Grid */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Copy-Exact Settlement Details
          </h2>
          <span className="text-xs text-slate-400">Click &ldquo;Copy&rdquo; to copy value</span>
        </div>

        {parsedFields.length > 0 ? (
          parsedFields.map((field, idx) => (
            <CopyField key={`payment-field-${field.label}-${idx}`} label={field.label} value={field.value} />
          ))
        ) : (
          <div className="p-6 bg-white rounded-xl border border-slate-200 text-center text-sm text-slate-500">
            Payment details are being prepared by the workshop. You will receive an updated email shortly.
          </div>
        )}
      </div>

      {data.closing && (
        <div className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-xl p-4 sm:p-5 text-sm text-slate-800 mb-8 leading-relaxed">
          {data.closing}
        </div>
      )}

      {/* Terms and Next Steps */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          <span>Dispatch &amp; Payment Terms</span>
        </h3>
        <ul className="space-y-2.5 text-sm text-slate-600">
          {(data.terms || []).map((term, i) => (
            <li key={`payment-term-rule-${i}`} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Settlement Verification & Receipt Upload Actions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm mb-8 text-center space-y-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Completed Your Payment?
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Upload your payment receipt photo directly from your device gallery to speed up warehouse allocation and dispatch.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <Link
            href={`/order/confirm-payment/?id=${data.orderNumber}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Payment Receipt</span>
          </Link>
          <a
            href={`https://wa.me/${(CONTACT.whatsapp || CONTACT.phone || '61480811308').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${SITE.name}, I have sent payment for order ${data.orderNumber}. Here is my receipt confirmation.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-800 shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Confirm via WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
}

export default function PaymentDetailsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <Suspense fallback={
        <div className="min-h-[50vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin" />
        </div>
      }>
        <PaymentDetailsContent />
      </Suspense>
    </div>
  );
}
