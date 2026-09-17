import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  // "/" muestra el idioma por defecto (en) sin prefijo,
  // y "/zh" muestra la versión en chino simplificado.
  localePrefix: 'as-needed',
});

export const config = {
  // No aplicar el middleware a archivos estáticos, imágenes o API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
