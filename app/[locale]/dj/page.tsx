import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import DjContent from '@/components/DjContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'dj', '/dj');
}

export default async function DjPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DjContent />;
}
