'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Reply, Mail, User, Phone, Calendar, Loader2, MessageSquare } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import StatusBadge from '@/src/components/admin/StatusBadge';

export default function AdminEnquiryDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const { passcode } = useAdminPasscode();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!passcode || !id) return;

    const fetchEnquiry = async () => {
      try {
        const res = await fetch(`/api/admin/enquiries/${id}/`, {
          headers: { 'x-admin-passcode': passcode },
        });
        if (!res.ok) {
          setError('Enquiry not found.');
          return;
        }
        const data = await res.json();
        setEnquiry(data.enquiry);
      } catch {
        setError('Error fetching enquiry details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiry();
  }, [passcode, id]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-400">Loading enquiry...</p>
      </div>
    );
  }

  if (error || !enquiry) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-rose-400 text-sm">{error || 'Enquiry not found.'}</p>
        <Link href="/admin/enquiries/" className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 rounded-lg text-xs text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to enquiries</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <Link href="/admin/enquiries/" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all enquiries</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white font-serif">
              {enquiry.subject || 'Website Customer Enquiry'}
            </h1>
            <StatusBadge status={enquiry.status} type="enquiry" />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Reference: <span className="font-mono text-slate-300 font-bold">{enquiry.id}</span> &bull; Logged on {new Date(enquiry.createdAt).toLocaleString()}
          </p>
        </div>

        <Link
          href={`/admin/reply-enquiry/?id=${enquiry.id}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Reply className="w-4 h-4" />
          <span>Compose Email Reply</span>
        </Link>
      </div>

      {/* Customer Contact Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-500 text-[10px] uppercase font-bold">Contact Name</div>
            <div className="font-bold text-white text-sm">{enquiry.name}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="text-slate-500 text-[10px] uppercase font-bold">Email Address</div>
            <a href={`mailto:${enquiry.email}`} className="font-semibold text-slate-200 hover:text-white truncate block">
              {enquiry.email}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-500 text-[10px] uppercase font-bold">Phone Number</div>
            <div className="font-semibold text-slate-200">{enquiry.phone || 'Not provided'}</div>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#C5A880]" />
          <span>Customer Inbound Message</span>
        </h2>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
          {enquiry.message}
        </div>
      </div>

      {/* Prior Reply if existing */}
      {enquiry.lastReply && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Dispatched Reply (Sent {enquiry.repliedAt ? new Date(enquiry.repliedAt).toLocaleDateString() : ''})
            </h3>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
            {enquiry.lastReply}
          </div>
        </div>
      )}

    </div>
  );
}
