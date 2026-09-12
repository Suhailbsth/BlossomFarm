'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, TomatoVariety } from '@/types/content';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
  Utensils,
  ShieldCheck,
  Thermometer,
  ChevronRight,
  Globe,
} from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import Footer from './Footer';
import WhatsAppFAB from './WhatsAppFAB';

interface ProductDetailsViewProps {
  tomato: TomatoVariety;
  content: SiteContent;
  allTomatoes: TomatoVariety[];
}

export default function ProductDetailsView({
  tomato,
  content,
  allTomatoes,
}: ProductDetailsViewProps) {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const galleryImages = tomato.gallery && tomato.gallery.length > 0
    ? tomato.gallery
    : [tomato.image];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  // Other varieties excluding current
  const otherTomatoes = allTomatoes.filter((item) => item.id !== tomato.id);

  // WhatsApp prefilled message tailored to this specific variety
  const whatsAppMessage = language === 'ar'
    ? `مرحباً مزرعة النوار! أود الاستفسار عن توفر وحجز سلة من طماطم (${tomato.name.ar} - ${tomato.name.en}) اليوم.`
    : `Hello The Blossom's Farm! I would like to inquire about reserving a fresh basket of (${tomato.name.en} / ${tomato.name.ar}) today.`;

  const whatsAppLink = `https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    whatsAppMessage
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-warm-canvas text-[#1A241E]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Top Navigation Bar
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD1]/80 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Back to Harvest Link */}
          <Link
            href="/#tomatoes"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B3B2B] hover:text-[#C85A32] transition-colors group"
          >
            {isRTL ? (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            )}
            <span className="font-arabic">
              {language === 'ar' ? 'العودة لمحاصيل المزرعة' : 'Back to Farm Harvest'}
            </span>
          </Link>

          {/* Center Brand Link */}
          <Link href="/" className="hidden sm:flex items-center gap-2.5">
            <span className="text-sm font-bold font-arabic text-[#1B3B2B]">
              مزرعة النوار
            </span>
            <span className="text-[11px] text-[#C5A059]">✦</span>
            <span className="text-xs font-serif-luxury text-[#7A8A7E]">
              The Blossom&apos;s Farm
            </span>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center p-1 rounded-full border border-[#E8DFD1] bg-white text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-[#1B3B2B] text-white shadow-xs'
                  : 'text-[#5C6E61] hover:text-[#1B3B2B]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 rounded-full transition-all font-arabic ${
                language === 'ar'
                  ? 'bg-[#1B3B2B] text-white shadow-xs'
                  : 'text-[#5C6E61] hover:text-[#1B3B2B]'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Main Product Editorial Hero
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 py-10 sm:py-16">
        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 text-xs text-[#7A8A7E] font-arabic mb-8">
          <Link href="/" className="hover:text-[#1B3B2B] transition-colors">
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/#tomatoes" className="hover:text-[#1B3B2B] transition-colors">
            {language === 'ar' ? 'المحاصيل المتوارثة' : 'Heirloom Harvest'}
          </Link>
          <span>/</span>
          <span className="text-[#C85A32] font-semibold">{t(tomato.name)}</span>
        </div>

        {/* Asymmetric Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Gallery Column (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Large Image Frame with Organic Radius & Tilt */}
            <div className="relative rounded-organic-1 overflow-hidden aspect-square sm:aspect-[4/3] bg-white border border-[#E8DFD1] shadow-organic-md">
              <Image
                src={activeImage}
                alt={t(tomato.name)}
                fill
                priority
                quality={95}
                className="object-cover object-center transition-all duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Status Badge */}
              <div className="absolute top-4 start-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B3B2B]/90 backdrop-blur-xs text-white text-xs font-bold font-arabic shadow-sm border border-[#C5A059]/40">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {language === 'ar' ? 'قطاف يومي طازج' : 'Harvested Daily'}
                </span>
              </div>

              {/* Category Pill */}
              <div className="absolute bottom-4 end-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/95 text-[#C85A32] text-xs font-bold shadow-sm font-arabic border border-[#E8DFD1]">
                  {t(tomato.category)}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="flex items-center gap-3 pt-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === img
                        ? 'border-[#C85A32] scale-105 shadow-sm'
                        : 'border-[#E8DFD1] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Information Column (6 cols) */}
          <div className="lg:col-span-6 space-y-7">
            {/* Titles & Botanical Subtitle */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold font-arabic mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t(tomato.category)}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-tight mb-2">
                {t(tomato.name)}
              </h1>
              <p className="text-sm sm:text-base text-[#7A8A7E] font-serif-luxury italic">
                {language === 'ar' ? tomato.name.en : tomato.name.ar} • Solanum lycopersicum
              </p>
            </div>

            {/* Tasting Notes Chips */}
            <div className="flex flex-wrap gap-2">
              {tomato.tasteNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#E8DFD1] text-[#1B3B2B] text-xs font-semibold shadow-2xs font-arabic"
                >
                  ✦ {t(note)}
                </span>
              ))}
            </div>

            {/* Story & Description */}
            <div className="p-6 rounded-organic-card bg-[#F5EFE6] border-s-4 border-[#C85A32] text-sm text-[#4E5E52] leading-relaxed font-arabic space-y-3">
              <p className="font-medium text-[#1B3B2B]">
                {t(tomato.description)}
              </p>
              {tomato.story && (
                <p className="text-xs sm:text-sm text-[#5C6E61]">
                  {t(tomato.story)}
                </p>
              )}
            </div>

            {/* Sensory Matrix (Sweetness / Acidity / Umami / Firmness) */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD1] shadow-organic-sm">
              <h3 className="text-xs uppercase font-bold text-[#7A8A7E] tracking-wider mb-4 font-arabic">
                {language === 'ar' ? 'مؤشرات النكهة والقوام الحسي' : 'Sensory Flavor & Texture Index'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="block text-xs font-bold text-[#1B3B2B] font-arabic mb-1">
                    {language === 'ar' ? 'الحلاوة' : 'Sweetness'}
                  </span>
                  <div className="text-sm font-bold text-[#C85A32] tracking-widest">
                    {'●'.repeat(tomato.sweetness)}{'○'.repeat(5 - tomato.sweetness)}
                  </div>
                  <span className="text-[10px] text-[#7A8A7E] font-arabic">{tomato.sweetness}/5</span>
                </div>

                <div>
                  <span className="block text-xs font-bold text-[#1B3B2B] font-arabic mb-1">
                    {language === 'ar' ? 'الحموضة' : 'Acidity'}
                  </span>
                  <div className="text-sm font-bold text-[#1B3B2B] tracking-widest">
                    {'●'.repeat(tomato.acidity)}{'○'.repeat(5 - tomato.acidity)}
                  </div>
                  <span className="text-[10px] text-[#7A8A7E] font-arabic">{tomato.acidity}/5</span>
                </div>

                <div>
                  <span className="block text-xs font-bold text-[#1B3B2B] font-arabic mb-1">
                    {language === 'ar' ? 'الأومامي' : 'Umami'}
                  </span>
                  <div className="text-sm font-bold text-[#C5A059] tracking-widest">
                    {'●'.repeat(tomato.umami)}{'○'.repeat(5 - tomato.umami)}
                  </div>
                  <span className="text-[10px] text-[#7A8A7E] font-arabic">{tomato.umami}/5</span>
                </div>

                <div>
                  <span className="block text-xs font-bold text-[#1B3B2B] font-arabic mb-1">
                    {language === 'ar' ? 'التماسك' : 'Firmness'}
                  </span>
                  <div className="text-sm font-bold text-emerald-700 tracking-widest">
                    {'●'.repeat(tomato.firmness || 4)}{'○'.repeat(5 - (tomato.firmness || 4))}
                  </div>
                  <span className="text-[10px] text-[#7A8A7E] font-arabic">{(tomato.firmness || 4)}/5</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Harvest Order CTA */}
            <div className="pt-2">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-8 rounded-full bg-[#1E5E3A] hover:bg-[#174C2E] text-white font-bold text-base shadow-organic-md transition-all duration-300 hover:scale-[1.015] flex items-center justify-center gap-3 border border-emerald-400/30"
              >
                <MessageCircle className="w-5 h-5 fill-current text-emerald-300" />
                <span className="font-arabic">
                  {language === 'ar'
                    ? `طلب حجز (${t(tomato.name)}) عبر واتساب`
                    : `Inquire about ${t(tomato.name)} on WhatsApp`}
                </span>
              </a>
              <p className="mt-2.5 text-center text-xs text-[#7A8A7E] font-arabic">
                {language === 'ar'
                  ? 'قطاف يومي طازج بحسب توفر بيوتنا المحمية في وادي العمارية'
                  : 'Daily morning harvest subject to greenhouse yield in Al-Ammariyah'}
              </p>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Culinary Ideas & Storage Guide Section
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-20 sm:mt-28 pt-12 border-t border-[#E8DFD1]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Culinary Inspirations (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-[#C85A32] font-bold text-xs uppercase tracking-wider font-arabic">
                <Utensils className="w-4 h-4" />
                <span>{language === 'ar' ? 'إلهام الطهي والتقديم' : 'Culinary & Serving Inspirations'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3B2B] font-arabic leading-snug">
                {language === 'ar' ? 'أفضل طرق الاستمتاع بهذا المحصول' : 'How to Savor This Harvest'}
              </h2>

              {/* Culinary Cards */}
              <div className="space-y-4">
                {tomato.culinaryUses && tomato.culinaryUses.length > 0 ? (
                  tomato.culinaryUses.map((use, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8DFD1] shadow-2xs space-y-2"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-base font-bold text-[#1B3B2B] font-arabic">
                          {t(use.title)}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A8A7E] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#E8DFD1]">
                          <Clock className="w-3 h-3 text-[#C5A059]" />
                          {use.prepTime}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed font-arabic">
                        {t(use.description)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-5 rounded-2xl bg-white border border-[#E8DFD1]">
                    <p className="text-sm text-[#5C6E61] font-arabic">
                      {t(tomato.bestPairedWith)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Storage & Care Guide (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-[#C5A059] font-bold text-xs uppercase tracking-wider font-arabic">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'ar' ? 'نصيحة العناية والحفظ' : 'Specific Care & Storage'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B3B2B] font-arabic leading-snug">
                {language === 'ar' ? 'حفظ النضارة والنكهة' : 'Preserving Peak Flavor'}
              </h2>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E8DFD1] shadow-2xs space-y-4">
                <div className="w-11 h-11 rounded-xl bg-[#F5EFE6] border border-[#E8DFD1] flex items-center justify-center">
                  <Thermometer className="w-5 h-5 text-[#C85A32]" />
                </div>
                <h4 className="text-base font-bold text-[#1B3B2B] font-arabic">
                  {language === 'ar' ? 'درجة حرارة الغرفة (ممنوع التبريد)' : 'Room Temperature (No Chilling)'}
                </h4>
                <p className="text-xs sm:text-sm text-[#5C6E61] leading-relaxed font-arabic">
                  {tomato.storageSpecific
                    ? t(tomato.storageSpecific)
                    : t(content.storageTipsSection.items[0].tip)}
                </p>

                <div className="pt-3 border-t border-[#E8DFD1] flex items-center gap-2 text-xs text-[#C85A32] font-semibold font-arabic">
                  <span>✦</span>
                  <span>{language === 'ar' ? 'يُقطف ناضجاً ويُفضل تناوله خلال ٣-٥ أيام' : 'Vine-ripened — best enjoyed within 3-5 days'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Explore Other Heirloom Varieties Carousel
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="mt-20 sm:mt-28 pt-12 border-t border-[#E8DFD1]">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider font-arabic block mb-1">
                {language === 'ar' ? 'محاصيل متوارثة أخرى' : 'More From Our Harvest'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B3B2B] font-arabic">
                {language === 'ar' ? 'استكشف بقية أصناف المزرعة' : 'Explore Other Varieties'}
              </h3>
            </div>
            <Link
              href="/#tomatoes"
              className="text-xs sm:text-sm font-bold text-[#C85A32] hover:underline flex items-center gap-1 font-arabic"
            >
              <span>{language === 'ar' ? 'عرض الكل' : 'View All'}</span>
              <ChevronRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {/* Other Varieties Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {otherTomatoes.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="group block rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#C85A32] overflow-hidden shadow-organic-sm shadow-organic-hover transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-[#FAF7F2]">
                  <Image
                    src={item.image}
                    alt={t(item.name)}
                    fill
                    quality={85}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>
                <div className="p-3.5 text-center">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1B3B2B] font-arabic group-hover:text-[#C85A32] transition-colors leading-snug">
                    {t(item.name)}
                  </h4>
                  <p className="mt-0.5 text-[10px] text-[#7A8A7E] font-serif-luxury italic">
                    {language === 'ar' ? item.name.en : item.name.ar}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer & FAB */}
      <Footer content={content} />
      <WhatsAppFAB content={content} />
    </div>
  );
}
