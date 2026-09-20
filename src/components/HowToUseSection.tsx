'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import Reveal from './Reveal';
import { Play, X, ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface HowToUseSectionProps {
  content?: SiteContent;
}

interface CulinaryDish {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  image: string;
  videoFileUrl?: string;
  videoUrl?: string;
}

export default function HowToUseSection({ content }: HowToUseSectionProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const [activeDish, setActiveDish] = useState<CulinaryDish | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dishes: CulinaryDish[] =
    (content?.recipesSection?.items || []).map((item, idx) => ({
      id: item.id || `recipe-${idx + 1}`,
      num: item.number || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`),
      title: t(item.title) || (isAr ? `طريقة ${item.number}` : `Way ${item.number}`),
      subtitle: t(item.subtitle) || '',
      image: item.image || '',
      videoFileUrl: item.videoFileUrl,
      videoUrl: item.videoUrl,
    }));

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveDish(null);
  };

  // Close modal on escape key and handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    if (activeDish) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeDish]);

  const whatsAppNumber = content?.footer?.whatsAppNumber || '+966500000000';

  return (
    <section id="recipes" className="scroll-mt-20 px-6 sm:px-10 lg:px-16 2xl:px-20 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-[1440px]">
        {/* Header matching editorial farm journal */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="editorial-kicker">
              {content?.recipesSection?.eyebrow
                ? t(content.recipesSection.eyebrow)
                : isAr
                ? 'من مطبخنا · ٠٤'
                : 'From our kitchen · 04'}
            </p>
            <h2 className="editorial-title">
              {content?.recipesSection?.title
                ? t(content.recipesSection.title)
                : isAr
                ? 'طرق الاستخدام والتقديم'
                : 'Ways to savour'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
              <Sparkles size={12} />
              {content?.recipesSection?.videoInstruction
                ? t(content.recipesSection.videoInstruction)
                : isAr
                ? 'انقر على أي طريقة لمشاهدة الفيديو'
                : 'Click any dish to watch video'}
            </span>
            <span className="hidden text-xs font-bold text-muted-foreground sm:block">
              {content?.recipesSection?.journalTag
                ? t(content.recipesSection.journalTag)
                : 'THE FARM JOURNAL / 2026'}
            </span>
          </div>
        </div>

        {/* 2-Column Articles Grid with Interactive Video Trigger */}
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {dishes.map((dish) => (
            <article
              key={dish.id || dish.num}
              onClick={() => setActiveDish(dish)}
              className="group grid grid-cols-[7.5rem_1fr] sm:grid-cols-[9.5rem_1fr] items-center gap-5 border-b border-border pb-7 cursor-pointer transition-all duration-300 hover:border-primary/40 focus:outline-hidden"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveDish(dish);
                }
              }}
              aria-label={`${dish.title} - ${isAr ? 'شاهد الفيديو' : 'Watch video clip'}`}
            >
              {/* Thumbnail with Dynamic Play Overlay */}
              <div className="relative aspect-square overflow-hidden bg-paper rounded-sm border border-border shadow-xs">
                <Image
                  src={dish.image}
                  alt={dish.title}
                  fill
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-108"
                  sizes="(max-width: 640px) 7.5rem, 9.5rem"
                />
                <div className="absolute inset-0 bg-ink/15 transition-opacity group-hover:bg-ink/30" />
                <span className="absolute start-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-background/95 backdrop-blur-md text-primary shadow-md transition-transform group-hover:scale-115 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Play size={12} className="fill-current translate-x-0.5" />
                </span>
                <span className="absolute bottom-2 start-2 bg-background/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-ink/80 tracking-wide border border-border">
                  {isAr ? 'فيديو' : 'VIDEO'}
                </span>
              </div>

              {/* Text side */}
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {isAr ? `طريقة ٠${dish.num}` : `WAY ${dish.num}`}
                  </p>
                  <span className="text-[11px] font-medium text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                    {isAr ? 'مشاهدة' : 'Play'}
                    <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={14} />
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl text-ink group-hover:text-primary transition-colors leading-tight">
                  {dish.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {dish.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Video Dialogue Modal for Ways to Savour */}
      {activeDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-6 backdrop-blur-md transition-opacity animate-fade-in"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={activeDish.title}
        >
          <div
            className="relative w-full max-w-3xl bg-background rounded-xl overflow-hidden shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-paper/60">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold font-mono">
                  {isAr ? `طريقة ٠${activeDish.num}` : `WAY ${activeDish.num}`}
                </span>
                <h3 className="font-display text-base sm:text-lg font-semibold text-ink">
                  {activeDish.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full border border-border bg-background hover:bg-muted text-ink flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isAr ? 'إغلاق' : 'Close'}
              >
                <X size={16} />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              {activeDish.videoFileUrl || activeDish.videoUrl ? (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  poster={activeDish.image}
                  className="h-full w-full object-contain"
                  key={activeDish.videoFileUrl || activeDish.videoUrl || activeDish.id}
                >
                  {activeDish.videoFileUrl && (
                    <source src={activeDish.videoFileUrl} />
                  )}
                  {activeDish.videoUrl && (
                    <source src={activeDish.videoUrl} />
                  )}
                  {isAr ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support HTML5 video.'}
                </video>
              ) : (
                <div className="relative h-full w-full flex items-center justify-center overflow-hidden bg-paper">
                  {activeDish.image && (
                    <Image
                      src={activeDish.image}
                      alt={activeDish.title}
                      fill
                      className="object-cover opacity-75"
                    />
                  )}
                  <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2.5 p-6 text-center">
                    <span className="bg-background/95 backdrop-blur-md text-primary text-xs font-bold px-4 py-2 rounded-full border border-border shadow-md">
                      {isAr ? 'فيديو طريقة التقديم قادم قريباً' : 'Culinary video coming soon'}
                    </span>
                    <p className="text-xs text-background/90 max-w-sm leading-relaxed">
                      {isAr
                        ? 'سيتم رفع وتوثيق مقطع الفيديو الحصري لهذه الوصفة قريباً عبر لوحة إدارة وادي النوار.'
                        : 'A dedicated video demonstration for this recipe will be uploaded soon.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Body & Culinary Description */}
            <div className="p-6 bg-background space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                  {isAr ? 'عن طريقة التقديم والتحضير' : 'Serving & Preparation Guide'}
                </p>
                <p className="text-sm sm:text-base text-ink leading-relaxed font-sans">
                  {activeDish.subtitle}
                </p>
              </div>

              {/* Tip & Direct WhatsApp Order Link */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-paper/40 -mx-6 -mb-6 px-6 py-4">
                <p className="text-xs text-muted-foreground">
                  {isAr
                    ? '✨ مجهز من طماطم شقراء المجففة تحت أشعة الشمس الذهبية.'
                    : '✨ Prepared with sun-dried tomatoes from Shaqra farm.'}
                </p>
                <a
                  href={buildWhatsAppLink(
                    whatsAppNumber,
                    isAr
                      ? `مرحباً وادي النوار، أود الاستفسار عن طلب الطماطم المجففة لتجربة وصفة (${activeDish.title}).`
                      : `Hello The Blossom Valley, I would like to order dried tomatoes to try the recipe (${activeDish.title}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors shrink-0 shadow-xs"
                >
                  <MessageCircle size={14} />
                  <span>{isAr ? 'طلب مكونات الوصفة عبر واتساب' : 'Order via WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

