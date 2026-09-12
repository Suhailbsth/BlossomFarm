'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { MapPin, Clock, ExternalLink, MessageCircle, Sparkles } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface VisitSectionProps {
  content: SiteContent;
}

export default function VisitSection({ content }: VisitSectionProps) {
  const { language, t } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollReveal();

  const whatsAppLink = `https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    language === 'ar' ? content.footer.whatsAppPrefillAr : content.footer.whatsAppPrefillEn
  )}`;

  return (
    <section
      id="visit"
      className="py-24 sm:py-32 px-5 sm:px-8 bg-[#FAF7F2] relative overflow-hidden scroll-mt-16"
    >
      {/* Subtle arabesque background pattern */}
      <div className="absolute inset-0 bg-arabesque-oasis opacity-10 pointer-events-none" />

      <div
        ref={sectionRef}
        className={`max-w-5xl mx-auto relative z-10 ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
      >
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-18 reveal-child">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1A3826]/8 text-[#C65A3D] text-xs font-bold uppercase tracking-[0.15em] mb-4 font-arabic">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A043]" />
            {t(content.navigation.visit)}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A3826] font-arabic leading-[1.15]">
            {language === 'ar' ? 'زورونا في وادي النوار' : 'Visit Wadi Nawar'}
          </h2>
          <ArabesqueDivider variant="gold" size="md" className="my-5" />
          <p className="text-sm sm:text-base text-[#5C6E61] max-w-lg mx-auto font-arabic">
            {t(content.footer.tagline)}
          </p>
        </div>

        {/* 2-Card Boutique Grid: Location & Visiting Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-4xl mx-auto">
          {/* Card 1: Farm Location & Map */}
          <div className="reveal-child p-6 sm:p-8 rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#C5A059] shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] border border-[#E8DFD1] flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5 text-[#C85A32]" />
              </div>

              <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider block mb-2 font-arabic">
                {t(content.footer.locationTitle)}
              </span>
              <h3 className="text-xl font-extrabold text-[#1B3B2B] font-arabic mb-2.5 leading-snug">
                {language === 'ar' ? 'العمارية، الرياض' : 'Al-Ammariyah, Riyadh'}
              </h3>
              <p className="text-sm text-[#5C6E61] leading-relaxed font-arabic mb-6">
                {t(content.footer.locationAddress)}
              </p>
            </div>

            <a
              href={content.footer.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-[#1B3B2B] hover:bg-[#25523B] text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm hover:scale-[1.01] border border-[#1B3B2B]"
            >
              <MapPin className="w-4 h-4 text-[#C5A059]" />
              <span>{language === 'ar' ? 'الاتجاهات على خرائط Google' : 'Directions on Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 ms-1" />
            </a>
          </div>

          {/* Card 2: Visiting & Harvest Hours */}
          <div className="reveal-child p-6 sm:p-8 rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#C5A059] shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] border border-[#E8DFD1] flex items-center justify-center mb-5">
                <Clock className="w-5 h-5 text-[#C5A059]" />
              </div>

              <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider block mb-2 font-arabic">
                {t(content.footer.visitingHoursTitle)}
              </span>
              <h3 className="text-xl font-extrabold text-[#1B3B2B] font-arabic mb-2.5 leading-snug">
                {language === 'ar' ? 'مواعيد الاستقبال والقطاف' : 'Harvest & Gate Times'}
              </h3>
              <p className="text-sm text-[#5C6E61] leading-relaxed font-arabic mb-4">
                {t(content.footer.visitingHours)}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF7F2] text-[#8C6D23] text-xs font-semibold mb-6 border border-[#E8DFD1] font-arabic">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                <span>{language === 'ar' ? 'يلزم التنسيق المسبق قبل الزيارة' : 'Prior WhatsApp reservation required'}</span>
              </div>
            </div>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-[#1E5E3A] hover:bg-[#174C2E] text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm hover:scale-[1.01] border border-emerald-400/30"
            >
              <MessageCircle className="w-4 h-4 fill-current text-emerald-300" />
              <span>{language === 'ar' ? 'حجز موعد زيارة عبر واتساب' : 'Reserve Visit on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
