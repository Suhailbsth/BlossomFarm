'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, VideoItem } from '@/types/content';
import { Play, Film, UtensilsCrossed } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import VideoModal from './VideoModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface VideoGalleryProps {
  content: SiteContent;
}

export default function VideoGallery({ content }: VideoGalleryProps) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'farm' | 'recipes'>('farm');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const farmVideos = content.videosSection.items.filter((v) => v.type === 'short');
  const recipes = content.recipeVideosSection.items;

  return (
    <section
      id="videos"
      className="py-20 sm:py-28 px-5 sm:px-8 bg-[#F5EFE6] relative"
    >
      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 reveal-child">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1B3B2B]/8 text-[#C85A32] text-xs font-bold uppercase tracking-[0.15em] mb-3.5 font-arabic">
            <Film className="w-3.5 h-3.5 text-[#C85A32]" />
            {t(content.videosSection.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-[1.15]">
            {language === 'ar' ? 'سينما الحديقة ومطبخ المزرعة' : 'Garden Vignettes & Kitchen'}
          </h2>
          <ArabesqueDivider variant="gold" size="md" className="my-4" />

          {/* Interactive Category Filter Switcher */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-white border border-[#E8DFD1] shadow-xs mt-3">
            <button
              type="button"
              onClick={() => setActiveTab('farm')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'farm'
                  ? 'bg-[#1B3B2B] text-white shadow-sm'
                  : 'text-[#5C6E61] hover:text-[#1B3B2B]'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span className="font-arabic">
                {language === 'ar' ? 'مشاهد الواحة (٤)' : 'Oasis Shorts (4)'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('recipes')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'recipes'
                  ? 'bg-[#C85A32] text-white shadow-sm'
                  : 'text-[#5C6E61] hover:text-[#1B3B2B]'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span className="font-arabic">
                {language === 'ar' ? 'وصفات الطهي (٤)' : 'Recipes (4)'}
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
          {activeTab === 'farm'
            ? farmVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="reveal-child group relative rounded-2xl overflow-hidden aspect-[9/15] bg-[#122419] border border-[#E8DFD1] hover:border-[#C5A059] shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <Image
                    src={video.thumbnail}
                    alt={video.title.en}
                    fill
                    quality={90}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25 group-hover:via-black/10 transition-all duration-300" />

                  {/* Duration */}
                  <div className="absolute top-2.5 end-2.5 z-10">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold border border-white/20">
                      {video.duration}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-11 h-11 rounded-full bg-white/95 group-hover:bg-[#C5A059] text-[#122419] flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 border border-white/70">
                      <Play className="w-4 h-4 ms-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Title at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                    <h4 className="text-xs sm:text-sm font-bold text-white font-arabic leading-snug line-clamp-2 group-hover:text-[#D8B878] transition-colors">
                      {t(video.title)}
                    </h4>
                  </div>
                </div>
              ))
            : recipes.map((recipe) => (
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
                        en: 'Recipe Inspiration',
                        ar: 'وصفة طهي ملهمة',
                      },
                      thumbnail: recipe.thumbnail,
                      type: 'short',
                      description: {
                        en: "Crafted with fresh heirloom tomatoes from The Blossom's Farm in Al-Ammariyah.",
                        ar: 'مُعدّة باستخدام طماطم متوارثة نضرة قُطفت مباشرة من بيوتنا المحمية في العمارية.',
                      },
                    })
                  }
                  className="reveal-child group relative rounded-2xl overflow-hidden aspect-[9/15] bg-[#122419] border border-[#E8DFD1] hover:border-[#C85A32] shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Thumbnail */}
                  <Image
                    src={recipe.thumbnail}
                    alt={recipe.dishName.en}
                    fill
                    quality={90}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25 group-hover:via-black/10 transition-all duration-300" />

                  {/* Duration */}
                  <div className="absolute top-2.5 end-2.5 z-10">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold border border-white/20">
                      {recipe.duration}
                    </span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-11 h-11 rounded-full bg-white/95 group-hover:bg-[#C85A32] text-[#122419] group-hover:text-white flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110 border border-white/70">
                      <Play className="w-4 h-4 ms-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Recipe Name at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10 text-center">
                    <h4 className="text-sm font-bold text-white font-arabic leading-snug group-hover:text-[#EBB6A4] transition-colors">
                      {t(recipe.dishName)}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-white/70 font-serif-luxury italic">
                      {language === 'ar' ? recipe.dishName.en : recipe.dishName.ar}
                    </p>
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
