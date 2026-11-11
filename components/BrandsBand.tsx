'use client';

import { useTranslations } from 'next-intl';
import RevealOnScroll from './RevealOnScroll';
import { BRAND_LOGOS } from '@/lib/siteData';

// variant="marquee": banda horizontal discreta (Home).
// variant="grid": grilla con espaciado consistente (About).
// Con prefers-reduced-motion la banda deja de moverse y pasa a una grilla centrada.
export default function BrandsBand({ variant = 'marquee' }: { variant?: 'marquee' | 'grid' }) {
  const t = useTranslations('brands');

  const logo = (b: (typeof BRAND_LOGOS)[number], i: number, hidden = false) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={`${b.src}-${i}`}
      src={b.src}
      alt={hidden ? '' : b.name}
      loading="lazy"
      decoding="async"
      // grayscale + mix-blend-lighten: los fondos negros de los archivos se funden con el fondo del sitio.
      className={`h-12 md:h-16 w-auto object-contain shrink-0 grayscale mix-blend-lighten opacity-70 transition-opacity duration-300 hover:opacity-100 ${
        b.invert ? 'invert' : ''
      }`}
    />
  );

  return (
    <section className="container-px py-16 md:py-20 border-t border-white/5" aria-labelledby="brands-title">
      <RevealOnScroll className="text-center">
        <h2 id="brands-title" className="font-display text-2xl md:text-3xl">
          {t('title')}
        </h2>
      </RevealOnScroll>

      {variant === 'grid' ? (
        <RevealOnScroll
          delay={0.1}
          className="mt-12 mx-auto max-w-5xl grid grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-10 place-items-center"
        >
          {BRAND_LOGOS.map((b, i) => logo(b, i))}
        </RevealOnScroll>
      ) : (
        <RevealOnScroll delay={0.1} className="mt-12">
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] motion-reduce:[mask-image:none]">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
              <div className="flex shrink-0 items-center gap-16 pr-16 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
                {BRAND_LOGOS.map((b, i) => logo(b, i))}
              </div>
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center gap-16 pr-16 motion-reduce:hidden"
              >
                {BRAND_LOGOS.map((b, i) => logo(b, i, true))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      )}
    </section>
  );
}
