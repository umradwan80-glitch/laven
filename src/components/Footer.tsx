import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import type { DictKey } from '../i18n/translations';

export default function Footer({ onNavigate }: { onNavigate: (p: 'home' | 'shop' | 'about' | 'contact') => void }) {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links: { page: 'home' | 'shop' | 'about' | 'contact'; key: DictKey }[] = [
    { page: 'home', key: 'home' },
    { page: 'shop', key: 'shop' },
    { page: 'about', key: 'about' },
    { page: 'contact', key: 'contact' },
  ];

  return (
    <footer className="bg-ink text-ivory dark:bg-black dark:text-ivory">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <span className="font-serif-display text-3xl font-semibold tracking-[0.35em]">LAVEN</span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">{t('footerTagline')}</p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Twitter, label: 'Twitter' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center border border-ivory/25 transition-colors hover:border-ivory hover:bg-ivory/10"
              >
                <Icon size={16} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-beige">{t('quickLinks')}</h3>
          <ul className="mt-5 space-y-3">
            {links.map((l) => (
              <li key={l.key}>
                <button onClick={() => { onNavigate(l.page); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-sm text-ivory/75 transition-colors hover:text-ivory">
                  {t(l.key)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-beige">{t('contact')}</h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-beige" />
              <span>{t('address')}</span>
            </li>
            <li className="flex items-center gap-3" dir="ltr">
              <Phone size={15} className="shrink-0 text-beige" />
              <span>+966 11 000 0000</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="shrink-0 text-beige" />
              <span>hello@laven.example</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest2 text-beige">{t('followUs')}</h3>
          <p className="mt-5 text-sm leading-relaxed text-ivory/70">{t('demoNotice')}</p>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-[11px] uppercase tracking-widest2 text-ivory/50">
          © {year} LAVEN — {t('rights')}
        </p>
      </div>
    </footer>
  );
}
