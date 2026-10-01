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
      const res = await fetch(`/api/admin/orders/${id}/`, {
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
      const res = await fetch(`/api/admin/orders/${id}/`, {
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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Link href="/admin/orders/" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all orders</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono">
              {order.orderNumber || order.id}
            </h1>
            <StatusBadge status={order.status} type="order" />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Logged via <strong className="text-slate-200">{order.channel === 'whatsapp' ? 'WhatsApp Checkout' : 'Online Form'}</strong> on {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href={`/admin/send-payment-email/?orderId=${order.id}`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Send / Resend Payment Details</span>
          </Link>

          {order.status !== 'payment_confirmed' && (
            <button
              type="button"
              onClick={handleMarkConfirmed}
              disabled={actionLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark Confirmed</span>
            </button>
          )}

          <a
            href={`/order/payment-details/?id=${order.orderNumber || order.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs inline-flex items-center gap-1"
            title="Open customer view"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Grid: Details & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Items & Settlement info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Items Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Ordered Vehicles &amp; Equipment
            </h2>
            <div className="divide-y divide-slate-800">
              {items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-white">{item.name}</div>
                    <div className="text-xs text-slate-400">
                      Unit Price: {money(item.price)} &bull; Quantity: {item.quantity || 1}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-white text-right">
                    {money(item.price * (item.quantity || 1))}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Breakdown */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-300">
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
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Amount Payable:</span>
                <span className="text-[#C5A880]">{money(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Current Parsed Payment Details */}
          {parsedFields.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Saved Settlement Instructions (Dispatched to Customer)
              </h2>
              <div className="space-y-2">
                {parsedFields.map((field, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase">{field.label}</span>
                    <span className="text-xs font-mono font-bold text-slate-100">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshot / Payment Notes */}
          {(order.paymentNote || order.screenshotUrl) && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                Customer Payment Verification Note
              </h2>
              {order.paymentNote && (
                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 mb-3">
                  {order.paymentNote}
                </p>
              )}
              {order.screenshotUrl && (
                <a
                  href={order.screenshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  <span>View Uploaded Payment Receipt / Screenshot</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

        </div>

        {/* Right 1 Col: Customer Info */}
        <div className="space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Customer Information
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[10px]">Name</span>
                <span className="font-bold text-white text-sm">{customer.name || 'Not provided'}</span>
              </div>
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[10px]">Email</span>
                <a href={`mailto:${customer.email}`} className="text-[#C5A880] hover:underline font-medium">
                  {customer.email}
                </a>
              </div>
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[10px]">Phone</span>
                <a href={`tel:${customer.phone}`} className="text-slate-200 hover:underline">
                  {customer.phone || 'Not provided'}
                </a>
              </div>
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[10px]">Delivery Destination</span>
                <span className="text-slate-200">
                  {customer.address || ''}
                  {customer.state ? `, ${customer.state}` : ''}
                  {customer.postcode ? ` ${customer.postcode}` : ''}
                </span>
              </div>
              {customer.notes && (
                <div>
                  <span className="block text-slate-500 font-semibold uppercase text-[10px]">Delivery Notes</span>
                  <p className="text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 mt-1">
                    {customer.notes}
                  </p>
                </div>
              )}
              <div>
                <span className="block text-slate-500 font-semibold uppercase text-[10px]">Selected Rail</span>
                <span className="font-semibold text-slate-200">{order.paymentMethod || 'Direct Bank Wire'}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center shadow-sm">
            <p className="text-xs text-slate-400 mb-3">
              Need to contact the buyer regarding freight scheduling?
            </p>
            {customer.phone && (
              <a
                href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors"
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
