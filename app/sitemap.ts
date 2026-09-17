import type { MetadataRoute } from 'next';

const BASE_URL = 'https://raulpardeilhan.cc.cd';
const routes = ['', '/about', '/albums', '/dj'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    entries.push({ url: `${BASE_URL}${route}`, lastModified: new Date() });
    entries.push({ url: `${BASE_URL}/zh${route}`, lastModified: new Date() });
    entries.push({ url: `${BASE_URL}/es${route}`, lastModified: new Date() });
  }

  return entries;
}
