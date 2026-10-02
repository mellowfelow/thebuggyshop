'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Send, 
  ArrowUpRight, 
  RefreshCw, 
  AlertCircle,
  FileText,
  MessageSquare,
  ShieldCheck,
  Mail,
  Users
} from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import StatusBadge from '@/src/components/admin/StatusBadge';
import { money } from '@/lib/order';
import { SITE, CONTACT, REPLY } from '@/src/config/site';

export default function AdminDashboardHomePage() {
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
      // 1. Fetch Orders
      const ordRes = await fetch('/api/admin/orders/', {
        headers: { 'x-admin-passcode': passcode },
      });
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        setOrders(ordData.orders || []);
      }

      // 2. Fetch Enquiries
      const enqRes = await fetch('/api/admin/enquiries/', {
        headers: { 'x-admin-passcode': passcode },
      });
      if (enqRes.ok) {
        const enqData = await enqRes.json();
        setEnquiries(enqData.enquiries || []);
      }
    } catch (err) {
      setError('Failed to fetch dashboard data. Please check connection.');
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

  // Derived metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => (o.status || 'pending') === 'pending').length;
  const confirmedOrders = orders.filter((o) => o.status === 'payment_confirmed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const totalEnquiries = enquiries.length;
  const newEnquiries = enquiries.filter((e) => (e.status || 'new') === 'new').length;

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight font-serif">
            Executive Dispatch Hub
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time sales orders, payment dispatch composer, and enquirer communications.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-rose-950/50 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Metric 1: Pending Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Action Required</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white mt-1 sm:mt-2">
            {pendingOrders}
          </div>
          <p className="text-[10px] sm:text-xs text-amber-400/90 mt-0.5 truncate">
            Pending payment instructions
          </p>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Total Orders</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white mt-1 sm:mt-2">
            {totalOrders}
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">
            {confirmedOrders} settled &bull; {totalOrders - pendingOrders - confirmedOrders} sent
          </p>
        </div>

        {/* Metric 3: Order Pipeline Volume */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Order Volume</span>
            <div className="w-7 h-7 rounded-lg bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-[#C5A880] mt-1 sm:mt-2 font-mono">
            {money(totalRevenue)}
          </div>
          <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">
            Gross pipeline total
          </p>
        </div>

        {/* Metric 4: Customer Enquiries */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Enquiries</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <Mail className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white mt-1 sm:mt-2">
            {totalEnquiries}
          </div>
          <p className="text-[10px] sm:text-xs text-purple-400 mt-0.5 truncate">
            {newEnquiries} unread &bull; {totalEnquiries - newEnquiries} replied
          </p>
        </div>

      </div>

      {/* Main Two-Column Hub Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders (2 Columns on Desktop) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white">Recent Orders</h2>
            </div>
            <Link
              href="/admin/orders/"
              className="text-xs font-semibold text-[#C5A880] hover:text-[#D4B27C] inline-flex items-center gap-1"
            >
              <span>View all ({totalOrders})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500 bg-slate-950/50 rounded-xl border border-dashed border-slate-800 p-4">
              No orders logged in Redis storage yet. When customers check out, they will appear here instantly.
            </div>
          ) : (
            <>
              {/* Mobile Card List (md:hidden) */}
              <div className="block md:hidden divide-y divide-slate-800/80">
                {orders.slice(0, 5).map((order) => {
                  const ref = order.orderNumber || order.id;
                  return (
                    <div key={order.id} className="py-3 space-y-2 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <Link href={`/admin/orders/${order.id}/`} className="font-mono font-bold text-xs text-[#C5A880] hover:underline">
                          {ref}
                        </Link>
                        <StatusBadge status={order.status} type="order" />
                      </div>

                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-slate-300 truncate max-w-[160px] font-medium">
                          {order.customer?.name || 'Customer'}
                        </span>
                        <span className="font-mono font-black text-white text-xs">
                          {money(order.total)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-0.5">
                        <span className="text-[10px] text-slate-400">
                          {order.channel === 'whatsapp' ? 'WhatsApp' : 'Web'} &bull; {new Date(order.createdAt).toLocaleDateString('en-AU')}
                        </span>
                        <Link
                          href={`/admin/send-payment-email/?orderId=${order.id}`}
                          className="px-2.5 py-1 rounded bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] font-bold text-[10px] border border-[#C5A880]/30 inline-flex items-center gap-1"
                        >
                          <Send className="w-2.5 h-2.5" />
                          <span>Send Details</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Table (hidden md:block) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">Order Ref</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.slice(0, 6).map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 px-3 font-mono font-bold text-white">
                          <Link href={`/admin/orders/${order.id}/`} className="hover:underline text-[#C5A880]">
                            {order.orderNumber || order.id}
                          </Link>
                          <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                            {order.channel === 'whatsapp' ? 'WhatsApp' : 'Web'} &bull; {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-medium text-slate-200">{order.customer?.name || 'Customer'}</div>
                          <div className="text-slate-400 text-[11px]">{order.customer?.email}</div>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-white">
                          {money(order.total)}
                        </td>
                        <td className="py-2.5 px-3">
                          <StatusBadge status={order.status} type="order" />
                        </td>
                        <td className="py-2.5 px-3 text-right">
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
            </>
          )}
        </div>

        {/* Recent Enquiries (1 Column) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">Enquiries</h2>
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
              <div className="py-12 text-center text-xs text-slate-500">Loading enquiries...</div>
            ) : enquiries.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-500 bg-slate-950/50 rounded-xl border border-dashed border-slate-800 p-4">
                No customer or wholesale inquiries recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 5).map((enq) => (
                  <div
                    key={enq.id}
                    className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white truncate max-w-[140px]">
                        {enq.name}
                      </span>
                      <StatusBadge status={enq.status} type="enquiry" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {enq.subject || enq.message}
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-500">
                      <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                      <Link
                        href={`/admin/reply-enquiry/?enquiryId=${enq.id}`}
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
        </div>

      </div>

    </div>
  );
}
