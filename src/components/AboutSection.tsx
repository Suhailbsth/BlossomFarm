'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, VideoItem } from '@/types/content';
import { Play, Sparkles } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import VideoModal from './VideoModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface AboutSectionProps {
  content: SiteContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  const { language, t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const featuredVideo =
    content.videosSection.items.find((v) => v.type === 'featured') ||
    content.videosSection.items[0];

  return (
    <section
      id="story"
      className="py-24 sm:py-36 px-5 sm:px-8 bg-organic-linen relative overflow-hidden"
    >
      {/* Organic ambient light */}
      <div className="absolute top-1/3 -end-32 w-80 h-80 rounded-full bg-[#C5A059]/8 blur-3xl pointer-events-none" />

      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto relative z-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Section Header with Organic Editorial Tag */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 reveal-child">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1B3B2B]/8 text-[#C85A32] text-xs font-bold uppercase tracking-[0.12em] mb-4 font-arabic">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            {t(content.about.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-[1.25]">
            {t(content.about.title)}
          </h2>
          <ArabesqueDivider variant="gold" size="md" className="my-5" />
        </div>

        {/* Asymmetric Overlapping Layout: Photo + Floating Parchment Quote + Cinema Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Farm Photo Column (7 cols) with Organic Tilt & Wax Seal */}
          <div className="lg:col-span-7 reveal-child">
            <div className="relative transform lg:rotate-[-1deg] transition-transform duration-500 hover:rotate-0">
              {/* Decorative Offset Backdrop */}
              <div className="absolute -inset-2.5 rounded-organic-1 bg-gradient-to-tr from-[#C5A059]/20 to-[#C85A32]/10 blur-[1px] transform rotate-1" />

              <div className="relative rounded-organic-1 overflow-hidden shadow-organic-lg border border-[#E8DFD1] aspect-[4/3] bg-[#FAF7F2]">
                <Image
                  src="/images/about-farm.jpg"
                  alt="The Blossom's Farm — artisanal greenhouse in Al-Ammariyah"
                  fill
                  quality={95}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#122419]/45 via-transparent to-transparent" />

                {/* Artisanal Heritage Wax Seal */}
                <div className="absolute top-4 start-4 z-10">
                  <div className="w-14 h-14 rounded-full bg-[#1B3B2B]/90 backdrop-blur-xs border border-[#C5A059]/60 flex flex-col items-center justify-center text-center shadow-lg text-[#C5A059]">
                    <span className="text-[9px] font-bold uppercase tracking-wider font-arabic leading-none">
                      {language === 'ar' ? 'مزرعة' : 'Est.'}
                    </span>
                    <span className="text-xs font-serif-luxury font-bold leading-none mt-0.5 text-white">
                      2024
                    </span>
                    <span className="text-[8px] text-[#C5A059] font-arabic leading-none mt-0.5">
                      {language === 'ar' ? 'العمارية' : 'Oasis'}
                    </span>
                  </div>
                </div>

                {/* Floating Location Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#C5A059]/30 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-xs font-bold text-[#1B3B2B] font-arabic">
                      {language === 'ar' ? 'واحة العمارية، الرياض' : 'Al-Ammariyah Oasis, Riyadh'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">
                    {language === 'ar' ? 'محصول عضوي حي' : 'Living Organic Soil'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Quote + Interactive Farm Cinema Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6 reveal-child lg:-ms-6 z-20">
            {/* Elegant Parchment Quote Card */}
            <blockquote className="relative p-6 sm:p-8 rounded-organic-card bg-[#F5EFE6] border-s-4 border-[#C85A32] shadow-organic-md">
              <div className="absolute -top-3 start-5 text-[#C5A059] text-5xl font-serif-luxury leading-none select-none opacity-40">
                &ldquo;
              </div>
              <p className="text-base sm:text-lg font-medium text-[#1B3B2B] leading-relaxed font-arabic relative z-10">
                {t(content.about.quote)}
              </p>
              <footer className="mt-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-[#C85A32] font-arabic">
                <span>— {t(content.about.quoteAuthor)}</span>
                <span className="text-[10px] text-[#7A8A7E] font-serif-luxury italic">Al-Ammariyah Sanctuary</span>
              </footer>
            </blockquote>

            {/* Farm Story Cinema Card */}
            <div
              onClick={() => setSelectedVideo(featuredVideo)}
              className="relative rounded-organic-card overflow-hidden aspect-video bg-[#122419] shadow-organic-md border border-[#E8DFD1] group cursor-pointer transition-all duration-300 hover:scale-[1.015]"
            >
              <Image
                src="/images/video-featured.jpg"
                alt="Farm promo video"
                fill
                quality={90}
                className="object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122419]/80 via-[#122419]/25 to-black/20" />

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-2 rounded-full border border-[#C5A059]/60 play-ripple-ring-1 pointer-events-none" />
                  <div className="absolute -inset-4 rounded-full border border-[#C5A059]/40 play-ripple-ring-2 pointer-events-none" />
                  <div className="relative w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#D8B878] text-[#122419] flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 border-2 border-white/80">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ms-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Caption Bar */}
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-semibold border border-white/20 font-arabic">
                  {language === 'ar' ? '▶ شاهد وثائقي المزرعة (٢:٤٥)' : '▶ Watch Garden Film (2:45)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  );
}
