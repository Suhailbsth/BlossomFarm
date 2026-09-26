import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NaimiSheepSection from '@/components/NaimiSheepSection';
import AboutSection from '@/components/AboutSection';
import ProductCategorySection from '@/components/ProductCategorySection';
import StorageTips from '@/components/StorageTips';
import HowToUseSection from '@/components/HowToUseSection';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';
import { getSanitySiteSettings } from '@/lib/sanity';
import { getSiteContent } from '@/lib/content';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const sanitySettings = await getSanitySiteSettings();

  const title =
    sanitySettings?.title || "The Blossom Valley | وادي النوار — من أرضنا… إلى مائدتكم";

  const description =
    sanitySettings?.metaDescription?.ar ||
    sanitySettings?.metaDescription?.en ||
    "Naturally vibrant products, grown with care in Wadi Al-Nawar, Shaqra. Khalas Dates, Naimi Sheep Meat, Crushed Hot Pepper, and Artisanal Dried Tomatoes.";

  const shareImageUrl = sanitySettings?.ogImageUrl || '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: shareImageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImageUrl],
    },
  };
}

export default async function Home() {
  const [sanitySettings, content] = await Promise.all([
    getSanitySiteSettings(),
    getSiteContent(),
  ]);

  const whatsAppNumber = sanitySettings?.whatsAppNumber || content?.footer?.whatsAppNumber;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* 1. Header with brand logo, quick navigation, and language switch */}
      <Header content={content} whatsAppNumber={whatsAppNumber} />

      {/* 2. Hero Section (#top) — Assalamu Alaikum · Wadi Al-Nawar */}
      <Hero content={content} whatsAppNumber={whatsAppNumber} />

      {/* 3. Section — Naimi Sheep Pastures (#livestock) — Directly after Hero */}
      <NaimiSheepSection content={content} whatsAppNumber={whatsAppNumber} />

      {/* 4. Section 1 — About (#farm) — Our home · 01 */}
      <AboutSection content={content} />

      {/* 4. Section 2 — Products (#varieties) — Freshly picked · 02 */}
      <ProductCategorySection content={content} />

      {/* 5. Section 4 — Best Storage Practice (#storage) — Field notes · 03 (Terracotta) */}
      <StorageTips content={content} />

      {/* 6. Section 3 — How to Use Dried Tomatoes (#recipes) — From our kitchen · 04 */}
      <HowToUseSection content={content} />

      {/* 7. Footer — Closing Tagline and Harvest-Gold WhatsApp CTA */}
      <Footer content={content} whatsAppNumber={whatsAppNumber} />

      {/* 8. Floating Action Button for 1-Tap WhatsApp Ordering */}
      <WhatsAppFAB content={content} whatsAppNumber={whatsAppNumber} />
    </main>
  );
}
