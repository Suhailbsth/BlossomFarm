import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1A3826",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blossomfarm.sa"),
  title: "The Blossom's Farm | مزرعة النوار — Artisanal Heirloom Harvest",
  description:
    "A boutique artisanal farm in Al-Ammariyah, Riyadh cultivating rare organic heirloom tomatoes and botanicals with living soil, pure aquifer water, and Saudi hospitality.",
  keywords: [
    "The Blossom's Farm",
    "مزرعة النوار",
    "طماطم عضوية",
    "Heirloom tomatoes Saudi Arabia",
    "Boutique farm Riyadh",
    "Al-Ammariyah farm",
    "Organic farming Saudi",
    "مزرعة العمارية",
  ],
  openGraph: {
    title: "The Blossom's Farm | مزرعة النوار",
    description: "Boutique organic heirloom harvest from Al-Ammariyah Oasis, Riyadh.",
    images: [
      {
        url: "/images/hero-garden.jpg",
        width: 1200,
        height: 675,
        alt: "The Blossom's Farm Greenhouse Garden",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1A241E] selection:bg-[#C9A043] selection:text-[#122419]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
