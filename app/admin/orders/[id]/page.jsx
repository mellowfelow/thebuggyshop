'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Trash2, CheckCircle, ExternalLink, Loader2, Clock, Truck, ShieldCheck, Copy } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import StatusBadge from '@/src/components/admin/StatusBadge';
import CopyField from '@/src/components/CopyField';
import { money } from '@/lib/order';
import { SITE } from '@/src/config/site';

export default function AdminOrderDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { passcode } = useAdminPasscode();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, {
        headers: { 'x-admin-passcode': passcode },
      });
      if (!res.ok) {
        setError('Failed to fetch order details.');
        return;
      }
      const data = await res.json();
      setOrder(data.order);
    } catch {
      setError('Connection error fetching order.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (passcode && id) {
      fetchOrder();
    }
  }, [passcode, id]);

  const handleMarkConfirmed = async () => {
    if (!confirm('Mark this order as Payment Confirmed and release for dispatch?')) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({ action: 'mark_confirmed', note: 'Marked confirmed by Admin in Reply Portal.' }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      }
    } catch {
      alert('Failed to update status.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-400">Loading order specification...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-rose-400 text-sm">{error || 'Order not found.'}</p>
        <Link href="/admin/orders/" className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 rounded-lg text-xs text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to orders</span>
        </Link>
      </div>
    );
  }

  const customer = order.customer || {};
  const items = order.items || [];
  const parsedFields = order.parsedPaymentFields || [];
  const ref = order.orderNumber || order.id || id;

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <Link href="/admin/orders/" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all orders</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-white font-mono">
              {ref}
            </h1>
            <StatusBadge status={order.status} type="order" />
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Logged via <strong className="text-slate-200">{order.channel === 'whatsapp' ? 'WhatsApp Checkout' : 'Online Form'}</strong> on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Link
            href={`/admin/send-payment-email/?orderId=${encodeURIComponent(ref)}`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-bold text-xs rounded-lg shadow-xs transition-all text-center"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Payment Details</span>
          </Link>

          {order.status !== 'payment_confirmed' && (
            <button
              type="button"
              onClick={handleMarkConfirmed}
              disabled={actionLoading}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg transition-all cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Mark Confirmed</span>
            </button>
          )}

          <a
            href={`/order/payment-details/?id=${encodeURIComponent(ref)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs inline-flex items-center justify-center gap-1"
            title="Open customer view"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid: Details & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left 2 Cols: Items & Settlement info */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Items Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Ordered Vehicles &amp; Equipment
            </h2>
            <div className="divide-y divide-slate-800/80">
              {items.map((item, idx) => (
                <div key={`order-item-row-${item.slug || idx}-${idx}`} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs sm:text-sm text-white truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400">
                      Unit: {money(item.price)} &bull; Qty: {item.quantity || 1}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white text-right shrink-0">
                    {money(item.price * (item.quantity || 1))}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Breakdown */}
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal (inc GST):</span>
                <span>{money(order.subtotal || order.total)}</span>
              </div>
              {order.shipping > 0 && (
                <div className="flex justify-between">
                  <span>Nationwide Hydraulic Tail-Lift Delivery:</span>
                  <span>{money(order.shipping)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Crypto Settlement Rebate (10%):</span>
                  <span>-{money(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Amount Payable:</span>
                <span className="text-[#C5A880]">{money(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Current Parsed Payment Details */}
          {parsedFields.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5">
                Saved Settlement Instructions (Dispatched to Customer)
              </h2>
              <div className="space-y-1.5">
                {parsedFields.map((field, i) => (
                  <div key={`order-parsed-field-${field.label}-${i}`} className="flex justify-between items-center p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">{field.label}</span>
                    <span className="font-mono font-bold text-slate-100">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshot / Payment Notes */}
          {(order.paymentNote || order.screenshotUrl) && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
              <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Customer Payment Verification Note
              </h2>
              {order.paymentNote && (
                <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 mb-2">
                  {order.paymentNote}
                </p>
              )}
              {order.screenshotUrl && (
                <div className="mt-2 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Uploaded Payment Receipt Photo:
                  </div>
                  {order.screenshotUrl.startsWith('data:image/') || order.screenshotUrl.match(/\.(jpeg|jpg|png|webp|gif)($|\?)/i) ? (
                    <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={order.screenshotUrl}
                        alt="Customer Payment Receipt"
                        className="max-h-72 w-auto max-w-full rounded border border-slate-800 object-contain"
                      />
                    </div>
                  ) : null}
                  <div>
                    <a
                      href={order.screenshotUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#C5A880] hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Open Full Size Image / Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right 1 Col: Customer Info */}
        <div className="space-y-5">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Customer Information
            </h2>
            <div className="space-y-2.5 text-xs">
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[9px]">Name</span>
                <span className="font-bold text-white text-xs sm:text-sm">{customer.name || 'Not provided'}</span>
              </div>
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[9px]">Email</span>
                <a href={`mailto:${customer.email}`} className="text-[#C5A880] hover:underline font-medium break-all">
                  {customer.email}
                </a>
              </div>
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[9px]">Phone</span>
                <a href={`tel:${customer.phone}`} className="text-slate-200 hover:underline">
                  {customer.phone || 'Not provided'}
                </a>
              </div>
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[9px]">Delivery Destination</span>
                <span className="text-slate-200">
                  {customer.address || ''}
                  {customer.state ? `, ${customer.state}` : ''}
                  {customer.postcode ? ` ${customer.postcode}` : ''}
                </span>
              </div>
              {customer.notes && (
                <div>
                  <span className="block text-slate-500 font-semibold uppercase text-[9px]">Delivery Notes</span>
                  <p className="text-slate-300 bg-slate-950 p-2 rounded border border-slate-800 mt-1">
                    {customer.notes}
                  </p>
                </div>
              )}
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[9px]">Selected Rail</span>
                <span className="font-semibold text-slate-200">{order.paymentMethod || 'Direct Bank Wire'}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center shadow-sm">
            <p className="text-xs text-slate-400 mb-2.5">
              Need to contact the buyer regarding freight scheduling?
            </p>
            {customer.phone && (
              <a
                href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
              >
                <span>Chat via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
