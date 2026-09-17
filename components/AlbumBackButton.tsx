'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

const LABELS: Record<string, string> = {
  en: '← Back',
  es: '← Volver',
  zh: '← 返回',
};

export default function AlbumBackButton() {
  const router = useRouter();
  const locale = useLocale();
  const label = LABELS[locale] ?? LABELS.en;

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-xs md:text-sm tracking-widest uppercase text-white/70 hover:text-white transition-colors"
    >
      {label}
    </button>
  );
}
