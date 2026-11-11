import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Stats from '@/components/Stats';
import BrandsBand from '@/components/BrandsBand';
import AlbumsGrid from '@/components/AlbumsGrid';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CtaBanner from '@/components/CtaBanner';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Intro />
      <Stats />
      <BrandsBand />
      <AlbumsGrid featuredOnly />
      <Testimonials />
      <FAQ />
      <CtaBanner />
    </>
  );
}
