'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppFABProps {
  content: SiteContent;
}

export default function WhatsAppFAB({ content }: WhatsAppFABProps) {
  const { language, isRTL, t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after user has scrolled 150px
      setVisible(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsAppLink = `https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    language === 'ar' ? content.footer.whatsAppPrefillAr : content.footer.whatsAppPrefillEn
  )}`;

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 ${
        isRTL ? 'left-6' : 'right-6'
      } z-40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300`}
    >
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#1A3826] text-white text-xs font-semibold shadow-xl border border-[#C9A043]/40">
          <span className="font-arabic">
            {language === 'ar' ? 'تواصل معنا في المزرعة' : "Chat with The Blossom's Farm"}
          </span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group p-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white/60 animate-pulse-glow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="sr-only">WhatsApp</span>
      </a>
    </div>
  );
}
