import fs from 'node:fs';
import path from 'node:path';

// Solo se usa en el servidor, durante el build (las páginas de álbum son estáticas).
// Lee las fotos reales de /public/images/albums/{slug}/ en lugar de asumir una cantidad fija.
export function getAlbumPhotos(slug: string): string[] {
  const dir = path.join(process.cwd(), 'public', 'images', 'albums', slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/images/albums/${slug}/${f}`);
  } catch {
    return [];
  }
}
