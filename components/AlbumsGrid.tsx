'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import RevealOnScroll from './RevealOnScroll';

type AlbumItem = { slug: string; title: string; tags: string[] };

export default function AlbumsGrid() {
  const t = useTranslations('albums');
  const items = t.raw('items') as AlbumItem[];

  return (
    <section className="container-px py-28 border-t border-white/5">
      <RevealOnScroll className="mb-14 text-center">
        <h3 className="font-display text-3xl md:text-4xl">{t('title')}</h3>
      </RevealOnScroll>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((album, i) => (
          <RevealOnScroll key={album.slug} delay={i * 0.08}>
            <Link href={`/albums/${album.slug}`} className="group relative block aspect-[3/4] overflow-hidden">
              {/* Reemplazar por /public/images/albums/{slug}.jpg */}
              <img
                src={`/images/albums/${album.slug}.jpg`}
                alt={album.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap gap-2 text-[10px] tracking-widest2 uppercase text-accent">
                  {album.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h4 className="mt-2 font-display text-xl">{album.title}</h4>
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
