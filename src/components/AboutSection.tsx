'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import Reveal from './Reveal';
import { Play, X, Compass, Sprout, ShieldCheck } from 'lucide-react';

interface AboutSectionProps {
  content?: SiteContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const { language, isRTL, t } = useLanguage();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const isAr = language === 'ar';

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoModalOpen(false);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isVideoModalOpen]);

  const pillars = [
    {
      icon: Compass,
      title: isAr ? 'محافظة شقراء' : 'Shaqra Terroir',
      desc: isAr ? 'أرض نجد الأصيلة وشمسها الدافئة' : 'Pure soil, generous sunlight',
    },
    {
      icon: Sprout,
      title: isAr ? 'عناية متكاملة' : 'End-to-End Care',
      desc: isAr ? 'من البذرة والتربية حتى مائدتك' : 'From seedling & herd to table',
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'جودة نقية' : 'Natural Purity',
      desc: isAr ? 'برسيم أخضر ورعاية فائقة' : 'Farm-grown feed & high standards',
    },
  ];

  return (
    <section id="farm" className="scroll-mt-20 bg-paper px-6 sm:px-10 lg:px-16 2xl:px-20 py-20 sm:py-28 transition-colors">
      <Reveal className="mx-auto grid max-w-[1440px] gap-10 lg:gap-14 md:grid-cols-[.85fr_1.15fr] md:items-center">
        {/* Left Column: Text, Narrative & Pillars */}
        <div>
          <p className="editorial-kicker">
            {content?.about?.eyebrow
              ? t(content.about.eyebrow)
              : isAr
              ? 'موطننا · ٠١'
              : 'Our home · 01'}
          </p>

          <h2 className="editorial-title">
            {content?.about?.title ? t(content.about.title) : isAr ? 'وادي النوار' : 'Wadi Nawar'}
          </h2>

          <p className="mt-4 font-display text-lg sm:text-xl font-medium text-ink leading-snug">
            {content?.about?.quote
              ? t(content.about.quote)
              : isAr
              ? 'وادٍ أخضر حيث تجتمع الشمس والتربة والرعاية لتنبض كل مواسم الحصاد بالحياة.'
              : 'A green valley where sun, soil and care bring every harvest to life.'}
          </p>

          <p className="editorial-copy">
            {content?.about?.storyParagraphs && content.about.storyParagraphs.length > 0
              ? t(content.about.storyParagraphs[0])
              : isAr
              ? 'تقع مزرعتنا في محافظة شقراء؛ بيئة زراعية هادئة حيث تُدار كل مرحلة — من الزراعة وتربية الماشية، إلى إعداد المنتجات وتوصيلها — بعناية فائقة. نركز دوماً على الجودة والاهتمام الصادق بأدق التفاصيل لتقديم أنقى خيرات الأرض.'
              : 'Located in Shaqra city, a peaceful farm environment where every stage — from farming and raising animals, to preparing and delivering products — is carefully managed with unwavering focus on quality and attention to small details.'}
          </p>

          {/* 3 Core Values / Pillars */}
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 border-t border-border pt-6">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="space-y-1">
                  <Icon size={16} className="text-primary mb-1.5 stroke-[1.75]" />
                  <h3 className="font-display text-xs sm:text-sm font-semibold text-ink leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Clean, Sunlit Reference Farm Photo with Discreet Video Pill */}
        <div className="relative aspect-[4/3] h-full w-full overflow-hidden bg-background group border border-border shadow-xs">
          <Image
            src={content?.about?.imageUrl || 'https://cdn.sanity.io/images/tokh7kkd/production/3289afe6440bc9cfdf72314c627ba948ba325ea2-1600x1104.jpg'}
            alt={isAr ? 'وادي النوار بشقراء' : 'Wadi Nawar farm in Shaqra'}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-105"
            priority
          />

          {/* Discreet, elegant video trigger pill */}
          {(content?.about?.videoFileUrl || content?.about?.videoUrl) && (
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="absolute bottom-4 start-4 inline-flex items-center gap-2.5 rounded-full bg-background/95 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-primary shadow-md hover:bg-background transition-all hover:scale-105 cursor-pointer border border-border"
              aria-label={isAr ? 'مشاهد من وادي النوار' : 'Watch farm film'}
            >
              <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                <Play size={10} className="fill-current translate-x-0.5" />
              </span>
              <span>{isAr ? 'مشاهد من الوادي' : 'Watch farm film'}</span>
            </button>
          )}

          {/* Location badge in top corner */}
          <span className="absolute top-4 end-4 bg-background/90 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary border border-border">
            {isAr ? 'محافظة شقراء' : 'Shaqra, KSA'}
          </span>
        </div>
      </Reveal>

      {/* Editorial Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md transition-opacity"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-3xl bg-background rounded-lg overflow-hidden shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-paper/50">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="font-display text-sm font-semibold text-ink">
                  {isAr ? 'وادي النوار — جولة في المزرعة' : 'Wadi Nawar — Farm Film'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full border border-border bg-background hover:bg-muted text-ink flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                poster={content?.about?.imageUrl || 'https://cdn.sanity.io/images/tokh7kkd/production/3289afe6440bc9cfdf72314c627ba948ba325ea2-1600x1104.jpg'}
                className="h-full w-full object-contain"
              >
                {content?.about?.videoFileUrl && (
                  <source src={content.about.videoFileUrl} type="video/mp4" />
                )}
                {content?.about?.videoUrl && (
                  <source src={content.about.videoUrl} />
                )}
                {isAr ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support HTML5 video.'}
              </video>
            </div>

            {/* Modal Footer Caption */}
            <div className="px-6 py-3.5 bg-paper/30 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
              <span>{isAr ? 'محافظة شقراء، المملكة العربية السعودية' : 'Shaqra City, Saudi Arabia'}</span>
              <span className="font-semibold text-primary">The Blossom Valley</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
