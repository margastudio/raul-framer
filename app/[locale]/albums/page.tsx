import { setRequestLocale } from 'next-intl/server';
import WorksView from '@/components/WorksView';

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
