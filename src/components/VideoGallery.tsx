'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, VideoItem } from '@/types/content';
import { Play, Film } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import VideoModal from './VideoModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface VideoGalleryProps {
  content: SiteContent;
}

export default function VideoGallery({ content }: VideoGalleryProps) {
  const { language, t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const shortVideos = content.videosSection.items.filter((v) => v.type === 'short');

  return (
    <section
      id="videos"
      className="py-24 sm:py-32 px-5 sm:px-8 bg-[#F4EFE7] relative"
    >
      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16 reveal-child">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A3826]/10 text-[#1A3826] text-xs font-bold uppercase tracking-[0.15em] mb-4 font-arabic">
            <Film className="w-3.5 h-3.5 text-[#C65A3D]" />
            {t(content.videosSection.eyebrow)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A3826] font-arabic leading-[1.15]">
            {t(content.videosSection.title)}
          </h2>
          <ArabesqueDivider variant="green" size="md" className="my-5" />
        </div>

        {/* 4 Short Vignette Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {shortVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="reveal-child group relative rounded-3xl overflow-hidden aspect-[9/16] bg-[#122419] border border-[#E5DACB] hover:border-[#C9A043] shadow-md hover:shadow-xl cursor-pointer card-premium card-sheen"
            >
              {/* Thumbnail */}
              <Image
                src={video.thumbnail}
                alt={video.title.en}
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25 group-hover:via-black/10 transition-all duration-300" />

              {/* Duration */}
              <div className="absolute top-3 end-3 z-10">
                <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold border border-white/15">
                  {video.duration}
                </span>
              </div>

              {/* Play Button with Water-Ripple */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-2.5 rounded-full border border-[#C9A043]/70 play-ripple-ring-1 pointer-events-none" />
                  <div className="absolute -inset-5 rounded-full border border-[#C9A043]/40 play-ripple-ring-2 pointer-events-none" />
                  <div className="w-12 h-12 rounded-full bg-white/95 group-hover:bg-[#C9A043] text-[#122419] flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 border border-white/60">
                    <Play className="w-5 h-5 ms-0.5 fill-current" />
                  </div>
                </div>
              </div>

              {/* Title at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                <h4 className="text-xs sm:text-sm font-bold text-white font-arabic leading-snug line-clamp-2 group-hover:text-[#C9A043] transition-colors">
                  {t(video.title)}
                </h4>
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
