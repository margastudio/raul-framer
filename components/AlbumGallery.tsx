'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import RevealOnScroll from './RevealOnScroll';

export default function AlbumGallery({ photos, title }: { photos: string[]; title: string }) {
  const t = useTranslations('gallery');
  const [active, setActive] = useState<number | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const total = photos.length;

  const close = useCallback(() => {
    setActive(null);
    triggerRef.current?.focus(); // devuelve el foco a la miniatura
  }, []);
  const prev = useCallback(() => setActive((i) => (i === null ? i : (i - 1 + total) % total)), [total]);
  const next = useCallback(() => setActive((i) => (i === null ? i : (i + 1) % total)), [total]);

  // Teclado (Esc, flechas, Tab atrapado dentro del diálogo) + bloqueo de scroll de fondo.
  useEffect(() => {
    if (active === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLElement>('[data-close]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Tab' && dialogRef.current) {
        const f = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button'));
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, prev, next]);

  if (total === 0) return null;

  return (
    <>
      <div className="container-px py-16 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
        {photos.map((src, i) => (
          <RevealOnScroll key={src} delay={(i % 6) * 0.06}>
            <button
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setActive(i);
              }}
              aria-label={t('open', { n: i + 1, total })}
              className="group block w-full overflow-hidden bg-white/5"
            >
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
            </button>
          </RevealOnScroll>
        ))}
      </div>

      {active !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 md:p-10"
            onClick={close}
          >
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) next();
                else if (info.offset.x > 80) prev();
              }}
              src={photos[active]}
              alt={`${title} ${active + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-full object-contain select-none"
            />

            <button
              data-close
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label={t('close')}
              className="absolute top-4 right-4 md:top-6 md:right-6 h-11 w-11 text-3xl leading-none text-foreground/70 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              ×
            </button>

            {total > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label={t('prev')}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 h-12 w-12 text-3xl text-foreground/70 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label={t('next')}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 h-12 w-12 text-3xl text-foreground/70 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  ›
                </button>
              </>
            )}

            <p className="absolute bottom-4 left-0 right-0 text-center text-xs tracking-widest2 text-foreground/50" aria-live="polite">
              {active + 1} / {total}
            </p>
          </motion.div>
      )}
    </>
  );
}
