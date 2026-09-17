'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import RevealOnScroll from './RevealOnScroll';

const BRAND_LOGOS = [
  '/images/brands/brand-1.png',
  '/images/brands/brand-2.png',
  '/images/brands/brand-3.png',
  '/images/brands/brand-4.png',
  '/images/brands/brand-5.png',
  '/images/brands/brand-6.png',
  '/images/brands/brand-7.png',
  '/images/brands/brand-8.png',
  '/images/brands/brand-9.png',
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.6, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Stats() {
  const t = useTranslations('stats');

  const stats = [
    { key: 'countries', value: 15 },
    { key: 'years', value: 26 },
    { key: 'awards', value: 4 },
    { key: 'brands', value: 40 },
  ];

  return (
    <section className="container-px py-24 border-t border-white/5">
      <RevealOnScroll className="text-center">
        <h3 className="font-display text-2xl md:text-3xl">{t('title')}</h3>
      </RevealOnScroll>

      {/* Grilla de estadísticas */}
      <RevealOnScroll delay={0.1} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.key} className="flex flex-col items-center gap-2">
            <span className="font-display text-4xl md:text-5xl">
              <Counter to={stat.value} />+
            </span>
            <span className="text-sm md:text-base text-white/60">{t(stat.key)}</span>
          </div>
        ))}
      </RevealOnScroll>

      {/* Logo ticker infinito */}
      <RevealOnScroll delay={0.15} className="mt-14 overflow-hidden">
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-20">
            {[...BRAND_LOGOS, ...BRAND_LOGOS].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Brand logo"
                className="h-14 md:h-20 w-auto object-contain shrink-0 opacity-90"
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
