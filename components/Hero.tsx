'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from '@/lib/navigation';
import { CONTACT_EMAIL } from '@/lib/siteData';

export default function Hero() {
  const t = useTranslations('hero');
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Parallax suave (desactivado con prefers-reduced-motion)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Raul Pardeilhan"
          className="h-full w-full object-cover object-top scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-end px-5 pb-20 text-center md:pb-24"
      >
        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="font-display text-[clamp(1.75rem,6vw,7rem)] tracking-[0.2em] md:tracking-[0.28em] uppercase"
        >
          {t('name')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-5 max-w-xl text-[11px] md:text-xs tracking-widest2 uppercase text-foreground/70"
        >
          {t('descriptor')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/albums"
            className="inline-block w-64 sm:w-auto text-center bg-foreground px-8 py-3 text-xs tracking-widest2 uppercase text-background transition-colors duration-300 hover:bg-accent"
          >
            {t('ctaWork')}
          </Link>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block w-64 sm:w-auto text-center border border-foreground/40 px-8 py-3 text-xs tracking-widest2 uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {t('ctaContact')}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 hidden text-[11px] tracking-widest2 uppercase text-foreground/50 md:block"
        >
          {t('scroll')}
        </motion.p>
      </motion.div>
    </section>
  );
}
