'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from './RevealOnScroll';
import { CONTACT_EMAIL } from '@/lib/siteData';

// CTA final de contacto / booking. variant="dj" para la página de DJ Laohu.
export default function CtaBanner({ variant = 'default' }: { variant?: 'default' | 'dj' }) {
  const t = useTranslations('cta');
  const dj = variant === 'dj';
  const subject = encodeURIComponent(dj ? t('djSubject') : t('subject'));

  return (
    <section className="container-px py-28 md:py-40 border-t border-white/5 text-center">
      <RevealOnScroll className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl md:text-6xl uppercase tracking-wide leading-tight">
          {dj ? t('djTitle') : t('title')}
        </h2>
        <p className="mt-6 text-base md:text-lg text-foreground/60">{dj ? t('djBody') : t('body')}</p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${subject}`}
          className="mt-10 inline-block bg-foreground px-10 py-4 text-xs tracking-widest2 uppercase text-background transition-colors duration-300 hover:bg-accent"
        >
          {dj ? t('djBook') : t('book')}
        </a>
        <p className="mt-6 text-sm text-foreground/50">
          {t('orEmail')}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:opacity-70 transition-opacity">
            {CONTACT_EMAIL}
          </a>
        </p>
      </RevealOnScroll>
    </section>
  );
}
