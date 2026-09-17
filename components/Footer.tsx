import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

const SOCIALS = [
  { key: 'instagram', href: 'https://www.instagram.com/raul_shiningtigers/' },
  { key: 'facebook', href: 'https://www.facebook.com/raul.pardeilhan/' },
  { key: 'soundcloud', href: 'https://soundcloud.com/shiningtigers' },
  { key: 'linkedin', href: 'https://www.linkedin.com/in/raul-pardeilhan-81a820102/' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tSocial = useTranslations('socials');

  return (
    <footer className="border-t border-white/5">
      <div className="container-px py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h4 className="font-display text-2xl"><span className="font-zh normal-case mr-1">老虎</span>Raul Pardeilhan</h4>
          <p className="mt-3 text-sm text-foreground/50">{t('tagline')}</p>
          <a
            href="mailto:shiningtigers@gmail.com"
            className="mt-6 inline-block text-sm text-accent hover:opacity-70 transition-opacity"
          >
            shiningtigers@gmail.com
          </a>
        </div>

        <div className="flex flex-col gap-3 text-sm tracking-widest2 uppercase text-foreground/60">
          <Link href="/" className="hover:text-accent transition-colors">{tNav('home')}</Link>
          <Link href="/about" className="hover:text-accent transition-colors">{tNav('about')}</Link>
          <Link href="/albums" className="hover:text-accent transition-colors">{tNav('works')}</Link>
          <Link href="/dj" className="hover:text-accent transition-colors">{tNav('dj')}</Link>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          {SOCIALS.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-accent transition-colors"
            >
              {tSocial(s.key)}
            </a>
          ))}
        </div>
      </div>

      <div className="container-px py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-foreground/40">
        <p>© {new Date().getFullYear()} Raul Pardeilhan. {t('rights')}</p>
        <p>{t('madeWith')}</p>
      </div>
    </footer>
  );
}
