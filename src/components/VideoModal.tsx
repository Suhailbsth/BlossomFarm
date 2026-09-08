'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { VideoItem } from '@/types/content';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Share2, Check } from 'lucide-react';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!video) return;

    // Simulate video playing progress
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, video]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isFeatured = video.type === 'featured';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          isFeatured ? 'max-w-4xl' : 'max-w-md'
        } bg-[#122419] border border-[#C9A043]/30 rounded-3xl overflow-hidden shadow-2xl text-white`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white transition-colors border border-white/20"
          aria-label="Close video player"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Canvas Container */}
        <div
          className={`relative w-full ${
            isFeatured ? 'aspect-video' : 'aspect-[9/16] max-h-[70vh]'
          } overflow-hidden bg-black`}
        >
          {/* Visual Still / Ambient Loop */}
          <Image
            src={video.thumbnail}
            alt={video.title.en}
            fill
            className={`object-cover object-center transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
            sizes="(max-width: 768px) 100vw, 800px"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

          {/* Top Tag & Audio Toggle */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#1A3826]/90 border border-[#C9A043]/50 text-xs font-semibold text-[#F4EFE7] flex items-center gap-1.5 font-arabic">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A043]" />
              {t(video.tag)}
            </span>
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white/90 border border-white/20 transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Center Play/Pause Touch Area */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <div
              className={`w-16 h-16 rounded-full bg-[#C9A043]/90 hover:bg-[#C9A043] text-[#122419] flex items-center justify-center shadow-xl border-2 border-white/40 transition-transform ${
                isPlaying ? 'opacity-0 hover:opacity-100 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ms-1 fill-current" />}
            </div>
          </div>

          {/* Video Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
            <div
              className="h-full bg-[#C9A043] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Video Info Bottom Drawer */}
        <div className="p-5 sm:p-6 bg-[#122419]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-arabic text-white mb-1">
                {t(video.title)}
              </h3>
              <p className="text-xs sm:text-sm text-[#E5DACB]/80 font-arabic line-clamp-2">
                {t(video.description)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 shrink-0 flex items-center gap-1 text-xs transition-colors border border-white/10"
              title="Share link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#E5DACB]/60 font-medium">
            <span>{video.duration}</span>
            <span className="font-arabic text-[#C9A043]">
              {language === 'ar' ? 'مزرعة النوار — العمارية' : "The Blossom's Farm — Al-Ammariyah"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
