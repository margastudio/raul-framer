import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { ALBUM_SLUGS } from '@/lib/albums';
import { getAlbumPhotos } from '@/lib/albumPhotos';
import AlbumGallery from '@/components/AlbumGallery';
import AlbumBackButton from '@/components/AlbumBackButton';
import OtherAlbumsTicker from '@/components/OtherAlbumsTicker';

type AlbumItem = { slug: string; title: string; tags: string[] };

// Páginas estáticas: las fotos de cada álbum se leen del disco en el build.
export function generateStaticParams() {
  return locales.flatMap((locale) => ALBUM_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'albums' });
  const album = (t.raw('items') as AlbumItem[]).find((a) => a.slug === slug);
  if (!album) return {};
  const path = locale === 'en' ? `/albums/${slug}` : `/${locale}/albums/${slug}`;
  const title = `${album.title} | Raul Pardeilhan`;
  return { title, alternates: { canonical: path }, openGraph: { title, url: `https://raulpardeilhan.cc.cd${path}` } };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'albums' });
  const items = t.raw('items') as AlbumItem[];
  const album = items.find((a) => a.slug === slug);
  if (!album) notFound();

  // Fotos reales del álbum (antes se asumían 8 fijas: imágenes rotas en álbumes de 7 y fotos
  // ocultas en los de más de 8).
  const photos = getAlbumPhotos(slug);

  return (
    <div className="pt-32">
      <div className="container-px">
        <AlbumBackButton />
      </div>
      <div className="container-px text-center mt-6">
        <div className="flex flex-wrap justify-center gap-2 text-[10px] tracking-widest2 uppercase text-accent">
          {album.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl">{album.title}</h1>
      </div>
      <AlbumGallery photos={photos} title={album.title} />
      <OtherAlbumsTicker currentSlug={slug} albums={items} />
    </div>
  );
}
