'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { SiteContent, TomatoVariety } from '@/types/content';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Search,
  Filter,
  SlidersHorizontal,
  MessageCircle,
} from 'lucide-react';
import ArabesqueDivider from './ArabesqueDivider';
import Footer from './Footer';
import WhatsAppFAB from './WhatsAppFAB';

interface ProductCatalogViewProps {
  content: SiteContent;
}

export default function ProductCatalogView({ content }: ProductCatalogViewProps) {
  const { language, setLanguage, isRTL, t } = useLanguage();
  const allProducts = content.tomatoesSection.items;

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minSweetness, setMinSweetness] = useState<number>(0);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allProducts.forEach((p) => cats.add(p.category.en));
    return ['all', ...Array.from(cats)];
  }, [allProducts]);

  // Filtered list
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category.en !== selectedCategory) {
        return false;
      }

      // Sweetness filter
      if (product.sweetness < minSweetness) {
        return false;
      }

      // Search query filter (matches en/ar name, description, or notes)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchNameEn = product.name.en.toLowerCase().includes(q);
        const matchNameAr = product.name.ar.includes(q);
        const matchDescEn = product.description.en.toLowerCase().includes(q);
        const matchDescAr = product.description.ar.includes(q);
        const matchNotes = product.tasteNotes.some(
          (n) => n.en.toLowerCase().includes(q) || n.ar.includes(q)
        );
        return matchNameEn || matchNameAr || matchDescEn || matchDescAr || matchNotes;
      }

      return true;
    });
  }, [allProducts, selectedCategory, minSweetness, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-warm-canvas text-[#1A241E]">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Header Navigation
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD1]/80 py-3.5 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1B3B2B] hover:text-[#C85A32] transition-colors group"
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

          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-sm font-bold font-arabic text-[#1B3B2B]">
              مزرعة النوار
            </span>
            <span className="text-[11px] text-[#C5A059]">✦</span>
            <span className="text-xs font-serif-luxury text-[#7A8A7E]">
              Harvest Catalogue
            </span>
          </Link>

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
          Hero Banner of Catalogue
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-5 sm:px-8 py-10 sm:py-16">
        {/* Title & Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-xs font-bold uppercase tracking-[0.12em] mb-3.5 font-arabic">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'ar' ? 'كتالوج المحاصيل الكامل' : 'Complete Harvest Collection'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B3B2B] font-arabic leading-tight mb-4">
            {language === 'ar' ? 'نوادر أصناف الطماطم المتوارثة' : 'Heirloom Tomato Archive'}
          </h1>
          <p className="text-sm sm:text-base text-[#4E5E52] leading-relaxed font-arabic">
            {language === 'ar'
              ? 'تصفح تشكيلتنا الموسمية الكاملة المزروعة عضوياً في بيوتنا المحمية بوادي العمارية. اضغط على أي صنف لمعرفة النكهة وأسرار الطهي والحفظ.'
              : 'Browse our complete seasonal collection grown in our biophilic greenhouses in Al-Ammariyah. Select any variety to explore tasting notes, culinary pairings, and storage guides.'}
          </p>
          <ArabesqueDivider variant="terracotta" size="md" className="my-5" />
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Search & Filter Toolbar
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mb-10 sm:mb-12 p-5 sm:p-6 rounded-2xl bg-white border border-[#E8DFD1] shadow-organic-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input Bar */}
            <div className="relative flex-1">
              <Search className={`w-4 h-4 text-[#7A8A7E] absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3.5' : 'left-3.5'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'ابحث باسم الصنف أو النكهة (مثل: عسل، ياقوت، مدخن)...'
                    : 'Search by variety or flavor (e.g. honey, smoky, cherry)...'
                }
                className={`w-full py-2.5 rounded-xl border border-[#E8DFD1] text-xs sm:text-sm bg-[#FAF7F2] text-[#1B3B2B] focus:outline-none focus:border-[#C85A32] ${
                  isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'
                }`}
              />
            </div>

            {/* Sweetness Slider Filter */}
            <div className="flex items-center gap-3 shrink-0 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1]">
              <SlidersHorizontal className="w-4 h-4 text-[#C5A059]" />
              <label className="text-xs font-bold text-[#1B3B2B] font-arabic">
                {language === 'ar' ? 'الحلاوة الدنيا:' : 'Min Sweetness:'}
              </label>
              <select
                value={minSweetness}
                onChange={(e) => setMinSweetness(Number(e.target.value))}
                className="bg-white border border-[#E8DFD1] rounded-lg px-2 py-1 text-xs font-bold text-[#C85A32] focus:outline-none"
              >
                <option value={0}>{language === 'ar' ? 'الكل' : 'All'}</option>
                <option value={3}>3+ ●●●</option>
                <option value={4}>4+ ●●●●</option>
                <option value={5}>5 ●●●●●</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <span className="text-xs font-bold text-[#7A8A7E] font-arabic shrink-0 me-1">
              <Filter className="w-3.5 h-3.5 inline me-1" />
              {language === 'ar' ? 'التصنيف:' : 'Category:'}
            </span>

            {categories.map((catKey) => {
              const isActive = selectedCategory === catKey;
              let labelEn = 'All Varieties';
              let labelAr = 'جميع الأصناف';

              if (catKey !== 'all') {
                const found = allProducts.find((p) => p.category.en === catKey);
                labelEn = found ? found.category.en : catKey;
                labelAr = found ? found.category.ar : catKey;
              }

              return (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 font-arabic ${
                    isActive
                      ? 'bg-[#1B3B2B] text-white shadow-xs'
                      : 'bg-[#FAF7F2] text-[#4E5E52] hover:bg-[#E8DFD1]/50 border border-[#E8DFD1]'
                  }`}
                >
                  {language === 'ar' ? labelAr : labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Results Counter
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="flex items-center justify-between text-xs text-[#7A8A7E] font-arabic mb-6 px-1">
          <span>
            {language === 'ar'
              ? `عرض ${filteredProducts.length} من أصل ${allProducts.length} صنف متوارث`
              : `Showing ${filteredProducts.length} of ${allProducts.length} heirloom varieties`}
          </span>
          {(searchQuery || selectedCategory !== 'all' || minSweetness > 0) && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setMinSweetness(0);
              }}
              className="text-[#C85A32] font-bold hover:underline"
            >
              {language === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset filters'}
            </button>
          )}
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Product Cards Grid
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product, idx) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group block rounded-2xl bg-white border border-[#E8DFD1] hover:border-[#C85A32] shadow-organic-sm shadow-organic-hover overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Image Aspect Box */}
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                    <Image
                      src={product.image}
                      alt={t(product.name)}
                      fill
                      quality={90}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

                    {/* Season badge */}
                    <div className="absolute top-3 end-3 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#1B3B2B] text-xs font-bold shadow-xs border border-[#E8DFD1]">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                        {language === 'ar' ? 'قطاف اليوم' : 'Fresh Peak'}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute bottom-3 start-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-white text-[11px] font-bold font-arabic">
                        {t(product.category)}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-[#1B3B2B] font-arabic leading-snug group-hover:text-[#C85A32] transition-colors">
                        {t(product.name)}
                      </h3>
                      <p className="text-xs text-[#7A8A7E] font-serif-luxury italic mt-0.5">
                        {language === 'ar' ? product.name.en : product.name.ar}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4E5E52] leading-relaxed font-arabic line-clamp-2">
                      {t(product.description)}
                    </p>

                    {/* Tasting Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.tasteNotes.map((note, nIdx) => (
                        <span
                          key={nIdx}
                          className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#1B3B2B] border border-[#E8DFD1] font-arabic font-medium"
                        >
                          ✦ {t(note)}
                        </span>
                      ))}
                    </div>

                    {/* Sensory Mini Meters */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E8DFD1]/60 text-center">
                      <div>
                        <span className="block text-[10px] text-[#7A8A7E] font-arabic">
                          {language === 'ar' ? 'الحلاوة' : 'Sweet'}
                        </span>
                        <span className="text-xs font-bold text-[#C85A32]">
                          {'●'.repeat(product.sweetness)}{'○'.repeat(5 - product.sweetness)}
                        </span>
                      </div>
                      <div className="border-x border-[#E8DFD1]/60">
                        <span className="block text-[10px] text-[#7A8A7E] font-arabic">
                          {language === 'ar' ? 'الحموضة' : 'Acid'}
                        </span>
                        <span className="text-xs font-bold text-[#1B3B2B]">
                          {'●'.repeat(product.acidity)}{'○'.repeat(5 - product.acidity)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-[#7A8A7E] font-arabic">
                          {language === 'ar' ? 'الأومامي' : 'Umami'}
                        </span>
                        <span className="text-xs font-bold text-[#C5A059]">
                          {'●'.repeat(product.umami)}{'○'.repeat(5 - product.umami)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 sm:px-6 py-3.5 bg-[#FAF7F2]/60 border-t border-[#E8DFD1] flex items-center justify-between text-xs font-bold text-[#C85A32]">
                  <span className="font-arabic">
                    {language === 'ar' ? 'عرض تفاصيل الصنف والوصفات' : 'Explore Variety & Recipes'}
                  </span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#E8DFD1]">
            <p className="text-base text-[#7A8A7E] font-arabic mb-3">
              {language === 'ar'
                ? 'لا توجد محاصيل مطابقة للبحث الحالي.'
                : 'No heirloom varieties match your search criteria.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setMinSweetness(0);
              }}
              className="px-5 py-2 rounded-full bg-[#1B3B2B] text-white text-xs font-bold font-arabic"
            >
              {language === 'ar' ? 'عرض جميع المحاصيل' : 'Show all varieties'}
            </button>
          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Direct WhatsApp Harvest Box Inquiries
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-10 rounded-organic-1 bg-[#1B3B2B] text-[#FAF7F2] relative overflow-hidden text-center sm:text-start flex flex-col sm:flex-row items-center justify-between gap-6 shadow-organic-lg">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059] block mb-2 font-arabic">
              {language === 'ar' ? 'حجوزات المحصول وسلال الذواقة' : 'Heirloom Baskets & Custom Orders'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-arabic leading-snug mb-2">
              {language === 'ar' ? 'تفضل بطلب سلتك الخاصة مباشرة من المزرعة' : 'Order Your Custom Heirloom Basket Direct'}
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DFD1]/80 leading-relaxed font-arabic">
              {language === 'ar'
                ? 'يمكنك تنسيق سلة مشكلة تجمع بين جميع أصناف الطماطم المتوارثة لتصلك طازجة في نفس يوم القطاف.'
                : 'Curate a bespoke mix of rare heirlooms, harvested at morning dawn and delivered farm-to-door in Riyadh.'}
            </p>
          </div>

          <a
            href={`https://wa.me/${content.footer.whatsAppNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              language === 'ar'
                ? 'مرحباً مزرعة النوار! اطلعت على كتالوج المحاصيل وأود الاستفسار عن حجز سلة منوعة من طماطم اليوم.'
                : 'Hello Blossom Farm! I browsed your harvest catalogue and would like to order a curated heirloom tomato basket.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-8 py-3.5 rounded-full bg-[#1E5E3A] hover:bg-[#174C2E] text-white font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center gap-2.5 border border-emerald-400/30"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span className="font-arabic">{language === 'ar' ? 'طلب سلة عبر واتساب' : 'Inquire on WhatsApp'}</span>
          </a>
        </div>
      </main>

      <Footer content={content} />
      <WhatsAppFAB content={content} />
    </div>
  );
}
