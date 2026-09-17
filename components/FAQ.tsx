'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';

type FaqItem = { q: string; a: string };

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container-px py-28 border-t border-white/5">
      <RevealOnScroll className="text-center mb-14">
        <span className="text-xs tracking-widest2 uppercase text-accent">{t('eyebrow')}</span>
        <h3 className="mt-3 font-display text-3xl md:text-4xl">{t('title')}</h3>
      </RevealOnScroll>

      <div className="mx-auto max-w-2xl divide-y divide-white/10">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span className="text-base md:text-lg pr-6">{item.q}</span>
                <span className={`text-accent text-xl transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm leading-relaxed text-foreground/60">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
