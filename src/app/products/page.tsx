import { getSiteContent } from '@/lib/content';
import ProductCatalogView from '@/components/ProductCatalogView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Heirloom Harvest Catalogue | كتالوج محاصيل الطماطم — The Blossom's Farm",
  description: "Browse our complete seasonal catalogue of rare organic heirloom tomatoes and botanicals grown in Al-Ammariyah Oasis, Riyadh.",
  openGraph: {
    title: "Heirloom Harvest Catalogue | مزرعة النوار",
    description: "Full catalogue of rare heirloom tomatoes with tasting profiles and culinary pairings.",
    images: [{ url: '/images/hero-garden.jpg' }],
  },
};

export default async function ProductsCataloguePage() {
  const content = await getSiteContent();
  return <ProductCatalogView content={content} />;
}
