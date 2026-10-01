'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Mail, ArrowUpRight, DollarSign, Clock, CheckCircle2, Send, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import StatusBadge from '@/src/components/admin/StatusBadge';
import { money } from '@/lib/order';
import { SITE, REPLY } from '@/src/config/site';

export default function AdminDashboardPage() {
  const { passcode } = useAdminPasscode();
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);
    setError('');

    try {
      const [ordersRes, enqRes] = await Promise.all([
        fetch('/api/admin/orders/', {
          headers: { 'x-admin-passcode': passcode },
        }),
        fetch('/api/admin/enquiries/', {
          headers: { 'x-admin-passcode': passcode },
        }),
      ]);

      if (ordersRes.ok) {
        const oData = await ordersRes.json();
        setOrders(oData.orders || []);
      }
      if (enqRes.ok) {
        const eData = await enqRes.json();
        setEnquiries(eData.enquiries || []);
      }
    } catch (err) {
      setError('Failed to fetch live admin data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (passcode) {
      loadData();
    }
  }, [passcode]);

  // Metrics calculation
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => (o.status || 'pending') === 'pending').length;
  const confirmedOrders = orders.filter((o) => o.status === 'payment_confirmed').length;
  const totalSales = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => (e.status || 'new') === 'new').length;

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif">
            Executive Dispatch Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time sales orders, payment dispatch composer, and enquirer communications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Pending Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Action Required</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">
            {pendingOrders}
          </div>
          <p className="text-xs text-amber-400/90 mt-1">
            Pending payment instructions / settlement
          </p>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">
            {totalOrders}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {confirmedOrders} settled &bull; {totalOrders - pendingOrders - confirmedOrders} details sent
          </p>
        </div>

        {/* Metric 3: Order Pipeline Volume */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order Volume</span>
            <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-[#C5A880] mt-2">
            {money(totalSales)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Across {SITE.currency} catalog checkouts
          </p>
        </div>

        {/* Metric 4: New Enquiries */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">New Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white mt-2">
            {newEnquiries}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {totalEnquiries} total contact &amp; wholesale messages
          </p>
        </div>

      </div>

      {/* Main Split Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders (2 Columns) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-white tracking-wide">Recent Orders</h2>
            </div>
            <Link
              href="/admin/orders/"
              className="text-xs font-semibold text-[#C5A880] hover:text-[#D4B27C] inline-flex items-center gap-1"
            >
              <span>View all orders ({totalOrders})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 bg-slate-950/50 rounded-xl border border-dashed border-slate-800">
              No orders logged in Redis storage yet. When customers check out, they will appear here instantly.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-3">Order Ref</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.slice(0, 6).map((order) => (
                    <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-white">
                        <Link href={`/admin/orders/${order.id}/`} className="hover:underline text-[#C5A880]">
                          {order.orderNumber || order.id}
                        </Link>
                        <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                          {order.channel === 'whatsapp' ? 'WhatsApp' : 'Web'} &bull; {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-200">{order.customer?.name || 'Customer'}</div>
                        <div className="text-slate-400 text-[11px]">{order.customer?.email}</div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {money(order.total)}
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge status={order.status} type="order" />
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/admin/send-payment-email/?orderId=${order.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] font-semibold text-[11px] transition-colors border border-[#C5A880]/30"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send Details</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Enquiries (1 Column) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-white tracking-wide">Enquiries</h2>
              </div>
              <Link
                href="/admin/enquiries/"
                className="text-xs font-semibold text-[#C5A880] hover:text-[#D4B27C] inline-flex items-center gap-1"
              >
                <span>All ({totalEnquiries})</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-500">Loading enquiries...</div>
            ) : enquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 bg-slate-950/50 rounded-xl border border-dashed border-slate-800">
                No customer enquiries logged yet.
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 5).map((enq) => (
                  <div key={enq.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-xs text-white truncate">
                          {enq.name}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {enq.subject || enq.message}
                        </div>
                      </div>
                      <StatusBadge status={enq.status} type="enquiry" />
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-slate-500">
                      <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                      <Link
                        href={`/admin/reply-enquiry/?id=${enq.id}`}
                        className="text-[#C5A880] hover:underline font-semibold"
                      >
                        Compose Reply &rarr;
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <a
              href={`https://wa.me/${SITE?.whatsapp?.replace(/[^0-9]/g, '') || '61480811308'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5"
            >
              <span>Open Queensland Dispatch WhatsApp Desk</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
