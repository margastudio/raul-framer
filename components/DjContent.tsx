'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from './RevealOnScroll';
import VimeoEmbed from './VimeoEmbed';

type Member = { name: string; role: string; bio: string };

const MEMBER_IMAGES: Record<string, string> = {
  'João Hein': '/images/dj/timetravelers/joao-hein.jpg',
  'DJ Tiger': '/images/dj/timetravelers/dj-tiger.jpg',
  Jake: '/images/dj/timetravelers/jake.jpg',
};

// Sets de Raul como DJ Laohu.
// OJO: de los 3 links de Vimeo que se pasaron, el 2do y el 3ro eran el mismo id.
// Quedan los 2 confirmados; falta sumar el que faltaba.
const DJ_VIDEOS = ['1147721451', '1147725531'];
const WHO_WE_ARE_VIDEO = '1147718148';

export default function DjContent() {
  const t = useTranslations('dj');
  const members = t.raw('timeTravelers.members') as Member[];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 container-px text-center">
        <RevealOnScroll>
          <p className="text-xs tracking-widest2 uppercase text-accent">{t('aboutEyebrow')}</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl tracking-widest2 uppercase">{t('pageTitle')}</h1>
          <p className="mt-6 text-lg text-foreground/60">{t('aboutTitle')}</p>
        </RevealOnScroll>
      </section>

      {/* Bio */}
      <section className="container-px pb-24">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <p className="text-base leading-relaxed text-foreground/70">{t('bio')}</p>
        </RevealOnScroll>
      </section>

      {/* Live sets */}
      <section className="container-px pb-28 border-t border-white/5 pt-24">
        <RevealOnScroll className="mb-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl">{t('videosTitle')}</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {DJ_VIDEOS.map((id, i) => (
            <RevealOnScroll key={id} delay={i * 0.1}>
              <VimeoEmbed id={id} title={`${t('pageTitle')} — live set`} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Time Travelers */}
      <section className="container-px pb-28 border-t border-white/5 pt-24">
        <RevealOnScroll className="text-center">
          <p className="text-xs tracking-widest2 uppercase text-accent">{t('timeTravelers.lineupLabel')}</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl uppercase tracking-widest2">
            {t('timeTravelers.title')}
          </h2>
          <p className="mt-3 text-sm text-foreground/50">{t('timeTravelers.subtitle')}</p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-14 mx-auto max-w-3xl flex flex-col items-center text-center gap-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dj/timetravelers/logo.webp" alt="Time Travelers" className="w-48 md:w-56 opacity-95" />
          <p className="text-base leading-relaxed text-foreground/70">{t('timeTravelers.tagline')}</p>
        </RevealOnScroll>

        <RevealOnScroll className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="font-display text-xl uppercase tracking-widest2 text-foreground/80 mb-5">
            {t('timeTravelers.whoWeAre')}
          </h3>
          <VimeoEmbed id={WHO_WE_ARE_VIDEO} title="Time Travelers — who we are" />
        </RevealOnScroll>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {members.map((m, i) => (
            <RevealOnScroll key={m.name} delay={i * 0.1} className="text-center">
              <div className="aspect-[3/4] overflow-hidden mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MEMBER_IMAGES[m.name]} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <h4 className="font-display text-xl">{m.name}</h4>
              <p className="mt-1 text-[11px] tracking-widest2 uppercase text-accent">{m.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60">{m.bio}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
