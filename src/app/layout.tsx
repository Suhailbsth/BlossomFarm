import type { Metadata, Viewport } from "next";
import { Figtree, Outfit, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-figtree",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-outfit",
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-noto-kufi",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1B7A42",
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
    <html
      lang="ar"
      dir="rtl"
      className={`${figtree.variable} ${outfit.variable} ${notoKufiArabic.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground font-body" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
