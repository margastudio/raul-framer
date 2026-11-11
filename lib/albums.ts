// Metadatos de álbumes que no dependen del idioma.

export type CategoryKey =
  | 'fashion'
  | 'commercial'
  | 'editorial'
  | 'film'
  | 'lifestyle'
  | 'portraits'
  | 'music';

// Orden en que se muestran los filtros (solo aparecen los que tienen álbumes).
export const FILTER_ORDER: CategoryKey[] = [
  'fashion',
  'commercial',
  'editorial',
  'film',
  'lifestyle',
  'portraits',
  'music',
];

// PROVISIONAL: agrupación derivada de los tags actuales de cada álbum.
// Raul debe confirmar las categorías finales.
export const ALBUM_CATEGORIES: Record<string, CategoryKey[]> = {
  'italy-milano': ['editorial', 'commercial'],
  polo: ['fashion', 'commercial'],
  business: ['editorial'],
  acting: ['film'],
  yoga: ['lifestyle'],
  pijama: ['fashion', 'commercial'],
  underwear: ['fashion', 'portraits'],
  modelcards: ['fashion', 'portraits'],
  'casual-ropa': ['fashion', 'lifestyle'],
  hiking: ['lifestyle'],
  polaroid: ['portraits'],
  surf: ['lifestyle'],
  dj: ['music'],
  'TVC-VIDEOS': ['commercial', 'film'],
};

// PROVISIONAL: selección curada para el Home (una por faceta: moda, comercial,
// cine/TV, TVC, música, editorial). Raul debe confirmar los proyectos destacados.
export const FEATURED_ALBUMS = ['italy-milano', 'polo', 'acting', 'TVC-VIDEOS', 'dj', 'business'];

export const ALBUM_SLUGS = Object.keys(ALBUM_CATEGORIES);
