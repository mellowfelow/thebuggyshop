// src/components/CartDrawer.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, Truck, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { SITE, CONTACT, SHOP } from '@/src/config/site';

export default function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, clearCart }) {
  const router = useRouter();

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isFreeShipping = SHOP.freeShippingThreshold > 0 && subtotal >= SHOP.freeShippingThreshold;
  const shippingFee = subtotal > 0 ? (isFreeShipping ? 0 : SHOP.shippingFee) : 0;
  const total = subtotal + shippingFee;

  const handleProceedToCheckout = () => {
    onClose();
    router.push('/checkout/');
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
          <div className="p-5 sm:p-6 bg-[#0B111E] text-white flex items-center justify-between border-b border-slate-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="text-base sm:text-lg font-black tracking-tight text-white leading-none font-serif">
                  ORDER DRAFT &amp; QUOTE
                </h2>
                <span className="text-xs text-slate-400 mt-1 block">
                  {totalCount} {totalCount === 1 ? 'vehicle selected' : 'vehicles selected'}
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

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
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
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-slate-950 hover:bg-slate-800 text-[#C5A880] font-black text-xs uppercase tracking-wider transition-all border border-[#C5A880]/40 shadow-sm active:scale-[0.98]"
                >
                  <span>Explore Golf Buggies for Sale</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.slug}
                    className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-[#C5A880]">
                            {item.category?.replace(/-/g, ' ')}
                          </span>
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-snug font-serif">
                            {item.name}
                          </h4>
                        </div>
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

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
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
              </div>
            )}
          </div>

          {/* Footer & Checkout Action Bar */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-slate-200 shadow-xl space-y-4">
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal ({totalCount} items):</span>
                  <span className="font-bold text-slate-900">${subtotal.toLocaleString('en-AU')} AUD</span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Tail-Lift Freight:</span>
                  </span>
                  <span className="font-bold text-emerald-700">
                    {shippingFee === 0 ? 'FREE Freight' : `$${shippingFee.toLocaleString('en-AU')} AUD`}
                  </span>
                </div>

                <div className="flex items-center justify-between text-base font-black text-slate-950 pt-2 border-t border-slate-200 font-serif">
                  <span>Estimated Total:</span>
                  <span className="text-[#C5A880]">${total.toLocaleString('en-AU')} AUD</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-4 px-6 rounded-xl bg-slate-950 hover:bg-[#C5A880] hover:text-slate-950 text-[#C5A880] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Proceed to Checkout &amp; PayID / EFT / Crypto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>10% Crypto Rebate Available on Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
