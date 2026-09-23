'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, BilingualText } from '@/types/content';
import Reveal from './Reveal';
import {
  Play,
  Pause,
  X,
  Sparkles,
  MessageCircle,
  Clock,
  Users,
  ChefHat,
  Volume2,
  VolumeX,
  FileText,
  Video,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
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
  prepTime?: string;
  servings?: string;
  ingredients?: string[];
  steps?: string[];
  chefTip?: string;
  audioUrl?: string;
}

export default function HowToUseSection({ content }: HowToUseSectionProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  const [activeDish, setActiveDish] = useState<CulinaryDish | null>(null);
  const [modalTab, setModalTab] = useState<'recipe' | 'video'>('recipe');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dishes: CulinaryDish[] = (content?.recipesSection?.items || []).map((item, idx) => ({
    id: item.id || `recipe-${idx + 1}`,
    num: item.number || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`),
    title: t(item.title) || (isAr ? `طريقة ${item.number}` : `Way ${item.number}`),
    subtitle: t(item.subtitle) || '',
    image: item.image || '',
    videoFileUrl: item.videoFileUrl,
    videoUrl: item.videoUrl,
    prepTime: item.prepTime ? t(item.prepTime) : undefined,
    servings: item.servings ? t(item.servings) : undefined,
    ingredients: item.ingredients?.map((ing: BilingualText) => t(ing)) || [],
    steps: item.steps?.map((step: BilingualText) => t(step)) || [],
    chefTip: item.chefTip ? t(item.chefTip) : undefined,
    audioUrl: item.audioUrl,
  }));

  const handleOpenModal = (dish: CulinaryDish, tab: 'recipe' | 'video' = 'recipe') => {
    setActiveDish(dish);
    setModalTab(tab);
    setIsPlayingAudio(false);
  };

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlayingAudio(false);
    setActiveDish(null);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(() => {
        setIsPlayingAudio(false);
      });
    }
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
    <section id="recipes" className="scroll-mt-24 px-6 sm:px-10 lg:px-16 2xl:px-20 py-16 sm:py-24">
      <Reveal className="mx-auto max-w-[1440px]">
        {/* Header matching editorial farm journal */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end border-b border-border pb-8">
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
                ? 'وصفات الطهي وطرق التقديم'
                : 'Ways to savour'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles size={13} className="text-primary" />
              {content?.recipesSection?.videoInstruction
                ? t(content.recipesSection.videoInstruction)
                : isAr
                ? 'انقر على أي وصفة للاطلاع على المقادير أو الاستماع للتسجيل'
                : 'Click any dish to view text steps or audio'}
            </span>
            <span className="hidden text-xs font-bold text-muted-foreground lg:block">
              {content?.recipesSection?.journalTag
                ? t(content.recipesSection.journalTag)
                : 'THE BLOSSOM VALLEY KITCHEN / 2026'}
            </span>
          </div>
        </div>

        {/* 2-Column Articles Grid with Rich Text & Interactive Triggers */}
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {dishes.map((dish) => (
            <article
              key={dish.id || dish.num}
              onClick={() => handleOpenModal(dish, 'recipe')}
              className="group grid grid-cols-[7.5rem_1fr] sm:grid-cols-[9.5rem_1fr] items-start gap-5 border-b border-border/50 pb-7 pt-1 cursor-pointer transition-colors hover:border-primary/40"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenModal(dish, 'recipe');
                }
              }}
              aria-label={`${dish.title} - ${isAr ? 'عرض الوصفة والمقادير' : 'View recipe steps'}`}
            >
              {/* Thumbnail with Dynamic Overlay */}
              <div className="relative aspect-square overflow-hidden bg-paper rounded-xl border border-border/50 shrink-0">
                <Image
                  src={dish.image}
                  alt={dish.title}
                  fill
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 7.5rem, 9.5rem"
                />
                <div className="absolute inset-0 bg-ink/10 transition-opacity group-hover:bg-ink/20" />

                {/* Prep Time Tag */}
                {dish.prepTime && (
                  <span className="absolute bottom-2 start-2 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white/95 border border-white/15">
                    {dish.prepTime}
                  </span>
                )}
              </div>

              {/* Text side */}
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      {isAr ? `الوصفة ٠${dish.num}` : `RECIPE ${dish.num}`}
                    </p>
                    <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1">
                      {isAr ? 'عرض المقادير' : 'Recipe'}
                      <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <h3 className="mt-1.5 font-display text-lg sm:text-xl font-semibold text-ink group-hover:text-primary transition-colors leading-snug">
                    {dish.title}
                  </h3>

                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {dish.subtitle}
                  </p>
                </div>

                {/* Bottom interactive action pills */}
                <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-border/50 text-[11px]">
                  <span className="inline-flex items-center gap-1 text-primary font-bold">
                    <FileText size={12} />
                    {isAr ? 'خطوات التحضير' : 'Full Steps'}
                  </span>
                  <span className="text-border">·</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Volume2 size={12} />
                    {isAr ? 'شرح صوتي' : 'Audio Guide'}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      {/* Culinary Recipe & Video Dialogue Modal */}
      {activeDish && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 sm:p-6 backdrop-blur-md transition-opacity animate-in fade-in"
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
          aria-label={activeDish.title}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-background rounded-2xl overflow-hidden shadow-xl border border-border/60"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-paper/60 shrink-0">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-bold font-mono">
                  {isAr ? `الوصفة ٠${activeDish.num}` : `RECIPE ${activeDish.num}`}
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

            {/* Navigation Tabs: Recipe Details vs Video */}
            <div className="flex border-b border-border bg-background px-6 pt-3 shrink-0">
              <button
                type="button"
                onClick={() => setModalTab('recipe')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                  modalTab === 'recipe'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-ink'
                }`}
              >
                <FileText size={15} />
                <span>{isAr ? 'المقادير وطريقة التحضير' : 'Recipe & Ingredients'}</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('video')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                  modalTab === 'video'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-ink'
                }`}
              >
                <Video size={15} />
                <span>{isAr ? 'المقطع المرئي' : 'Video Clip'}</span>
              </button>
            </div>

            {/* Modal Body Scroll Area */}
            <div className="overflow-y-auto p-6 space-y-6">
              {modalTab === 'recipe' ? (
                <>
                  {/* Hero Dish Info Banner */}
                  <div className="grid gap-5 sm:grid-cols-[11rem_1fr] items-center bg-paper/50 p-4 rounded-md border border-border/50">
                    <div className="relative aspect-square w-full rounded-xs overflow-hidden border border-border/40">
                      <Image
                        src={activeDish.image}
                        alt={activeDish.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-display text-xl font-bold text-ink">
                        {activeDish.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {activeDish.subtitle}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                        {activeDish.prepTime && (
                          <span className="inline-flex items-center gap-1.5 bg-background px-3 py-1 rounded-full border border-border/50 text-ink font-semibold">
                            <Clock size={13} className="text-primary" />
                            <span>{isAr ? 'وقت التحضير:' : 'Prep time:'} {activeDish.prepTime}</span>
                          </span>
                        )}
                        {activeDish.servings && (
                          <span className="inline-flex items-center gap-1.5 bg-background px-3 py-1 rounded-full border border-border/50 text-ink font-semibold">
                            <Users size={13} className="text-primary" />
                            <span>{isAr ? 'تكفي:' : 'Servings:'} {activeDish.servings}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Voice-over Audio Player Bar — Understated Editorial Style */}
                  <div className="bg-paper/70 p-4 rounded-md border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground shrink-0 shadow-2xs">
                        <Volume2 size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-ink">
                          {isAr ? 'التسجيل الصوتي للشرح بنطق عربي فصيح' : 'Audio Recipe Guide (Spoken Arabic)'}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {isAr
                            ? 'تسجيل ناطق بصوت نقي ومخارج حروف عربية صحيحة تصف خطوات الوصفة'
                            : 'Authentic recorded voice guidance with natural pronunciation'}
                        </p>
                      </div>
                    </div>

                    {activeDish.audioUrl ? (
                      <div>
                        <audio
                          ref={audioRef}
                          src={activeDish.audioUrl}
                          onEnded={() => setIsPlayingAudio(false)}
                        />
                        <button
                          type="button"
                          onClick={toggleAudio}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-colors cursor-pointer"
                        >
                          {isPlayingAudio ? <Pause size={14} /> : <Play size={14} />}
                          <span>{isPlayingAudio ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'تشغيل التسجيل' : 'Listen')}</span>
                        </button>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-background px-3 py-1.5 rounded-full border border-border/50">
                        {isAr ? 'التسجيل الصوتي قادم قريباً' : 'Audio recording coming soon'}
                      </span>
                    )}
                  </div>

                  {/* Ingredients Section */}
                  {activeDish.ingredients && activeDish.ingredients.length > 0 && (
                    <div>
                      <h5 className="font-display text-sm sm:text-base font-bold text-ink flex items-center gap-2 mb-3">
                        <ChefHat size={16} className="text-primary" />
                        <span>{isAr ? 'المقادير والمكونات' : 'Ingredients'}</span>
                      </h5>
                      <ul className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-foreground/90">
                        {activeDish.ingredients.map((ing, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 bg-paper/30 p-2.5 rounded-xs border border-border/40"
                          >
                            <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Step-by-Step Preparation Method */}
                  {activeDish.steps && activeDish.steps.length > 0 && (
                    <div>
                      <h5 className="font-display text-sm sm:text-base font-bold text-ink flex items-center gap-2 mb-3">
                        <FileText size={16} className="text-primary" />
                        <span>{isAr ? 'طريقة التحضير والطهي' : 'Preparation Steps'}</span>
                      </h5>
                      <div className="space-y-2.5">
                        {activeDish.steps.map((step, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 bg-background p-3.5 rounded-xs border border-border/50"
                          >
                            <span className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 font-mono">
                              {idx + 1}
                            </span>
                            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed pt-0.5">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chef Tip */}
                  {activeDish.chefTip && (
                    <div className="bg-primary-light border border-primary/20 p-4 rounded-xl">
                      <p className="text-xs font-bold text-ink flex items-center gap-1.5 mb-1">
                        <Sparkles size={14} className="text-primary" />
                        <span>{isAr ? 'لمسة من مطبخ وادي النوار:' : 'Blossom Valley Chef Tip:'}</span>
                      </p>
                      <p className="text-xs sm:text-sm text-ink/85 leading-relaxed">
                        {activeDish.chefTip}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* Video Player Box */
                <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden rounded-lg">
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
                        <source src={activeDish.videoFileUrl} type="video/mp4" />
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
                      <div className="absolute inset-0 bg-ink/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2.5 p-6 text-center">
                        <span className="bg-background/95 backdrop-blur-md text-primary text-xs font-bold px-4 py-2 rounded-full border border-border shadow-md">
                          {isAr ? 'فيديو طريقة التقديم قادم قريباً' : 'Culinary video coming soon'}
                        </span>
                        <p className="text-xs text-white/90 max-w-sm leading-relaxed">
                          {isAr
                            ? 'المقطع المرئي الحصري لهذه الوصفة يتم تجهيزه حالياً لرفعه قريباً. بإمكانك الاطلاع على المقادير والخطوات المكتوبة في تبويب الوصفة أعلاه.'
                            : 'A dedicated video demonstration for this recipe is in preparation. You can follow the full ingredients and step-by-step instructions in the Recipe tab.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Bottom WhatsApp Concierge Action */}
            <div className="px-6 py-3.5 bg-paper/60 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-muted-foreground text-center sm:text-start">
                {isAr ? 'تود تحضير هذه الوصفة بطماطم وفلفل وادي النوار؟' : 'Ready to prepare this recipe with Blossom Valley harvest?'}
              </span>

              <a
                href={buildWhatsAppLink(
                  whatsAppNumber,
                  isAr
                    ? `مرحباً وادي النوار! أود طلب الطماطم المجففة ومنتجات المزرعة لتحضير وصفة (${activeDish.title}).`
                    : `Hello The Blossom Valley! I would like to order your dried tomatoes and farm harvest to prepare (${activeDish.title}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>{isAr ? 'اطلب منتجات الوصفة عبر واتساب' : 'Order Ingredients on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
