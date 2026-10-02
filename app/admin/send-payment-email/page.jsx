'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquare, Copy, Eye, Edit3, User, Mail, Phone, DollarSign } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import WhatsAppSendPanel from '@/src/components/admin/WhatsAppSendPanel';
import { parsePaymentDetail, money, paymentMethodParts, paymentTermsLines } from '@/lib/order';
import { waPaymentDetailsMessage } from '@/lib/whatsapp';
import { REPLY, SITE } from '@/src/config/site';

function SendPaymentEmailContent() {
  const searchParams = useSearchParams();
  const rawQueryRef = searchParams.get('orderId') || searchParams.get('id') || searchParams.get('ref') || '';
  const { passcode } = useAdminPasscode();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [manualMode, setManualMode] = useState(false);

  // Form State
  const [orderRef, setOrderRef] = useState(rawQueryRef || 'TBS-ORDER');
  const [customerName, setCustomerName] = useState('Valued Customer');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderTotal, setOrderTotal] = useState(1099);

  const [methodId, setMethodId] = useState('bank-transfer');
  const [rawDetail, setRawDetail] = useState('');
  const [customNote, setCustomNote] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [error, setError] = useState('');

  // Default presets for quick fill
  const defaultPresets = {
    'bank-transfer': `Account Name: TBS NO.2 PTY LTD\nBank: Commonwealth Bank of Australia\nBSB: 064-000\nAccount Number: 1234 5678\nPayment Reference: ${orderRef || 'TBS-ORDER'}`,
    'pay-id': `PayID Name: TBS NO.2 PTY LTD\nPayID Type: Australian Business Number (ABN)\nPayID / ABN: 65108218471\nPayment Reference: ${orderRef || 'TBS-ORDER'}`,
    'pay-in-4': `Account Name: TBS NO.2 PTY LTD\nBank: Commonwealth Bank of Australia\nBSB: 064-000\nAccount Number: 1234 5678\nPlan: Pay in 4 Commercial Split\n1st Installment (Due Today): $${Math.round(orderTotal / 4).toLocaleString('en-AU')} AUD\nSubsequent 3 Month-End Splits: $${Math.round(orderTotal / 4).toLocaleString('en-AU')} AUD\nPayment Reference: ${orderRef || 'TBS-ORDER'}`,
    'crypto-BTC': `Network: Bitcoin (BTC Native)\nDeposit Wallet: bc1q8v7xkd9m2pw4z3rt65nljhqfeyac78g52t\nPayment Reference: ${orderRef || 'TBS-ORDER'}`,
    'crypto-USDT': `Network: USDT (TRC-20 Tron Network)\nDeposit Wallet: TYDzsYnNp5k8F3m9QJ2vWxLkE8Rt6PqA1z\nPayment Reference: ${orderRef || 'TBS-ORDER'}`,
  };

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError('');

      if (!rawQueryRef) {
        // No ID in query param, switch to editable manual compose
        setManualMode(true);
        setRawDetail(defaultPresets['bank-transfer']);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/admin/orders/${encodeURIComponent(rawQueryRef)}/`, {
          headers: { 'x-admin-passcode': passcode },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.order) {
            const ord = data.order;
            setOrder(ord);
            setOrderRef(ord.orderNumber || ord.id || rawQueryRef);
            setCustomerName(ord.customer?.name || 'Customer');
            setCustomerEmail(ord.customer?.email || '');
            setCustomerPhone(ord.customer?.phone || '');
            setOrderTotal(Number(ord.total) || 1099);

            // Pre-select payment method
            const pm = (ord.paymentMethod || '').toLowerCase();
            let initialMethod = 'bank-transfer';
            if (pm.includes('pay-id') || pm.includes('payid')) initialMethod = 'pay-id';
            else if (pm.includes('btc') || pm.includes('bitcoin')) initialMethod = 'crypto-BTC';
            else if (pm.includes('usdt') || pm.includes('tether')) initialMethod = 'crypto-USDT';

            setMethodId(initialMethod);
            setRawDetail(defaultPresets[initialMethod] || defaultPresets['bank-transfer']);
            setLoading(false);
            return;
          }
        }

        // If order not found in Redis, allow admin to compose smoothly with the URL ref
        setOrderRef(rawQueryRef);
        setManualMode(true);
        setRawDetail(defaultPresets['bank-transfer']);
      } catch {
        setManualMode(true);
        setRawDetail(defaultPresets['bank-transfer']);
      } finally {
        setLoading(false);
      }
    };

    if (passcode) {
      fetchOrder();
    }
  }, [rawQueryRef, passcode]);

  const handleMethodChange = (newMethodId) => {
    setMethodId(newMethodId);
    if (defaultPresets[newMethodId]) {
      setRawDetail(defaultPresets[newMethodId]);
    }
  };

  const parsedFields = parsePaymentDetail(rawDetail);
  const activeRef = orderRef || 'TBS-ORDER';
  const activeTotal = Number(orderTotal) || 0;
  const { opening, closing } = paymentMethodParts(methodId, activeTotal, activeRef);
  const terms = paymentTermsLines(activeRef);

  const waMessage = waPaymentDetailsMessage({
    order: { total: activeTotal, orderNumber: activeRef },
    methodId,
    parsedFields,
    rawDetail,
  });

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!customerEmail.trim()) {
      setError('Customer email address is required to dispatch instructions.');
      return;
    }
    if (!rawDetail.trim()) {
      setError('Please paste payment settlement details.');
      return;
    }

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
          orderId: activeRef,
          methodId,
          rawDetail,
          parsedFields,
          customNote,
          customerEmail: customerEmail.trim(),
          customerName: customerName.trim(),
          total: activeTotal,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to dispatch payment instructions.');
        return;
      }

      setSentSuccess(true);
      setSentMessage(json.message || `Payment details successfully dispatched to ${customerEmail}`);
    } catch {
      setError('Network error communicating with server.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-400">Loading order specification for payment composer...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <Link href="/admin/orders/" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Orders</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
            Payment Details Composer
          </h1>
          <p className="text-xs text-slate-400">
            Paste account info once &bull; Auto-parsed into individual copy fields &bull; Dispatched via Email &amp; WhatsApp
          </p>
        </div>

        {order && (
          <div className="text-right self-start sm:self-auto">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Active Order</span>
            <span className="font-mono font-bold text-sm text-[#C5A880]">{activeRef}</span>
          </div>
        )}
      </div>

      {sentSuccess && (
        <div className="p-4 sm:p-5 bg-emerald-950/90 border border-emerald-700 rounded-xl text-emerald-200 flex items-start gap-3 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm text-white">Payment Details Dispatched!</div>
            <div className="text-xs text-emerald-300 mt-0.5 break-words">{sentMessage}</div>
            <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
              <Link
                href="/admin/orders/"
                className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Return to Orders
              </Link>
              <a
                href={`/order/payment-details/?id=${encodeURIComponent(activeRef)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-slate-900 text-slate-200 text-xs font-semibold rounded-lg hover:text-white border border-slate-700"
              >
                Open Public Copy Page &rarr;
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Composer on Left, Live Previews on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column: Form & Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
            
            {/* Recipient & Order Metadata */}
            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Recipient Information
                </span>
                <button
                  type="button"
                  onClick={() => setManualMode(!manualMode)}
                  className="text-[10px] text-[#C5A880] hover:underline flex items-center gap-1 font-semibold"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{manualMode ? 'Lock Fields' : 'Edit Info'}</span>
                </button>
              </div>

              {manualMode ? (
                <div className="space-y-2 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Order Ref</label>
                    <input
                      type="text"
                      value={orderRef}
                      onChange={(e) => setOrderRef(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Customer Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Customer Email *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="customer@example.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Customer Phone</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0400 000 000"
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Amount Due ($ AUD)</label>
                    <input
                      type="number"
                      value={orderTotal}
                      onChange={(e) => setOrderTotal(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-bold"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Customer:</span>
                    <span className="font-bold text-white truncate max-w-[200px]">{customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Email:</span>
                    <span className="font-mono text-slate-200 truncate max-w-[200px]">{customerEmail || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Amount Due:</span>
                    <span className="font-bold text-[#C5A880]">{money(activeTotal)}</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              
              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Payment Method Template
                </label>
                <select
                  value={methodId}
                  onChange={(e) => handleMethodChange(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                >
                  {(REPLY?.paymentMethods || [
                    { id: 'bank-transfer', label: 'Direct Bank Transfer (Osko / Fast EFT)' },
                    { id: 'pay-id', label: 'PayID Instant Transfer (ABN / Phone)' },
                    { id: 'crypto-BTC', label: 'Bitcoin (BTC) - 10% Crypto Rebate' },
                    { id: 'crypto-USDT', label: 'Tether USDT (TRC-20) - 10% Crypto Rebate' },
                  ]).map((pm) => (
                    <option key={pm.id} value={pm.id}>
                      {pm.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Free-text Paste Area (parsePaymentDetail) */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Paste Settlement Details *
                  </label>
                  <span className="text-[9px] text-[#C5A880] font-medium">Auto-splits on colons</span>
                </div>
                <textarea
                  rows={5}
                  required
                  value={rawDetail}
                  onChange={(e) => setRawDetail(e.target.value)}
                  placeholder="Paste bank BSB/account or crypto wallet..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#C5A880] leading-relaxed"
                />
              </div>

              {/* Optional Custom Note */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Custom Logistics Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Conditional registration documents prepared."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              {error && (
                <div className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-lg text-xs text-rose-300">
                  {error}
                </div>
              )}

              {/* Submit Email Button */}
              <button
                type="submit"
                disabled={sending || !rawDetail.trim()}
                className="w-full py-3 px-4 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-bold text-xs rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Email...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Payment Details Email</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* WhatsApp Send Panel */}
          <WhatsAppSendPanel
            phone={customerPhone}
            messageText={waMessage}
            customerName={customerName}
          />
        </div>

        {/* Right Column: Live Email Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Live Branded Email Preview (Light Shell)</span>
            </span>
            <span className="text-[10px] text-slate-500">Auto-updates</span>
          </div>

          {/* Simulated Email Card */}
          <div className="bg-[#F1F5F9] p-3 sm:p-5 rounded-xl border border-slate-800 shadow-inner">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden text-slate-900 text-xs">
              
              {/* Dark Header Band */}
              <div className="bg-[#0B111E] p-4 sm:p-5 border-b-2 border-[#C5A880] text-white">
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#C5A880] mb-0.5">
                  Payment &amp; Settlement Instructions
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  Payment Details: Order {activeRef}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                  Total Amount Due: {money(activeTotal)} &bull; {SITE.name}
                </div>
              </div>

              {/* Email Body */}
              <div className="p-4 sm:p-5 space-y-3.5">
                <p className="text-slate-700">
                  G&apos;day <strong>{customerName || 'Valued Customer'}</strong>,
                </p>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {opening}
                </p>

                {/* Amount Highlight Box */}
                <div className="bg-[#FAF8F5] border-l-4 border-[#C5A880] p-2.5 rounded flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-500">Order Ref:</span>
                    <div className="font-mono font-bold text-slate-900">{activeRef}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold uppercase text-slate-500">Amount Due:</span>
                    <div className="font-bold text-sm sm:text-base text-[#C5A880]">{money(activeTotal)}</div>
                  </div>
                </div>

                {/* Parsed Fields Rows */}
                <div className="space-y-1.5 bg-[#FAF8F5] p-2.5 rounded border border-slate-200">
                  <div className="text-[9px] font-bold uppercase text-slate-500">
                    Verified Settlement Fields
                  </div>
                  {parsedFields.length > 0 ? (
                    parsedFields.map((f, i) => (
                      <div key={`admin-preview-field-${f.label}-${i}`} className="bg-white p-2 rounded border border-slate-200 flex justify-between items-center gap-2">
                        <span className="font-bold text-slate-600 text-[10px] uppercase truncate shrink-0">{f.label}</span>
                        <span className="font-mono font-bold text-slate-900 text-[11px] truncate text-right">{f.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 italic text-[10px]">Type or paste payment info to preview fields.</div>
                  )}
                </div>

                <p className="text-slate-600 text-[10px] sm:text-[11px] leading-relaxed">
                  {closing}
                </p>

                {customNote && (
                  <div className="p-2.5 bg-blue-50 border-l-4 border-blue-500 rounded text-blue-900 text-[10px]">
                    <strong>Note:</strong> {customNote}
                  </div>
                )}

                {/* Mock Button */}
                <div className="text-center py-1">
                  <div className="inline-block px-4 py-2 bg-[#0B111E] text-white font-bold text-[11px] rounded border border-[#C5A880]">
                    View &amp; Tap-to-Copy Details Online &rarr;
                  </div>
                </div>

                {/* Terms Box */}
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[10px] text-slate-600 space-y-0.5">
                  <div className="font-bold text-slate-800 uppercase text-[9px]">Terms &amp; Logistics:</div>
                  <ul className="list-disc pl-3.5 space-y-0.5">
                    {terms.map((t, idx) => (
                      <li key={`admin-preview-term-${idx}`}>{t}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Mock Footer */}
              <div className="bg-slate-50 p-3 border-t border-slate-200 text-center text-[9px] text-slate-500">
                {SITE.name} &bull; {SITE.domain} &bull; Queensland Distribution Center
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
