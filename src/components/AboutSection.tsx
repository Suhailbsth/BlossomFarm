'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { Play } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface AboutSectionProps {
  content: SiteContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const { language, t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section
      id="story"
      className="py-24 sm:py-32 px-5 sm:px-8 bg-[#FAF7F2] relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-arabesque-star opacity-40 pointer-events-none" />

      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto relative z-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 reveal-child">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A3826]/8 text-[#C65A3D] text-xs font-bold uppercase tracking-[0.15em] mb-4 font-arabic">
            {t(content.about.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A3826] font-arabic leading-[1.15]">
            {t(content.about.title)}
          </h2>
          <ArabesqueDivider variant="gold" size="md" className="my-5" />
        </div>

        {/* Farm Photo + Quote — Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 sm:mb-20">
          {/* Farm Photo */}
          <div className="reveal-child">
            <div className="relative">
              {/* Decorative offset frame */}
              <div className="absolute -inset-3 bg-gradient-to-br from-[#C9A043]/15 to-[#C65A3D]/10 rounded-[28px] transform -rotate-1" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E5DACB] aspect-[4/3]">
                <Image
                  src="/images/about-farm.jpg"
                  alt="The Blossom's Farm — artisanal greenhouse in Al-Ammariyah"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#122419]/40 via-transparent to-transparent" />
                
                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#C9A043]/30 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#1A3826] font-arabic">
                      {language === 'ar' ? 'العمارية، الرياض' : 'Al-Ammariyah, Riyadh'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#C65A3D] uppercase tracking-wider">
                    {language === 'ar' ? 'عضوي ١٠٠٪' : '100% Organic'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quote + Short Description */}
          <div className="space-y-8 reveal-child">
            {/* Elegant Quote */}
            <blockquote className="relative p-7 sm:p-8 rounded-3xl bg-[#F4EFE7] border-s-4 border-[#C9A043]">
              <div className="absolute -top-3 start-6 text-[#C9A043] text-5xl font-serif-luxury leading-none select-none opacity-40">
                &ldquo;
              </div>
              <p className="text-lg sm:text-xl font-medium text-[#1A3826] leading-relaxed font-arabic relative z-10">
                {t(content.about.quote)}
              </p>
              <footer className="mt-4 text-sm font-bold text-[#C65A3D] tracking-wide font-arabic">
                — {t(content.about.quoteAuthor)}
              </footer>
            </blockquote>

            {/* Promo Video Embed Placeholder */}
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-[#122419] shadow-xl border border-[#E5DACB] group cursor-pointer">
              <Image
                src="/images/video-featured.jpg"
                alt="Farm promo video"
                fill
                className="object-cover object-center opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122419]/80 via-[#122419]/30 to-[#122419]/20" />
              
              {/* Play Button with Concentric Water-Ripple Animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-3 rounded-full border border-[#C9A043]/60 play-ripple-ring-1 pointer-events-none" />
                  <div className="absolute -inset-6 rounded-full border border-[#C9A043]/40 play-ripple-ring-2 pointer-events-none" />
                  <div className="absolute -inset-9 rounded-full border border-[#C9A043]/20 play-ripple-ring-3 pointer-events-none" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#C9A043] to-[#E2B755] group-hover:from-[#DFBF73] group-hover:to-[#C9A043] text-[#122419] flex items-center justify-center shadow-[0_0_30px_rgba(201,160,67,0.5)] transition-all duration-300 group-hover:scale-110 border-2 border-white/60">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 ms-1 fill-current" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold border border-white/15 font-arabic">
                  {language === 'ar' ? '▶ شاهد قصة المزرعة' : '▶ Watch Our Farm Story'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
