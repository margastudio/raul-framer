'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import AlbumsGrid from './AlbumsGrid';
import VideosGrid from './VideosGrid';

export default function WorksView() {
  const t = useTranslations('works');
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');

  return (
    <div>
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

      {tab === 'photos' ? <AlbumsGrid /> : <VideosGrid />}
    </div>
  );
}
