import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import AlbumGallery from '@/components/AlbumGallery';
import AlbumBackButton from '@/components/AlbumBackButton';
import OtherAlbumsTicker from '@/components/OtherAlbumsTicker';

type AlbumItem = { slug: string; title: string; tags: string[] };

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

  // Reemplazar por la cantidad real de fotos de cada álbum en /public/images/albums/{slug}/
  const photos = Array.from({ length: 8 }, (_, i) => `/images/albums/${slug}/${i + 1}.jpg`);

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
