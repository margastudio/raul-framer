'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from './RevealOnScroll';

type Award = { number: string; title: string; year: string };

export default function AboutContent() {
  const t = useTranslations('about');
  const qualities = t.raw('qualities') as string[];
  const awards = t.raw('awards') as Award[];
  const history = t.raw('historyParagraphs') as string[];
  const shiningTigers = t.raw('shiningTigersParagraphs') as string[];

  return (
    <>
      {/* Hero de la página About */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img src="/images/about-hero.jpg" alt="Raul Pardeilhan" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-20 text-center">
          <h1 className="font-display text-5xl md:text-7xl tracking-widest2 uppercase">
            {t('heading1')} {t('heading2')}
          </h1>
          <p className="mt-6 text-[11px] tracking-widest2 uppercase text-foreground/50">{t('scroll')}</p>
        </div>
      </section>

      {/* Intro + CTA */}
      <section className="container-px py-24">
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-foreground/70">{t('intro')}</p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <a
              href="mailto:shiningtigers@gmail.com"
              className="border border-accent px-8 py-3 text-xs tracking-widest2 uppercase text-accent hover:opacity-70 transition-opacity"
            >
              {t('cta')}
            </a>
            <a
              href="/raul-pardeilhan-profile.pdf"
              className="text-xs tracking-widest2 uppercase text-foreground/60 border-b border-foreground/30 pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              {t('downloadPdf')}
            </a>
          </div>
        </RevealOnScroll>
      </section>

      {/* Marcas */}
      <section className="container-px py-20 border-t border-white/5">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl md:text-3xl">{t('brandsTitle')}</h2>
          <p className="mt-6 text-sm md:text-base leading-relaxed text-foreground/60">{t('brandsBody')}</p>
        </RevealOnScroll>
      </section>

      {/* Cualidades */}
      <section className="container-px py-20 border-t border-white/5">
        <RevealOnScroll className="text-center mb-14">
          <h2 className="font-display text-2xl md:text-3xl">{t('qualitiesTitle')}</h2>
        </RevealOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {qualities.map((q, i) => (
            <RevealOnScroll key={q} delay={i * 0.1}>
              <p className="font-display text-xl md:text-2xl text-accent">{q}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Awards */}
      <section className="container-px py-20 border-t border-white/5">
        <RevealOnScroll className="text-center mb-14">
          <span className="text-xs tracking-widest2 uppercase text-accent">{t('awardsEyebrow')}</span>
          <h2 className="mt-3 font-display text-2xl md:text-3xl">{t('awardsTitle')}</h2>
        </RevealOnScroll>
        <div className="mx-auto max-w-3xl divide-y divide-white/10">
          {awards.map((award, i) => (
            <RevealOnScroll key={award.number} delay={i * 0.08}>
              <div className="flex items-start gap-6 py-6">
                <span className="font-display text-3xl text-foreground/30">{award.number}</span>
                <div>
                  <p className="text-base md:text-lg">{award.title}</p>
                  <p className="mt-1 text-xs tracking-widest2 uppercase text-foreground/40">{award.year}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Historia */}
      <section className="container-px py-20 border-t border-white/5">
        <RevealOnScroll className="text-center mb-14">
          <h2 className="font-display text-2xl md:text-3xl">{t('historyTitle')}</h2>
        </RevealOnScroll>
        <div className="mx-auto max-w-2xl flex flex-col gap-6">
          {history.map((p, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <p className="text-sm md:text-base leading-relaxed text-foreground/60">{p}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Shining Tigers Production */}
      <section className="container-px py-20 border-t border-white/5">
        <RevealOnScroll className="text-center mb-14">
          <h2 className="font-display text-2xl md:text-3xl">{t('shiningTigersTitle')}</h2>
        </RevealOnScroll>
        <div className="mx-auto max-w-2xl flex flex-col gap-6">
          {shiningTigers.map((p, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <p className="text-sm md:text-base leading-relaxed text-foreground/60">{p}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
