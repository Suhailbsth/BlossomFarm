'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, ProductItem } from '@/types/content';
import { ArrowLeft, ArrowRight, MessageCircle, Sprout, ArrowUpRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import Footer from './Footer';

interface ProductDetailsViewProps {
  product: ProductItem;
  content: SiteContent;
  allProducts: ProductItem[];
  whatsAppNumber?: string;
}

export default function ProductDetailsView({
  product,
  content,
  allProducts,
  whatsAppNumber,
}: ProductDetailsViewProps) {
  const { language, toggleLanguage, isRTL, t } = useLanguage();
  const isAr = language === 'ar';

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  // Other products excluding current
  const otherProducts = allProducts.filter((item) => item.id !== product.id);

  // WhatsApp prefilled message tailored to this specific product
  const whatsAppMessage = isAr
    ? `مرحباً وادي النوار! أود الاستفسار عن توفر وحجز طلب (${product.name.ar} - ${product.name.en}).`
    : `Hello The Blossom Valley! I would like to inquire about ordering (${product.name.en} / ${product.name.ar}).`;

  const activeNumber = whatsAppNumber || content?.footer?.whatsAppNumber;
  const whatsAppLink = buildWhatsAppLink(whatsAppMessage, activeNumber);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-body">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Header matching reference design
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16 2xl:px-20">
          <Link
            href="/#varieties"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:opacity-80 transition-opacity"
          >
            {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{isAr ? 'العودة للمنتجات' : 'Back to harvest'}</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-semibold text-primary sm:text-xl"
          >
            <Sprout size={18} strokeWidth={1.75} className="shrink-0 text-primary" />
            <span className={isRTL ? 'font-arabic font-bold' : 'font-display'}>
              {isRTL ? 'وادي النوار' : 'The Blossom Valley'}
            </span>
          </Link>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="rounded-full border border-foreground bg-transparent px-4 py-1.5 text-xs font-semibold shadow-none transition-colors hover:bg-muted cursor-pointer"
          >
            {isRTL ? 'EN' : 'عربي'}
          </button>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Product Details Section
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 2xl:px-20 py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Image & Gallery Column */}
          <div>
            <div className="rounded-2xl border border-border/60 bg-paper shadow-xs overflow-hidden p-2 sm:p-3">
              <ImageCarousel
                images={galleryImages}
                variant="gallery"
                aspectRatioClass="aspect-[4/5]"
                objectFit="cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                showThumbnails={true}
                showDots={true}
                showArrows={true}
                ariaLabel={t(product.name)}
              >
                {product.badge && (
                  <div className="absolute bottom-4 end-4 z-30 pointer-events-none">
                    <span className="bg-background/95 backdrop-blur-xs px-3.5 py-1.5 text-xs font-bold text-primary border border-border/60 rounded-full shadow-xs">
                      {t(product.badge)}
                    </span>
                  </div>
                )}
              </ImageCarousel>
            </div>
          </div>

          {/* Details Column */}
          <div>
            <p className="editorial-kicker">{t(product.category)}</p>
            <h1 className="editorial-title text-ink">{t(product.name)}</h1>

            {product.arabicSubtitle && (
              <p className="mt-2 text-sm text-primary font-semibold">
                {product.arabicSubtitle}
              </p>
            )}

            <p className="editorial-copy mt-4">{t(product.description)}</p>

            {/* Story / Cultivation notes */}
            {product.story && (
              <div className="mt-8 border-y border-border py-5 text-sm text-muted-foreground leading-relaxed">
                <p className="font-semibold text-foreground mb-1">
                  {isAr ? 'عن المحصول وطريقة الإنتاج:' : 'About the harvest & cultivation:'}
                </p>
                <p>{t(product.story)}</p>
              </div>
            )}

            {/* Key Specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="mt-6 space-y-2 border-b border-border pb-6 text-xs">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1">
                    <span className="text-muted-foreground">{t(spec.label)}:</span>
                    <span className="font-bold text-foreground">{t(spec.value)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Storage Advice */}
            {product.storageSpecific && (
              <div className="mt-6 p-4 bg-paper border border-border text-xs text-muted-foreground">
                <span className="font-bold text-foreground block mb-1">
                  {isAr ? 'إرشادات الحفظ:' : 'Storage Guidance:'}
                </span>
                <p>{t(product.storageSpecific)}</p>
              </div>
            )}

            {/* Direct WhatsApp CTA Button */}
            <div className="mt-8">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary h-12 w-full sm:w-auto px-8 font-bold text-sm"
              >
                <MessageCircle size={18} />
                <span>{isAr ? 'طلب المنتج مباشرة عبر واتساب' : 'Inquire & Order via WhatsApp'}</span>
                <span className="text-sm font-bold transition-transform rtl:rotate-180">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Other Products Section */}
        {otherProducts.length > 0 && (
          <div className="mt-24 border-t border-border pt-12">
            <div className="flex items-center justify-between mb-8">
              <span className="editorial-kicker">
                {isAr ? 'منتجات أخرى' : 'More Products'}
              </span>
              <Link href="/#varieties" className="text-xs font-bold text-primary hover:underline">
                {isAr ? 'عرض جميع المنتجات' : 'View full harvest'}
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherProducts.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group block border border-border p-5 bg-paper/30 transition-colors hover:border-primary"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper mb-4">
                    <Image
                      src={item.image}
                      alt={t(item.name)}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[10px] font-bold text-primary uppercase">{t(item.category)}</p>
                  <div className="flex items-center justify-between mt-1">
                    <h4 className="font-display text-base font-semibold group-hover:text-primary transition-colors">
                      {t(item.name)}
                    </h4>
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer whatsAppNumber={activeNumber} />
    </div>
  );
}
