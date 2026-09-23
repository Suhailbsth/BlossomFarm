'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface WhatsAppFABProps {
  content?: SiteContent;
  whatsAppNumber?: string;
}

export default function WhatsAppFAB({ content, whatsAppNumber }: WhatsAppFABProps) {
  const { language, isRTL } = useLanguage();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to detect when the footer enters the viewport
    const footer = document.getElementById('site-footer') || document.querySelector('footer');
    let observer: IntersectionObserver | null = null;

    if (footer) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setFooterInView(entry.isIntersecting);
        },
        { threshold: 0, rootMargin: '0px 0px -10px 0px' }
      );
      observer.observe(footer);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observer) observer.disconnect();
    };
  }, []);

  const prefill = isAr
    ? 'السلام عليكم وادي النوار، أود الاستفسار عن المنتجات وحجز طلب.'
    : 'Hello The Blossom Valley, I would like to inquire about ordering.';

  const activeNumber = whatsAppNumber || content?.footer?.whatsAppNumber;
  const whatsAppLink = buildWhatsAppLink(prefill, activeNumber);

  const isVisible = scrolledPastHero && !footerInView;

  return (
    <div
      className={`fixed bottom-5 sm:bottom-6 ${
        isRTL ? 'left-5 sm:left-6' : 'right-5 sm:right-6'
      } z-40 flex items-center gap-2.5 transition-all duration-300 ease-in-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-hidden={!isVisible}
    >
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isVisible ? 0 : -1}
        className="btn-primary group h-12 px-4 sm:px-5 font-bold text-xs shadow-xl border border-white/20 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label={isAr ? 'تواصل عبر واتساب' : 'Chat via WhatsApp'}
      >
        <MessageCircle size={18} className="shrink-0" />
        <span className="hidden xs:inline sm:inline">
          {isAr ? 'طلب واستفسار' : 'Quick Order'}
        </span>
        <span className="text-xs font-bold transition-transform rtl:rotate-180">→</span>
      </a>
    </div>
  );
}
