'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import ImageCarousel from './ImageCarousel';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import Reveal from './Reveal';
import { Play, X, ShieldCheck, Sprout, Heart, Truck, Check, MessageCircle, ArrowUpRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';

interface NaimiSheepSectionProps {
  content?: SiteContent;
  whatsAppNumber?: string;
}

export default function NaimiSheepSection({ content, whatsAppNumber }: NaimiSheepSectionProps) {
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const naimiData = content?.naimiSection;
  const targetWhatsApp = whatsAppNumber || content?.footer?.whatsAppNumber || '+966500000000';

  const defaultMessage = isAr
    ? 'مرحباً وادي النوار! أود الاستفسار عن حجز وتفصيل ذبيحة نعيمي طازجة (تربية مزرعة شقراء على البرسيم الأخضر).'
    : 'Hello The Blossom Valley! I would like to inquire about reserving a fresh farm-raised Naimi sheep carcass.';

  const bookingWhatsAppUrl = buildWhatsAppLink(targetWhatsApp, defaultMessage);

  const sheepImages =
    (naimiData?.images && naimiData.images.length > 0)
      ? naimiData.images
      : [
          naimiData?.imageUrl || '/images/IMG_9373.JPG.jpeg',
          '/images/IMG_9367.JPG.jpeg',
          '/images/IMG_9369.JPG.jpeg',
          '/images/IMG_9379.JPG.jpeg',
          '/images/IMG_9368.JPG.jpeg',
        ];

  const sheepImage = sheepImages[0];

  const sheepVideoSrc =
    naimiData?.videoFileUrl ||
    naimiData?.videoUrl ||
    content?.about?.videoFileUrl ||
    content?.about?.videoUrl;

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsVideoModalOpen(false);
  };

  const highlights = [
    {
      icon: Sprout,
      title: isAr ? 'تغذية طبيعية بالبرسيم الأخضر' : '100% Farm-Grown Green Alfalfa',
      desc: isAr
        ? 'تتغذى خرافنا يومياً على البرسيم الأخضر الطازج المزروع في حقول مزرعتنا بشقراء، مما يمنح اللحم طراوة ونكهة طيبة نقية.'
        : 'Fed daily on fresh green alfalfa harvested from our own Shaqra farm plots, ensuring tender, naturally sweet meat.',
    },
    {
      icon: Heart,
      title: isAr ? 'رعاية إنسانية وبيئة هادئة' : 'Humane Care & Open Paddocks',
      desc: isAr
        ? 'تربى في حظائر فسيحة ونظيفة مفتوحة للهواء الطلق وشمس نجد الدافئة، مع شرب مياه الآبار العذبة النقية.'
        : 'Raised in spacious, sunlit, ventilated pens with pure aquifer water and calm, stress-free livestock handling.',
    },
    {
      icon: ShieldCheck,
      title: isAr ? 'صفر هرمونات أو مسرعات نمو' : 'Zero Hormones or Concentrates',
      desc: isAr
        ? 'خالية تماماً من الهرمونات والمضادات والمخصبات أو خلطات التسمين التجارية المصنعة لضمان سلامة صحتك وعائلتك.'
        : 'Free of chemical growth boosters, antibiotics, or commercial feedlot fattening powders.',
    },
    {
      icon: Truck,
      title: isAr ? 'ذبح حسب الطلب ونقل مبرد' : 'Hygienic Slaughter & Chilled Delivery',
      desc: isAr
        ? 'ذبح شرعي فوري في مسالخ معتمدة، وتفصيل وتغليف حسب رغبتكم، ثم نقل مبرد بسيارات مخصصة لباب بيتك.'
        : 'Halal slaughtered to order, cleanly butchered to your cut preference, vacuum-packed, and delivered refrigerated.',
    },
  ];

  return (
    <section
      id="livestock"
      className="scroll-mt-24 border-b border-border bg-paper/60 px-6 sm:px-10 lg:px-16 2xl:px-20 py-16 sm:py-24"
    >
      <Reveal className="mx-auto max-w-[1440px]">
        {/* Section Top Header */}
        <div className="grid gap-6 border-b border-border pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
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

            <p className="mt-4 font-display text-lg sm:text-xl font-medium text-ink leading-snug">
              {naimiData?.subtitle
                ? t(naimiData.subtitle)
                : isAr
                ? 'تربية خاصة في بيئة شقراء النقية، وتغذية يومية على البرسيم الأخضر الطازج المزروع في أرضنا.'
                : 'Nourished exclusively on fresh, farm-grown green alfalfa in open, clean Shaqra pastures.'}
            </p>
          </div>

          <div className="space-y-4 lg:ps-6">
            <p className="editorial-copy">
              {naimiData?.description
                ? t(naimiData.description)
                : isAr
                ? 'سلالة نعيمية سعودية أصيلة ترعى في حظائر نظيفة وفسيحة بمزرعتنا في شقراء، تتغذى يومياً وبشكل حصري على البرسيم الأخضر الطازج الذي نزرعه بأنفسنا في حقولنا. رعاية بيطرية وإنسانية شاملة تضمن لكم أطيب لحم وأعلاه طراوة ونقاء خالياً من أي زفرة.'
                : 'Our purebred Naimi sheep thrive in clean, open-air farm pens, fed exclusively on fresh green alfalfa cultivated right here in our Shaqra soil. With rigorous veterinary oversight and humane care, we ensure tender, sweet meat of supreme purity and unmatched cleanliness.'}
            </p>

            <div className="pt-2">
              <a
                href={bookingWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2.5 font-bold"
              >
                <MessageCircle size={17} />
                <span>
                  {naimiData?.ctaWhatsApp
                    ? t(naimiData.ctaWhatsApp)
                    : isAr
                    ? 'حجز وتفصيل ذبيحة نعيمي عبر واتساب'
                    : 'Reserve Fresh Naimi Sheep on WhatsApp'}
                </span>
                <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Visual & Video Feature Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          {/* Left Column: Visual Carousel with Play Video Pill */}
          <div className="relative w-full overflow-hidden bg-paper rounded-2xl border border-border/50 shadow-xs">
            <ImageCarousel
              images={sheepImages}
              variant="ambient"
              autoPlayInterval={4500}
              aspectRatioClass="aspect-[4/3] sm:aspect-[16/10]"
              objectFit="cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
              ariaLabel={isAr ? 'معرض صور خرفان النعيمي والمراعي' : 'Naimi sheep pasture gallery'}
            >
              {/* Video Play Button & Caption Overlay */}
              <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between pointer-events-auto">
                <p className="text-xs sm:text-sm font-semibold text-white drop-shadow-xs">
                  {isAr ? 'مشاهد القطيع والمراعي المفتوحة' : 'Live moments from our pastures'}
                </p>

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 text-primary px-4 py-2 text-xs font-bold shadow-xs hover:bg-white transition-colors cursor-pointer border border-primary/20"
                  aria-label={isAr ? 'مشاهدة فيديو خرفان النعيمي' : 'Watch sheep farm video'}
                >
                  <span className="grid size-5 place-items-center rounded-full bg-primary text-white">
                    <Play size={10} className="fill-current translate-x-0.5" />
                  </span>
                  <span>{isAr ? 'شاهد فيديو الخراف' : 'Watch Video'}</span>
                  <span className="text-xs transition-transform rtl:rotate-180">→</span>
                </button>
              </div>
            </ImageCarousel>
          </div>

          {/* Right Column: 4 Pillars of Nutrition & Quality — Breathable Editorial Layout */}
          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="border-t border-border/50 pt-4 space-y-1.5"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={16} strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specifications Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-border/50 pt-6">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? 'المرعى والبيئة' : 'Terroir & Pasture'}
            </span>
            <span className="font-display text-xs sm:text-sm font-semibold text-ink mt-0.5 block">
              {isAr ? 'واحة شقراء، نجد' : 'Shaqra Oasis, Najd'}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? 'نوع التغذية' : 'Dietary Feed'}
            </span>
            <span className="font-display text-xs sm:text-sm font-semibold text-primary mt-0.5 block">
              {isAr ? 'برسيم أخضر طازج' : 'Fresh Green Alfalfa'}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? 'الذبح والتجهيز' : 'Slaughter & Cuts'}
            </span>
            <span className="font-display text-xs sm:text-sm font-semibold text-ink mt-0.5 block">
              {isAr ? 'فوري حسب الطلب' : 'To-Order Halal Cuts'}
            </span>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {isAr ? 'التوصيل' : 'Cold Logistics'}
            </span>
            <span className="font-display text-xs sm:text-sm font-semibold text-ink mt-0.5 block">
              {isAr ? 'أسطول مبرد لباب بيتك' : 'Chilled Direct Fleet'}
            </span>
          </div>
        </div>
      </Reveal>

      {/* Video Modal with Robust Fallbacks */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md transition-opacity"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-3xl bg-background rounded-lg overflow-hidden shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-paper/50">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="font-display text-sm font-semibold text-ink">
                  {isAr ? 'وادي النوار — مراعي وخرفان النعيمي' : 'Wadi Nawar — Naimi Sheep Pastures'}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full border border-border bg-background hover:bg-muted text-ink flex items-center justify-center transition-colors cursor-pointer"
                aria-label={isAr ? 'إغلاق' : 'Close modal'}
              >
                <X size={16} />
              </button>
            </div>

            {/* Video Player or Fallback Box */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
              {sheepVideoSrc ? (
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  poster={sheepImage}
                  className="h-full w-full object-contain"
                >
                  <source src={sheepVideoSrc} type="video/mp4" />
                  {isAr ? 'متصفحك لا يدعم تشغيل الفيديو.' : 'Your browser does not support HTML5 video.'}
                </video>
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={sheepImage}
                    alt={isAr ? 'خرفان النعيمي' : 'Naimi Sheep'}
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-ink/40 backdrop-blur-[2px]">
                    <span className="bg-background/95 px-4 py-2 text-xs font-bold text-primary rounded-full border border-border shadow-sm mb-2">
                      {isAr ? 'فيديو حظائر ومراعي النعيمي قيد التحديث' : 'Sheep Pastures Video Coming Soon'}
                    </span>
                    <p className="text-xs text-white/90 max-w-sm">
                      {isAr
                        ? 'يتم توثيق مقاطع مرعى النعيمي المباشرة ورفعها قريباً لتشاهد عنايتنا اليومية بالقطيع.'
                        : 'Authentic pasture clips are being finalized and will be streamed here shortly.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="px-6 py-3.5 bg-paper/30 flex items-center justify-between text-xs text-muted-foreground border-t border-border">
              <span>{isAr ? 'محافظة شقراء، المملكة العربية السعودية' : 'Shaqra City, Saudi Arabia'}</span>
              <span className="font-semibold text-primary">The Blossom Valley</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
