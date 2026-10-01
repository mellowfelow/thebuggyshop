'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, Zap, FileText, CheckCircle2, MessageCircle } from 'lucide-react';
import { PRODUCTS, CONTACT, SHOP } from '@/src/config/site';

export default function FinanceCalculatorClient() {
  const [vehiclePrice, setVehiclePrice] = useState(18990);
  const [depositAmount, setDepositAmount] = useState(2000);
  const [loanTermMonths, setLoanTermMonths] = useState(36); // 12, 24, 36, 48, 60
  const [interestRate, setInterestRate] = useState(7.9); // Commercial chattel mortgage avg

  // Pay in 4 calculation
  const payIn4Installment = Math.round(vehiclePrice / 4);

  // Crypto calculation (10% rebate)
  const cryptoSavings = Math.round(vehiclePrice * (SHOP.cryptoDiscount / 100));
  const cryptoTotal = vehiclePrice - cryptoSavings;

  // Commercial loan calculation
  const principal = Math.max(0, vehiclePrice - depositAmount);
  const monthlyRate = interestRate / 100 / 12;
  const monthlyRepayment =
    monthlyRate > 0 && loanTermMonths > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
      : principal / loanTermMonths;

  const weeklyRepayment = (monthlyRepayment * 12) / 52;
  const fortnightlyRepayment = (monthlyRepayment * 12) / 26;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Calculator Controls */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-3xl p-6 sm:p-8 border border-[#D5DFD9] shadow-md space-y-6">
          <div className="border-b border-[#D5DFD9] pb-4">
            <h2 className="text-xl font-black text-[#0E2A1E] tracking-tight font-serif">
              Adjust Golf Buggy Settlement Parameters
            </h2>
            <p className="text-xs text-[#4A5D53] mt-1">
              Select a popular golf buggy preset or input a custom asset value.
            </p>
          </div>

          {/* Quick Vehicle Presets */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0E2A1E]">Select Buggy Preset:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRODUCTS.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setVehiclePrice(p.price)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                    vehiclePrice === p.price
                      ? 'bg-[#0E2A1E] text-[#C5A265] border-[#C5A265]/40 shadow-xs'
                      : 'bg-white text-[#2A4D3B] hover:bg-[#EBF1ED] border-[#CAD5CE]'
                  }`}
                >
                  <div className="font-bold truncate">{p.name.split(' ')[1] || p.name}</div>
                  <div className="text-[11px] opacity-90">${p.price.toLocaleString('en-AU')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Price Slider */}
          <div className="space-y-2 bg-white p-4 rounded-2xl border border-[#D5DFD9] shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#0E2A1E]">Vehicle Value (inc. GST):</span>
              <span className="font-black text-base text-[#8A7045] font-serif">
                ${vehiclePrice.toLocaleString('en-AU')} AUD
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="35000"
              step="500"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full accent-[#0E2A1E] cursor-pointer"
            />
          </div>

          {/* Commercial Loan Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#D5DFD9]">
            {/* Deposit */}
            <div className="space-y-2 bg-white p-4 rounded-2xl border border-[#D5DFD9] shadow-2xs">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#0E2A1E]">Deposit:</span>
                <span className="font-black text-[#8A7045]">${depositAmount.toLocaleString('en-AU')}</span>
              </div>
              <input
                type="range"
                min="0"
                max={vehiclePrice * 0.5}
                step="500"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full accent-[#0E2A1E] cursor-pointer"
              />
            </div>

            {/* Term */}
            <div className="space-y-2 bg-white p-4 rounded-2xl border border-[#D5DFD9] shadow-2xs">
              <span className="font-bold text-xs text-[#0E2A1E] block">Finance Term:</span>
              <div className="grid grid-cols-4 gap-1.5">
                {[12, 24, 36, 48].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTermMonths(term)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      loanTermMonths === term
                        ? 'bg-[#0E2A1E] text-[#C5A265] shadow-xs'
                        : 'bg-[#F0F3F1] text-[#2A4D3B] hover:bg-[#E2E8E4]'
                    }`}
                  >
                    {term / 12} Yr
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Repayment Output Cards */}
        <div className="lg:col-span-5 space-y-4">
          {/* OPTION 1: PAY IN 4 BREAKDOWN */}
          <div className="bg-gradient-to-br from-[#0E2A1E] to-[#071810] text-white rounded-3xl p-6 border border-[#C5A265]/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#C5A265]">
                Option 1: 4 Commercial Split Payments
              </span>
              <span className="text-[10px] bg-[#071810] text-[#C5A265] px-2.5 py-0.5 rounded-full border border-[#C5A265]/40 font-bold">
                Zero Surcharge
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black text-white tracking-tight font-serif">
                ${payIn4Installment.toLocaleString('en-AU')}{' '}
                <span className="text-xs font-normal text-[#D3DFD8]">/ instalment</span>
              </div>
              <p className="text-xs text-[#D3DFD8]">
                4 equal installments of ${payIn4Installment.toLocaleString('en-AU')} AUD covering full machine drive-away price.
              </p>
            </div>

            <div className="text-[11px] text-[#A6BCB0] space-y-1 pt-2 border-t border-[#183B2B]">
              <div>• 1st Payment: Today upon order confirmation</div>
              <div>• 2nd, 3rd, 4th Payments: Scheduled fortnightly or monthly</div>
            </div>
          </div>

          {/* OPTION 2: INSTANT CRYPTO 10% DISCOUNT */}
          <div className="bg-gradient-to-br from-[#163E2D] to-[#0E2A1E] text-white rounded-3xl p-6 border border-[#C5A265]/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#C5A265] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#C5A265]" /> Option 2: 10% Instant Crypto Rebate
              </span>
              <span className="text-[10px] bg-[#0E2A1E] text-[#C5A265] px-2.5 py-0.5 rounded-full font-bold border border-[#C5A265]/30">
                Instant Saving
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl font-black text-[#C5A265] tracking-tight font-serif">
                ${cryptoTotal.toLocaleString('en-AU')}{' '}
                <span className="text-xs font-normal text-[#D3DFD8]">AUD equivalent</span>
              </div>
              <p className="text-xs text-[#D3DFD8]">
                Save an instant <strong>${cryptoSavings.toLocaleString('en-AU')} AUD</strong> when settling via Bitcoin (BTC) or Tether (USDT).
              </p>
            </div>
          </div>

          {/* OPTION 3: COMMERCIAL CHATTEL LEASE ESTIMATE */}
          <div className="bg-gradient-to-b from-[#FCFDFB] to-[#F2F6F3] rounded-3xl p-6 border border-[#D5DFD9] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#0E2A1E]">
                Option 3: Commercial Equipment Lease
              </span>
              <span className="text-[10px] bg-[#EBF1ED] text-[#2A4D3B] px-2.5 py-0.5 rounded-full font-bold border border-[#D5DFD9]">
                {loanTermMonths} Months @ {interestRate}% p.a.
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-[#D5DFD9] shadow-2xs">
                <span className="text-[10px] font-bold text-[#4A5D53] uppercase block">Weekly Est.</span>
                <span className="text-xl font-black text-[#0E2A1E] font-serif">
                  ${Math.round(weeklyRepayment).toLocaleString('en-AU')}
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D5DFD9] shadow-2xs">
                <span className="text-[10px] font-bold text-[#4A5D53] uppercase block">Monthly Est.</span>
                <span className="text-xl font-black text-[#0E2A1E] font-serif">
                  ${Math.round(monthlyRepayment).toLocaleString('en-AU')}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#4A5D53] leading-relaxed">
              *Estimates indicative for Australian registered businesses (ABN). Subject to formal lender approval.
            </p>

            <a
              href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}?text=${encodeURIComponent(
                `G'day! I would like to get a formal finance quote for golf buggy amount $${vehiclePrice.toLocaleString(
                  'en-AU'
                )} AUD over ${loanTermMonths} months.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#071810] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp Finance Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
