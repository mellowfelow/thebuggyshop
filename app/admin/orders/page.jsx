'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Send, Trash2, ArrowLeft, RefreshCw, Search, Eye, Calendar, User, Phone, Mail } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import StatusBadge from '@/src/components/admin/StatusBadge';
import { money } from '@/lib/order';

export default function AdminOrdersListPage() {
  const { passcode } = useAdminPasscode();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders/', {
        headers: { 'x-admin-passcode': passcode },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (passcode) fetchOrders();
  }, [passcode]);

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete order ${id}?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode },
      });
      if (res.ok) {
        setOrders(orders.filter((o) => o.id !== id && o.orderNumber !== id));
      }
    } catch {
      alert('Failed to delete order.');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = orders.filter((order) => {
    const s = (order.status || 'pending').toLowerCase();
    if (statusFilter !== 'all' && s !== statusFilter) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchRef = (order.orderNumber || order.id || '').toLowerCase().includes(q);
      const matchName = (order.customer?.name || '').toLowerCase().includes(q);
      const matchEmail = (order.customer?.email || '').toLowerCase().includes(q);
      return matchRef || matchName || matchEmail;
    }
    return true;
  });

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Link href="/admin/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">Customer Orders</h1>
          <p className="text-xs text-slate-400">
            Dispatch payment instructions &bull; Track settlement status
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between bg-slate-900 p-2.5 sm:p-3.5 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ref, customer, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending' },
            { id: 'payment_sent', label: 'Sent' },
            { id: 'payment_confirmed', label: 'Confirmed' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setStatusFilter(pill.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                statusFilter === pill.id
                  ? 'bg-[#C5A880] text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No matching orders found.
          </div>
        ) : (
          <>
            {/* 1. MOBILE CARD VIEW (md:hidden) - Ultra-Compact & Clean */}
            <div className="block md:hidden divide-y divide-slate-800/80">
              {filtered.map((order) => {
                const ref = order.orderNumber || order.id;
                const itemsCount = (order.items || []).reduce((sum, it) => sum + (it.quantity || 1), 0);
                return (
                  <div key={order.id} className="p-3 space-y-2 hover:bg-slate-800/30 transition-colors">
                    {/* Top Row: Ref + Status */}
                    <div className="flex items-center justify-between gap-2">
                      <Link href={`/admin/orders/${encodeURIComponent(order.id)}/`} className="font-mono font-bold text-xs sm:text-sm text-[#C5A880] hover:underline truncate">
                        {ref}
                      </Link>
                      <StatusBadge status={order.status} type="order" />
                    </div>

                    {/* Customer & Total Line */}
                    <div className="flex items-start justify-between gap-2 text-xs">
                      <div className="min-w-0 flex-1 truncate">
                        <span className="font-bold text-slate-200 block truncate">
                          {order.customer?.name || 'Customer'}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate font-mono">
                          {order.customer?.email}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-black text-white text-sm font-mono block">
                          {money(order.total)}
                        </span>
                        <span className="text-[9px] text-slate-400">
                          {order.channel === 'whatsapp' ? 'WA' : 'Web'} &bull; {new Date(order.createdAt).toLocaleDateString('en-AU')}
                        </span>
                      </div>
                    </div>

                    {/* Items Snippet */}
                    <div className="text-[10px] text-slate-400 bg-slate-950/70 px-2 py-1 rounded border border-slate-800 truncate">
                      {(order.items || []).map(i => `${i.name} (x${i.quantity || 1})`).join(', ') || '1x Order'}
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
                      <Link
                        href={`/admin/send-payment-email/?orderId=${encodeURIComponent(order.id)}`}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] font-bold text-xs text-center border border-[#C5A880]/30 flex items-center justify-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Details</span>
                      </Link>

                      <div className="flex items-center gap-1 shrink-0">
                        <Link
                          href={`/admin/orders/${encodeURIComponent(order.id)}/`}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-950 border border-slate-800"
                          title="View Order"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(order.id)}
                          disabled={deletingId === order.id}
                          className="p-1.5 text-rose-400 hover:text-rose-200 rounded-lg bg-slate-950 border border-slate-800"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 2. DESKTOP TABLE VIEW (hidden md:block) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items / Vehicles</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        <Link href={`/admin/orders/${encodeURIComponent(order.id)}/`} className="text-[#C5A880] hover:underline">
                          {order.orderNumber || order.id}
                        </Link>
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                          {order.channel === 'whatsapp' ? 'WhatsApp Order' : 'Web Checkout'} &bull; {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{order.customer?.name || 'Customer'}</div>
                        <div className="text-slate-400 text-[11px]">{order.customer?.email}</div>
                        <div className="text-slate-500 text-[10px]">{order.customer?.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs space-y-0.5">
                          {(order.items || []).map((it, idx) => (
                            <div key={`order-table-item-${order.id}-${it.slug || idx}-${idx}`} className="text-slate-300 truncate">
                              &bull; {it.name} <span className="text-slate-500">(x{it.quantity || 1})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-bold text-white text-sm">
                        {money(order.total)}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={order.status} type="order" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/send-payment-email/?orderId=${encodeURIComponent(order.id)}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] font-semibold text-xs transition-colors border border-[#C5A880]/30"
                            title="Send Payment Details Email"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span className="hidden md:inline">Send Details</span>
                          </Link>
                          <Link
                            href={`/admin/orders/${encodeURIComponent(order.id)}/`}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                            title="View Order Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(order.id)}
                            disabled={deletingId === order.id}
                            className="p-1.5 text-rose-400 hover:text-rose-200 rounded-lg hover:bg-rose-950/50 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
