'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import RevealOnScroll from './RevealOnScroll';

export default function AlbumGallery({ photos, title }: { photos: string[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="container-px py-16 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
        {photos.map((src, i) => (
          <RevealOnScroll key={src} delay={(i % 6) * 0.06}>
            <button
              onClick={() => setActive(i)}
              className="group block w-full overflow-hidden"
            >
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </button>
          </RevealOnScroll>
        ))}
      </div>

      {/* Lightbox con transición de galería */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6"
            onClick={() => setActive(null)}
          >
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              src={photos[active]}
              alt={`${title} ${active + 1}`}
              className="max-h-[88vh] max-w-full object-contain"
            />
            <button
              className="absolute top-6 right-6 text-2xl text-foreground/70 hover:text-accent"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
