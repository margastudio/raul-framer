'use client';

import { useTranslations } from 'next-intl';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import RevealOnScroll from './RevealOnScroll';
import { STATS } from '@/lib/siteData';

// Contador: el HTML (y el modo sin JS / reduced-motion) siempre muestra el valor final.
// La animación 0 -> valor es solo un refuerzo cuando entra en pantalla.
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{value}</span>;
}

export default function Stats() {
  const t = useTranslations('stats');

  // Solo se muestran cifras confirmadas (value !== null). Nunca inventar números.
  const visible = STATS.filter((s) => s.value !== null) as { key: string; value: number }[];
  if (visible.length === 0) return null;

  return (
    <section className="container-px py-20 border-t border-white/5">
      <RevealOnScroll className="flex flex-wrap justify-center gap-x-20 gap-y-10 text-center">
        {visible.map((stat) => (
          <div key={stat.key} className="flex flex-col items-center gap-2">
            <span className="font-display text-4xl md:text-5xl">
              <Counter to={stat.value} />+
            </span>
            <span className="max-w-[12rem] text-xs md:text-sm tracking-wide text-foreground/60">
              {t(stat.key)}
            </span>
          </div>
        ))}
      </RevealOnScroll>
    </section>
  );
}
