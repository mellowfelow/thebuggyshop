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
  CreditCard, Sparkles } from 'lucide-react';
import { useStore } from '@/src/components/ClientStoreProvider';
import { SITE, CONTACT, REPLY } from '@/src/config/site';
import { waOrderLink } from '@/lib/whatsapp';
import { generateOrderRef, money } from '@/lib/order';
import { computeTotals } from '@/lib/bundle';
import { BundleNote } from '@/src/components/BundleOffer';
import Image from 'next/image';

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
  const [selectedPayment, setSelectedPayment] = useState('bank-transfer'); // 3 payment rails: 'bank-transfer' | 'pay-id' | 'crypto'
  const [paymentPlan, setPaymentPlan] = useState('full'); // 'full' | 'pay-in-4'
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isCrypto = selectedPayment === 'crypto';
  const isPayIn4 = paymentPlan === 'pay-in-4';
  // one shared calculation (lib/bundle.js): bundle discount, then crypto rebate, then freight. The server repeats it.
  const totals = computeTotals(cart, { isCrypto });
  const { subtotal, bundleDiscount, cryptoDiscount: cryptoDiscountAmount, shipping: shippingFee, total } = totals;

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

    let railLabel = 'Direct Bank Transfer (Osko / Fast EFT)';
    let paymentMethodId = 'bank-transfer';

    if (selectedPayment === 'crypto') {
      railLabel = 'Bitcoin (BTC) / Tether (USDT) (10% Instant Rebate Applied)';
      paymentMethodId = 'crypto-BTC';
    } else if (selectedPayment === 'pay-id') {
      railLabel = 'Australian PayID Instant Settlement';
      paymentMethodId = 'pay-id';
    }

    const paymentMethodLabel = isPayIn4
      ? `${railLabel} [Commercial Pay in 4 Plan: $${payIn4Installment.toLocaleString('en-AU')} Due Today · Remaining 3 Monthly at Month-End]`
      : `${railLabel} [Pay in Full: $${total.toLocaleString('en-AU')}]`;

    const orderData = {
      orderNumber: orderRef,
      orderRef,
      items: cart,
      subtotal,
      shipping: shippingFee,
      discount: cryptoDiscountAmount,
      bundleDiscount,
      total,
      paymentMethod: paymentMethodLabel,
      paymentMethodId,
      paymentRail: selectedPayment,
      paymentSchedule: isPayIn4 ? 'pay-in-4' : 'full',
      isPayIn4,
      installmentPlan: isPayIn4 ? {
        type: 'pay-in-4',
        rail: selectedPayment,
        railLabel,
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

          {/* Section 2: Preferred Settlement Method (The 3 Rails) & Payment Schedule Choice */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-[#C5A880] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 font-serif">
                  Select Settlement Method
                </h2>
                <p className="text-xs text-slate-500">
                  Choose your preferred payment method from the 3 official settlement options:
                </p>
              </div>
            </div>

            {/* The 3 Settlement Methods */}
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
                      Instant mobile &amp; email clearing. Zero waiting period for faster warehouse release.
                    </span>
                  </div>
                </div>
                <Zap className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
              </label>

              {/* Option 3: Cryptocurrency (10% Rebate) */}
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

            {/* Payment Schedule Selector: Pay in Full vs Pay in 4 */}
            <div className="pt-5 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-[#C5A880]" />
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    Choose Payment Schedule
                  </h3>
                  <p className="text-xs text-slate-500">
                    Settle 100% upfront or split into 4 equal monthly payments (0% interest):
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Schedule Option A: Pay in Full */}
                <label 
                  className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                    paymentPlan === 'full'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment_plan"
                      value="full"
                      checked={paymentPlan === 'full'}
                      onChange={() => setPaymentPlan('full')}
                      className="mt-1 text-[#C5A880] focus:ring-[#C5A880]"
                    />
                    <div>
                      <strong className="text-sm block font-bold">
                        Pay in Full (100% Upfront)
                      </strong>
                      <span className={`text-xs block mt-1 ${paymentPlan === 'full' ? 'text-slate-300' : 'text-slate-600'}`}>
                        Standard driveaway settlement via {
                          selectedPayment === 'bank-transfer' ? 'Direct Bank Transfer' :
                          selectedPayment === 'pay-id' ? 'Australian PayID' :
                          'Cryptocurrency (10% Rebate)'
                        }.
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/40 flex items-baseline justify-between">
                    <span className={`text-[11px] font-bold ${paymentPlan === 'full' ? 'text-slate-400' : 'text-slate-500'}`}>
                      Due Today:
                    </span>
                    <span className={`font-mono font-black text-sm ${paymentPlan === 'full' ? 'text-[#C5A880]' : 'text-slate-950'}`}>
                      ${total.toLocaleString('en-AU')} AUD
                    </span>
                  </div>
                </label>

                {/* Schedule Option B: Pay in 4 */}
                <label 
                  className={`p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between transition-all ${
                    paymentPlan === 'pay-in-4'
                      ? 'border-emerald-600 bg-[#071810] text-white shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment_plan"
                      value="pay-in-4"
                      checked={paymentPlan === 'pay-in-4'}
                      onChange={() => setPaymentPlan('pay-in-4')}
                      className="mt-1 text-emerald-500 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <strong className="text-sm font-bold">
                          Commercial Pay in 4
                        </strong>
                        <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50">
                          0% Interest &bull; Zero Fees
                        </span>
                      </div>
                      <span className={`text-xs block mt-1 ${paymentPlan === 'pay-in-4' ? 'text-emerald-200/80' : 'text-slate-600'}`}>
                        Pay 1st split today via {
                          selectedPayment === 'bank-transfer' ? 'Bank Transfer' :
                          selectedPayment === 'pay-id' ? 'PayID' :
                          'Crypto'
                        }. Remaining 3 splits billed monthly.
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200/40 flex items-baseline justify-between">
                    <span className={`text-[11px] font-bold ${paymentPlan === 'pay-in-4' ? 'text-emerald-300' : 'text-slate-500'}`}>
                      1st Split Due Today:
                    </span>
                    <span className={`font-mono font-black text-sm ${paymentPlan === 'pay-in-4' ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      ${payIn4Installment.toLocaleString('en-AU')} AUD
                    </span>
                  </div>
                </label>
              </div>

              {/* Pay in 4 Smart Automated Installment Breakdown (Shown when Pay in 4 selected) */}
              {isPayIn4 && (
                <div className="p-4 rounded-xl bg-slate-900 text-white border border-emerald-500/40 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-300 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Automated 4-Month Commercial Split Schedule</span>
                    </span>
                    <span className="font-mono font-bold text-[#C5A880] text-xs">
                      4 &times; ${payIn4Installment.toLocaleString('en-AU')} AUD
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* 1st Installment Due Today */}
                    <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-500/60 text-emerald-100">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          1st Split (Due Today)
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      </div>
                      <div className="font-mono font-black text-lg text-emerald-300 mt-0.5">
                        ${payIn4Installment.toLocaleString('en-AU')} AUD
                      </div>
                      <span className="text-[10px] text-emerald-200/80 block mt-0.5 font-medium">
                        Payable via {
                          selectedPayment === 'bank-transfer' ? 'Direct Bank Transfer' :
                          selectedPayment === 'pay-id' ? 'PayID Instant Settlement' :
                          'Cryptocurrency (10% Rebate)'
                        }. Reserves machine allocation.
                      </span>
                    </div>

                    {/* Remaining 3 Splits at Month-End */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        3 Consecutive Month-End Splits
                      </span>
                      <div className="flex justify-between text-[11px] pt-0.5 border-b border-slate-800 pb-0.5">
                        <span className="text-slate-400">Split 2 ({monthEndDates[0]}):</span>
                        <span className="font-mono font-bold text-white">${payIn4Installment.toLocaleString('en-AU')} AUD</span>
                      </div>
                      <div className="flex justify-between text-[11px] border-b border-slate-800 pb-0.5">
                        <span className="text-slate-400">Split 3 ({monthEndDates[1]}):</span>
                        <span className="font-mono font-bold text-white">${payIn4Installment.toLocaleString('en-AU')} AUD</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Split 4 ({monthEndDates[2]}):</span>
                        <span className="font-mono font-bold text-white">${payIn4FinalInstallment.toLocaleString('en-AU')} AUD</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 italic">
                    *All 4 splits settle via your chosen payment rail ({
                      selectedPayment === 'bank-transfer' ? 'Direct Bank Transfer' :
                      selectedPayment === 'pay-id' ? 'Australian PayID' :
                      'Cryptocurrency'
                    }). Zero interest, zero financing surcharges.
                  </p>
                </div>
              )}
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
                    <Image src={item.image} alt={item.name} width={128} height={128} sizes="64px" className="w-full h-full object-cover" />
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

            <BundleNote totals={totals} />

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Fleet Subtotal:</span>
                <span className="font-bold text-slate-900">${subtotal.toLocaleString('en-AU')} AUD</span>
              </div>

              {bundleDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Bundle discount ({totals.percent}% off accessories &amp; parts):</span>
                  <span>-${bundleDiscount.toLocaleString('en-AU')} AUD</span>
                </div>
              )}

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

              {/* Payment Schedule Status in Summary */}
              {isPayIn4 ? (
                <div className="p-3.5 rounded-xl bg-emerald-950 text-white space-y-2 border border-emerald-500/50 shadow-sm mt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-300 uppercase tracking-wider">Schedule Activated</span>
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
                    &bull; Settled via {
                      selectedPayment === 'bank-transfer' ? 'Bank Transfer' :
                      selectedPayment === 'pay-id' ? 'PayID' :
                      'Cryptocurrency'
                    }. 1st split locks allocation; 3 remaining splits billed at month-ends.
                  </span>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-1.5 border border-slate-800 shadow-xs mt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#C5A880] uppercase tracking-wider">Settlement Terms</span>
                    <span className="text-[10px] bg-slate-800 text-slate-200 px-2 py-0.5 rounded font-bold">
                      Pay in Full
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1 border-t border-slate-800">
                    <span className="font-bold text-slate-200 text-xs">Amount Due Today:</span>
                    <span className="font-mono font-black text-[#C5A880] text-base">
                      ${total.toLocaleString('en-AU')} AUD
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 block leading-tight">
                    &bull; 100% upfront settlement via {
                      selectedPayment === 'bank-transfer' ? 'Direct Bank Transfer' :
                      selectedPayment === 'pay-id' ? 'PayID Instant Transfer' :
                      'Cryptocurrency (10% Rebate)'
                    }.
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
