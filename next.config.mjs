import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Imagenes optimizadas y servidas localmente (sin depender de dominios externos bloqueados en China)
    formats: ['image/webp'],
  },
  // No usar next/font con Google Fonts: las fuentes se sirven localmente desde /public/fonts
  compress: true,
};

export default withNextIntl(nextConfig);
