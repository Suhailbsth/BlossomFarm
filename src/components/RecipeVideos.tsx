'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, VideoItem } from '@/types/content';
import { Play } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import VideoModal from './VideoModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RecipeVideosProps {
  content: SiteContent;
}

export default function RecipeVideos({ content }: RecipeVideosProps) {
  const { language, t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();

  return (
    <section className="py-24 sm:py-32 px-5 sm:px-8 bg-[#1A3826] relative overflow-hidden">
      {/* Arabesque pattern overlay */}
      <div className="absolute inset-0 bg-arabesque-oasis opacity-15 pointer-events-none" />

      <div
        ref={sectionRef}
        className={`max-w-5xl mx-auto relative z-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16 reveal-child">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#C9A043] text-xs font-bold uppercase tracking-[0.15em] mb-4 border border-[#C9A043]/30 font-arabic">
            {t(content.recipeVideosSection.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-arabic leading-[1.15]">
            {t(content.recipeVideosSection.title)}
          </h2>
          <ArabesqueDivider variant="gold" size="md" className="my-5" />
        </div>

        {/* 4 Recipe Video Cards — Portrait Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {content.recipeVideosSection.items.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() =>
                setSelectedVideo({
                  id: recipe.id,
                  title: recipe.dishName,
                  subtitle: {
                    en: 'Farm-to-Table Culinary Inspiration',
                    ar: 'إلهام طهي من المزرعة إلى المائدة',
                  },
                  duration: recipe.duration,
                  tag: {
                    en: 'AI Recipe Reel',
                    ar: 'وصفة AI ملهمة',
                  },
                  thumbnail: recipe.thumbnail,
                  type: 'short',
                  description: {
                    en: `Crafted with freshly harvested heirloom tomatoes from The Blossom's Farm in Al-Ammariyah.`,
                    ar: `مُعدّة باستخدام طماطم متوارثة نضرة قُطفت مباشرة من بيوتنا المحمية في العمارية.`,
                  },
                })
              }
              className="reveal-child group relative rounded-3xl overflow-hidden aspect-[9/14] bg-[#122419] border border-white/10 hover:border-[#C9A043]/60 shadow-xl cursor-pointer card-premium card-sheen"
            >
              {/* Thumbnail */}
              <Image
                src={recipe.thumbnail}
                alt={recipe.dishName.en}
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 group-hover:via-black/15 transition-all duration-300" />

              {/* Duration badge */}
              <div className="absolute top-3 end-3 z-10">
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold border border-white/15">
                  {recipe.duration}
                </span>
              </div>

              {/* Center Play Button with Ripples */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-2.5 rounded-full border border-[#C9A043]/70 play-ripple-ring-1 pointer-events-none" />
                  <div className="absolute -inset-5 rounded-full border border-[#C9A043]/40 play-ripple-ring-2 pointer-events-none" />
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/90 group-hover:bg-[#C9A043] text-[#122419] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border border-white/60">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ms-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Dish Name at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
                <h3 className="text-base sm:text-lg font-bold text-white font-arabic leading-snug text-center">
                  {t(recipe.dishName)}
                </h3>
                <p className="mt-1 text-center text-[10px] sm:text-xs text-[#E5DACB]/70 font-serif-luxury italic">
                  {language === 'ar' ? recipe.dishName.en : recipe.dishName.ar}
                </p>
              </div>

              {/* AI Badge */}
              <div className="absolute top-3 start-3 z-10">
                <span className="px-2 py-0.5 rounded-full bg-[#C9A043]/80 text-[#122419] text-[9px] font-bold tracking-wider uppercase">
                  AI
                </span>
              </div>
            </div>
          ))}
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
