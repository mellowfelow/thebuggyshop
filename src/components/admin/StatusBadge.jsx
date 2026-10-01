'use client';

export default function StatusBadge({ status, type = 'order' }) {
  const s = (status || '').toLowerCase();

  if (type === 'order') {
    switch (s) {
      case 'payment_confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Payment Confirmed
          </span>
        );
      case 'payment_sent':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            Payment Details Sent
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Pending Payment
          </span>
        );
    }
  }

  // Enquiries
  switch (s) {
    case 'replied':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
          Replied
        </span>
      );
    case 'new':
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
          New Enquiry
        </span>
      );
  }
}
