import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type PageKey = 'about' | 'works' | 'dj';

const localePath = (locale: string, path: string) => (locale === 'en' ? path : `/${locale}${path}`);

// Title, description y canonical/hreflang por página (el layout solo define los del home).
export async function pageMetadata(locale: string, page: PageKey, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = `${t(`${page}.title`)} | Raul Pardeilhan`;
  const description = t(`${page}.description`);
  return {
    title,
    description,
    alternates: {
      canonical: localePath(locale, path),
      languages: {
        en: localePath('en', path),
        'zh-CN': localePath('zh', path),
        es: localePath('es', path),
      },
    },
    openGraph: { title, description, url: `https://raulpardeilhan.cc.cd${localePath(locale, path)}` },
  };
}
