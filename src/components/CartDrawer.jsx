// src/components/CartDrawer.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, MessageCircle, Mail, Truck, ArrowRight, Sparkles } from 'lucide-react';
import { SITE, CONTACT, SHOP } from '@/src/config/site';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) {
  const [notes, setNotes] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('pay-id'); // pay-id, crypto, bank-transfer

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const meetsMinOrder = SHOP.minOrder <= 0 || subtotal >= SHOP.minOrder;
  const isCrypto = selectedPayment === 'crypto';
  const cryptoDiscountAmount = isCrypto ? subtotal * (SHOP.cryptoDiscount / 100) : 0;
  const shipping = subtotal > 0 ? SHOP.shippingFee : 0;
  const total = subtotal - cryptoDiscountAmount + shipping;

  const generateWhatsAppMessage = () => {
    let msg = `*NEW ORDER DRAFT — THE BUGGY SHOP (AUSTRALIA)*\n`;
    msg += `------------------------------------\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString('en-AU')} AUD\n`;
    });
    msg += `------------------------------------\n`;
    msg += `Subtotal: $${subtotal.toLocaleString('en-AU')} AUD\n`;
    if (isCrypto) {
      msg += `Crypto/PayID 10% Rebate: -$${cryptoDiscountAmount.toLocaleString('en-AU')} AUD\n`;
    }
    msg += `Tail-Lift Freight: $${shipping.toLocaleString('en-AU')} AUD\n`;
    msg += `*ESTIMATED TOTAL: $${total.toLocaleString('en-AU')} AUD (inc. GST)*\n\n`;
    msg += `*Preferred Settlement:* ${selectedPayment === 'crypto' ? 'Bitcoin / USDT (10% Off)' : selectedPayment === 'pay-id' ? 'PayID Direct' : 'Direct Bank Wire'}\n`;
    if (notes.trim()) {
      msg += `*Delivery Notes / Property Access:* ${notes.trim()}\n`;
    }
    msg += `\nPlease confirm golf buggy stock availability and regional dispatch timing to my property.`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppCheckout = () => {
    const waUrl = `https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-drawer-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
        aria-hidden="true" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F4F7F5] shadow-2xl flex flex-col justify-between border-l border-[#D5DFD9]">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#0E2A1E] to-[#163E2D] text-white flex items-center justify-between border-b border-[#183B2B] shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold text-[#C5A265]">🛒</span>
              <div>
                <h2 id="cart-drawer-title" className="text-base sm:text-lg font-black tracking-tight text-white leading-none font-serif">
                  ORDER DRAFT & QUOTE
                </h2>
                <span className="text-xs text-[#A6BCB0] mt-1 block">
                  {cart.length} {cart.length === 1 ? 'buggy selected' : 'buggies selected'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#A6BCB0] hover:text-white rounded-xl hover:bg-[#0E2A1E] transition-colors cursor-pointer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#E8ECE9] flex items-center justify-center mx-auto text-2xl text-[#2A4D3B] border border-[#D5DFD9]">
                  🏌️
                </div>
                <h3 className="font-extrabold text-[#0E2A1E] text-lg font-serif">Your Order Draft is Empty</h3>
                <p className="text-xs text-[#4A5D53] max-w-xs mx-auto leading-relaxed">
                  Browse our luxury golf buggies for sale, all-terrain utility carts, and remote trolleys to configure your draft.
                </p>
                <Link
                  href="/shop/"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-[#0E2A1E] hover:bg-[#163E2D] text-[#C5A265] font-black text-xs uppercase tracking-wider transition-all border border-[#C5A265]/40 shadow-sm active:scale-[0.98]"
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
                    className="p-4 bg-gradient-to-b from-white to-[#F9FBFA] rounded-2xl border border-[#D5DFD9] shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#8A7045]">
                          {item.category?.replace(/-/g, ' ')}
                        </span>
                        <h4 className="font-extrabold text-sm text-[#0E2A1E] leading-snug font-serif">
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

                    <div className="flex items-center justify-between pt-1 border-t border-[#E8ECE9]">
                      <div className="flex items-center gap-2 bg-[#F0F3F1] border border-[#CAD5CE] rounded-xl p-1 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#0E2A1E] hover:bg-white rounded-lg font-bold cursor-pointer transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-black w-5 text-center text-[#0E2A1E]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#0E2A1E] hover:bg-white rounded-lg font-bold cursor-pointer transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-[#0E2A1E] font-serif">
                          ${(item.price * item.quantity).toLocaleString('en-AU')} <span className="text-[10px] text-[#60756B] font-sans">AUD</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Delivery Notes */}
                <div className="space-y-1.5 pt-2">
                  <label htmlFor="cart-delivery-notes" className="text-xs font-bold text-[#0E2A1E] block">
                    Property Gate / Regional Delivery Notes
                  </label>
                  <textarea
                    id="cart-delivery-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Please arrange tail-lift freight unload at property gate, QLD..."
                    rows={2}
                    className="w-full text-xs p-3 rounded-xl border border-[#CAD5CE] bg-white focus:outline-hidden focus:ring-1 focus:ring-[#C5A265] resize-none text-[#0E2A1E] shadow-2xs"
                  />
                </div>

                {/* Settlement Method Selector */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-[#0E2A1E] block">
                    Select Preferred Settlement Channel:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('pay-id')}
                      className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all cursor-pointer ${
                        selectedPayment === 'pay-id'
                          ? 'bg-[#0E2A1E] text-[#C5A265] border-[#C5A265]/40 shadow-xs'
                          : 'bg-white text-[#2A4D3B] border-[#CAD5CE] hover:bg-[#E8ECE9]'
                      }`}
                    >
                      PayID
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('bank-transfer')}
                      className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all cursor-pointer ${
                        selectedPayment === 'bank-transfer'
                          ? 'bg-[#0E2A1E] text-[#C5A265] border-[#C5A265]/40 shadow-xs'
                          : 'bg-white text-[#2A4D3B] border-[#CAD5CE] hover:bg-[#E8ECE9]'
                      }`}
                    >
                      Bank Wire
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('crypto')}
                      className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all cursor-pointer ${
                        selectedPayment === 'crypto'
                          ? 'bg-[#C5A265] text-[#0E2A1E] border-[#C5A265] shadow-xs'
                          : 'bg-white text-[#2A4D3B] border-[#CAD5CE] hover:bg-[#E8ECE9]'
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
            <div className="p-6 bg-gradient-to-b from-[#FCFDFB] to-[#F1F6F3] border-t border-[#D5DFD9] space-y-4 shadow-lg">
              <div className="space-y-1.5 text-xs text-[#4A5D53]">
                <div className="flex justify-between">
                  <span>Vehicles Subtotal:</span>
                  <span className="font-black text-[#0E2A1E] font-serif">${subtotal.toLocaleString('en-AU')} AUD</span>
                </div>

                {isCrypto && (
                  <div className="flex justify-between text-[#8A7045] font-black">
                    <span>10% Crypto / PayID Rebate:</span>
                    <span>-${cryptoDiscountAmount.toLocaleString('en-AU')} AUD</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#C5A265]" />
                    <span>Hydraulic Freight (Nationwide):</span>
                  </span>
                  <span className="font-bold text-[#0E2A1E]">${shipping.toLocaleString('en-AU')} AUD</span>
                </div>

                <div className="flex justify-between text-sm font-black text-[#0E2A1E] pt-2 border-t border-[#D5DFD9]">
                  <span>Estimated Total (inc. GST):</span>
                  <span className="text-base text-[#0E2A1E] font-black font-serif">${total.toLocaleString('en-AU')} AUD</span>
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
                  onClick={meetsMinOrder ? handleWhatsAppCheckout : undefined}
                  disabled={!meetsMinOrder}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    meetsMinOrder
                      ? 'bg-gradient-to-r from-[#C5A265] to-[#D4B27C] hover:from-[#D4B27C] hover:to-[#E5CCA0] text-[#0E2A1E] cursor-pointer active:scale-[0.98] border border-[#C5A265]'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed border border-stone-300'
                  }`}
                  id="cart-whatsapp-checkout-btn"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{meetsMinOrder ? 'Submit Order via WhatsApp' : `Min Order $${SHOP.minOrder} AUD Required`}</span>
                </button>

                <Link
                  href="/contact/"
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-xl bg-[#0E2A1E] hover:bg-[#163E2D] text-[#C5A265] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all text-center border border-[#C5A265]/40 shadow-xs"
                >
                  <Mail className="w-4 h-4" />
                  <span>Request Official Commercial Pro-Forma</span>
                </Link>
              </div>

              <p className="text-[10px] text-center text-[#60756B] leading-tight">
                Human-in-the-loop ordering. An Australian buggy specialist confirms VIN, options, and dispatch timing before invoice completion.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
