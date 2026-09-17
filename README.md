# Raul Pardeilhan — Portfolio

Recreación completa en código del sitio [raulpardeilhan.framer.website](https://raulpardeilhan.framer.website/), construida con **Next.js 15**, **React**, **TypeScript**, **Tailwind CSS** y **Framer Motion**.

Reemplaza la dependencia de Framer por un proyecto propio: más rápido, optimizado para SEO, compatible con Baidu, y fácil de modificar en VS Code.

---

## Stack

- **Next.js 15** (App Router)
- **React 18** + **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (única librería de animación)
- **next-intl** para el sistema de dos idiomas (EN / 中文)
- **nodemailer** para el formulario de contacto (sin servicios bloqueados en China)

---

## Estructura del proyecto

```
raul-portfolio/
├── app/
│   ├── [locale]/              # todas las rutas viven bajo el locale
│   │   ├── layout.tsx          # <html>, <body>, Navbar, Footer, metadata + Baidu tags
│   │   ├── loading.tsx         # animación de carga global
│   │   ├── page.tsx            # Home
│   │   ├── about/page.tsx
│   │   ├── albums/page.tsx
│   │   ├── albums/[slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── api/contact/route.ts    # endpoint propio para el formulario (SMTP)
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Hero.tsx                 # fade in + parallax
│   ├── Intro.tsx                # "Who is Raul"
│   ├── Stats.tsx                 # logos de marcas + contadores animados
│   ├── AlbumsGrid.tsx            # grid con hover zoom
│   ├── AlbumGallery.tsx          # galería individual + lightbox
│   ├── Testimonials.tsx          # carrusel de clientes
│   ├── FAQ.tsx                   # acordeón
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── LanguageSwitcher.tsx      # botón EN / 中文
│   └── RevealOnScroll.tsx        # wrapper de scroll reveal reutilizable
├── messages/
│   ├── en.json                   # todos los textos en inglés
│   └── zh.json                   # todos los textos en chino simplificado
├── lib/
│   └── navigation.ts             # Link/router conscientes del idioma
├── i18n.ts
├── middleware.ts                 # enruta /, /zh
├── public/
│   ├── fonts/                    # fuentes .woff2 auto-hospedadas
│   └── images/                   # todas las imágenes del sitio
└── .env.example
```

---

## Idiomas

- **Inglés**: `tudominio.com/` (sin prefijo — idioma por defecto)
- **Chino simplificado**: `tudominio.com/zh`

Todo el texto vive en `messages/en.json` y `messages/zh.json`. Para cambiar cualquier copy del sitio, editás esos dos archivos — no hace falta tocar componentes.

El botón de idioma (arriba a la derecha del navbar) usa `next-intl` para redirigir manteniendo la misma página (ej: `/about` ↔ `/zh/about`).

---

## Adaptación para China continental

Ya implementado:

- ✅ **Cero dependencias de Google**: no hay Google Fonts, ni Google Analytics, ni reCAPTCHA. Las fuentes se autohospedan en `/public/fonts`.
- ✅ **Formulario de contacto propio** (`app/api/contact/route.ts`) que envía el email por SMTP directo — configurable con cualquier proveedor accesible desde China (Tencent Exmail, Alibaba DirectMail, etc). Ver `.env.example`.
- ✅ **Meta tags para Baidu** en `app/[locale]/layout.tsx` (`baidu-site-verification`, `applicable_device`) y `Baiduspider` explícito en `app/robots.ts`.
- ✅ **Sitemap bilingüe** en `app/sitemap.ts`.
- ✅ **Imágenes servidas localmente** desde `/public/images` (no desde `framerusercontent.com`).

Pendiente de tu parte (no requiere código, son pasos operativos):

- 🔲 Contratar **ICP license** (备案) si vas a alojar en un proveedor cloud dentro de China continental (Tencent Cloud, Alibaba Cloud, Huawei Cloud) — es obligatorio por ley para servidores físicamente en China.
- 🔲 Verificar el sitio en **Baidu Webmaster Tools** y reemplazar el código placeholder en `layout.tsx`.
- 🔲 Si el dominio apunta a un CDN, usar uno con buena cobertura en China (Tencent CDN, Alibaba CDN, o Cloudflare — este último con rendimiento variable en China).

---

## Imágenes y fuentes pendientes

El proyecto está armado con las **rutas correctas** para todas las imágenes, pero necesita que subas los archivos reales (las URLs originales apuntan a `framerusercontent.com`, que no queremos usar). Instrucciones detalladas en:

- `public/images/README.md`
- `public/fonts/README.md`

Recomendación: exportá las imágenes originales del sitio de Framer (botón derecho → guardar imagen, o pedime que las descargue) y convertilas a `.webp` antes de subirlas — reduce el peso considerablemente.

---

## Instalación local

```bash
npm install
cp .env.example .env
# completá SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL en .env
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm start
```

---

## Deploy

Funciona sin cambios en:

- **Vercel** — `vercel deploy` (el más simple, pero su CDN puede ser lento desde China continental sin configuración adicional).
- **Tencent Cloud** (CVM o servidor liviano) — `npm run build && npm start`, o dockerizado detrás de Nginx.
- **Alibaba Cloud** (ECS) — igual que arriba.
- **Huawei Cloud** — igual que arriba.
- **Cualquier VPS con Node.js 18+** — `npm run build && npm start`, idealmente detrás de Nginx + PM2.

Recordá: si el servidor está físicamente en China continental, necesitás el **ICP license** (备案) para el dominio, sin excepción.

---

## Animaciones incluidas (Framer Motion)

| Animación | Dónde |
|---|---|
| Fade In | Hero, Intro, todas las secciones vía `RevealOnScroll` |
| Parallax | Imagen del Hero |
| Scroll Reveal | Todas las secciones (`RevealOnScroll`) |
| Hover Effects | Navbar, botones, cards de álbumes |
| Smooth Scroll | `scroll-behavior: smooth` global (`globals.css`) |
| Image Zoom | Cards de álbumes y galería individual (hover) |
| Gallery Transitions | Lightbox de `AlbumGallery` |
| Loading Animation | `app/[locale]/loading.tsx` |

---

## Próximos pasos sugeridos

1. Subir las imágenes reales a `/public/images` (ver README ahí).
2. Subir fuentes `.woff2` a `/public/fonts` (o dejar los fallbacks del sistema, que ya funcionan).
3. Configurar el `.env` con tus credenciales SMTP.
4. Reemplazar `raulpardeilhan.com` por el dominio real en `app/[locale]/layout.tsx` y `app/sitemap.ts`.
5. `npm install && npm run build` para confirmar que compila sin errores antes de deployar.
