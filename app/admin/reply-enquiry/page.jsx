'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, CheckCircle2, Loader2, Mail, Eye } from 'lucide-react';
import { useAdminPasscode } from '@/src/components/admin/AdminPasscodeContext';
import { SITE, CONTACT } from '@/src/config/site';

function ReplyEnquiryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const { passcode } = useAdminPasscode();

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentMessage, setSentMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No enquiry ID provided.');
      setLoading(false);
      return;
    }

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

        // Pre-fill a professional Australian greeting & acknowledgement
        const defaultReply = `G'day ${data.enquiry.name || ''},\n\nThank you for reaching out to The Buggy Shop regarding ${data.enquiry.subject || 'our luxury golf buggies'}.\n\n\n\nKind regards,\nSales & Dispatch Desk\nThe Buggy Shop (Australia)\nPhone: 0480 811 308`;
        setReplyText(defaultReply);
      } catch {
        setError('Error loading enquiry.');
      } finally {
        setLoading(false);
      }
    };

    if (passcode) {
      fetchEnquiry();
    }
  }, [id, passcode]);

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!id || !replyText.trim()) return;

    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/admin/reply-enquiry/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode,
        },
        body: JSON.stringify({
          enquiryId: id,
          replyMessage: replyText.trim(),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Failed to send reply.');
        return;
      }

      setSentSuccess(true);
      setSentMessage(json.message || 'Reply dispatched successfully.');
    } catch {
      setError('Network error dispatching enquiry reply.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-400">Loading enquiry composer...</p>
      </div>
    );
  }

  if (error && !enquiry) {
    return (
      <div className="py-16 text-center space-y-4">
        <p className="text-rose-400 text-sm">{error}</p>
        <Link href="/admin/enquiries/" className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 rounded-lg text-xs text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to enquiries</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <Link href={`/admin/enquiries/${id}/`} className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Enquiry</span>
          </Link>
          <h1 className="text-2xl font-bold text-white font-serif">
            Compose Enquiry Reply
          </h1>
          <p className="text-xs text-slate-400">
            Responding to <strong className="text-slate-200">{enquiry.name}</strong> ({enquiry.email})
          </p>
        </div>
      </div>

      {sentSuccess && (
        <div className="p-5 bg-emerald-950/80 border border-emerald-700 rounded-2xl text-emerald-200 flex items-start gap-3 shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm text-white">Reply Dispatched!</div>
            <div className="text-xs text-emerald-300 mt-0.5">{sentMessage}</div>
            <div className="mt-3 flex gap-3">
              <Link
                href="/admin/enquiries/"
                className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors"
              >
                Back to Enquiries List
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Composer Form (6 Cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Original message context */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs">
            <span className="text-slate-500 font-bold uppercase text-[10px] block mb-1">Original Customer Question</span>
            <div className="text-slate-300 italic bg-slate-950 p-3 rounded-lg border border-slate-800/80 max-h-32 overflow-y-auto">
              &ldquo;{enquiry.message}&rdquo;
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleSendReply} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Reply Message *
                </label>
                <textarea
                  rows={10}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your response to the customer..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#C5A880] leading-relaxed font-sans"
                />
              </div>

              {error && (
                <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-xl text-xs text-rose-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending || !replyText.trim()}
                className="w-full py-3.5 px-4 bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Reply...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Dispatch Email Reply</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Right Col: Live Email Preview (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Live Branded Email Preview (Light Shell)</span>
            </span>
          </div>

          <div className="bg-[#F1F5F9] p-5 rounded-2xl border border-slate-800 shadow-inner">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden text-slate-900 text-xs">
              
              {/* Header */}
              <div className="bg-[#0B111E] p-5 border-b-2 border-[#C5A880] text-white">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#C5A880] mb-1">
                  Message from The Buggy Shop
                </div>
                <div className="text-base font-bold text-white">
                  Re: {enquiry.subject || 'Your Enquiry'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Queensland Technical Workshop &amp; Sales Desk
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="bg-[#FAF8F5] border-l-4 border-[#C5A880] p-4 rounded text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {replyText || 'Type your message to preview...'}
                </div>

                <div className="pt-3 border-t border-slate-200 text-slate-500 text-[11px] space-y-1">
                  <div className="font-bold text-slate-700 uppercase text-[10px]">Original Enquiry:</div>
                  <div className="italic">&ldquo;{enquiry.message}&rdquo;</div>
                </div>

                <div className="text-center py-2">
                  <div className="inline-block px-4 py-2 bg-[#0B111E] text-white font-bold text-xs rounded-lg border border-[#C5A880]">
                    Explore All Golf Buggies &amp; Carts &rarr;
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 p-3.5 border-t border-slate-200 text-center text-[10px] text-slate-500">
                {SITE.name} &bull; {SITE.domain} &bull; 0480 811 308
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function ReplyEnquiryPage() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-[#C5A880] animate-spin mx-auto mb-3" />
      </div>
    }>
      <ReplyEnquiryContent />
    </Suspense>
  );
}
