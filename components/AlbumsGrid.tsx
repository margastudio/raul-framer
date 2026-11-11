'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import RevealOnScroll from './RevealOnScroll';
import { ALBUM_CATEGORIES, FEATURED_ALBUMS, type CategoryKey } from '@/lib/albums';

type AlbumItem = { slug: string; title: string; tags: string[] };

type Props = {
  /** Home: muestra solo la selección curada + enlace "ver todos". */
  featuredOnly?: boolean;
  /** Works: filtra por categoría. */
  filter?: CategoryKey | 'all';
};

export default function AlbumsGrid({ featuredOnly = false, filter = 'all' }: Props) {
  const t = useTranslations('albums');
  const all = t.raw('items') as AlbumItem[];

  let items = all;
  if (featuredOnly) {
    items = FEATURED_ALBUMS.map((slug) => all.find((a) => a.slug === slug)).filter(Boolean) as AlbumItem[];
  } else if (filter !== 'all') {
    items = all.filter((a) => ALBUM_CATEGORIES[a.slug]?.includes(filter));
  }

  return (
    <section className={`container-px ${featuredOnly ? 'py-28 border-t border-white/5' : 'pb-28 pt-10'}`}>
      {featuredOnly && (
        <RevealOnScroll className="mb-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl">{t('featuredTitle')}</h2>
        </RevealOnScroll>
      )}

      {/* key=filter: al cambiar de filtro la grilla se re-anima */}
      <div key={filter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((album, i) => (
          <RevealOnScroll key={album.slug} delay={(i % 6) * 0.08}>
            <Link href={`/albums/${album.slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-white/5">
              <img
                src={`/images/albums/${album.slug}.jpg`}
                alt={album.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 text-[10px] tracking-widest2 uppercase text-accent">
                  {album.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3 className="mt-2 font-display text-xl">{album.title}</h3>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>

      {featuredOnly && (
        <RevealOnScroll className="mt-14 text-center">
          <Link
            href="/albums"
            className="inline-block border-b border-accent pb-1 text-xs tracking-widest2 uppercase text-accent transition-opacity hover:opacity-70"
          >
            {t('viewAll')}
          </Link>
        </RevealOnScroll>
      )}
    </section>
  );
}
