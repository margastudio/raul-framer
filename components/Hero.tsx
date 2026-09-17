'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const t = useTranslations('hero');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Efecto parallax: la imagen se mueve más lento que el scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Reemplazar por /public/images/hero.jpg (imagen local, optimizada) */}
        <img
          src="/images/hero.jpg"
          alt="Raul Pardeilhan"
          className="h-full w-full object-cover object-top scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/60" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="font-display text-5xl md:text-8xl tracking-widest2 uppercase"
        >
          {t('name')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-8"
        >
          <a
            href="mailto:shiningtigers@gmail.com"
            className="inline-block border border-foreground/40 px-8 py-3 text-xs tracking-widest2 uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {t('cta')}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-10 text-[11px] tracking-widest2 uppercase text-foreground/50"
        >
          {t('scroll')}
        </motion.p>
      </motion.div>
    </section>
  );
}
