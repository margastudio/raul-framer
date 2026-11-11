import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/seo';
import WorksView from '@/components/WorksView';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, 'works', '/albums');
}

export default async function AlbumsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-32">
      <WorksView />
    </div>
  );
}
