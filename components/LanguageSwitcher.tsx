'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/navigation';
import { locales } from '@/i18n';

export default function LanguageSwitcher() {
  // usePathname de next-intl ya devuelve la ruta SIN el prefijo de idioma
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  return (
    <div className="flex items-center gap-1 text-xs tracking-widest2 uppercase">
      {locales.map((loc, i) => {
        const isActive = loc === currentLocale;
        return (
          <span key={loc} className="flex items-center">
            <button
              onClick={() => router.replace(pathname, { locale: loc })}
              className={`transition-colors duration-300 hover:text-accent ${
                isActive ? 'text-accent' : 'text-foreground/60'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              {loc === 'en' ? 'EN' : loc === 'zh' ? '中文' : 'ES'}
            </button>
            {i < locales.length - 1 && <span className="mx-2 text-foreground/20">/</span>}
          </span>
        );
      })}
    </div>
  );
}
