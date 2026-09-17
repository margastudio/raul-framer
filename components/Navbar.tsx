'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/albums', label: t('works') },
    { href: '/dj', label: t('dj') },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container-px flex items-center justify-between h-20">
        <Link href="/" className="font-display text-sm tracking-widest2 uppercase">
          <span className="font-zh normal-case mr-1">老虎</span>Raul Pardeilhan
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-xs tracking-widest2 uppercase">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-accent transition-colors duration-300">
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 w-7"
          aria-label="Menu"
        >
          <span className="h-px w-full bg-foreground" />
          <span className="h-px w-full bg-foreground" />
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-background border-t border-white/5"
        >
          <div className="container-px py-6 flex flex-col gap-6 text-sm tracking-widest2 uppercase">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
