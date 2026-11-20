import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X, Search, Trash2, Sun, Moon } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

export type Page = 'home' | 'shop' | 'about' | 'contact';

export default function Navbar({
  page,
  onNavigate,
  onOpenCart,
  search,
  onSearch,
}: {
  page: Page;
  onNavigate: (p: Page) => void;
  onOpenCart: () => void;
  search: string;
  onSearch: (q: string) => void;
}) {
  const { lang, t, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { count, detailed, total, remove } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [page]);

  const links: { key: Page; label: string }[] = [
    { key: 'home', label: t('home') },
    { key: 'shop', label: t('shop') },
    { key: 'home', label: t('newArrivals') },
    { key: 'about', label: t('about') },
    { key: 'contact', label: t('contact') },
  ];

  const navTo = (p: Page, anchor?: string) => {
    onNavigate(p);
    if (anchor) {
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-beige/60 bg-ivory/90 backdrop-blur-md dark:border-ivory/10 dark:bg-coal/90">
      {/* announcement bar */}
      <div className="bg-ink text-ivory">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[11px] uppercase tracking-widest2 opacity-90">
          {t('demoNotice')}
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => navTo('home')}
          className="flex flex-col items-center leading-none focus:outline-none focus-visible:ring-2 focus-visible:ring-taupe"
          aria-label="LAVEN — home"
        >
          <span className="font-serif-display text-3xl font-semibold tracking-[0.35em] text-ink dark:text-ivory">LAVEN</span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.5em] text-taupe-deep dark:text-beige">Riyadh</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((l, i) =>
            l.key === 'home' && i === 2 ? null : (
              <button
                key={i}
                onClick={() => (i === 2 ? navTo('shop', 'new-arrivals') : navTo(l.key))}
                className={`relative text-[13px] uppercase tracking-[0.18em] transition-colors after:absolute after:-bottom-1 after:h-px after:w-0 after:bg-taupe-deep after:transition-all hover:after:w-full ${
                  page === l.key && i !== 2 ? 'text-taupe-deep after:w-full dark:text-beige' : 'text-ink-soft dark:text-ivory/70'
                }`}
              >
                {l.label}
              </button>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2.5 text-ink transition-colors hover:bg-beige/50 dark:text-ivory dark:hover:bg-ivory/10"
            aria-label={lang === 'ar' ? 'بحث' : 'Search'}
          >
            <Search size={19} strokeWidth={1.5} />
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 text-ink transition-colors hover:bg-beige/50 dark:text-ivory dark:hover:bg-ivory/10"
            aria-label={theme === 'light' ? (lang === 'ar' ? 'الوضع الداكن' : 'Switch to dark mode') : (lang === 'ar' ? 'الوضع الفاتح' : 'Switch to light mode')}
          >
            {theme === 'light' ? <Moon size={19} strokeWidth={1.5} /> : <Sun size={19} strokeWidth={1.5} />}
          </button>

          <button
            onClick={toggleLang}
            className="rounded-full border border-beige px-3 py-1.5 text-[12px] font-medium uppercase tracking-widest2 text-ink transition-colors hover:bg-beige/50 dark:border-ivory/20 dark:text-ivory dark:hover:bg-ivory/10"
            aria-label="Switch language"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          <div className="relative">
            <button
              onClick={() => setMiniCartOpen((v) => !v)}
              className="relative rounded-full p-2.5 text-ink transition-colors hover:bg-beige/50 dark:text-ivory dark:hover:bg-ivory/10"
              aria-label={t('cart')}
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 min-w-[18px] items-center justify-center rounded-full bg-taupe-deep px-1 text-[10px] font-semibold text-ivory">
                  {count}
                </span>
              )}
            </button>

            {/* Mini cart dropdown */}
            {miniCartOpen && (
              <div className="absolute end-0 top-full mt-2 w-80 border border-beige bg-white shadow-xl shadow-ink/5 dark:border-ivory/15 dark:bg-coal-card dark:shadow-black/40">
                <div className="max-h-72 overflow-y-auto p-4">
                  {detailed.length === 0 ? (
                    <p className="py-6 text-center text-sm text-ink-soft dark:text-ivory/60">{t('cartEmpty')}</p>
                  ) : (
                    <ul className="space-y-3">
                      {detailed.map(({ product, qty }) => (
                        <li key={product.id} className="flex items-center gap-3">
                          <span className="text-sm text-ink dark:text-ivory">{lang === 'ar' ? product.nameAr : product.nameEn}</span>
                          <span className="ms-auto text-xs text-ink-soft dark:text-ivory/60">× {qty}</span>
                          <span className="text-xs font-medium">{formatPrice(product.price * qty, lang)} {t('sar')}</span>
                          <button
                            onClick={() => remove(product.id)}
                            className="text-ink-soft/60 transition-colors hover:text-red-700"
                            aria-label={`${t('remove')} ${lang === 'ar' ? product.nameAr : product.nameEn}`}
                          >
                            <Trash2 size={15} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {detailed.length > 0 && (
                  <div className="border-t border-beige p-4 dark:border-ivory/15">
                    <div className="mb-3 flex justify-between text-sm">
                      <span className="text-ink-soft">{t('subtotal')}</span>
                      <span className="font-medium">{formatPrice(total, lang)} {t('sar')}</span>
                    </div>
                    <button onClick={() => { setMiniCartOpen(false); onOpenCart(); }} className="btn-primary w-full !py-2.5 !text-xs">
                      {t('yourCart')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-2.5 text-ink transition-colors hover:bg-beige/50 lg:hidden dark:text-ivory dark:hover:bg-ivory/10"
            aria-label={t('menu')}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-beige/60 bg-cream/60 dark:border-ivory/10 dark:bg-coal-soft/80">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Search size={16} className="text-taupe-deep" />
            <input
              type="search"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft/50 dark:placeholder:text-ivory/40 dark:text-ivory"
              aria-label={t('searchPlaceholder')}
            />
            <button onClick={() => { onSearch(''); setSearchOpen(false); }} aria-label={t('close')}>
              <X size={16} className="text-ink-soft dark:text-ivory/70" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} aria-label={t('close')} />
          <div className="drawer-panel absolute inset-y-0 end-0 flex w-72 max-w-[85%] flex-col bg-ivory p-6 shadow-2xl dark:bg-coal-soft">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-serif-display text-xl tracking-[0.3em] text-ink dark:text-ivory">LAVEN</span>
              <button onClick={() => setMobileOpen(false)} aria-label={t('close')} className="p-2">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {links.map((l, i) =>
                l.key === 'home' && i === 2 ? null : (
                  <button
                    key={i}
                    onClick={() => { setMobileOpen(false); i === 2 ? navTo('shop', 'new-arrivals') : navTo(l.key); }}
                    className={`border-b border-beige/50 py-3.5 text-start text-sm uppercase tracking-[0.18em] dark:border-ivory/10 ${
                      page === l.key && i !== 2 ? 'text-taupe-deep dark:text-beige' : 'text-ink-soft dark:text-ivory/70'
                    }`}
                  >
                    {l.label}
                  </button>
                )
              )}
            </nav>
            <p className="mt-auto text-[10px] uppercase tracking-widest2 text-taupe-deep">{t('demoTag')} — LAVEN 2026</p>
          </div>
        </div>
      )}
    </header>
  );
}
