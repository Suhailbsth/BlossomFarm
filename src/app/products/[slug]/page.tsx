import { notFound } from 'next/navigation';
import { getSiteContent, getTomatoBySlug, getAllTomatoSlugs } from '@/lib/content';
import ProductDetailsView from '@/components/ProductDetailsView';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const slugs = await getAllTomatoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tomato = await getTomatoBySlug(slug);

  if (!tomato) {
    return {
      title: 'Product Not Found | The Blossom’s Farm',
    };
  }

  return {
    title: `${tomato.name.en} (${tomato.name.ar}) — The Blossom's Farm`,
    description: tomato.description.en,
    openGraph: {
      title: `${tomato.name.en} | ${tomato.name.ar}`,
      description: tomato.description.en,
      images: [{ url: tomato.image }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tomato = await getTomatoBySlug(slug);

  if (!tomato) {
    notFound();
  }

  const content = await getSiteContent();

  return (
    <ProductDetailsView
      tomato={tomato}
      content={content}
      allTomatoes={content.tomatoesSection.items}
    />
  );
}
