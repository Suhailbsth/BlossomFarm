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
  const [visible, setVisible] = useState(false);
  const isAr = language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prefill = isAr
    ? 'السلام عليكم وادي النوار، أود الاستفسار عن المنتجات وحجز طلب.'
    : 'Hello The Blossom Valley, I would like to inquire about ordering.';

  const activeNumber = whatsAppNumber || content?.footer?.whatsAppNumber;
  const whatsAppLink = buildWhatsAppLink(prefill, activeNumber);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-5 sm:bottom-6 ${
        isRTL ? 'left-5 sm:left-6' : 'right-5 sm:right-6'
      } z-40 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-4 duration-300`}
    >
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 h-12 px-4 sm:px-5 rounded-full bg-harvest-gold text-ink font-bold text-xs shadow-xl border border-ink/10 transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={isAr ? 'تواصل عبر واتساب' : 'Chat via WhatsApp'}
      >
        <MessageCircle size={18} className="fill-current text-ink shrink-0" />
        <span className="hidden xs:inline sm:inline">
          {isAr ? 'طلب سريع' : 'Quick Order'}
        </span>
      </a>
    </div>
  );
}
