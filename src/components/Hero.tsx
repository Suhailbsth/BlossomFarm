'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { Sparkles, MessageCircle, ArrowDown, ShieldCheck, QrCode } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';

interface HeroProps {
  content: SiteContent;
}

export default function Hero({ content }: HeroProps) {
  const { language, isRTL, t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Hero Image with Warm Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-garden.jpg"
          alt="The Blossom's Farm Greenhouse Garden"
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000"
          sizes="100vw"
        />
        {/* Layered luxury gradient scrims: top darkening for nav, warm amber vignette, bottom fade to sand */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#122419]/80 via-[#122419]/45 to-[#FAF7F2]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(18,36,25,0.7)_100%)]" />
      </div>

      {/* Decorative Arabesque Corner Flairs */}
      <div className="hidden lg:block absolute top-28 left-8 z-10 opacity-30 text-[#C9A043] pointer-events-none">
        <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
          <path d="M10 10 H60 M10 10 V60 M20 20 H50 M20 20 V50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="10" cy="10" r="4" fill="currentColor" />
        </svg>
      </div>
      <div className="hidden lg:block absolute top-28 right-8 z-10 opacity-30 text-[#C9A043] pointer-events-none">
        <svg width="72" height="72" viewBox="0 0 100 100" fill="none">
          <path d="M90 10 H40 M90 10 V60 M80 20 H50 M80 20 V50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="90" cy="10" r="4" fill="currentColor" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Welcome Tag & QR Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-md border border-[#C9A043]/50 text-[#1A3826] text-xs sm:text-sm font-semibold shadow-md mb-6 animate-float-slow">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A043] animate-spin-slow" />
          <span>{t(content.hero.welcomeBadge)}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C65A3D]" />
          <span className="text-[11px] font-normal text-[#6B5A4B] hidden sm:inline">
            {t(content.brand.badge)}
          </span>
        </div>

        {/* Dual Bilingual Title - The Star of the Hero */}
        <div className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
          {/* Majestic Arabic Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-arabic text-white drop-shadow-md leading-tight">
            مزرعة النوار
          </h1>

          {/* Elegant English Serif Title */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury tracking-wide text-[#FAF7F2] drop-shadow-sm italic">
            The Blossom&apos;s Farm
          </h2>
        </div>

        {/* Arabesque Divider Accent */}
        <ArabesqueDivider variant="gold" size="lg" className="my-2 text-white/80" />

        {/* Soft Tagline & Bilingual Narrative */}
        <p className="mt-3 text-lg sm:text-xl md:text-2xl font-medium text-[#F4EFE7] max-w-2xl mx-auto leading-relaxed drop-shadow-xs font-arabic">
          {t(content.brand.tagline)}
        </p>

        <p className="mt-4 text-sm sm:text-base text-[#E5DACB] max-w-xl mx-auto leading-relaxed drop-shadow-xs">
          {t(content.hero.subheading)}
        </p>

        {/* Call to Actions (Mobile Optimized) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
          {/* Primary Harvest Button */}
          <a
            href="#tomatoes"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1A3826] hover:bg-[#28573D] text-[#FAF7F2] font-semibold text-sm sm:text-base shadow-lg border border-[#C9A043]/40 transition-all hover:scale-103 flex items-center justify-center gap-2 group"
          >
            <span>{t(content.hero.ctaHarvest)}</span>
            <ArrowDown className="w-4 h-4 text-[#C9A043] transition-transform group-hover:translate-y-1" />
          </a>

          {/* WhatsApp Direct Concierge */}
          <a
            href={`https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              language === 'ar'
                ? content.footer.whatsAppPrefillAr
                : content.footer.whatsAppPrefillEn
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FAF7F2]/90 hover:bg-white text-[#1A3826] font-semibold text-sm sm:text-base shadow-lg border border-[#E5DACB] backdrop-blur-md transition-all hover:scale-103 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{t(content.hero.ctaWhatsApp)}</span>
          </a>
        </div>

        {/* Mini Trust Highlights Strip */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#F4EFE7]/90">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C9A043]" />
            <span>{language === 'ar' ? 'عضوي معتمد ١٠٠٪' : '100% Certified Organic'}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-[#C9A043]" />
          <div className="flex items-center gap-1.5">
            <span className="text-base leading-none">🇸🇦</span>
            <span>{language === 'ar' ? 'زُرعت في الرياض، العمارية' : 'Grown in Al-Ammariyah, Riyadh'}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-[#C9A043] hidden sm:block" />
          <div className="hidden sm:flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-[#C65A3D]" />
            <span>{language === 'ar' ? 'دخول مباشر عبر رمز QR' : 'Instant QR Farm Pass'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
