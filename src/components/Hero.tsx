'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  MessageCircle,
} from 'lucide-react';

interface HeroProps {
  content?: SiteContent;
  whatsAppNumber?: string;
}

export default function Hero({ content, whatsAppNumber: propWhatsApp }: HeroProps) {
  const { language, isRTL, t } = useLanguage();
  const isAr = language === 'ar';

  // Slides definition with high quality photos from /images/
  const heroSlides = [
    {
      src: '/images/IMG_9378.JPG.jpeg',
      alt: isAr ? 'مشهد جوي شامل لمزرعة وادي النوار في شقراء' : 'Aerial panoramic overview of The Blossom Valley farm in Shaqra',
      caption: isAr ? 'إطلالة شاملة على واحة ومزارع وادي النوار بشقراء' : 'Shaqra Farmstead • Panoramic Aerial Vista',
    },
    {
      src: '/images/IMG_9373.JPG.jpeg',
      alt: isAr ? 'قطيع خرفان النعيمي في مرعى النخيل بأشعة الشمس' : 'Naimi sheep herd in the sunlit palm grove',
      caption: isAr ? 'خرفان النعيمي الأصيلة بين ظلال النخيل' : 'Purebred Naimi Sheep in the Palm Pastures',
    },
    {
      src: '/images/IMG_9371.JPG.jpeg',
      alt: isAr ? 'برج شقراء التراثي وسط واحة النخيل الشاسعة' : 'Historic Shaqra watchtower overlooking the date palm oasis',
      caption: isAr ? 'برج المراقبة التراثي وواحة النخيل العريقة' : 'Shaqra Heritage Oasis & Historic Watchtower',
    },
    {
      src: '/images/IMG_9370.JPG.jpeg',
      alt: isAr ? 'حقول البرسيم الأخضر ومحاصيل الري المحوري' : 'Lush green circular pivot irrigation fields in Shaqra',
      caption: isAr ? 'حقول البرسيم الأخضر الطازج والمحاصيل النضرة' : '100% Farm-Grown Green Alfalfa Crops',
    },
    {
      src: '/images/IMG_9374.JPG.jpeg',
      alt: isAr ? 'جني وخراف تمور الخلاص من النخيل الباسق' : 'Traditional date palm harvesting by farm climbers',
      caption: isAr ? 'جني تمور خلاص شقراء الفاخرة بعناية يدوية' : 'Artisanal Khalas Date Palm Harvesting',
    },
    {
      src: '/images/farm/farm-sand-dunes-wide.jpg',
      alt: isAr ? 'كثبان شقراء الذهبية وشمس نجد الدافئة' : 'Golden dunes and warm Shaqra horizon',
      caption: isAr ? 'رمال شقراء الذهبية وبيئة نجد الهادئة' : 'Shaqra Desert Terroir & Warm Sun',
    },
  ];

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

  // 5. WhatsApp helpers
  const whatsAppNumber =
    propWhatsApp ||
    content?.footer?.whatsAppNumber ||
    content?.hero?.whatsAppNumber ||
    '';

  const whatsAppMsg = isAr
    ? 'السلام عليكم وادي النوار، أرغب في الاستفسار عن الطلب والحجز.'
    : 'Hello The Blossom Valley, I would like to inquire about ordering farm products.';

  const whatsAppHref = whatsAppNumber
    ? `https://wa.me/${whatsAppNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsAppMsg)}`
    : `https://wa.me/?text=${encodeURIComponent(whatsAppMsg)}`;

  const activeSlide = heroSlides[currentSlide];

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="hero-cinematic relative w-full overflow-hidden select-none"
      aria-roledescription="carousel"
      aria-label={isAr ? 'عرض صور مزرعة وادي النوار' : 'The Blossom Valley farm slideshow'}
    >
      {/* ── 1. SLIDESHOW IMAGES LAYER ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.src}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={90}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-7000 ease-out ${
                  isActive && isPlaying && !prefersReducedMotion ? 'scale-105' : 'scale-100'
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
      <div className="hero-cinematic-inner relative z-20 flex flex-col justify-between px-6 sm:px-10 lg:px-16 2xl:px-20 py-10 sm:py-14 lg:py-16">

        {/* Top content block: kicker + headline + description + CTA */}
        <div className={`max-w-2xl ${isRTL ? 'text-right' : 'text-left'}`}>

          {/* Kicker / eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-3.5 py-1 text-xs border border-white/15 mb-3">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-semibold text-white/90">
              {content?.hero?.welcomeBadge
                ? t(content.hero.welcomeBadge)
                : isAr
                ? 'واحة شقراء الزراعية • أرض الخير والنماء'
                : 'Shaqra Desert Oasis · Agricultural Heritage'}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-emerald-400 font-bold">
              {content?.hero?.statsPill
                ? t(content.hero.statsPill)
                : isAr
                ? 'موسم ٢٠٢٦'
                : 'Harvest 2026'}
            </span>
          </div>

          {/* H1 Headline */}
          <h1
            className={`mt-2 leading-[0.97] text-white drop-shadow-sm ${
              isRTL ? 'font-arabic' : 'font-display'
            }`}
            style={{
              fontSize: 'clamp(2.6rem, 8vw, 6.5rem)',
              fontWeight: isRTL ? 800 : 700,
            }}
          >
            {content?.hero?.heading
              ? t(content.hero.heading)
              : isAr
              ? 'وادي النوار'
              : 'The Blossom Valley'}
          </h1>

          {/* Subheading / Tagline */}
          <p className="mt-4 font-display text-lg sm:text-xl font-medium text-white/90 leading-snug drop-shadow-xs max-w-xl">
            {content?.hero?.subheading
              ? t(content.hero.subheading)
              : isAr
              ? 'أرض سعودية طيبة، شمس كريمة، ومنتجات حُظيت بعناية فائقة في محافظة شقراء.'
              : 'Saudi soil, warm sun, and authentic farm produce cultivated with mindful craftsmanship in Shaqra.'}
          </p>

          {/* Body Description */}
          <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed max-w-lg drop-shadow-xs">
            {content?.hero?.description
              ? t(content.hero.description)
              : isAr
              ? 'من واحات النخيل ومراعي الماشية إلى خيرات المؤونة الحرفية، ندير كل مرحلة بشغف وإتقان متناهٍ.'
              : 'From date palm groves and pristine livestock pastures to artisanal provisions, every stage is cared for with uncompromising dedication.'}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {/* Primary CTA */}
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary gap-2.5 font-bold shadow-lg shadow-black/25"
            >
              <MessageCircle size={18} />
              <span>
                {content?.hero?.ctaWhatsApp
                  ? t(content.hero.ctaWhatsApp)
                  : isAr
                  ? 'طلب وتواصل عبر واتساب'
                  : 'Inquire & Order on WhatsApp'}
              </span>
              <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
            </a>

            {/* Secondary: scroll link */}
            <a
              href="#livestock"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15 border border-white/25 hover:border-white/40"
            >
              <span>{isAr ? 'خرفان النعيمي' : 'Naimi Sheep'}</span>
              <ArrowDown size={14} className="opacity-80" />
            </a>
          </div>
        </div>

        {/* Spacer — fills the middle of the viewport */}
        <div className="flex-1 min-h-[4rem]" aria-hidden="true" />

        {/* Bottom bar: Active slide caption + Slideshow Controls */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8 border-t border-white/10">
          {/* Active slide caption & location */}
          <div className="text-white drop-shadow-xs">
            <p className="text-xs sm:text-sm font-semibold leading-snug text-white/95 flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-xs">
                {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
              <span>{activeSlide.caption}</span>
            </p>
            <p className="mt-0.5 text-[11px] text-white/60">
              {isAr
                ? 'محافظة شقراء، المملكة العربية السعودية'
                : 'Shaqra City, Riyadh Province, Saudi Arabia'}
            </p>
          </div>

          {/* Slideshow Controls Bar */}
          <div className="flex items-center gap-2 sm:gap-3 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 backdrop-blur-md">
            {/* Prev Button */}
            <button
              type="button"
              onClick={goToPrev}
              aria-label={isAr ? 'الصورة السابقة' : 'Previous slide'}
              className="grid size-9 cursor-pointer place-items-center rounded-full text-white/80 hover:bg-white/15 hover:text-white transition-all"
            >
              {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            {/* Slide indicator dots */}
            <div className="flex items-center gap-1.5 px-1 py-1" role="tablist">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentSlide}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentSlide
                      ? 'w-6 h-1.5 bg-emerald-400 shadow-xs'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={goToNext}
              aria-label={isAr ? 'الصورة التالية' : 'Next slide'}
              className="grid size-9 cursor-pointer place-items-center rounded-full text-white/80 hover:bg-white/15 hover:text-white transition-all"
            >
              {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>

            {/* Pause / Play Toggle Button */}
            <div className="h-4 w-px bg-white/20 mx-0.5" />
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={
                isPlaying
                  ? isAr ? 'إيقاف العرض التلقائي' : 'Pause slideshow'
                  : isAr ? 'تشغيل العرض التلقائي' : 'Play slideshow'
              }
              className="grid size-9 cursor-pointer place-items-center rounded-full text-white/80 hover:bg-white/15 hover:text-white transition-all"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-px" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. Scroll-to-next arrow (decorative) ───────────────────── */}
      <a
        href="#livestock"
        aria-label={isAr ? 'التمرير للأسفل' : 'Scroll to next section'}
        className="hero-scroll-hint absolute bottom-5 left-1/2 z-20 -translate-x-1/2 hidden xl:flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-[9px] uppercase tracking-widest font-semibold">
          {isAr ? 'اكتشف' : 'Scroll'}
        </span>
        <ArrowDown size={14} className="hero-bounce" />
      </a>
    </section>
  );
}
