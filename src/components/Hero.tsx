'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface HeroProps {
  content?: SiteContent;
  whatsAppNumber?: string;
}

export default function Hero({ content, whatsAppNumber: propWhatsApp }: HeroProps) {
  const { language, isRTL } = useLanguage();
  const isAr = language === 'ar';

  // Slides strictly from Sanity CMS (zero hardcoded defaults)
  const heroSlides = (content?.hero?.slides && content.hero.slides.length > 0)
    ? content.hero.slides.map((s, idx) => ({
      src: s.src,
      alt: s.alt || (isAr ? `صورة العرض ${idx + 1}` : `Slide ${idx + 1}`),
      caption: s.captionBilingual
        ? (isAr ? s.captionBilingual.ar : s.captionBilingual.en)
        : (s.caption || ''),
    }))
    : [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPausedHover, setIsPausedHover] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = heroSlides.length;

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    if (mq.matches) {
      setIsPlaying(false);
    }
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // 2. Slide Navigation handlers
  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  // 3. Auto-rotation interval for slideshow (every 4.5 seconds)
  useEffect(() => {
    if (!isPlaying || isPausedHover || prefersReducedMotion) return;

    const timer = setInterval(() => {
      goToNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, isPausedHover, prefersReducedMotion, goToNext]);

  // 4. Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    const swipeThreshold = 45;

    if (deltaX > swipeThreshold) {
      // Swiped left
      if (isRTL) goToPrev();
      else goToNext();
    } else if (deltaX < -swipeThreshold) {
      // Swiped right
      if (isRTL) goToNext();
      else goToPrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // WhatsApp CTA helpers
  const whatsAppNum =
    propWhatsApp ||
    content?.footer?.whatsAppNumber ||
    content?.hero?.whatsAppNumber ||
    '';

  const whatsAppMsg = isAr
    ? (content?.footer?.whatsAppPrefillAr || 'السلام عليكم وادي النوار، أرغب في الاستفسار عن الطلب والحجز.')
    : (content?.footer?.whatsAppPrefillEn || 'Hello The Blossom Valley, I would like to inquire about ordering farm products.');

  const whatsAppHref = buildWhatsAppLink(whatsAppMsg, whatsAppNum);

  const whatsAppBtnText = isAr
    ? (content?.hero?.ctaWhatsApp?.ar || 'تواصل عبر واتساب')
    : (content?.hero?.ctaWhatsApp?.en || 'Chat on WhatsApp');

  const activeSlide = heroSlides[currentSlide] || heroSlides[0] || null;

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="hero-cinematic relative w-full overflow-hidden select-none flex flex-col"
      aria-roledescription="carousel"
      aria-label={isAr ? 'عرض صور المزرعة' : 'The Blossom Valley farm slideshow'}
    >
      {/* ── 1. SLIDESHOW IMAGES LAYER ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={`${slide.src}-${index}`}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={80}
                sizes="100vw"
                className={`object-cover object-center transform-gpu will-change-transform transition-transform duration-7000 ease-out ${isActive && isPlaying && !prefersReducedMotion ? 'scale-105' : 'scale-100'
                  }`}
              />
            </div>
          );
        })}
      </div>

      {/* ── 2. GRADIENT OVERLAY ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.22) 48%, rgba(0,0,0,0.72) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── 3. CONTENT LAYER ────────────────────────────────────────── */}
      <div className="hero-cinematic-inner relative z-20 flex-1 flex flex-col justify-between px-5 sm:px-10 lg:px-16 2xl:px-20 py-8 sm:py-12 lg:py-16 w-full">

        {/* Top content block: headline + description + products list */}
        <div className={`max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>

          {/* Bilingual Bold Headline */}
          <div className="flex flex-col gap-2 sm:gap-3.5">
            {isAr ? (
              <>
                <h1
                  className="font-arabic font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.22] drop-shadow-md pb-1 sm:pb-1.5"
                  style={{
                    fontSize: 'clamp(2.75rem, 8vw, 6.2rem)',
                  }}
                >
                  {content?.hero?.heading?.ar || 'وادي النوار'}
                </h1>
                <p
                  className="font-display font-extrabold text-white/95 uppercase tracking-wider leading-tight drop-shadow-sm mt-1 sm:mt-2"
                  style={{
                    fontSize: 'clamp(1.15rem, 3.2vw, 2.35rem)',
                  }}
                >
                  {content?.hero?.heading?.en || 'The BLOSSOM Valley'}
                </p>
              </>
            ) : (
              <>
                <h1
                  className="font-display font-extrabold text-white uppercase tracking-wider leading-[1.08] drop-shadow-md pb-1"
                  style={{
                    fontSize: 'clamp(2.4rem, 7vw, 5.5rem)',
                  }}
                >
                  {content?.hero?.heading?.en || 'The BLOSSOM Valley'}
                </h1>
                <p
                  className="font-arabic font-extrabold text-white/95 leading-tight drop-shadow-sm mt-1 sm:mt-2"
                  style={{
                    fontSize: 'clamp(1.35rem, 3.8vw, 2.8rem)',
                  }}
                >
                  {content?.hero?.heading?.ar || 'وادي النوار'}
                </p>
              </>
            )}
          </div>

          {/* Full Unabbreviated Description */}
          <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl font-medium text-white/90 leading-relaxed max-w-xl drop-shadow-xs">
            {isAr
              ? (content?.hero?.description?.ar || content?.hero?.subheading?.ar || 'من أرض الوطن ورماله الدافئة، من محافظة شقراء؛ مزرعة وادي النوار تقدم لكم منتجاتها الطازجة يومياً.')
              : (content?.hero?.description?.en || content?.hero?.subheading?.en || 'From the warm sands of our homeland, from Shaqra Governorate; Wadi Al-Nawar Farm brings you its fresh produce daily.')}
          </p>

          {/* Full Products Line */}
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-emerald-200/95 leading-relaxed max-w-xl drop-shadow-xs">
            {isAr
              ? (content?.hero?.productsList?.ar || 'تمور الخلاص • فلفل شقراء • منتجات زراعية موسمية • طماطم مجففة • لحوم نعيمي بلدي')
              : (content?.hero?.productsList?.en || 'Khalas Dates • Shaqra Peppers • Seasonal Farm Produce • Sun-Dried Tomatoes • Local Naimi Livestock')}
          </p>

          {/* WhatsApp CTA Button */}
          <div className="mt-5 sm:mt-6 flex items-center">
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary gap-2.5 font-bold shadow-lg shadow-black/25 text-xs sm:text-sm px-5 py-2.5 rounded-full inline-flex items-center"
            >
              <MessageCircle size={18} />
              <span>{whatsAppBtnText}</span>
              <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
            </a>
          </div>
        </div>

        {/* Spacer — fills the middle of the viewport */}
        <div className="flex-1 min-h-[3rem]" aria-hidden="true" />

        {/* ── BOTTOM BAR: Editorial Caption & Architectural Controls ── */}
        {totalSlides > 0 && activeSlide && (
          <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 sm:pt-6">
            {/* Left: Slide Index + Hairline Pagination + Caption */}
            <div className="text-white drop-shadow-md max-w-xl">
              {/* Minimalist Index & Hairline Segments */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs tracking-widest text-white/90 font-medium">
                  {String(currentSlide + 1).padStart(2, '0')}
                  <span className="text-white/40 mx-1">/</span>
                  {String(totalSlides).padStart(2, '0')}
                </span>

                {/* 2px architectural hairline dashes */}
                <div className="flex items-center gap-1.5" role="tablist">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={idx === currentSlide}
                      aria-label={`Slide ${idx + 1}`}
                      onClick={() => goToSlide(idx)}
                      className="group py-2.5 cursor-pointer focus:outline-hidden"
                    >
                      <div
                        className={`h-[2px] rounded-full transition-all duration-300 ${idx === currentSlide
                          ? 'w-7 sm:w-9 bg-white'
                          : 'w-2.5 sm:w-3 bg-white/30 group-hover:bg-white/60'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Slide Title */}
              {activeSlide.caption && (
                <p className="text-sm sm:text-base font-medium leading-snug text-white/95 tracking-wide line-clamp-2 sm:line-clamp-none">
                  {activeSlide.caption}
                </p>
              )}
            </div>

            {/* Right: Tactile Twin Navigation Buttons (Side-by-side in corner for effortless thumb reach) */}
            <div className="flex items-center gap-2 self-end shrink-0">
              <button
                type="button"
                onClick={goToPrev}
                aria-label={isAr ? 'الصورة السابقة' : 'Previous slide'}
                className="size-11 sm:size-12 cursor-pointer flex items-center justify-center rounded-full bg-black/35 hover:bg-black/55 text-white/90 hover:text-white backdrop-blur-md border border-white/15 hover:border-white/35 active:scale-95 transition-all duration-200 shadow-lg"
              >
                {isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label={isAr ? 'الصورة التالية' : 'Next slide'}
                className="size-11 sm:size-12 cursor-pointer flex items-center justify-center rounded-full bg-black/35 hover:bg-black/55 text-white/90 hover:text-white backdrop-blur-md border border-white/15 hover:border-white/35 active:scale-95 transition-all duration-200 shadow-lg"
              >
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
