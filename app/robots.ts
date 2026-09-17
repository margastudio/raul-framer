import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Baiduspider explícito para asegurar indexación en China
      { userAgent: 'Baiduspider', allow: '/' },
    ],
    sitemap: 'https://raulpardeilhan.com/sitemap.xml',
  };
}
