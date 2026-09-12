'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, VideoItem } from '@/types/content';
import { Play } from 'lucide-react';
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

        {/* Farm Photo + Story Quote — Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Farm Photo */}
          <div className="reveal-child">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E8DFD1] aspect-[4/3]">
                <Image
                  src="/images/about-farm.jpg"
                  alt="The Blossom's Farm — artisanal greenhouse in Al-Ammariyah"
                  fill
                  quality={95}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Clean soft vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#122419]/40 via-transparent to-transparent" />
                
                {/* Floating badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-sm border border-[#C5A059]/30 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-xs font-bold text-[#1B3B2B] font-arabic">
                      {language === 'ar' ? 'العمارية، الرياض' : 'Al-Ammariyah, Riyadh'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">
                    {language === 'ar' ? 'عضوي ١٠٠٪' : '100% Organic'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quote + Video Card */}
          <div className="space-y-6 reveal-child">
            {/* Elegant Quote */}
            <blockquote className="relative p-6 sm:p-7 rounded-3xl bg-[#F5EFE6] border-s-4 border-[#C5A059]">
              <div className="absolute -top-3 start-5 text-[#C5A059] text-5xl font-serif-luxury leading-none select-none opacity-40">
                &ldquo;
              </div>
              <p className="text-base sm:text-lg font-medium text-[#1B3B2B] leading-relaxed font-arabic relative z-10">
                {t(content.about.quote)}
              </p>
              <footer className="mt-3 text-xs sm:text-sm font-bold text-[#C85A32] tracking-wide font-arabic">
                — {t(content.about.quoteAuthor)}
              </footer>
            </blockquote>

            {/* Farm Story Cinema Card */}
            <div
              onClick={() => setSelectedVideo(featuredVideo)}
              className="relative rounded-3xl overflow-hidden aspect-video bg-[#122419] shadow-lg border border-[#E8DFD1] group cursor-pointer"
            >
              <Image
                src="/images/video-featured.jpg"
                alt="Farm promo video"
                fill
                quality={90}
                className="object-cover object-center opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122419]/80 via-[#122419]/25 to-black/20" />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-2.5 rounded-full border border-[#C5A059]/60 play-ripple-ring-1 pointer-events-none" />
                  <div className="absolute -inset-5 rounded-full border border-[#C5A059]/40 play-ripple-ring-2 pointer-events-none" />
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#C5A059] to-[#D8B878] group-hover:from-[#D8B878] group-hover:to-[#C5A059] text-[#122419] flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 border-2 border-white/80">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 ms-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-3.5 left-4 right-4 text-center">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-sm text-white text-xs font-semibold border border-white/20 font-arabic">
                  {language === 'ar' ? '▶ شاهد قصة المزرعة (٢:٤٥)' : '▶ Watch Our Farm Story (2:45)'}
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
