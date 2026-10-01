// src/components/AnnouncementBar.jsx
'use client';

import React, { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const slides = [
    `✨ 10% Instant Rebate on Direct Crypto (BTC/USDT) Settlement Across All Golf Buggy Orders`,
    `🚚 Australia-Wide Hydraulic Tail-Lift Delivery to Private Estates, Clubs & Farms`,
    `🛡️ 5-Year Domestic LiFePO4 Lithium Guarantee on All New Golf & All-Terrain Buggies`,
    `⛳ Premium Remote Control, Push & Lithium Golf Buggies for Sale with Turnkey Factory Warranty`,
    `📋 Turnkey Conditional Road Registration Compliance Kits for QLD, NSW, and VIC`
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-[#070B14] text-[#C5A880] text-xs font-semibold py-2 px-4 text-center border-b border-slate-800 overflow-hidden tracking-wide" id="announcement-bar">
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[20px]">
        <span className="transition-opacity duration-500 ease-in-out font-medium">
          {slides[currentSlide]}
        </span>
      </div>
    </div>
  );
}
