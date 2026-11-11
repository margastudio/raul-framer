import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import AboutContent from '@/components/AboutContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'about', '/about');
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}
