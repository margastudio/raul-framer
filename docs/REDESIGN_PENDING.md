# Rediseño — pendientes de confirmar con Raul

## Datos
- Cifras: países y años de experiencia ocultos (`lib/siteData.ts`, `value: null`). Hoy se muestran 4+ premios y 38+ marcas, contados de las listas de About.
- Biografía: se quitaron las cifras de años del Home, About y FAQ porque se contradecían. Falta la versión definitiva. El "20+ años" de la bio de DJ sigue.
- Testimonios: retirados (eran texto de plantilla). `testimonials.items` queda vacío; la sección se oculta sola.
- Categorías y destacados de Works: provisionales (`lib/albums.ts`).
- DJ: falta el 3er video de sets; eventos próximos solo si hay fuente.
- Booking: solo hay mail (`CONTACT_EMAIL`); falta teléfono/canal preferido.

## Assets faltantes en el repo
- `public/images/hero.jpg`, `public/images/about-hero.jpg`
- `public/fonts/display.woff2`, `sans.woff2`, `zh.woff2`
- `public/raul-pardeilhan-profile.pdf` (enlazado desde About)
- Código de verificación de Baidu en `app/[locale]/layout.tsx`

## Logos
- brand-2 (Aston Martin) trae marca de agua de VectorStock.
- brand-1 (fondo azul) y brand-7 (fondo blanco) se disimulan con CSS; conviene versiones transparentes autorizadas.
