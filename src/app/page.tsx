import { getSiteContent } from '@/lib/content';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import TomatoShowcase from '@/components/TomatoShowcase';
import VideoGallery from '@/components/VideoGallery';
import Footer from '@/components/Footer';
import WhatsAppFAB from '@/components/WhatsAppFAB';

export default async function Home() {
  // Fetch content via the CMS-ready data access layer
  const content = await getSiteContent();

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A241E] selection:bg-[#C9A043] selection:text-[#122419]">
      {/* Fixed/Floating Navigation Header with Bilingual Switcher */}
      <Header content={content} />

      {/* Hero Section */}
      <Hero content={content} />

      {/* About the Garden & Story & Values */}
      <AboutSection content={content} />

      {/* Tomato Product Collection */}
      <TomatoShowcase content={content} />

      {/* Video Gallery: 1 Featured Documentary + 4 Short AI Reels */}
      <VideoGallery content={content} />

      {/* Footer & Contact */}
      <Footer content={content} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB content={content} />
    </main>
  );
}
