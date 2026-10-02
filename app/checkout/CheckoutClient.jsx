'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Truck, 
  ShoppingBag, 
  MessageCircle, 
  Mail, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Loader2, 
  Building2, 
  Zap, 
  FileCheck2, 
  CheckCircle2, 
  Lock, 
  CreditCard 
} from 'lucide-react';
import { useStore } from '@/src/components/ClientStoreProvider';
import { SITE, CONTACT, SHOP, REPLY } from '@/src/config/site';
import { waOrderLink } from '@/lib/whatsapp';
import { generateOrderRef } from '@/lib/orderStore';
import { money } from '@/lib/order';

const AUSTRALIAN_STATES = [
  { code: 'QLD', name: 'Queensland' },
  { code: 'NSW', name: 'New South Wales' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'SA', name: 'South Australia' },
  { code: 'WA', name: 'Western Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'ACT', name: 'Australian Capital Territory' },
  { code: 'NT', name: 'Northern Territory' },
];

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerState, setCustomerState] = useState('QLD');
  const [customerPostcode, setCustomerPostcode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('bank-transfer'); // bank-transfer, pay-id, pay-in-4, crypto
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isCrypto = selectedPayment === 'crypto';
  const isPayIn4 = selectedPayment === 'pay-in-4';
  const cryptoDiscountAmount = isCrypto ? Math.round(subtotal * (SHOP.cryptoDiscount / 100)) : 0;
  
  const isFreeShipping = SHOP.freeShippingThreshold > 0 && subtotal >= SHOP.freeShippingThreshold;
  const shippingFee = subtotal > 0 ? (isFreeShipping ? 0 : SHOP.shippingFee) : 0;
  const total = subtotal - cryptoDiscountAmount + shippingFee;

  // Pay in 4 Smart Calculation (1st installment today, 3 remaining at month-end)
  const payIn4Installment = Math.round(total / 4);
  const payIn4FinalInstallment = total - (payIn4Installment * 3);

  // Dynamic month end dates for the 3 subsequent installments
  const getMonthEndDates = (count = 3) => {
    const dates = [];
    const now = new Date();
    for (let i = 1; i <= count; i++) {
      const lastDay = new Date(now.getFullYear(), now.getMonth() + i + 1, 0);
      dates.push(
        lastDay.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
      );
    }
    return dates;
  };
  const monthEndDates = getMonthEndDates(3);

  const handleOrderSubmission = async (channel = 'email') => {
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address for your order confirmation and payment details.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg('Please provide a contact phone number for freight dispatch.');
      return;
    }
    if (!customerAddress.trim()) {
      setErrorMsg('Please provide your street delivery address.');
      return;
    }

    if (cart.length === 0) {
      setErrorMsg('Your cart is empty. Please select a vehicle from our fleet.');
      return;
    }

    setSubmitting(true);
    const orderRef = generateOrderRef();

    let paymentMethodLabel = 'Direct Bank Transfer (Osko / Fast EFT)';
    let paymentMethodId = 'bank-transfer';

    if (selectedPayment === 'crypto') {
      paymentMethodLabel = 'Bitcoin (BTC) / Tether (USDT) (10% Instant Rebate Applied)';
      paymentMethodId = 'crypto-BTC';
    } else if (selectedPayment === 'pay-id') {
      paymentMethodLabel = 'Australian PayID Instant Transfer (Registered ABN)';
      paymentMethodId = 'pay-id';
    } else if (selectedPayment === 'pay-in-4') {
      paymentMethodLabel = `Commercial Pay in 4 (1st Split: $${payIn4Installment.toLocaleString('en-AU')} Due Today · Remaining 3 Monthly at Month-End)`;
      paymentMethodId = 'pay-in-4';
    }

    const orderData = {
      orderNumber: orderRef,
      orderRef,
      items: cart,
      subtotal,
      shipping: shippingFee,
      discount: cryptoDiscountAmount,
      total,
      paymentMethod: paymentMethodLabel,
      paymentMethodId,
      installmentPlan: isPayIn4 ? {
        type: 'pay-in-4',
        firstInstallment: payIn4Installment,
        monthlyInstallment: payIn4Installment,
        finalInstallment: payIn4FinalInstallment,
        schedule: [
          { split: 1, label: '1st Installment (Due Today)', dueDate: 'Due Today', amount: payIn4Installment },
          { split: 2, label: `2nd Installment (${monthEndDates[0]})`, dueDate: monthEndDates[0], amount: payIn4Installment },
          { split: 3, label: `3rd Installment (${monthEndDates[1]})`, dueDate: monthEndDates[1], amount: payIn4Installment },
          { split: 4, label: `4th Installment (${monthEndDates[2]})`, dueDate: monthEndDates[2], amount: payIn4FinalInstallment },
        ]
      } : null,
      channel,
      customer: {
        name: customerName.trim(),
        email: customerEmail.trim(),
        phone: customerPhone.trim(),
        address: customerAddress.trim(),
        state: customerState,
        postcode: customerPostcode.trim(),
        notes: deliveryNotes.trim(),
      },
    };

    // If WhatsApp channel, open WhatsApp synchronously
    if (channel === 'whatsapp') {
      const waUrl = waOrderLink(orderData, orderData.customer);
      window.open(waUrl, '_blank');
    }

    try {
      // Send to contact API route to store in Redis and trigger customer confirmation email
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'order',
          ...orderData,
        }),
      });

      if (res.ok) {
        clearCart();
        router.push(`/thank-you-order/?orderId=${orderRef}`);
      } else {
        const errData = await res.json().catch(() => ({}));
        if (channel === 'whatsapp') {
          setErrorMsg('Order details could not be logged, but your WhatsApp request was prepared.');
        } else {
          setErrorMsg(errData.message || 'There was an issue processing your order. Please try again or contact us directly.');
        }
      }
    } catch (err) {
      console.error('Order submission error:', err);
      if (channel === 'whatsapp') {
        setErrorMsg('Order details could not be logged, but your WhatsApp request was prepared.');
      } else {
        setErrorMsg('There was an issue processing your order. Please check your connection and try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
          Your Order Cart is Empty
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          You have no vehicles or accessories selected. Explore our Australian luxury, remote-control, and off-road golf buggies for sale.
        </p>
        <Link
          href="/shop/"
          className="inline-flex items-center gap-2 py-3.5 px-8 rounded-xl bg-slate-950 hover:bg-[#C5A880] hover:text-slate-950 text-[#C5A880] font-black text-xs uppercase tracking-wider transition-all shadow-md"
        >
          <span>Explore Golf Buggies for Sale</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-14 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <nav className="text-xs text-slate-500 flex items-center gap-1.5 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop/" className="hover:text-slate-900 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Checkout &amp; Dispatch Allocation</span>
        </nav>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
          Secure Order Checkout &amp; Delivery Allocation
        </h1>
        <p className="text-sm text-slate-600">
          Complete your delivery details to lock in your machinery reservation and receive verified payment instructions.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-sm font-medium flex items-center gap-3">
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        
        {/* Left Column: Customer Information & Payment Options (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Customer Dispatch Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-[#C5A880] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-lg font-black text-slate-900 font-serif">
                Delivery &amp; Contact Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name / Entity Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Harrison Sterling"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@domain.com.au"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent bg-slate-50/50"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Your payment details &amp; receipt will be sent here.</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0480 811 308"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent bg-slate-50/50"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">For driver delivery notification.</span>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Street Delivery Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Street address, property name, or club facility"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  State / Territory <span className="text-rose-500">*</span>
                </label>
                <select
                  value={customerState}
                  onChange={(e) => setCustomerState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent bg-slate-50/50"
                >
                  {AUSTRALIAN_STATES.map((st) => (
                    <option key={st.code} value={st.code}>
                      {st.name} ({st.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Postcode
                </label>
                <input
                  type="text"
                  value={customerPostcode}
                  onChange={(e) => setCustomerPostcode(e.target.value)}
                  placeholder="e.g. 4214"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent bg-slate-50/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Access &amp; Delivery Instructions (Optional)
                </label>
                <textarea
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g., Gate code #4820, deliver directly to golf pro-shop bay, or acreage driveway note"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Preferred Payment Method Selection */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-[#C5A880] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-lg font-black text-slate-900 font-serif">
                Select Preferred Settlement Rail
              </h2>
            </div>

            <div className="space-y-3">
              {/* Option 1: Direct Bank Transfer */}
              <label 
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-start justify-between transition-all ${
                  selectedPayment === 'bank-transfer'
                    ? 'border-[#C5A880] bg-[#FAF8F5]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment_choice"
                    value="bank-transfer"
                    checked={selectedPayment === 'bank-transfer'}
                    onChange={() => setSelectedPayment('bank-transfer')}
                    className="mt-1 text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <div>
                    <strong className="text-sm text-slate-900 block font-bold">
                      Direct Bank Transfer (Osko / Fast EFT)
                    </strong>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      Instant electronic funds transfer via Osko / NPP. Official business BSB &amp; Account number dispatched via email.
                    </span>
                  </div>
                </div>
                <Building2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
              </label>

              {/* Option 2: Australian PayID */}
              <label 
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-start justify-between transition-all ${
                  selectedPayment === 'pay-id'
                    ? 'border-[#C5A880] bg-[#FAF8F5]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment_choice"
                    value="pay-id"
                    checked={selectedPayment === 'pay-id'}
                    onChange={() => setSelectedPayment('pay-id')}
                    className="mt-1 text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <div>
                    <strong className="text-sm text-slate-900 block font-bold">
                      Australian PayID Instant Settlement
                    </strong>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      Instant mobile/ABN clearing. Zero waiting period for faster warehouse release.
                    </span>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              </label>

              {/* Option 3: Commercial Pay in 4 (4 Equal Monthly Splits) */}
              <div 
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPayment === 'pay-in-4'
                    ? 'border-[#C5A880] bg-[#FAF8F5]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <label className="flex items-start justify-between cursor-pointer">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment_choice"
                      value="pay-in-4"
                      checked={selectedPayment === 'pay-in-4'}
                      onChange={() => setSelectedPayment('pay-in-4')}
                      className="mt-1 text-[#C5A880] focus:ring-[#C5A880]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-slate-900 font-bold">
                          Commercial Pay in 4 (4 Monthly Splits)
                        </strong>
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50">
                          0% Interest &bull; Zero Surcharge
                        </span>
                      </div>
                      <span className="text-xs text-slate-600 block mt-0.5">
                        Pay 1st installment today. Remaining 3 installments paid every month end.
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                </label>

                {/* Smart Automated Installment Schedule Breakdown */}
                {selectedPayment === 'pay-in-4' && (
                  <div className="mt-3.5 pt-3 border-t border-[#C5A880]/30 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">
                        Smart Automated Installment Breakdown
                      </span>
                      <span className="font-mono font-bold text-[#8E6E3E] text-xs">
                        4 x ${payIn4Installment.toLocaleString('en-AU')} AUD
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {/* 1st Installment Due Today */}
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                            1st Installment (Due Today)
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                        </div>
                        <div className="font-mono font-black text-lg text-emerald-700 mt-0.5">
                          ${payIn4Installment.toLocaleString('en-AU')} AUD
                        </div>
                        <span className="text-[10px] text-emerald-800 block mt-0.5 font-medium">
                          Locks machine reservation &amp; triggers pre-delivery inspection.
                        </span>
                      </div>

                      {/* Remaining 3 Splits at Month-End */}
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                          3 Consecutive Month-End Splits
                        </span>
                        <div className="flex justify-between text-[11px] pt-0.5 border-b border-slate-100 pb-0.5">
                          <span>Split 2 ({monthEndDates[0]}):</span>
                          <span className="font-mono font-bold text-slate-900">${payIn4Installment.toLocaleString('en-AU')}</span>
                        </div>
                        <div className="flex justify-between text-[11px] border-b border-slate-100 pb-0.5">
                          <span>Split 3 ({monthEndDates[1]}):</span>
                          <span className="font-mono font-bold text-slate-900">${payIn4Installment.toLocaleString('en-AU')}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span>Split 4 ({monthEndDates[2]}):</span>
                          <span className="font-mono font-bold text-slate-900">${payIn4FinalInstallment.toLocaleString('en-AU')}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 italic">
                      *Zero interest, no merchant fees. Official commercial tax invoice with scheduled month-end direct transfer details dispatched to your email.
                    </p>
                  </div>
                )}
              </div>

              {/* Option 4: Cryptocurrency (10% Rebate) */}
              <label 
                className={`p-4 rounded-xl border-2 cursor-pointer flex items-start justify-between transition-all ${
                  selectedPayment === 'crypto'
                    ? 'border-[#C5A880] bg-[#FAF8F5]'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="payment_choice"
                    value="crypto"
                    checked={selectedPayment === 'crypto'}
                    onChange={() => setSelectedPayment('crypto')}
                    className="mt-1 text-[#C5A880] focus:ring-[#C5A880]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-slate-900 font-bold">
                        Cryptocurrency — Bitcoin (BTC) / Tether (USDT)
                      </strong>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-950 text-[#C5A880] border border-[#C5A880]/50">
                        10% Instant Rebate
                      </span>
                    </div>
                    <span className="text-xs text-slate-600 block mt-0.5">
                      Save ${cryptoDiscountAmount.toLocaleString('en-AU')} AUD instantly. Dedicated deposit wallet address dispatched via email.
                    </span>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              </label>
            </div>
          </div>

          {/* Section 3: Submission Channel Choice */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-white font-serif">
                Choose Submission Channel
              </h2>
              <p className="text-xs text-slate-400">
                Both channels log your vehicle allocation and automatically send your confirmation email.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Channel A: Email Checkout */}
              <button
                type="button"
                onClick={() => handleOrderSubmission('email')}
                disabled={submitting}
                className="py-4 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Mail className="w-4 h-4 text-slate-950" />
                )}
                <span>Place Order via Email</span>
              </button>

              {/* Channel B: WhatsApp Checkout */}
              <button
                type="button"
                onClick={() => handleOrderSubmission('whatsapp')}
                disabled={submitting}
                className="py-4 px-5 rounded-xl bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                )}
                <span>Order via WhatsApp &rarr;</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Zero Card Processing Fees &bull; Direct Settlement</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#C5A880]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>5-Year LiFePO4 Warranty</span>
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-black text-slate-900 font-serif text-base">
                Order Summary ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
              </h3>
              <span className="text-xs text-slate-500 font-bold">Australian Fleet</span>
            </div>

            {/* Cart Items List */}
            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.slug} className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate font-serif">{item.name}</h4>
                    <span className="text-xs font-bold text-[#C5A880] block mt-0.5">
                      ${item.price.toLocaleString('en-AU')} AUD
                    </span>
                    
                    {/* Stepper Inside Checkout Summary */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 text-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="px-1.5 py-0.5 hover:bg-slate-200 text-slate-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-slate-900">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="px-1.5 py-0.5 hover:bg-slate-200 text-slate-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.slug)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <strong className="text-xs font-black text-slate-900 block font-serif">
                      ${(item.price * item.quantity).toLocaleString('en-AU')}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Fleet Subtotal:</span>
                <span className="font-bold text-slate-900">${subtotal.toLocaleString('en-AU')} AUD</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Tail-Lift Freight:</span>
                </span>
                <span className="font-bold text-emerald-700">
                  {shippingFee === 0 ? 'FREE Freight' : `$${shippingFee.toLocaleString('en-AU')} AUD`}
                </span>
              </div>

              {isCrypto && (
                <div className="flex justify-between text-[#C5A880] font-bold">
                  <span>10% Crypto Discount:</span>
                  <span>-${cryptoDiscountAmount.toLocaleString('en-AU')} AUD</span>
                </div>
              )}

              <div className="flex justify-between text-base font-black text-slate-950 pt-3 border-t border-slate-200 font-serif">
                <span>Total Driveaway:</span>
                <span className="text-[#C5A880]">${total.toLocaleString('en-AU')} AUD</span>
              </div>
              <span className="text-[10px] text-slate-400 block text-right">Includes 10% Australian GST</span>

              {/* Pay in 4 Highlight in Summary */}
              {isPayIn4 && (
                <div className="p-3.5 rounded-xl bg-emerald-950 text-white space-y-2 border border-emerald-500/50 shadow-sm mt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-300 uppercase tracking-wider">Plan Activated</span>
                    <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded font-black">
                      Pay in 4 Commercial
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1 border-t border-emerald-800/80">
                    <span className="font-bold text-emerald-200 text-xs">1st Installment (Due Today):</span>
                    <span className="font-mono font-black text-emerald-400 text-base">
                      ${payIn4Installment.toLocaleString('en-AU')} AUD
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>3 Month-End Splits:</span>
                    <span className="font-mono font-bold text-white">${payIn4Installment.toLocaleString('en-AU')} / month</span>
                  </div>
                  <span className="text-[9px] text-emerald-300/80 block leading-tight pt-0.5">
                    &bull; Initial payment locks machinery allocation. The rest is billed at consecutive month-ends.
                  </span>
                </div>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Pre-Delivery Road Compliance Inspection Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>5-Year Transferable LiFePO4 Lithium Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Direct Queensland Factory &amp; Technical Support</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
