'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquare, Copy, Eye } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import WhatsAppSendPanel from '@/src/components/admin/WhatsAppSendPanel';
import { parsePaymentDetail, money, paymentMethodParts, paymentTermsLines } from '@/lib/order';
import { waPaymentDetailsMessage } from '@/lib/whatsapp';
import { REPLY, SITE } from '@/src/config/site';

function SendPaymentEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const { passcode } = useAdminPasscode();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [methodId, setMethodId] = useState('bank-transfer');
  const [rawDetail, setRawDetail] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [error, setError] = useState('');

  // Default presets for quick fill
  const defaultPresets = {
    'bank-transfer': `Account Name: TBS NO.2 PTY LTD\nBSB: \nAccount Number: \nReference: ${orderId || 'TBS-ORDER'}`,
    'pay-id': `PayID Name: TBS NO.2 PTY LTD\nPayID Type: ABN\nPayID / ABN: 65108218471\nReference: ${orderId || 'TBS-ORDER'}`,
    'crypto-BTC': `Network: Bitcoin (BTC Native)\nDeposit Wallet: bc1q8v7xkd9m2pw4z3rt65nljhqfeyac78g52t\nReference: ${orderId || 'TBS-ORDER'}`,
    'crypto-USDT': `Network: USDT (TRC-20 Tron)\nDeposit Wallet: TYDzsYnNp5k8F3m9QJ2vWxLkE8Rt6PqA1z\nReference: ${orderId || 'TBS-ORDER'}`,
  };

  useEffect(() => {
    if (!orderId) {
      setError('No order ID provided.');
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/admin/orders/${orderId}/`, {
          headers: { 'x-admin-passcode': passcode },
        });
        if (!res.ok) {
          setError('Order not found.');
          return;
        }
        const data = await res.json();
        setOrder(data.order);

        // Prepopulate based on order payment method
        const pm = (data.order.paymentMethod || '').toLowerCase();
        let initialMethod = 'bank-transfer';
        if (pm.includes('pay-id') || pm.includes('payid')) initialMethod = 'pay-id';
        else if (pm.includes('btc') || pm.includes('bitcoin')) initialMethod = 'crypto-BTC';
        else if (pm.includes('usdt') || pm.includes('tether')) initialMethod = 'crypto-USDT';

        setMethodId(initialMethod);
        setRawDetail(defaultPresets[initialMethod] || defaultPresets['bank-transfer']);
      } catch {
        setError('Error loading order.');
      } finally {
        setLoading(false);
      }
    };

    if (passcode) {
      fetchOrder();
    }
  }, [orderId, passcode]);

  const handleMethodChange = (newMethodId) => {
    setMethodId(newMethodId);
    if (defaultPresets[newMethodId]) {
      setRawDetail(defaultPresets[newMethodId]);
    }
  };

  const parsedFields = parsePaymentDetail(rawDetail);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!orderId || !rawDetail.trim()) return;

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/admin/send-payment-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          orderId,
          methodId,
          rawDetail,
          parsedFields,
          customNote,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to send payment email.');
        return;
      }

      setSentSuccess(true);
      setSentMessage(json.message || 'Payment instructions dispatched.');
    } catch {
      setError('Network error sending payment email.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-400">Loading order for payment composition...</p>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-rose-400 text-sm">{error}</p>
        <Link href="/admin/orders/" className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 rounded-lg text-xs text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to orders</span>
        </Link>
      </div>
    );
  }

  const ref = order?.orderNumber || order?.id || orderId;
  const customer = order?.customer || {};
  const total = order?.total || 0;
  const { opening, closing } = paymentMethodParts(methodId, total, ref);
  const terms = paymentTermsLines(ref);

  const waMessage = waPaymentDetailsMessage({
    order: { ...order, total, orderNumber: ref },
    methodId,
    parsedFields,
    rawDetail,
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <Link href={`/admin/orders/${ref}/`} className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Order {ref}</span>
          </Link>
          <h1 className="text-2xl font-bold text-white font-serif">
            Payment Details Composer
          </h1>
          <p className="text-xs text-slate-400">
            Paste account info once &bull; Auto-parsed into individual copy fields &bull; Dispatched via Email and WhatsApp
          </p>
        </div>
      </div>

      {sentSuccess && (
        <div className="p-5 bg-emerald-950/80 border border-emerald-700 rounded-2xl text-emerald-200 flex items-start gap-3 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm text-white">Payment Details Dispatched!</div>
            <div className="text-xs text-emerald-300 mt-0.5">{sentMessage}</div>
            <div className="mt-3 flex gap-3">
              <Link
                href={`/admin/orders/${ref}/`}
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Return to Order
              </Link>
              <a
                href={`/order/payment-details/?id=${ref}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 text-slate-200 text-xs font-semibold rounded-lg hover:text-white"
              >
                Open Public Copy Page &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Composer on Left, Live Previews on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form & Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleSendEmail} className="space-y-5">
              
              {/* Recipient info summary */}
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold uppercase">Customer</span>
                  <span className="font-bold text-white">{customer.name || 'Customer'}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-500 font-bold uppercase">Email</span>
                  <span className="font-mono text-slate-200">{customer.email}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-slate-500 font-bold uppercase">Amount Due</span>
                  <span className="font-bold text-[#C5A880]">{money(total)}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Payment Method Template
                </label>
                <select
                  value={methodId}
                  onChange={(e) => handleMethodChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                >
                  {(REPLY?.paymentMethods || []).map((pm) => (
                    <option key={pm.id} value={pm.id}>
                      {pm.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Free-text Paste Area (parsePaymentDetail) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Paste Settlement Blob *
                  </label>
                  <span className="text-[10px] text-[#C5A880] font-semibold">Auto-splits on colons/labels</span>
                </div>
                <textarea
                  rows={6}
                  required
                  value={rawDetail}
                  onChange={(e) => setRawDetail(e.target.value)}
                  placeholder="Paste bank BSB/account or crypto wallet..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-[#C5A880] leading-relaxed"
                />
              </div>

              {/* Optional Custom Workshop Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Custom Workshop / Freight Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Conditional road registration paperwork has been pre-filled and placed in glove compartment."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {error && (
                <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-300">
                  {error}
                </div>
              )}

              {/* Submit Email Button */}
              <button
                type="submit"
                disabled={sending || !rawDetail.trim()}
                className="w-full py-3.5 px-4 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Branded Payment Email</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* WhatsApp Send Panel */}
          <WhatsAppSendPanel
            phone={customer.phone}
            messageText={waMessage}
            customerName={customer.name}
          />
        </div>

        {/* Right Column: Live Email Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Live Branded Email Preview (Light Shell)</span>
            </span>
            <span className="text-[10px] text-slate-500">Auto-updates as you type</span>
          </div>

          {/* Simulated Email Card */}
          <div className="bg-[#F1F5F9] p-6 rounded-2xl border border-slate-800 shadow-inner">
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden text-slate-900 text-xs">
              
              {/* Dark Header Band */}
              <div className="bg-[#0B111E] p-6 border-b-2 border-[#C5A880] text-white">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] mb-1">
                  Payment &amp; Settlement Instructions
                </div>
                <div className="text-lg font-bold text-white">
                  Payment Details: Order {ref}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Total Amount Due: {money(total)} &bull; {SITE.name}
                </div>
              </div>

              {/* Email Body */}
              <div className="p-6 space-y-4">
                <p className="text-slate-700">
                  G&apos;day <strong>{customer.name || 'Valued Customer'}</strong>,
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {opening}
                </p>

                {/* Amount Highlight Box */}
                <div className="bg-[#FAF8F5] border-l-4 border-[#C5A880] p-3 rounded flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Order Number:</span>
                    <div className="font-mono font-bold text-slate-900">{ref}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Amount Due:</span>
                    <div className="font-bold text-base text-[#C5A880]">{money(total)}</div>
                  </div>
                </div>

                {/* Parsed Fields Rows */}
                <div className="space-y-2 bg-[#FAF8F5] p-3 rounded-lg border border-slate-200">
                  <div className="text-[10px] font-bold uppercase text-slate-500">
                    Verified Settlement Fields
                  </div>
                  {parsedFields.length > 0 ? (
                    parsedFields.map((f, i) => (
                      <div key={i} className="bg-white p-2.5 rounded border border-slate-200 flex justify-between items-center">
                        <span className="font-bold text-slate-600 text-[11px] uppercase">{f.label}</span>
                        <span className="font-mono font-bold text-slate-900 text-[12px]">{f.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 italic text-[11px]">Type or paste payment info on left to preview fields.</div>
                  )}
                </div>

                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {closing}
                </p>

                {customNote && (
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded text-blue-900 text-[11px]">
                    <strong>Note:</strong> {customNote}
                  </div>
                )}

                {/* Mock Button */}
                <div className="text-center py-2">
                  <div className="inline-block px-5 py-2.5 bg-[#0B111E] text-white font-bold text-xs rounded-lg border border-[#C5A880]">
                    View &amp; Tap-to-Copy Details Online &rarr;
                  </div>
                </div>

                {/* Terms Box */}
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="font-bold text-slate-800 uppercase text-[10px]">Terms &amp; Logistics:</div>
                  <ul className="list-disc pl-4 space-y-0.5">
                    {terms.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Mock Footer */}
              <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-[10px] text-slate-500">
                {SITE.name} &bull; {SITE.domain} &bull; Queensland Distribution Center &bull; 0480 811 308
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function SendPaymentEmailPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin mx-auto mb-3" />
      </div>
    }>
      <SendPaymentEmailContent />
    </Suspense>
  );
}
