'use client';

import { useTranslations } from 'next-intl';
import { actingVideos } from '@/lib/videos';
import VimeoEmbed from './VimeoEmbed';
import RevealOnScroll from './RevealOnScroll';

export default function VideosGrid() {
  const t = useTranslations('works');

  if (actingVideos.length === 0) {
    return (
      <div className="container-px py-28 text-center text-sm text-foreground/50">
        {t('videosEmpty')}
      </div>
    );
  }

  return (
    <div className="container-px py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {actingVideos.map((v, i) => (
          <RevealOnScroll key={v.id} delay={i * 0.08}>
            <VimeoEmbed id={v.vimeoId} hash={v.hash} title={v.title} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
