// src/components/AnnouncementBar.jsx
// The one and only announcement bar: an auto-rotating slider.
// Messages come from /api/announcements (edited by the client in /admin/announcements/);
// the defaults in src/config/announcements.js render first so the page never jumps.
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play, Phone } from 'lucide-react';
import { DEFAULT_ANNOUNCEMENTS } from '@/src/config/announcements';
import { CONTACT } from '@/src/config/core';

function Message({ slide }) {
  const cls = 'text-center text-[12px] sm:text-[13px] font-semibold leading-snug';
  if (!slide.href) return <span className={cls}>{slide.text}</span>;
  const external = /^https?:\/\//i.test(slide.href);
  return external ? (
    <a href={slide.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:text-white underline-offset-4 hover:underline`}>{slide.text}</a>
  ) : (
    <Link href={slide.href} className={`${cls} hover:text-white underline-offset-4 hover:underline`}>{slide.text}</Link>
  );
}

export default function AnnouncementBar() {
  const [data, setData] = useState(() => ({ seconds: DEFAULT_ANNOUNCEMENTS.seconds, slides: DEFAULT_ANNOUNCEMENTS.slides.filter((s) => s.active) }));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef(null);

  // pick up whatever the client has saved
  useEffect(() => {
    let live = true;
    fetch('/api/announcements/')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (live && j && Array.isArray(j.slides) && j.slides.length) {
          setData({ seconds: j.seconds || 5, slides: j.slides });
          setIndex(0);
        }
      })
      .catch(() => {});
    return () => { live = false; };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  const count = data.slides.length;
  const go = useCallback((n) => setIndex((i) => (((typeof n === 'function' ? n(i) : n) % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused || hover || reduced) return undefined;
    const t = setInterval(() => go((i) => i + 1), Math.max(3, data.seconds) * 1000);
    return () => clearInterval(t);
  }, [count, paused, hover, reduced, data.seconds, go]);

  if (!count) return null;
  const many = count > 1;

  return (
    <div
      className="bg-[#070B14] text-[#C5A880] border-b border-slate-800/80"
      id="announcement-bar"
      role="region"
      aria-roledescription="carousel"
      aria-label="Announcements"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null || !many) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) go((i) => i + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 px-2 sm:px-8 py-1.5 min-h-[40px]">
        {/* prev */}
        {many ? (
          <button type="button" onClick={() => go((i) => i - 1)} aria-label="Previous announcement" className="shrink-0 p-1.5 rounded-full text-[#C5A880]/70 hover:text-white hover:bg-slate-800 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
        ) : <span className="w-7 shrink-0" />}

        {/* slides: stacked in one grid cell so the bar never changes height */}
        <div className="flex-1 min-w-0 grid" aria-live={paused || hover ? 'polite' : 'off'}>
          {data.slides.map((s, i) => (
            <div
              key={s.id}
              className={`col-start-1 row-start-1 flex items-center justify-center px-1 transition-all duration-500 ease-in-out ${i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <Message slide={s} />
            </div>
          ))}
        </div>

        {/* phone (desktop only) */}
        <a
          href={`tel:${CONTACT.phone.replace(/\s+/g, '')}`}
          className="hidden lg:inline-flex shrink-0 items-center gap-1.5 text-[12px] font-bold text-[#C5A880] hover:text-white px-2"
          aria-label={`Call the sales desk on ${CONTACT.phoneDisplay}`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>{CONTACT.phoneDisplay}</span>
        </a>

        {many && (
          <>
            {/* dots (tablet and up) */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0" role="tablist" aria-label="Choose announcement">
              {data.slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show announcement ${i + 1}`}
                  onClick={() => go(i)}
                  className="group flex h-6 min-w-6 cursor-pointer items-center justify-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all ${i === index ? 'w-4 bg-[#C5A880]' : 'w-1.5 bg-[#C5A880]/50 group-hover:bg-[#C5A880]/80'}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Resume announcements' : 'Pause announcements'}
              aria-pressed={paused}
              className="shrink-0 p-1.5 rounded-full text-[#C5A880]/70 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button type="button" onClick={() => go((i) => i + 1)} aria-label="Next announcement" className="shrink-0 p-1.5 rounded-full text-[#C5A880]/70 hover:text-white hover:bg-slate-800 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
