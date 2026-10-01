'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, RefreshCw, Search, Trash2, Reply, Eye } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import StatusBadge from '@/src/components/admin/StatusBadge';

export default function AdminEnquiriesListPage() {
  const { passcode } = useAdminPasscode();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deletingId, setDeletingId] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/enquiries/', {
        headers: { 'x-admin-passcode': passcode },
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (passcode) fetchEnquiries();
  }, [passcode]);

  const handleDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete enquiry ${id}?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode },
      });
      if (res.ok) {
        setEnquiries(enquiries.filter((e) => e.id !== id));
      }
    } catch {
      alert('Failed to delete enquiry.');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = enquiries.filter((enq) => {
    if (typeFilter !== 'all' && (enq.type || 'contact') !== typeFilter) return false;
    if (statusFilter !== 'all' && (enq.status || 'new') !== statusFilter) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = (enq.name || '').toLowerCase().includes(q);
      const matchEmail = (enq.email || '').toLowerCase().includes(q);
      const matchSub = (enq.subject || '').toLowerCase().includes(q);
      const matchMsg = (enq.message || '').toLowerCase().includes(q);
      return matchName || matchEmail || matchSub || matchMsg;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/admin/" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-white font-serif">Customer Enquiries</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage inbound questions, wholesale requests, and compose email replies.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchEnquiries}
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
            placeholder="Search enquiries by customer, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#C5A880]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'contact', label: 'General Contact' },
            { id: 'wholesale', label: 'Wholesale / Fleet' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setTypeFilter(pill.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                typeFilter === pill.id
                  ? 'bg-[#C5A880] text-slate-950 shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500">Loading enquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500">
            No matching enquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/70 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Subject &amp; Excerpt</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filtered.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{enq.name}</div>
                      <div className="text-slate-400 text-[11px]">{enq.email}</div>
                      {enq.phone && <div className="text-slate-500 text-[10px]">{enq.phone}</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="max-w-md">
                        <div className="font-bold text-slate-200 truncate">{enq.subject || 'Website Message'}</div>
                        <div className="text-slate-400 text-[11px] truncate mt-0.5">{enq.message}</div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          {new Date(enq.createdAt).toLocaleDateString()} at {new Date(enq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                        {enq.type || 'contact'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={enq.status} type="enquiry" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/reply-enquiry/?id=${enq.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#C5A880] font-semibold text-xs transition-colors border border-[#C5A880]/30"
                          title="Compose Email Reply"
                        >
                          <Reply className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </Link>
                        <Link
                          href={`/admin/enquiries/${enq.id}/`}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(enq.id)}
                          disabled={deletingId === enq.id}
                          className="p-1.5 text-rose-400 hover:text-rose-200 rounded-lg hover:bg-rose-950/50 transition-colors"
                          title="Delete Enquiry"
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
