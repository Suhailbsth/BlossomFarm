import { getSiteContent } from '@/lib/content';
import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/Hero';
import MarqueeTicker from '@/components/MarqueeTicker';
import AboutSection from '@/components/AboutSection';
import TomatoShowcase from '@/components/TomatoShowcase';
import StorageTips from '@/components/StorageTips';
import VideoGallery from '@/components/VideoGallery';
import VisitSection from '@/components/VisitSection';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default async function Home() {
  // Fetch content via the CMS-ready data access layer
  const content = await getSiteContent();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Delicate Gold Thread Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Fixed Navigation Header with Bilingual Switcher */}
      <Header content={content} />

      {/* Hero — Full-viewport cinematic greeting */}
      <Hero content={content} />

      {/* Boutique Infinite Marquee Ticker — Transition to Story */}
      <MarqueeTicker />

      {/* Wadi Nawar — Farm photo + quote + promo video */}
      <AboutSection content={content} />

      {/* Tomato Varieties — Clean image + name cards */}
      <TomatoShowcase content={content} />

      {/* How to Use & Store — Icon/card tips */}
      <StorageTips content={content} />

      {/* Garden & Kitchen Vignettes with Tab Switcher */}
      <VideoGallery content={content} />

      {/* Visit Us — Location, Directions, and Visiting Hours */}
      <VisitSection content={content} />

      {/* Footer — WhatsApp CTA + bilingual farm name */}
      <Footer content={content} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB content={content} />
    </main>
  );
}
