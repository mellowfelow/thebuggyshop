// src/components/Logo.jsx
// Bespoke Australian Luxury Golf & All-Terrain Cart Insignia & Wordmark
'use client';

import React from 'react';
import Link from 'next/link';

export default function Logo({ 
  variant = 'dark', 
  className = '', 
  showTagline = true, 
  iconOnly = false,
  href = '/',
  onClick = undefined
}) {
  const isDark = variant === 'dark'; // dark theme (e.g. for header / dark footer)

  const primaryText = isDark ? '#FFFFFF' : '#0F172A';
  const goldColor = '#C5A880';
  const subTextColor = isDark ? '#C5A880' : '#8A7045';
  const emblemBg = isDark ? '#1E293B' : '#0F172A';
  const emblemBorder = '#C5A880';

  const logoContent = (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none group cursor-pointer ${className}`}>
      {/* Luxury Cart Crest Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width="44"
          height="44"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm transition-transform group-hover:scale-105 duration-200"
          aria-hidden="true"
        >
          {/* Outer Shield / Diamond Frame */}
          <rect
            x="3"
            y="3"
            width="42"
            height="42"
            rx="12"
            fill={emblemBg}
            stroke={emblemBorder}
            strokeWidth="1.5"
          />

          {/* Inner Accent Inset Line */}
          <rect
            x="6.5"
            y="6.5"
            width="35"
            height="35"
            rx="9"
            fill="none"
            stroke={goldColor}
            strokeWidth="0.75"
            strokeOpacity="0.4"
          />

          {/* Stylized Luxury Golf Buggy Canopy & Wheels */}
          {/* Canopy Roof */}
          <path
            d="M13 19C13 18.2 13.8 17.5 14.8 17.5H33.2C34.2 17.5 35 18.2 35 19L33.5 20.5H14.5L13 19Z"
            fill={goldColor}
          />
          {/* Windshield & Rear Strut */}
          <path
            d="M16 20.5L17.5 26.5H31L32 20.5"
            stroke={goldColor}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Cart Body Chassis */}
          <path
            d="M14 26.5H34C35.2 26.5 36 27.5 35.5 28.6L34.2 31.2C33.8 32 33 32.5 32 32.5H16C15 32.5 14.2 32 13.8 31.2L12.5 28.6C12 27.5 12.8 26.5 14 26.5Z"
            fill={goldColor}
          />
          {/* Golf Flag on Rear */}
          <path
            d="M32 20.5V13.5M32 13.5L27 15.5L32 17.5V13.5Z"
            fill={goldColor}
            stroke={goldColor}
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Front & Rear Wheels */}
          <circle cx="17.5" cy="33.5" r="3.2" fill={isDark ? '#0F172A' : '#071610'} stroke={goldColor} strokeWidth="1.5" />
          <circle cx="17.5" cy="33.5" r="1.2" fill={goldColor} />
          <circle cx="30.5" cy="33.5" r="3.2" fill={isDark ? '#0F172A' : '#071610'} stroke={goldColor} strokeWidth="1.5" />
          <circle cx="30.5" cy="33.5" r="1.2" fill={goldColor} />

          {/* Small Star / Australian Est marker */}
          <circle cx="24" cy="11.5" r="1" fill={goldColor} />
        </svg>
      </div>

      {/* Wordmark Typography */}
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className="font-black tracking-tight text-base sm:text-lg uppercase font-serif transition-colors group-hover:text-[#C5A880]"
              style={{ color: primaryText, letterSpacing: '0.03em' }}
            >
              The Buggy Shop
            </span>
          </div>
          {showTagline && (
            <div className="flex items-center gap-1.5 pt-0.5">
              <span
                className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest leading-tight"
                style={{ color: subTextColor }}
              >
                TBS NO.2 PTY LTD • EST. 2004
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        onClick={onClick}
        className="inline-flex items-center focus:outline-hidden rounded-xl"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
