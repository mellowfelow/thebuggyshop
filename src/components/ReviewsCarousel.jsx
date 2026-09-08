// src/components/ReviewsCarousel.jsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Quote, 
  Search, 
  X, 
  Sparkles
} from 'lucide-react';
import { REVIEWS, REVIEW_STATS } from '@/src/config/site';

export default function ReviewsCarousel() {
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedRating, setSelectedRating] = useState('ALL');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // Filter reviews based on state and star filter
  const filteredReviews = useMemo(() => {
    return REVIEWS.filter((item) => {
      const matchState = selectedState === 'ALL' || item.state === selectedState;
      const matchRating = selectedRating === 'ALL' || item.rating === Number(selectedRating);
      return matchState && matchRating;
    });
  }, [selectedState, selectedRating]);

  // Modal search filtering
  const modalFilteredReviews = useMemo(() => {
    return REVIEWS.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchQuery = !query || 
        item.name.toLowerCase().includes(query) || 
        item.location.toLowerCase().includes(query) || 
        item.review.toLowerCase().includes(query) ||
        item.date.toLowerCase().includes(query);
      const matchState = selectedState === 'ALL' || item.state === selectedState;
      const matchRating = selectedRating === 'ALL' || item.rating === Number(selectedRating);
      return matchQuery && matchState && matchRating;
    });
  }, [searchQuery, selectedState, selectedRating]);

  const safeIndex = currentIndex >= filteredReviews.length ? 0 : currentIndex;

  const handleStateFilterChange = (st) => {
    setSelectedState(st);
    setCurrentIndex(0);
  };

  const handleRatingFilterChange = (rating) => {
    setSelectedRating(rating);
    setCurrentIndex(0);
  };

  // Auto-play carousel
  useEffect(() => {
    if (isPaused || filteredReviews.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= filteredReviews.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, filteredReviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? filteredReviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= filteredReviews.length - 1 ? 0 : prev + 1));
  };

  // Touch swipe support - leads smoothly to the next or previous review
  const handleTouchStart = (e) => {
    if (!e.targetTouches || e.targetTouches.length === 0) return;
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!e.targetTouches || e.targetTouches.length === 0) return;
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const deltaX = touchStartX - touchEndX;
    // Require a minimum 40px swipe distance
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        // Swiped left -> advance to next review
        handleNext();
      } else {
        // Swiped right -> go to previous review
        handlePrev();
      }
    }
    setTouchStartX(null);
    setTouchStartY(null);
    setTouchEndX(null);
  };

  const states = ['ALL', 'QLD', 'NSW', 'VIC', 'WA', 'SA', 'TAS', 'NT', 'ACT'];
  const ratingOptions = [
    { value: 'ALL', label: 'All Stars', count: REVIEW_STATS.totalReviews },
    { value: '5', label: '5 Stars', count: REVIEW_STATS.fiveStarCount },
    { value: '4', label: '4 Stars', count: REVIEW_STATS.fourStarCount },
    { value: '3', label: '3 Stars', count: REVIEW_STATS.threeStarCount },
    { value: '2', label: '2 Stars', count: REVIEW_STATS.twoStarCount },
  ];

  return (
    <section 
      className="py-16 bg-gradient-to-b from-[#F2F6F3] via-[#FCFDFB] to-[#F2F6F3] border-y border-[#D5DFD9] relative overflow-hidden" 
      id="customer-reviews-section"
      aria-label="Verified Customer Reviews"
    >
      {/* Subtle Luxury Pattern Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A265]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0E2A1E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        {/* HEADER: Trustpilot-Grade Ratings Summary Card */}
        <div className="bg-gradient-to-br from-[#0E2A1E] via-[#123627] to-[#071810] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#C5A265]/40 shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left: Overall Score & Stars */}
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#071810]/80 border border-[#C5A265]/40 text-[#C5A265] text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#C5A265]" />
                <span>Verified Australian Buyer Reviews (2023–2026)</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-6xl font-black text-white font-serif tracking-tight">
                    {REVIEW_STATS.averageRating.toFixed(1)}
                  </span>
                  <span className="text-xl sm:text-2xl text-[#C5A265] font-bold">/ 5.0</span>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#00B67A] flex items-center justify-center shadow-xs">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#D3DFD8] font-medium">
                    Rated <strong className="text-white font-bold">{REVIEW_STATS.trustScore}</strong> across <strong className="text-white font-bold">{REVIEW_STATS.totalReviews} verified reviews</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Interactive Star Breakdown Bars */}
            <div className="w-full lg:w-76 bg-[#071810]/70 p-4 rounded-2xl border border-[#C5A265]/30 space-y-2 text-xs">
              {/* 5 Stars Bar */}
              <button
                type="button"
                onClick={() => handleRatingFilterChange(selectedRating === '5' ? 'ALL' : '5')}
                className="w-full flex items-center gap-2 hover:bg-[#163E2D]/60 p-1 rounded-lg transition-colors cursor-pointer text-left"
              >
                <span className="w-14 text-[#D3DFD8] font-bold">5 Stars</span>
                <div className="flex-1 h-2.5 bg-[#143224] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00B67A] to-[#25D366] rounded-full" 
                    style={{ width: `${(REVIEW_STATS.fiveStarCount / REVIEW_STATS.totalReviews) * 100}%` }}
                  />
                </div>
                <span className="w-7 text-right font-bold text-white">{REVIEW_STATS.fiveStarCount}</span>
              </button>

              {/* 4 Stars Bar */}
              <button
                type="button"
                onClick={() => handleRatingFilterChange(selectedRating === '4' ? 'ALL' : '4')}
                className="w-full flex items-center gap-2 hover:bg-[#163E2D]/60 p-1 rounded-lg transition-colors cursor-pointer text-left"
              >
                <span className="w-14 text-[#D3DFD8] font-bold">4 Stars</span>
                <div className="flex-1 h-2.5 bg-[#143224] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C5A265] to-[#E5CCA0] rounded-full" 
                    style={{ width: `${(REVIEW_STATS.fourStarCount / REVIEW_STATS.totalReviews) * 100}%` }}
                  />
                </div>
                <span className="w-7 text-right font-bold text-white">{REVIEW_STATS.fourStarCount}</span>
              </button>

              {/* 3 Stars Bar */}
              <button
                type="button"
                onClick={() => handleRatingFilterChange(selectedRating === '3' ? 'ALL' : '3')}
                className="w-full flex items-center gap-2 hover:bg-[#163E2D]/60 p-1 rounded-lg transition-colors cursor-pointer text-left"
              >
                <span className="w-14 text-[#D3DFD8] font-bold">3 Stars</span>
                <div className="flex-1 h-2.5 bg-[#143224] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C5A265] to-[#8A7045] rounded-full" 
                    style={{ width: `${(REVIEW_STATS.threeStarCount / REVIEW_STATS.totalReviews) * 100}%` }}
                  />
                </div>
                <span className="w-7 text-right font-bold text-white">{REVIEW_STATS.threeStarCount}</span>
              </button>

              {/* 2 Stars Bar */}
              <button
                type="button"
                onClick={() => handleRatingFilterChange(selectedRating === '2' ? 'ALL' : '2')}
                className="w-full flex items-center gap-2 hover:bg-[#163E2D]/60 p-1 rounded-lg transition-colors cursor-pointer text-left"
              >
                <span className="w-14 text-[#D3DFD8] font-bold">2 Stars</span>
                <div className="flex-1 h-2.5 bg-[#143224] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" 
                    style={{ width: `${(REVIEW_STATS.twoStarCount / REVIEW_STATS.totalReviews) * 100}%` }}
                  />
                </div>
                <span className="w-7 text-right font-bold text-white">{REVIEW_STATS.twoStarCount}</span>
              </button>

              <div className="pt-2 border-t border-[#183B2B] flex items-center justify-between text-[11px] text-[#A6BCB0]">
                <span>{REVIEW_STATS.recommendationPercentage}% Positive Rating</span>
                <span className="text-[#C5A265] font-bold">Nationwide Handover</span>
              </div>
            </div>

            {/* Right: Quick CTA & Modal Opener */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0 text-center">
              <button
                type="button"
                onClick={() => setShowAllModal(true)}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#C5A265] to-[#D4B27C] hover:from-[#D4B27C] hover:to-[#E5CCA0] text-[#0E2A1E] font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-[#C5A265]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search All {REVIEW_STATS.totalReviews} Reviews</span>
              </button>

              <div className="text-[11px] text-[#A6BCB0] flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A265]" />
                <span>Unedited Client Testimonials</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS & DUAL FILTER TABS (STATE & STAR RATING) */}
        <div className="space-y-3">
          {/* Star Rating Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-[#D5DFD9] shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#0E2A1E] mr-1 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#C5A265] fill-[#C5A265]" />
                <span>Rating:</span>
              </span>
              {ratingOptions.map((opt) => {
                const isSelected = selectedRating === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleRatingFilterChange(opt.value)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#0E2A1E] text-[#C5A265] border border-[#C5A265] shadow-xs'
                        : 'bg-[#F0F4F1] text-[#4A5D53] hover:bg-[#E2EAE5] border border-[#D5DFD9]'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-[#C5A265] text-[#0E2A1E]' : 'bg-white text-[#60756B]'
                    }`}>
                      {opt.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons (Prev / Next) & Counter */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous review"
                className="w-9 h-9 rounded-xl bg-[#F0F4F1] border border-[#D5DFD9] hover:border-[#C5A265] hover:bg-[#0E2A1E] hover:text-[#C5A265] text-[#0E2A1E] flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-[#0E2A1E] px-2 min-w-[60px] text-center">
                {filteredReviews.length > 0 ? `${safeIndex + 1} / ${filteredReviews.length}` : '0 / 0'}
              </span>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next review"
                className="w-9 h-9 rounded-xl bg-[#F0F4F1] border border-[#D5DFD9] hover:border-[#C5A265] hover:bg-[#0E2A1E] hover:text-[#C5A265] text-[#0E2A1E] flex items-center justify-center shadow-xs transition-all cursor-pointer active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="text-[11px] font-bold text-[#60756B] hover:text-[#0E2A1E] px-2.5 py-1.5 rounded-xl border border-[#D5DFD9] bg-white cursor-pointer ml-1"
              >
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </button>
            </div>
          </div>

          {/* State Filter Pills Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-[#4A5D53] mr-1 hidden sm:inline">Filter State:</span>
            {states.map((st) => {
              const count = st === 'ALL' 
                ? REVIEWS.length 
                : REVIEWS.filter(r => r.state === st).length;
              if (count === 0 && st !== 'ALL') return null;

              const isSelected = selectedState === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => handleStateFilterChange(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0E2A1E] text-[#C5A265] border border-[#C5A265] shadow-xs'
                      : 'bg-white text-[#4A5D53] hover:bg-[#EBF1ED] border border-[#D5DFD9]'
                  }`}
                >
                  {st === 'ALL' ? 'All Australia' : st} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* CAROUSEL TRACK - FULL VISIBILITY & SWIPE SUPPORT */}
        <div 
          className="relative overflow-hidden touch-pan-y rounded-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#D5DFD9] p-8 space-y-3">
              <p className="text-sm text-[#4A5D53]">No reviews found matching your current filter selection.</p>
              <button
                type="button"
                onClick={() => { handleStateFilterChange('ALL'); handleRatingFilterChange('ALL'); }}
                className="px-4 py-2 bg-[#0E2A1E] text-[#C5A265] rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-[#163E2D] transition-colors"
              >
                Reset All Filters ({REVIEW_STATS.totalReviews} Reviews)
              </button>
            </div>
          ) : (
            <div 
              className="flex transition-transform duration-400 ease-out"
              style={{
                transform: `translateX(-${safeIndex * 100}%)`,
              }}
            >
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="w-full shrink-0 px-1"
                >
                  {/* FULL VISIBILITY REVIEW CARD */}
                  <div className="bg-gradient-to-b from-white via-[#FAFBF9] to-[#F3F7F4] p-6 sm:p-10 rounded-3xl border-2 border-[#C5A265]/40 shadow-xl hover:border-[#C5A265] transition-all duration-300 relative group flex flex-col justify-between h-auto">
                    {/* Background Decorative Quote Mark */}
                    <Quote className="absolute top-6 right-8 w-20 h-20 text-[#E8EFEA] pointer-events-none group-hover:text-[#F3EAD7] transition-colors" />

                    <div className="space-y-5 relative z-10">
                      {/* Top Row: Stars + Verified Badge + Date */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8E4] pb-4">
                        <div className="flex items-center gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`w-6 h-6 rounded-md flex items-center justify-center shadow-2xs ${
                                i < rev.rating ? 'bg-[#00B67A]' : 'bg-slate-200'
                              }`}
                            >
                              <Star className="w-3.5 h-3.5 text-white fill-white" />
                            </div>
                          ))}
                          <span className="text-sm font-black text-[#0E2A1E] ml-2 font-serif">
                            {rev.rating}.0 / 5.0
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00B67A] bg-[#E8F8F0] px-3 py-1 rounded-full border border-[#BDECD7]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified Buyer</span>
                          </span>

                          <span className="text-xs text-[#60756B] font-medium">
                            {rev.date}
                          </span>
                        </div>
                      </div>

                      {/* Full Review Text - Fully visible with generous line-height */}
                      <p className="text-base sm:text-lg text-[#0E2A1E] leading-relaxed font-normal italic">
                        &ldquo;{rev.review}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Row: Reviewer Details & Review ID */}
                    <div className="pt-5 mt-6 border-t border-[#E2E8E4] flex flex-wrap items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0E2A1E] via-[#163E2D] to-[#071810] text-[#C5A265] border-2 border-[#C5A265] font-black text-sm flex items-center justify-center shadow-xs">
                          {rev.name.split(' ').map(n => n[0]).join('').substring(0, 2).replace(/[^A-Z]/gi, '') || 'AU'}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm sm:text-base text-[#0E2A1E] font-serif">
                            {rev.name}
                          </h4>
                          <div className="flex items-center gap-1.5 text-xs text-[#60756B]">
                            <MapPin className="w-3.5 h-3.5 text-[#C5A265]" />
                            <span>{rev.location}</span>
                            <span className="text-[10px] font-black uppercase tracking-wider text-[#0E2A1E] bg-[#E2EAE5] px-1.5 py-0.5 rounded-md ml-1">
                              {rev.state}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#4A5D53] bg-[#E8EFEA] px-3 py-1.5 rounded-xl border border-[#D5DFD9]">
                          Review #{rev.id} of {REVIEW_STATS.totalReviews}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visual Swipe Hint on Mobile */}
        <div className="flex items-center justify-between text-xs text-[#60756B] sm:hidden px-2">
          <span>👈 Swipe left for next review</span>
          <span>Swipe right for previous 👉</span>
        </div>

        {/* Carousel Progress Bar & Dots */}
        {filteredReviews.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
            {filteredReviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  safeIndex === i 
                    ? 'w-8 bg-[#0E2A1E]' 
                    : 'w-2 bg-[#CAD5CE] hover:bg-[#8A7045]'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL: BROWSE ALL 43 REVIEWS */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border-2 border-[#C5A265] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#0E2A1E] to-[#163E2D] text-white flex items-center justify-between border-b border-[#C5A265]/40 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C5A265]" />
                  <h3 className="text-lg sm:text-xl font-black text-white font-serif">
                    All {REVIEW_STATS.totalReviews} Verified Customer Reviews
                  </h3>
                </div>
                <p className="text-xs text-[#D3DFD8]">
                  Complete unedited feedback archive from Australian golf buggy & cart owners (2023–2026)
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="w-10 h-10 rounded-full bg-[#071810] hover:bg-[#254636] text-white flex items-center justify-center transition-colors cursor-pointer border border-[#C5A265]/40"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Filter Bar */}
            <div className="p-4 bg-[#F8FAF8] border-b border-[#D5DFD9] flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#60756B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, town, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-[#D5DFD9] text-xs focus:outline-none focus:border-[#C5A265]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs text-[#4A5D53] font-bold shrink-0">State:</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-[#D5DFD9] text-xs font-bold text-[#0E2A1E] focus:outline-none focus:border-[#C5A265]"
                >
                  {states.map((st) => (
                    <option key={st} value={st}>
                      {st === 'ALL' ? `All States (${REVIEWS.length})` : st}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="px-3 py-2 bg-white rounded-xl border border-[#D5DFD9] text-xs font-bold text-[#0E2A1E] focus:outline-none focus:border-[#C5A265]"
                >
                  <option value="ALL">All Ratings ({REVIEW_STATS.totalReviews})</option>
                  <option value="5">5 Stars ({REVIEW_STATS.fiveStarCount})</option>
                  <option value="4">4 Stars ({REVIEW_STATS.fourStarCount})</option>
                  <option value="3">3 Stars ({REVIEW_STATS.threeStarCount})</option>
                  <option value="2">2 Stars ({REVIEW_STATS.twoStarCount})</option>
                </select>
              </div>
            </div>

            {/* Modal Review List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {modalFilteredReviews.length === 0 ? (
                <div className="text-center py-12 text-[#4A5D53] text-sm">
                  No matching reviews found for &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modalFilteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D5DFD9] hover:border-[#C5A265] shadow-xs space-y-3 flex flex-col justify-between transition-all"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-4 h-4 rounded-xs flex items-center justify-center ${
                                  i < rev.rating ? 'bg-[#00B67A]' : 'bg-slate-200'
                                }`}
                              >
                                <Star className="w-2.5 h-2.5 text-white fill-white" />
                              </div>
                            ))}
                            <span className="text-xs font-bold text-[#0E2A1E] ml-1">
                              {rev.rating}.0
                            </span>
                          </div>

                          <span className="text-[10px] font-bold text-[#60756B]">
                            {rev.date}
                          </span>
                        </div>

                        <p className="text-xs text-[#2A3E34] leading-relaxed">
                          &ldquo;{rev.review}&rdquo;
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-[#EBF0EC] flex items-center justify-between text-xs">
                        <div>
                          <strong className="text-[#0E2A1E] block font-bold">{rev.name}</strong>
                          <span className="text-[11px] text-[#60756B] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#C5A265]" />
                            {rev.location}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#00B67A] bg-[#E8F8F0] px-2 py-0.5 rounded-full border border-[#BDECD7]">
                          ✓ Verified Buyer
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#F8FAF8] border-t border-[#D5DFD9] text-center text-xs text-[#60756B] shrink-0">
              Showing {modalFilteredReviews.length} of {REVIEWS.length} verified Australian reviews • 100% Genuine Handover Testimonials
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
