// src/components/CartDrawer.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, MessageCircle, Mail, Truck, ArrowRight, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { SITE, CONTACT, SHOP } from '@/src/config/site';
import { waOrderLink } from '@/lib/whatsapp';
import { generateOrderRef } from '@/lib/orderStore';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) {
  const [notes, setNotes] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('pay-id'); // pay-id, crypto, bank-transfer
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const meetsMinOrder = SHOP.minOrder <= 0 || subtotal >= SHOP.minOrder;
  const isCrypto = selectedPayment === 'crypto';
  const cryptoDiscountAmount = isCrypto ? subtotal * (SHOP.cryptoDiscount / 100) : 0;
  const shipping = subtotal > 0 ? SHOP.shippingFee : 0;
  const total = subtotal - cryptoDiscountAmount + shipping;

  const handleCheckoutSubmit = async (channel = 'whatsapp') => {
    if (!customerEmail.trim() || !customerName.trim()) {
      alert('Please provide your name and email address for order confirmation & dispatch.');
      return;
    }

    setSubmitting(true);
    const orderRef = generateOrderRef();

    const orderData = {
      orderNumber: orderRef,
      orderRef,
      items: cart,
      subtotal,
      shipping,
      discount: cryptoDiscountAmount,
      total,
      paymentMethod:
        selectedPayment === 'crypto'
          ? 'Bitcoin (BTC) / Tether (USDT) (10% Rebate Applied)'
          : selectedPayment === 'pay-id'
          ? 'Australian PayID Instant Transfer'
          : 'Direct Bank Wire (EFT / Osko)',
      channel,
      customer: {
        name: customerName.trim(),
        email: customerEmail.trim(),
        phone: customerPhone.trim(),
        address: customerAddress.trim(),
        notes: notes.trim(),
      },
    };

    // If WhatsApp channel, open WhatsApp synchronously
    if (channel === 'whatsapp') {
      const waUrl = waOrderLink(orderData, orderData.customer);
      window.open(waUrl, '_blank');
    }

    try {
      // POST to /api/contact to log in orderStore and unconditionally trigger customer confirmation email
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'order',
          ...orderData,
        }),
      });

      if (res.ok) {
        setOrderSuccess(orderRef);
        clearCart();
      } else {
        alert('Order notification could not be recorded, but your WhatsApp request was opened.');
      }
    } catch (err) {
      console.error('Order save error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
        aria-hidden="true" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F9FA] shadow-2xl flex flex-col justify-between border-l border-slate-200">
          {/* Header */}
          <div className="p-6 bg-[#0B111E] text-white flex items-center justify-between border-b border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold text-[#C5A880]">🛒</span>
              <div>
                <h2 id="cart-drawer-title" className="text-base sm:text-lg font-black tracking-tight text-white leading-none font-serif">
                  ORDER DRAFT &amp; QUOTE
                </h2>
                <span className="text-xs text-slate-400 mt-1 block">
                  {cart.length} {cart.length === 1 ? 'vehicle selected' : 'vehicles selected'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen if Order Placed */}
          {orderSuccess ? (
            <div className="flex-1 p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">Order Logged Successfully!</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                Your order reference is <strong className="font-mono text-slate-900">{orderSuccess}</strong>. A confirmation email has been dispatched to your inbox.
              </p>
              <div className="pt-4 flex flex-col gap-2 w-full">
                <a
                  href={`/order/payment-details/?id=${orderSuccess}`}
                  className="w-full py-3 bg-[#C5A880] text-slate-950 font-bold text-xs rounded-xl text-center"
                >
                  View Payment Details &rarr;
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 bg-slate-900 text-white font-semibold text-xs rounded-xl"
                >
                  Close &amp; Return to Shop
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-200 flex items-center justify-center mx-auto text-2xl text-slate-600 border border-slate-300">
                      🏌️
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg font-serif">Your Order Draft is Empty</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                      Browse our luxury golf buggies for sale, all-terrain utility carts, and remote trolleys to configure your draft.
                    </p>
                    <Link
                      href="/shop/"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#C5A880] font-black text-xs uppercase tracking-wider transition-all border border-[#C5A880]/40 shadow-sm active:scale-[0.98]"
                    >
                      <span>Explore Golf Buggies for Sale</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.slug}
                        className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#C5A880]">
                              {item.category?.replace(/-/g, ' ')}
                            </span>
                            <h4 className="font-extrabold text-sm text-slate-900 leading-snug font-serif">
                              {item.name}
                            </h4>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.slug)}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            aria-label={`Remove ${item.name} from draft`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl p-1 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-900 hover:bg-white rounded-lg font-bold cursor-pointer transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-black w-5 text-center text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-slate-900 hover:bg-white rounded-lg font-bold cursor-pointer transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-sm font-black text-slate-900 font-serif">
                              ${(item.price * item.quantity).toLocaleString('en-AU')} <span className="text-[10px] text-slate-500 font-sans">AUD</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Customer Information Form (Mandatory Email on both channels) */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3">
                      <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                        Customer &amp; Freight Destination
                      </span>
                      <div className="space-y-2 text-xs">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name *"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#C5A880]"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Your Email Address (For Order Confirmation) *"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#C5A880]"
                        />
                        <input
                          type="tel"
                          placeholder="Phone / WhatsApp Number *"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#C5A880]"
                        />
                        <input
                          type="text"
                          placeholder="Delivery Property Address (State & Postcode)"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#C5A880]"
                        />
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Delivery Notes / Property Gate Access..."
                          rows={2}
                          className="w-full p-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-[#C5A880] resize-none"
                        />
                      </div>
                    </div>

                    {/* Settlement Method Selector */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-bold text-slate-900 block">
                        Select Preferred Settlement Channel:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPayment('pay-id')}
                          className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all cursor-pointer ${
                            selectedPayment === 'pay-id'
                              ? 'bg-slate-900 text-[#C5A880] border-[#C5A880]/40 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          PayID
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedPayment('bank-transfer')}
                          className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all cursor-pointer ${
                            selectedPayment === 'bank-transfer'
                              ? 'bg-slate-900 text-[#C5A880] border-[#C5A880]/40 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Bank Wire
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedPayment('crypto')}
                          className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all cursor-pointer ${
                            selectedPayment === 'crypto'
                              ? 'bg-[#C5A880] text-slate-950 border-[#C5A880] shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Crypto (10% Off)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer & Checkout Area */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-slate-200 space-y-4 shadow-lg">
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Vehicles Subtotal:</span>
                      <span className="font-black text-slate-900 font-serif">${subtotal.toLocaleString('en-AU')} AUD</span>
                    </div>

                    {isCrypto && (
                      <div className="flex justify-between text-emerald-600 font-black">
                        <span>10% Crypto Rebate (BTC/USDT):</span>
                        <span>-${cryptoDiscountAmount.toLocaleString('en-AU')} AUD</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Hydraulic Freight (Nationwide):</span>
                      </span>
                      <span className="font-bold text-slate-900">${shipping.toLocaleString('en-AU')} AUD</span>
                    </div>

                    <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>Estimated Total (inc. GST):</span>
                      <span className="text-base text-slate-900 font-black font-serif">${total.toLocaleString('en-AU')} AUD</span>
                    </div>
                  </div>

                  {/* Minimum Order Warning */}
                  {!meetsMinOrder && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2">
                      <span className="text-sm">⚠️</span>
                      <div>
                        <span className="font-bold">Minimum Order: ${SHOP.minOrder} AUD</span>
                        <p className="text-[11px] text-amber-800 mt-0.5">
                          Please add ${(SHOP.minOrder - subtotal).toLocaleString('en-AU')} AUD more to fulfill the minimum order threshold.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Checkout Triggers */}
                  <div className="space-y-2 pt-1">
                    <button
                      type="button"
                      disabled={!meetsMinOrder || submitting}
                      onClick={() => handleCheckoutSubmit('whatsapp')}
                      className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                        meetsMinOrder
                          ? 'bg-[#C5A880] hover:bg-[#D4B27C] text-slate-950 cursor-pointer active:scale-[0.98]'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                      id="cart-whatsapp-checkout-btn"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <MessageCircle className="w-4 h-4" />
                      )}
                      <span>{meetsMinOrder ? 'Submit Order via WhatsApp' : `Min Order $${SHOP.minOrder} AUD Required`}</span>
                    </button>

                    <button
                      type="button"
                      disabled={!meetsMinOrder || submitting}
                      onClick={() => handleCheckoutSubmit('email')}
                      className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-center border border-slate-700 shadow-xs cursor-pointer"
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Mail className="w-4 h-4 text-[#C5A880]" />
                      )}
                      <span>Place Order &amp; Send Pro-Forma</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-center text-slate-400 leading-tight">
                    Every order unconditionally sends an official confirmation email. Our Queensland team verifies inventory before final settlement.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
