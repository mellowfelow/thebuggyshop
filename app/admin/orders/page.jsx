'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Send, Trash2, ArrowLeft, RefreshCw, Search, Eye } from 'lucide-react';
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
      const res = await fetch(`/api/admin/orders/${id}/`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode },
      });
      if (res.ok) {
        setOrders(orders.filter((o) => o.id !== id));
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
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-white font-serif">Customer Orders</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage purchase orders, send payment instructions, and track dispatch status.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by order ref, customer, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending', label: 'Pending Payment' },
            { id: 'payment_sent', label: 'Details Sent' },
            { id: 'payment_confirmed', label: 'Confirmed' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === pill.id
                  ? 'bg-[#C5A880] text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            No matching orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Order Ref</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Items / Vehicles</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      <Link href={`/admin/orders/${order.id}/`} className="text-[#C5A880] hover:underline">
                        {order.orderNumber || order.id}
                      </Link>
                      <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                        {order.channel === 'whatsapp' ? 'WhatsApp Order' : 'Web Checkout'} &bull; {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-200">{order.customer?.name || 'Customer'}</div>
                      <div className="text-slate-400 text-[11px]">{order.customer?.email}</div>
                      <div className="text-slate-500 text-[10px]">{order.customer?.phone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="max-w-xs space-y-0.5">
                        {(order.items || []).map((it, idx) => (
                          <div key={idx} className="text-slate-300 truncate">
                            &bull; {it.name} <span className="text-slate-500">(x{it.quantity || 1})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white text-sm">
                      {money(order.total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.status} type="order" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/send-payment-email/?orderId=${order.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] font-semibold text-xs transition-colors border border-[#C5A880]/30"
                          title="Send Payment Details Email"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span className="hidden md:inline">Send Details</span>
                        </Link>
                        <Link
                          href={`/admin/orders/${order.id}/`}
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
        )}
      </div>

    </div>
  );
}
