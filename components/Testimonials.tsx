'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';

type Testimonial = { quote: string; name: string; role: string };

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  const current = items[index];

  return (
    <section className="container-px py-28 border-t border-white/5">
      <RevealOnScroll className="text-center mb-14">
        <span className="text-xs tracking-widest2 uppercase text-accent">{t('eyebrow')}</span>
        <h3 className="mt-3 font-display text-3xl md:text-4xl">{t('title')}</h3>
      </RevealOnScroll>

      <div className="mx-auto max-w-2xl text-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80">&ldquo;{current.quote}&rdquo;</p>
            <footer className="mt-6">
              <p className="text-sm tracking-widest2 uppercase">{current.name}</p>
              <p className="mt-1 text-xs text-foreground/50">{current.role}</p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={prev} className="text-xs tracking-widest2 uppercase hover:text-accent transition-colors">
            ←
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${i === index ? 'bg-accent' : 'bg-foreground/20'}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button onClick={next} className="text-xs tracking-widest2 uppercase hover:text-accent transition-colors">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
