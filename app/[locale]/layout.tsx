import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { locales, type Locale } from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL('https://raulpardeilhan.cc.cd'),
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/favicon.png',
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },
    // Meta tags orientados a Baidu
    other: {
      'baidu-site-verification': 'REPLACE_WITH_YOUR_BAIDU_VERIFICATION_CODE',
      applicable_device: 'pc,mobile',
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://raulpardeilhan.cc.cd',
      siteName: t('title'),
      locale: locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 633,
          alt: 'Raul Pardeilhan Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.png'],
    },
    alternates: {
      canonical: locale === 'en' ? '/' : `/${locale}`,
      languages: {
        en: '/',
        'zh-CN': '/zh',
        es: '/es',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
