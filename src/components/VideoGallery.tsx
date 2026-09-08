'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, VideoItem } from '@/types/content';
import { Play, Sparkles, Film, Clock, Eye } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import VideoModal from './VideoModal';

interface VideoGalleryProps {
  content: SiteContent;
}

export default function VideoGallery({ content }: VideoGalleryProps) {
  const { language, t } = useLanguage();
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const featuredVideo = content.videosSection.items.find((v) => v.type === 'featured') || content.videosSection.items[0];
  const shortVideos = content.videosSection.items.filter((v) => v.type === 'short');

  return (
    <section id="videos" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F4EFE7] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A3826]/10 text-[#1A3826] text-xs font-bold uppercase tracking-wider mb-3">
            <Film className="w-3.5 h-3.5 text-[#C65A3D]" />
            <span>{t(content.videosSection.eyebrow)}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A3826] font-arabic leading-tight">
            {t(content.videosSection.title)}
          </h2>

          <ArabesqueDivider variant="green" size="md" className="my-4" />

          <p className="text-base sm:text-lg text-[#5C6E61] leading-relaxed">
            {t(content.videosSection.description)}
          </p>
        </div>

        {/* 1. Featured Garden Documentary Video Card */}
        {featuredVideo && (
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#C65A3D] font-arabic flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C65A3D]" />
                {t(content.videosSection.featuredLabel)}
              </span>
              <span className="text-xs text-[#5C6E61] font-medium">
                {featuredVideo.duration} • 4K HDR
              </span>
            </div>

            <div
              onClick={() => setSelectedVideo(featuredVideo)}
              className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E5DACB] group cursor-pointer bg-[#122419]"
            >
              {/* Image Still */}
              <Image
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title.en}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />

              {/* Layered Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:via-black/20 transition-all duration-300" />

              {/* Center Giant Play Button with Glowing Arabesque Ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-4 rounded-full bg-[#C9A043]/30 animate-ping opacity-60 pointer-events-none" />
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#C9A043] group-hover:bg-[#dfbf73] text-[#122419] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 border-2 border-white/50">
                    <Play className="w-7 sm:w-9 h-7 sm:h-9 ms-1 fill-current" />
                  </div>
                </div>
              </div>

              {/* Card Footer Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A3826]/90 border border-[#C9A043]/50 text-xs font-semibold text-[#FAF7F2] mb-2 font-arabic">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A043]" />
                  <span>{t(featuredVideo.tag)}</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold font-arabic text-white mb-2 leading-tight">
                  {t(featuredVideo.title)}
                </h3>

                <p className="text-xs sm:text-base text-[#E5DACB] max-w-2xl font-arabic line-clamp-2 sm:line-clamp-none">
                  {t(featuredVideo.subtitle)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Four Short AI-Generated Vignettes Grid / Mobile Scroll */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A3826] font-arabic flex items-center gap-1.5">
              <Film className="w-4 h-4 text-[#C9A043]" />
              {t(content.videosSection.shortsLabel)}
            </span>
            <span className="text-xs text-[#5C6E61] font-medium">
              {language === 'ar' ? '٤ مقاطع قصيرة' : '4 Short Vignettes'}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {shortVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] bg-[#122419] border border-[#E5DACB] hover:border-[#C9A043] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Reel Thumbnail */}
                <Image
                  src={video.thumbnail}
                  alt={video.title.en}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Ambient Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 group-hover:via-black/10 transition-all duration-300" />

                {/* Top Duration & Tag */}
                <div className="relative z-10 p-3 flex items-center justify-between text-[11px] font-semibold text-white">
                  <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs border border-white/20">
                    {video.duration}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#1A3826]/80 text-[#C9A043] border border-[#C9A043]/30 font-arabic text-[10px]">
                    {t(video.tag)}
                  </span>
                </div>

                {/* Hover Play Button */}
                <div className="relative z-10 self-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2]/90 group-hover:bg-[#C9A043] text-[#122419] flex items-center justify-center shadow-lg transition-transform group-hover:scale-115">
                    <Play className="w-5 h-5 ms-0.5 fill-current" />
                  </div>
                </div>

                {/* Bottom Title & Subtitle */}
                <div className="relative z-10 p-3 sm:p-4 text-white">
                  <h4 className="text-xs sm:text-sm font-bold font-arabic text-white line-clamp-1 group-hover:text-[#C9A043] transition-colors">
                    {t(video.title)}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-[#E5DACB]/80 font-arabic line-clamp-2 mt-0.5">
                    {t(video.subtitle)}
                  </p>
                </div>
              </div>
            ))}
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
