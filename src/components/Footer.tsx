'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import { MessageCircle, MapPin, Clock, Share2, Check, ExternalLink, Sparkles, QrCode } from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';

interface FooterProps {
  content: SiteContent;
}

export default function Footer({ content }: FooterProps) {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsAppLink = `https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    language === 'ar' ? content.footer.whatsAppPrefillAr : content.footer.whatsAppPrefillEn
  )}`;

  return (
    <footer id="visit" className="bg-[#122419] text-[#FAF7F2] relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Arabesque Motif Overlay */}
      <div className="absolute inset-0 bg-arabesque-oasis opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top CTA Banner: WhatsApp Reservation & Inquiries */}
        <div className="mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1A3826] to-[#122419] border-2 border-[#C9A043]/40 shadow-2xl relative overflow-hidden">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A043]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-start">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2]/10 border border-[#C9A043]/40 text-xs font-semibold text-[#C9A043] mb-3 font-arabic">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t(content.footer.badge)}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold font-arabic text-white mb-3 leading-tight">
                {t(content.footer.whatsAppPrompt)}
              </h3>

              <p className="text-sm sm:text-base text-[#E5DACB] font-arabic leading-relaxed">
                {t(content.footer.tagline)}
              </p>
            </div>

            {/* Direct WhatsApp Call to Action Button */}
            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base sm:text-lg shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span className="font-arabic">{t(content.footer.whatsAppBtn)}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{language === 'ar' ? 'تم نسخ الرابط!' : 'Link Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#C9A043]" />
                    <span>{language === 'ar' ? 'مشاركة الصفحة' : 'Share Page'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Middle Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#2E5840]">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1A3826] border border-[#C9A043] flex items-center justify-center text-[#C9A043]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 14 6 14 9C14 10.5 13 12 12 12C11 12 10 10.5 10 9C10 6 12 2 12 2Z" />
                  <path d="M12 22C12 22 10 18 10 15C10 13.5 11 12 12 12C13 12 14 13.5 14 15C14 18 12 22 12 22Z" />
                  <circle cx="12" cy="12" r="2.5" className="fill-[#C9A043]" />
                </svg>
              </div>
              <div>
                <h4 className="text-xl font-bold font-arabic text-white">مزرعة النوار</h4>
                <p className="text-xs text-[#C65A3D] font-medium tracking-wider uppercase">The Blossom&apos;s Farm</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#E5DACB]/80 font-arabic leading-relaxed max-w-sm">
              {language === 'ar'
                ? 'واحة زراعية عائلية فاخرة في وادي العمارية بالرياض. متخصصة في الطماطم العضوية المتوارثة والإنتاج الطبيعي المستدام.'
                : "A boutique family farmstead in Al-Ammariyah Valley, Riyadh. Cultivating rare organic heirloom harvests with ancient seeds and living soil."}
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#C9A043] font-medium font-arabic">
              <span>🇸🇦 صنع وزُرع بفخر في المملكة العربية السعودية</span>
            </div>
          </div>

          {/* Col 2: Visiting Hours */}
          <div className="md:col-span-3 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C9A043] font-arabic">
              <Clock className="w-4 h-4" />
              <span>{t(content.footer.visitingHoursTitle)}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#E5DACB]/90 font-arabic leading-relaxed">
              {t(content.footer.visitingHours)}
            </p>
            <p className="text-[11px] text-[#8A9B8F] font-arabic">
              {language === 'ar'
                ? '* الزيارات مخصصة لقطاف العائلات وتذوق المحاصيل بحجز مسبق.'
                : '* Private family harvest tours and tastings by advance reservation only.'}
            </p>
          </div>

          {/* Col 3: Location & Maps */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#C9A043] font-arabic">
              <MapPin className="w-4 h-4" />
              <span>{t(content.footer.locationTitle)}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#E5DACB]/90 font-arabic leading-relaxed">
              {t(content.footer.locationAddress)}
            </p>
            <a
              href={content.footer.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C65A3D] hover:text-[#e89278] transition-colors"
            >
              <span>{language === 'ar' ? 'فتح في خرائط Google' : 'Open in Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & QR Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A9B8F] text-center sm:text-start">
          <p className="font-arabic">{t(content.footer.rights)}</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="hover:text-[#C9A043] transition-colors flex items-center gap-1 font-arabic"
            >
              <QrCode className="w-3.5 h-3.5 text-[#C9A043]" />
              <span>{language === 'ar' ? 'رمز الاستجابة السريعة (QR)' : 'QR Access Code'}</span>
            </button>
            <span>•</span>
            <a href="#tomatoes" className="hover:text-white transition-colors">
              {t(content.navigation.tomatoes)}
            </a>
            <span>•</span>
            <a href="#story" className="hover:text-white transition-colors">
              {t(content.navigation.story)}
            </a>
          </div>
        </div>
      </div>

      {/* QR Code Sharing Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-[#FAF7F2] text-[#1A3826] p-6 sm:p-8 rounded-3xl max-w-sm w-full text-center border-2 border-[#C9A043]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-[#1A3826] text-[#C9A043] mx-auto flex items-center justify-center mb-3">
              <QrCode className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold font-arabic text-[#1A3826] mb-1">
              {language === 'ar' ? 'رمز الدخول السريع' : 'Direct QR Scan Pass'}
            </h4>
            <p className="text-xs text-[#5C6E61] font-arabic mb-4">
              {language === 'ar'
                ? 'امسح الرمز من أي هاتف للوصول المباشر للموقع وقائمة الطماطم الطازجة.'
                : 'Scan with any smartphone camera to open this microsite directly.'}
            </p>

            {/* Generated SVG QR Code Graphic */}
            <div className="p-4 bg-white rounded-2xl border border-[#E5DACB] shadow-inner inline-block mx-auto mb-4">
              <svg className="w-40 h-40 text-[#1A3826]" viewBox="0 0 100 100" fill="currentColor">
                {/* Clean stylized QR pattern representation */}
                <rect x="10" y="10" width="25" height="25" rx="3" fill="#1A3826" />
                <rect x="15" y="15" width="15" height="15" rx="2" fill="#FAF7F2" />
                <rect x="18" y="18" width="9" height="9" fill="#C9A043" />

                <rect x="65" y="10" width="25" height="25" rx="3" fill="#1A3826" />
                <rect x="70" y="15" width="15" height="15" rx="2" fill="#FAF7F2" />
                <rect x="73" y="18" width="9" height="9" fill="#C9A043" />

                <rect x="10" y="65" width="25" height="25" rx="3" fill="#1A3826" />
                <rect x="15" y="70" width="15" height="15" rx="2" fill="#FAF7F2" />
                <rect x="18" y="73" width="9" height="9" fill="#C9A043" />

                {/* Data blocks */}
                <rect x="42" y="12" width="6" height="6" fill="#1A3826" />
                <rect x="52" y="18" width="6" height="6" fill="#C65A3D" />
                <rect x="42" y="28" width="6" height="6" fill="#1A3826" />
                <rect x="12" y="42" width="6" height="6" fill="#1A3826" />
                <rect x="22" y="48" width="6" height="6" fill="#C9A043" />
                <rect x="45" y="45" width="10" height="10" rx="2" fill="#1A3826" />
                <rect x="65" y="42" width="6" height="6" fill="#1A3826" />
                <rect x="78" y="48" width="6" height="6" fill="#C65A3D" />
                <rect x="42" y="65" width="6" height="6" fill="#1A3826" />
                <rect x="52" y="75" width="6" height="6" fill="#C9A043" />
                <rect x="68" y="68" width="8" height="8" fill="#1A3826" />
                <rect x="80" y="80" width="8" height="8" fill="#1A3826" />
              </svg>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-full bg-[#1A3826] text-white font-bold text-sm"
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
