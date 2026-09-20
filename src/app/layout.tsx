import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#8E2800",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://blossomvalley.sa"),
  title: "The Blossom Valley | وادي النوار — من أرضنا… إلى مائدتكم",
  description:
    "The Blossom Valley in Shaqra City: Maknooz Khalas Dates, Naimi Sheep Meat, Crushed Hot Pepper, and Artisanal Dried Tomatoes.",
  keywords: [
    "The Blossom Valley",
    "وادي النوار",
    "تمر خلاص مكنوز",
    "خلاص شقراء",
    "ذبائح نعيمي شقراء",
    "فلفل حار مجروش",
    "طماطم مجففة",
    "Shaqra farm",
    "Saudi artisanal food",
  ],
  openGraph: {
    title: "The Blossom Valley | وادي النوار",
    description: "The Blossom Valley — From our land… to your table. Maknooz Khalas Dates, Naimi Sheep Meat, Crushed Hot Pepper, and Artisanal Dried Tomatoes.",
    images: [
      {
        url: "https://cdn.sanity.io/images/tokh7kkd/production/52419a85726510eeef6164cb4ab5a8f1af464a40-1376x768.jpg",
        width: 1200,
        height: 675,
        alt: "The Blossom Valley in Shaqra City",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Outfit:wght@500;600;700&family=Noto+Kufi+Arabic:wght@400;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-body" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
