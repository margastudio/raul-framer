import { setRequestLocale } from 'next-intl/server';
import DjContent from '@/components/DjContent';

export default async function DjPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DjContent />;
}
