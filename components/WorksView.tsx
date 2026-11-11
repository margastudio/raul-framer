'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AlbumsGrid from './AlbumsGrid';
import VideosGrid from './VideosGrid';
import { ALBUM_CATEGORIES, FILTER_ORDER, type CategoryKey } from '@/lib/albums';

export default function WorksView() {
  const t = useTranslations('works');
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');
  const [filter, setFilter] = useState<CategoryKey | 'all'>('all');

  // Solo se ofrecen filtros que tienen al menos un álbum.
  const used = new Set(Object.values(ALBUM_CATEGORIES).flat());
  const filters: (CategoryKey | 'all')[] = ['all', ...FILTER_ORDER.filter((c) => used.has(c))];

  return (
    <div>
      <h1 className="sr-only">{t('title')}</h1>

      <div className="container-px flex justify-center">
        <div className="inline-flex border border-white/15 text-xs tracking-widest2 uppercase">
          <button
            onClick={() => setTab('photos')}
            className={`px-6 py-3 transition-colors duration-300 ${
              tab === 'photos' ? 'bg-accent text-background' : 'text-foreground/60 hover:text-foreground'
            }`}
            aria-pressed={tab === 'photos'}
          >
            {t('photosTab')}
          </button>
          <button
            onClick={() => setTab('videos')}
            className={`px-6 py-3 transition-colors duration-300 border-l border-white/15 ${
              tab === 'videos' ? 'bg-accent text-background' : 'text-foreground/60 hover:text-foreground'
            }`}
            aria-pressed={tab === 'videos'}
          >
            {t('videosTab')}
          </button>
        </div>
      </div>

      {tab === 'photos' ? (
        <>
          <div
            role="group"
            aria-label={t('filterLabel')}
            className="container-px mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] tracking-widest2 uppercase"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`pb-1 border-b transition-colors duration-300 ${
                  filter === f
                    ? 'border-accent text-accent'
                    : 'border-transparent text-foreground/50 hover:text-foreground'
                }`}
              >
                {t(`filters.${f}`)}
              </button>
            ))}
          </div>
          <AlbumsGrid filter={filter} />
        </>
      ) : (
        <VideosGrid />
      )}
    </div>
  );
}
