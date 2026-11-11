// Datos centrales del sitio. Todo lo que dependa de una confirmación de Raul
// vive acá, para poder corregirlo en un solo lugar.

export const CONTACT_EMAIL = 'shiningtigers@gmail.com';

export type StatKey = 'countries' | 'years' | 'awards' | 'brands';

/**
 * Cifras del Home. REGLA: `value: null` => la cifra NO se muestra.
 * Nunca poner números sin confirmar con Raul.
 *
 * - awards: 4 = cantidad de ítems listados hoy en About > Awards.
 * - brands: 38 = marcas nombradas hoy en About > Selected Brands (se muestra "38+").
 * - countries / years: PENDIENTES de confirmación (el sitio decía 15 y 26, y las
 *   biografías se contradecían: "más de dos décadas" vs "más de una década").
 */
export const STATS: { key: StatKey; value: number | null }[] = [
  { key: 'countries', value: null },
  { key: 'years', value: null },
  { key: 'awards', value: 4 },
  { key: 'brands', value: 38 },
];

// Logos de la banda de marcas. El nombre se lee del propio logo (se usa como alt).
// `invert`: el archivo tiene fondo blanco; se invierte para que se integre al fondo oscuro.
// PENDIENTE: confirmar con Raul qué marcas se pueden mostrar y reemplazar por versiones
// con fondo transparente (brand-2 trae marca de agua de VectorStock).
export const BRAND_LOGOS: { src: string; name: string; invert?: boolean }[] = [
  { src: '/images/brands/brand-1.png', name: 'Angelo Nardelli' },
  { src: '/images/brands/brand-2.png', name: 'Aston Martin' },
  { src: '/images/brands/brand-3.png', name: 'Canali' },
  { src: '/images/brands/brand-4.png', name: 'De Rucci' },
  { src: '/images/brands/brand-5.png', name: 'Ferrari' },
  { src: '/images/brands/brand-6.png', name: 'La Martina' },
  { src: '/images/brands/brand-7.png', name: 'Motivi', invert: true },
  { src: '/images/brands/brand-8.png', name: 'Tommy Hilfiger' },
  { src: '/images/brands/brand-9.png', name: 'Zara' },
];
