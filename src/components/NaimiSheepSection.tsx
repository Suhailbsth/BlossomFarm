'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import Reveal from './Reveal';
import { Play, Truck, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface NaimiSheepSectionProps {
  content?: SiteContent;
  whatsAppNumber?: string;
}

export default function NaimiSheepSection({ content, whatsAppNumber }: NaimiSheepSectionProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPlayingManual, setIsPlayingManual] = useState(false);

  const naimiData = content?.naimiSection;
  const targetWhatsApp = whatsAppNumber || content?.footer?.whatsAppNumber || '+966500000000';

  const defaultMessage = isAr
    ? 'مرحباً وادي النوار! أود الاستفسار عن حجز وتفصيل ذبيحة نعيمي عبر الواتساب.'
    : 'Hello The Blossom Valley! I would like to inquire about reserving and butchering a Naimi sheep.';

  const bookingWhatsAppUrl = buildWhatsAppLink(targetWhatsApp, defaultMessage);

  const sheepImages =
    (naimiData?.images && naimiData.images.length > 0)
      ? naimiData.images
      : (naimiData?.imageUrl ? [naimiData.imageUrl] : []);

  const sheepImage = sheepImages[0] || '';
  const sheepVideoSrc = naimiData?.videoFileUrl || naimiData?.videoUrl || '';

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Lazy-load and play/pause video when in viewport (unless user prefers reduced motion)
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {
              // Auto-play policy handling
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const handleManualPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlayingManual(true);
      } else {
        videoRef.current.pause();
        setIsPlayingManual(false);
      }
    }
  };

  return (
    <section
      id="livestock"
      className="scroll-mt-24 border-b border-border bg-paper/60 px-6 sm:px-10 lg:px-16 2xl:px-20 py-16 sm:py-24"
    >
      <Reveal className="mx-auto max-w-[1440px]">
        {/* 1. Section Header: Eyebrow + Main Heading */}
        <div className="border-b border-border pb-8">
          <p className="editorial-kicker">
            {naimiData?.eyebrow
              ? t(naimiData.eyebrow)
              : isAr
              ? 'مراعي الماشية · ٠٢'
              : 'Livestock Pastures · 02'}
          </p>

          <h2 className="editorial-title mt-3">
            {naimiData?.title
              ? t(naimiData.title)
              : isAr
              ? 'خرفان النعيمي الأصيلة'
              : 'Authentic Saudi Naimi Sheep'}
          </h2>

          {/* 2. Text Block (Appendix A1): Sub-heading + Description from CMS with fallback */}
          <div className="mt-6 max-w-3xl space-y-4">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-ink leading-snug">
              {naimiData?.subtitle
                ? t(naimiData.subtitle)
                : isAr
                ? 'تربية المزرعة… وعناية يومية'
                : 'Farm-raised… with daily mindful care'}
            </h3>

            <div className="editorial-copy text-muted-foreground leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {naimiData?.description ? (
                t(naimiData.description)
              ) : (
                <div className="space-y-3">
                  <p>
                    {isAr
                      ? 'تُربّى خرفان النعيمي في مزرعتنا بشقراء، ونتابع تغذيتها ورعايتها بشكل يومي ومباشر.'
                      : 'Our Naimi sheep are raised on our Shaqra farmstead, where we supervise their nutrition and wellbeing daily and directly.'}
                  </p>
                  <p>
                    {isAr
                      ? 'تتغذى على البرسيم الأخضر المزروع في حقول المزرعة، مع الشعير والتمر ضمن نظامها الغذائي، إلى جانب اهتمام مستمر بنظافة الحظائر وجودة الرعاية.'
                      : 'They feed on fresh green alfalfa grown right on our farm plots, alongside barley and farm dates, complemented by dedicated pen hygiene and high veterinary standards.'}
                  </p>
                  <p>
                    {isAr
                      ? 'لأن جودة المنتج الذي يصل إلى مائدتكم تبدأ من هذه التفاصيل الصغيرة والمهمة.'
                      : 'Because the purity of the meat arriving at your dining table begins with these vital, thoughtful details.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Lambs Video + 4. Feature Item + 5. Booking Button */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* 3. Lambs Video (C4: Inline playback, autoplay, loop, muted, playsInline, poster, prefers-reduced-motion) */}
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden bg-paper rounded-2xl border border-border/50 shadow-xs aspect-[4/3] sm:aspect-[16/10]"
          >
            {sheepVideoSrc ? (
              <video
                ref={videoRef}
                autoPlay={!prefersReducedMotion}
                loop
                muted
                playsInline
                poster={sheepImage || undefined}
                preload="metadata"
                className="h-full w-full object-cover"
                aria-label={isAr ? 'فيديو خرفان النعيمي في المرعى' : 'Naimi sheep pasture video'}
              >
                <source src={sheepVideoSrc} type="video/mp4" />
                {isAr ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support HTML5 video.'}
              </video>
            ) : sheepImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={sheepImage}
                  alt={isAr ? 'خرفان النعيمي' : 'Naimi Sheep'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-paper/60 text-muted-foreground text-sm font-semibold">
                <span>{isAr ? 'خرفان النعيمي' : 'Naimi Sheep'}</span>
              </div>
            )}

            {/* Reduced motion fallback play button */}
            {prefersReducedMotion && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                <button
                  type="button"
                  onClick={handleManualPlay}
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 text-primary px-5 py-2.5 text-xs font-bold shadow-lg hover:bg-white transition-transform active:scale-95 cursor-pointer border border-primary/20"
                  aria-label={isAr ? 'تشغيل الفيديو' : 'Play Video'}
                >
                  <Play size={14} className="fill-current translate-x-0.5" />
                  <span>{isPlayingManual ? (isAr ? 'إيقاف مؤقت' : 'Pause') : (isAr ? 'شاهد فيديو الخراف' : 'Play Video')}</span>
                </button>
              </div>
            )}

            {/* Overlay Caption: Kept with graceful backdrop so it reads well over playing video */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none">
              <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-xs">
                {isAr ? 'مشاهد القطيع والمراعي المفتوحة' : 'Live moments from our pastures'}
              </p>
            </div>
          </div>

          {/* 4. Single Kept Feature Item + 5. Booking Button */}
          <div className="space-y-6 lg:ps-4">
            {/* 4. Feature Item: ذبح حسب الطلب ونقل مبرد (keep, no change) */}
            <div className="border-t border-border/50 pt-5 space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Truck size={18} strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-base sm:text-lg font-semibold text-ink">
                  {isAr ? 'ذبح حسب الطلب ونقل مبرد' : 'Hygienic Slaughter & Chilled Delivery'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed ps-10.5">
                {isAr
                  ? 'ذبح شرعي فوري في مسالخ معتمدة، وتفصيل وتغليف حسب رغبتكم، ثم نقل مبرد بسيارات مخصصة لباب بيتك.'
                  : 'Halal slaughtered to order, cleanly butchered to your cut preference, vacuum-packed, and delivered refrigerated.'}
              </p>
            </div>

            {/* 5. Booking Button: moved here, text: "حجز وتفصيل ذبيحة نعيمي عبر الواتساب" (drop word "طازجة") */}
            <div className="pt-2">
              <a
                href={bookingWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2.5 font-bold shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle size={18} />
                <span>
                  {naimiData?.ctaWhatsApp
                    ? t(naimiData.ctaWhatsApp)
                    : isAr
                    ? 'حجز وتفصيل ذبيحة نعيمي عبر الواتساب'
                    : 'Reserve Naimi Sheep on WhatsApp'}
                </span>
                <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* 6. Info Grid (المرعى والبيئة / نوع التغذية / الذبح والتجهيز / التوصيل) */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border/50 pt-6">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? 'المرعى والبيئة' : 'Terroir & Pasture'}
            </span>
            <span className="font-display text-xs sm:text-sm font-semibold text-ink mt-1 block">
              {isAr ? 'واحة شقراء، نجد' : 'Shaqra Oasis, Najd'}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? 'نوع التغذية' : 'Dietary Feed'}
            </span>
            <span className="font-display text-xs sm:text-sm font-semibold text-primary mt-1 block">
              {naimiData?.badge ? t(naimiData.badge) : (isAr ? 'برسيم، شعير وتمر المزرعة' : 'Alfalfa, Barley & Farm Dates')}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? 'الذبح والتجهيز' : 'Slaughter & Cuts'}
            </span>
            <span className="font-display text-xs sm:text-sm font-semibold text-ink mt-1 block">
              {isAr ? 'فوري حسب الطلب' : 'To-Order Halal Cuts'}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? 'التوصيل' : 'Cold Logistics'}
            </span>
            <span className="font-display text-xs sm:text-sm font-semibold text-ink mt-1 block">
              {isAr ? 'أسطول مبرد لباب بيتك' : 'Chilled Direct Fleet'}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
