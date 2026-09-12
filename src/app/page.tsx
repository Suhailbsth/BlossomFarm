import { getSiteContent } from '@/lib/content';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import TomatoShowcase from '@/components/TomatoShowcase';
import StorageTips from '@/components/StorageTips';
import RecipeVideos from '@/components/RecipeVideos';
import VideoGallery from '@/components/VideoGallery';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default async function Home() {
  // Fetch content via the CMS-ready data access layer
  const content = await getSiteContent();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Fixed Navigation Header with Bilingual Switcher */}
      <Header content={content} />

      {/* Hero — Full-viewport cinematic greeting */}
      <Hero content={content} />

      {/* Wadi Nawar — Farm photo + quote + promo video */}
      <AboutSection content={content} />

      {/* Tomato Varieties — Clean image + name cards */}
      <TomatoShowcase content={content} />

      {/* How to Use & Store — Icon/card tips */}
      <StorageTips content={content} />

      {/* Recipe Videos — 4 AI-generated recipe placeholders */}
      <RecipeVideos content={content} />

      {/* Farm Vignettes — 4 short video cards */}
      <VideoGallery content={content} />

      {/* Footer — WhatsApp CTA + bilingual farm name */}
      <Footer content={content} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB content={content} />
    </main>
  );
}
