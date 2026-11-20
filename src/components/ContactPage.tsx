import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Check } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
    window.setTimeout(() => setSent(false), 6000);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-12 text-center">
        <p className="section-label">{t('contactSub')}</p>
        <h1 className="mt-2 font-serif-display text-4xl font-medium sm:text-5xl dark:text-ivory">{t('contactTitle')}</h1>
      </header>

      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        {/* Info */}
        <div className="space-y-8 lg:col-span-2">
          {[
            { Icon: MapPin, label: t('addressLabel'), value: t('address') },
            { Icon: Phone, label: t('phoneLabel'), value: '+966 11 000 0000', ltr: true },
            { Icon: Mail, label: t('emailLabel'), value: 'hello@laven.example', ltr: true },
          ].map(({ Icon, label, value, ltr }) => (
            <div key={label} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-beige bg-cream dark:border-ivory/15 dark:bg-coal-card">
                <Icon size={18} strokeWidth={1.4} className="text-taupe-deep" />
              </span>
              <div>
                <h2 className="text-[11px] uppercase tracking-widest2 text-taupe-deep">{label}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft dark:text-ivory/70" dir={ltr ? 'ltr' : undefined}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 lg:col-span-3" noValidate={false}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-[11px] uppercase tracking-widest2 text-ink-soft dark:text-ivory/65">
                {t('contactName')}
              </label>
              <input id="contact-name" name="name" type="text" required className="input-field" autoComplete="name" />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-[11px] uppercase tracking-widest2 text-ink-soft dark:text-ivory/65">
                {t('contactEmail')}
              </label>
              <input id="contact-email" name="email" type="email" required className="input-field" autoComplete="email" dir="ltr" />
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-[11px] uppercase tracking-widest2 text-ink-soft dark:text-ivory/65">
              {t('contactMessage')}
            </label>
            <textarea id="contact-message" name="message" required rows={6} className="input-field resize-none" />
          </div>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            {sent ? <Check size={16} /> : <Send size={15} />}
            {t('contactSend')}
          </button>
          {sent && (
            <p role="status" className="border border-taupe/40 bg-cream/70 px-4 py-3 text-sm text-taupe-deep dark:border-beige/30 dark:bg-coal-card dark:text-beige">
              {t('contactSent')}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
