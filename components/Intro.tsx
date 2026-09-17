'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import RevealOnScroll from './RevealOnScroll';

export default function Intro() {
  const t = useTranslations('intro');

  return (
    <section className="container-px py-28 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <RevealOnScroll>
          <span className="text-xs tracking-widest2 uppercase text-accent">{t('eyebrow')}</span>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="mt-4 font-display text-3xl md:text-5xl">{t('title')}</h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="mt-8 text-base md:text-lg leading-relaxed text-foreground/70">{t('body')}</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.3}>
          <Link
            href="/about"
            className="mt-10 inline-block border-b border-accent pb-1 text-xs tracking-widest2 uppercase text-accent transition-opacity hover:opacity-70"
          >
            {t('cta')}
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
