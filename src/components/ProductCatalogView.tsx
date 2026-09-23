'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent } from '@/types/content';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Search,
} from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import Footer from './Footer';
import WhatsAppFAB from './WhatsAppFAB';
import { EmblemIcon } from './BrandLogo';

interface ProductCatalogViewProps {
  content: SiteContent;
}

export default function ProductCatalogView({ content }: ProductCatalogViewProps) {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const allProducts = content.productsSection.allProducts;

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dynamicCats = content.productsSection.dynamicCategories;
  const categoryFilters = useMemo(() => {
    if (dynamicCats && dynamicCats.length > 0) {
      return [
        { key: 'all', label: { en: 'All Products', ar: 'جميع المنتجات' } },
        ...dynamicCats.map((c) => ({
          key: c.slug,
          label: c.title,
        })),
      ];
    }
    return [
      { key: 'all', label: { en: 'All Products', ar: 'جميع المنتجات' } },
      { key: 'dates', label: { en: 'Khalas Dates', ar: 'تمر الخلاص' } },
      { key: 'meat', label: { en: 'Naimi Sheep', ar: 'الخرفان النعيمي' } },
      { key: 'pepper', label: { en: 'Hot Pepper', ar: 'فلفل حار مجروش' } },
      { key: 'dried-tomatoes', label: { en: 'Dried Tomatoes', ar: 'طماطم مجففة' } },
    ];
  }, [dynamicCats]);

  // Filtered list
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categoryKey !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchNameEn = product.name.en.toLowerCase().includes(q);
        const matchNameAr = product.name.ar.includes(q);
        const matchDescEn = product.description.en.toLowerCase().includes(q);
        const matchDescAr = product.description.ar.includes(q);
        return matchNameEn || matchNameAr || matchDescEn || matchDescAr;
      }

      return true;
    });
  }, [allProducts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-warm-canvas text-[#1A241E]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD1]/80 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:opacity-80 transition-colors group"
          >
            {isRTL ? (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            )}
            <span className="font-arabic">
              {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
            aria-label={language === 'ar' ? 'وادي النوار - الصفحة الرئيسية' : "The Blossom's Valley Home"}
          >
            <div className="shrink-0 size-8 rounded-xl bg-[#005A52] p-1.5 grid place-items-center shadow-xs border border-[#0A6860]">
              <EmblemIcon theme="cream" className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-arabic font-bold text-sm sm:text-base leading-tight text-primary">
                وادي النوار
              </span>
              <span className="text-[9px] tracking-wider uppercase text-muted-foreground font-semibold">
                {language === 'ar' ? 'مزرعة ومنتجع · شقراء' : "The Blossom's Valley"}
              </span>
            </div>
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center p-1 rounded-full border border-border bg-white text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 rounded-full transition-all font-arabic ${
                language === 'ar'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 py-12 sm:py-16">
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B3B2B]/8 text-[#1B3B2B] text-xs font-bold uppercase tracking-[0.12em] mb-4 font-arabic">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            {language === 'ar' ? 'كتالوج خيرات المزرعة' : 'Complete Harvest Catalogue'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-tight">
            {language === 'ar' ? 'منتجات وادي النوار' : 'The Blossom Valley Products'}
          </h1>
          <ArabesqueDivider variant="gold" size="md" className="my-5" />
          <p className="text-sm sm:text-base text-[#5C6E61] font-arabic leading-relaxed">
            {t(content.brand.closingTagline)}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categoryFilters.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold font-arabic transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#1B3B2B] text-white shadow-sm'
                    : 'bg-white border border-[#E8DFD1] text-[#4E5E52] hover:bg-[#FAF7F2]'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#7A8A7E] absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'ابحث في المنتجات…' : 'Search products…'}
              className="w-full ps-10 pe-4 py-2 rounded-xl bg-white border border-[#E8DFD1] text-xs sm:text-sm font-arabic focus:outline-none focus:border-[#C85A32]"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#C85A32] shadow-organic-sm hover:shadow-organic-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF7F2]">
                <Image
                  src={product.image}
                  alt={t(product.name)}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {product.badge && (
                  <div className="absolute top-3 start-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[#D8B878] text-[11px] font-bold font-arabic">
                    {t(product.badge)}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#C85A32] uppercase font-arabic block mb-1">
                    {t(product.category)}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1B3B2B] font-arabic group-hover:text-[#C85A32] transition-colors">
                    {t(product.name)}
                  </h3>
                  {product.arabicSubtitle && (
                    <p className="text-xs text-[#C85A32] font-arabic mt-0.5 mb-2 font-medium">
                      {product.arabicSubtitle}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm text-[#5C6E61] font-arabic leading-relaxed line-clamp-2">
                    {t(product.description)}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E8DFD1]/60 flex items-center justify-between text-xs font-bold text-[#1B3B2B] font-arabic group-hover:text-[#C85A32]">
                  <span>{language === 'ar' ? 'التفاصيل والطلب' : 'Details & Order'}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DFD1]">
            <p className="text-base text-[#7A8A7E] font-arabic">
              {language === 'ar' ? 'لم يتم العثور على منتجات مطابقة للبحث.' : 'No matching products found.'}
            </p>
          </div>
        )}
      </main>

      <Footer content={content} />
      <WhatsAppFAB content={content} />
    </div>
  );
}
