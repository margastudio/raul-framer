'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

type AlbumItem = { slug: string; title: string; tags: string[] };

const HEADINGS: Record<string, string> = {
  en: 'More albums',
  es: 'Más álbumes',
  zh: '更多相册',
};

export default function OtherAlbumsTicker({
  currentSlug,
  albums,
}: {
  currentSlug: string;
  albums: AlbumItem[];
}) {
  const pathname = usePathname();
  const locale = useLocale();
  const heading = HEADINGS[locale] ?? HEADINGS.en;

  // Reemplaza el último segmento de la URL actual (el slug) por el de cada álbum
  const basePath = pathname.replace(/\/[^/]+$/, '');

  const others = albums.filter((a) => a.slug !== currentSlug);

  if (others.length === 0) return null;

  return (
    <div className="container-px mt-20 pt-10 border-t border-white/5">
      <h4 className="text-xs md:text-sm tracking-widest uppercase text-white/50 mb-6">
        {heading}
      </h4>
      <div className="flex gap-6 overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch] scrollbar-hide">
        {others.map((album) => (
          <Link
            key={album.slug}
            href={`${basePath}/${album.slug}`}
            className="group flex-shrink-0 w-48 md:w-56"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-white/5">
              <img
                src={`/images/albums/${album.slug}/1.jpg`}
                alt={album.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-sm md:text-base font-display group-hover:text-accent transition-colors">
              {album.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
