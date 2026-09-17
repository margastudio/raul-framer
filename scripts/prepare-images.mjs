import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// ────────────────────────────────────────────────────────────────
// Este script toma las fotos "como están" desde raw-photos/
// (nombres de cámara, tamaños gigantes, sin ordenar) y genera
// automáticamente todo lo que necesita public/images/:
//   - las renombra en orden (1.jpg, 2.jpg, brand-1.png, etc.)
//   - las redimensiona a un tamaño razonable para web
//   - las comprime (calidad ~80)
//   - genera la portada de cada álbum (la primera foto de la carpeta)
//
// Vos NO tenés que tocar nombres de archivo a mano.
// ────────────────────────────────────────────────────────────────

const RAW_DIR = path.join(process.cwd(), 'raw-photos');
const OUT_DIR = path.join(process.cwd(), 'public', 'images');

const KNOWN_ALBUM_SLUGS = [
  'italy-milano',
  'polo',
  'business',
  'acting',
  'yoga',
  'pijama',
  'underwear',
  'modelcards',
  'casual-ropa',
  'hiking',
  'polaroid',
  'surf',
  'dj',
];

// Mapea nombres de carpetas "como están" (con errores de tipeo o
// caracteres raros) al slug correcto que usa la web.
const FOLDER_TO_SLUG = {
  'bussiness': 'business',
};

function resolveSlug(folderName) {
  if (FOLDER_TO_SLUG[folderName]) return FOLDER_TO_SLUG[folderName];
  // Cualquier carpeta que empiece con "dj" (incluso con caracteres
  // raros pegados, como "dj:" o "dj：") se mapea a "dj"
  if (folderName.toLowerCase().startsWith('dj')) return 'dj';
  return folderName;
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    // Orden natural (foto2 antes que foto10), no alfabético puro
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

async function processImage(srcPath, destPath, { width, quality = 80, format = 'jpeg' }) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  let pipeline = sharp(srcPath).rotate(); // .rotate() sin args = respeta la orientación EXIF de la foto (celular)

  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }

  if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  } else if (format === 'png') {
    pipeline = pipeline.png({ quality, compressionLevel: 9 });
  } else if (format === 'webp') {
    pipeline = pipeline.webp({ quality });
  }

  await pipeline.toFile(destPath);
}

async function run() {
  if (!fs.existsSync(RAW_DIR)) {
    console.log('\n⚠️  No existe la carpeta raw-photos/ todavía.');
    console.log('   Creala en la raíz del proyecto y organizá tus fotos ahí adentro.');
    console.log('   Mirá el README de este script para ver la estructura esperada.\n');
    return;
  }

  let totalProcessed = 0;

  // 1) hero.jpg y about-hero.jpg (archivos sueltos en la raíz de raw-photos)
  for (const name of ['hero', 'about-hero']) {
    const found = listImages(RAW_DIR).find((f) => path.parse(f).name.toLowerCase() === name);
    if (found) {
      const src = path.join(RAW_DIR, found);
      const dest = path.join(OUT_DIR, `${name}.jpg`);
      await processImage(src, dest, { width: 2000, quality: 82 });
      console.log(`✓ ${name}.jpg`);
      totalProcessed++;
    }
  }

  // 2) Logos de marcas: raw-photos/brands/*  ->  public/images/brands/brand-1.png, brand-2.png...
  const brandsDir = path.join(RAW_DIR, 'brands');
  const brandFiles = listImages(brandsDir);
  for (let i = 0; i < brandFiles.length; i++) {
    const src = path.join(brandsDir, brandFiles[i]);
    const dest = path.join(OUT_DIR, 'brands', `brand-${i + 1}.png`);
    await processImage(src, dest, { width: 400, format: 'png' });
  }
  if (brandFiles.length) {
    console.log(`✓ ${brandFiles.length} logo(s) de marca`);
    totalProcessed += brandFiles.length;
  }

  // 3) Álbumes: raw-photos/albums/{slug}/*  ->  public/images/albums/{slug}/1.jpg, 2.jpg...
  //    + portada automática: public/images/albums/{slug}.jpg (= la primera foto)
  const albumsDir = path.join(RAW_DIR, 'albums');
  if (fs.existsSync(albumsDir)) {
    const albumFolders = fs.readdirSync(albumsDir).filter((f) =>
      fs.statSync(path.join(albumsDir, f)).isDirectory()
    );

  for (const rawFolderName of albumFolders) {
  const slug = resolveSlug(rawFolderName);

      const photos = listImages(path.join(albumsDir, slug));
      if (!photos.length) continue;

      for (let i = 0; i < photos.length; i++) {
        const src = path.join(albumsDir, slug, photos[i]);
        const dest = path.join(OUT_DIR, 'albums', slug, `${i + 1}.jpg`);
        await processImage(src, dest, { width: 1600, quality: 80 });
      }

      // Portada = primera foto del álbum, recortada más chica
      const coverSrc = path.join(albumsDir, slug, photos[0]);
      const coverDest = path.join(OUT_DIR, 'albums', `${slug}.jpg`);
      await processImage(coverSrc, coverDest, { width: 1000, quality: 80 });

      console.log(`✓ Álbum "${slug}": ${photos.length} foto(s) + portada`);
      totalProcessed += photos.length + 1;
    }
  }

  console.log(`\n✅ Listo. ${totalProcessed} imagen(es) generadas en public/images/\n`);
}

run().catch((err) => {
  console.error('❌ Error procesando imágenes:', err);
  process.exit(1);
});
