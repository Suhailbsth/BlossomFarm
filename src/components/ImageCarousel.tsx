'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ImageCarouselSlide {
  src: string;
  alt?: string;
  caption?: string;
}

export interface ImageCarouselProps {
  /**
   * List of images (array of strings or slide objects)
   */
  images: (string | ImageCarouselSlide)[];
  /**
   * Ambient: auto-rotates every 4-5s, pauses on hover, minimal dots.
   * Gallery: manual tap-to-advance, thumbnail strip and/or dots.
   */
  variant?: 'ambient' | 'gallery';
  /**
   * Auto-rotation interval in milliseconds (default: 4500ms)
   */
  autoPlayInterval?: number;
  /**
   * Tailwind aspect ratio class.
   * Default: portrait-friendly 'aspect-[4/5]' (or 'aspect-[4/3]', 'aspect-[16/9]', 'h-full w-full' for wide hero)
   */
  aspectRatioClass?: string;
  /**
   * Object fit style ('cover' | 'contain'). Default 'cover'.
   */
  objectFit?: 'cover' | 'contain';
  /**
   * Focal point object position class (e.g. 'object-center', 'object-top'). Default 'object-center'.
   */
  objectPosition?: string;
  /**
   * Priority loading for the first slide image. Default false.
   */
  priority?: boolean;
  /**
   * Next.js Image sizes attribute. Default '(max-width: 768px) 100vw, 50vw'.
   */
  sizes?: string;
  /**
   * Custom CSS classes for the outer container.
   */
  className?: string;
  /**
   * Optional custom children to overlay (e.g. play button pill, badge, captions).
   */
  children?: React.ReactNode;
  /**
   * Whether to show navigation arrows (prev/next). Default true for gallery, false or hover for ambient.
   */
  showArrows?: boolean;
  /**
   * Whether to show dot indicators. Default true.
   */
  showDots?: boolean;
  /**
   * Whether to show thumbnail strip (available in gallery mode). Default true in gallery if > 1 image.
   */
  showThumbnails?: boolean;
  /**
   * Custom aria-label for accessibility.
   */
  ariaLabel?: string;
}

export default function ImageCarousel({
  images,
  variant = 'ambient',
  autoPlayInterval = 4500,
  aspectRatioClass = 'aspect-[4/5]',
  objectFit = 'cover',
  objectPosition = 'object-center',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
  children,
  showArrows = variant === 'gallery',
  showDots = true,
  showThumbnails = variant === 'gallery',
  ariaLabel = 'Image carousel',
}: ImageCarouselProps) {
  // Normalize images to slide objects
  const slides: ImageCarouselSlide[] = (images || [])
    .filter(Boolean)
    .map((item) => (typeof item === 'string' ? { src: item, alt: '' } : item));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Touch tracking for swipe gestures
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = slides.length;

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // 2. Navigation handlers
  const goToNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
    }
  };

  // 3. Auto-rotation for ambient mode (disabled if reduced motion or paused)
  useEffect(() => {
    if (variant !== 'ambient') return;
    if (totalSlides <= 1) return;
    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [variant, totalSlides, prefersReducedMotion, isPaused, autoPlayInterval, goToNext]);

  // 4. Touch swipe handling
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
    const swipeThreshold = 45; // Minimum px distance for swipe

    if (deltaX > swipeThreshold) {
      // Swiped left -> next
      goToNext();
    } else if (deltaX < -swipeThreshold) {
      // Swiped right -> prev
      goToPrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  if (totalSlides === 0) {
    return null;
  }

  // If only 1 slide, render static view
  if (totalSlides === 1) {
    const single = slides[0];
    return (
      <div className={`relative w-full overflow-hidden ${aspectRatioClass} ${className}`}>
        <Image
          src={single.src}
          alt={single.alt || 'The Blossom Valley'}
          fill
          priority={priority}
          sizes={sizes}
          className={`${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${objectPosition}`}
        />
        {children}
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`} aria-roledescription="carousel" aria-label={ariaLabel}>
      {/* Main Image Frame */}
      <div
        className={`relative w-full overflow-hidden select-none ${aspectRatioClass} group`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-live={isPaused ? 'polite' : 'off'}
      >
        {/* Slides rendering with cross-fade */}
        {slides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.src + idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt || `Photo ${idx + 1}`}
                fill
                priority={priority && idx === 0}
                loading={idx === 0 ? 'eager' : 'lazy'}
                sizes={sizes}
                className={`${
                  objectFit === 'contain' ? 'object-contain' : 'object-cover'
                } ${objectPosition} transition-transform duration-1000 ${
                  isActive && !prefersReducedMotion ? 'scale-100' : 'scale-102'
                }`}
              />
            </div>
          );
        })}

        {/* Ambient Gradient overlay for caption / controls legibility */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* Optional Overlaid Children (e.g. Play video button, custom pill) */}
        {children && <div className="absolute inset-0 z-30 pointer-events-auto">{children}</div>}

        {/* Navigation Arrows (Prev / Next) */}
        {showArrows && totalSlides > 1 && (
          <div className="absolute inset-y-0 inset-x-2 z-30 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous image"
              className="pointer-events-auto size-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-sm border border-white/20 active:scale-95"
            >
              <ChevronLeft size={18} className="translate-x-[-0.5px]" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
              className="pointer-events-auto size-9 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-sm border border-white/20 active:scale-95"
            >
              <ChevronRight size={18} className="translate-x-[0.5px]" />
            </button>
          </div>
        )}

        {/* Dot Indicators */}
        {showDots && totalSlides > 1 && (
          <div
            className="absolute bottom-3 inset-x-0 z-30 flex items-center justify-center gap-1.5 pointer-events-auto"
            role="tablist"
            aria-label="Slide indicators"
          >
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(idx);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex
                    ? 'w-6 h-1.5 bg-white shadow-xs'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip (for Gallery Variant on Product Details) */}
      {showThumbnails && totalSlides > 1 && (
        <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {slides.map((slide, idx) => (
            <button
              key={slide.src + idx}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Show image ${idx + 1}`}
              className={`relative h-18 w-18 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-primary ring-2 ring-primary/20 shadow-xs scale-102 opacity-100'
                  : 'border-border/60 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={slide.src}
                alt={slide.alt || `Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
