import { ArrowRight, Sparkles, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import SectionPhoto from './SectionPhoto';
import products from '../data/products';
import type { Product } from '../types';

export default function HomePage({
  onNavigate,
  onOpenProduct,
}: {
  onNavigate: (p: 'shop') => void;
  onOpenProduct: (p: Product) => void;
}) {
  const { lang, t } = useLang();
  const { add } = useCart();
  const featured = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const promo = products[8];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-cream dark:bg-coal-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 border border-taupe/40 px-3 py-1.5 text-[10px] uppercase tracking-widest2 text-taupe-deep">
              <Sparkles size={12} strokeWidth={1.5} />
              {t('heroKicker')}
            </span>
            <h1 className="mt-6 font-serif-display text-5xl font-medium leading-[1.1] text-ink sm:text-6xl lg:text-7xl dark:text-ivory">
              {t('heroTitle')}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg dark:text-ivory/70">{t('heroSub')}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => { onNavigate('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary group"
              >
                {t('shopNow')}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>
              <button
                onClick={() => { onNavigate('shop'); document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-outline"
              >
                {t('newArrivals')}
              </button>
            </div>
            <p className="mt-8 text-[11px] uppercase tracking-widest2 text-taupe-deep/80 dark:text-beige/80">{t('heroBadge')}</p>
          </div>

          <div className="animate-fade-up-delay-1">
            <SectionPhoto slot="hero" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-beige/70 bg-ivory dark:border-ivory/10 dark:bg-coal">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { Icon: Truck, en: 'Free Delivery', ar: 'توصيل مجاني' },
            { Icon: ShieldCheck, en: 'Secure Checkout', ar: 'دفع آمن' },
            { Icon: RefreshCcw, en: 'Easy Returns', ar: 'إرجاع سهل' },
            { Icon: Sparkles, en: 'Curated Weekly', ar: 'تشكيلة أسبوعية' },
          ].map(({ Icon, en, ar }) => (
            <div key={en} className="flex items-center justify-center gap-3 text-center sm:justify-start sm:text-start">
              <Icon size={20} strokeWidth={1.4} className="shrink-0 text-taupe-deep" />
              <span className="text-xs uppercase tracking-[0.15em] text-ink-soft dark:text-ivory/65">{lang === 'ar' ? ar : en}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">{t('featuredCollections')}</p>
            <h2 className="mt-2 font-serif-display text-4xl font-medium sm:text-5xl">{t('featuredCollections')}</h2>
            <p className="mt-2 text-sm text-ink-soft dark:text-ivory/65">{t('featuredSub')}</p>
          </div>
          <button
            onClick={() => { onNavigate('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-xs uppercase tracking-widest2 transition-colors hover:border-taupe-deep hover:text-taupe-deep dark:border-ivory dark:hover:border-beige dark:hover:text-beige"
          >
            {t('viewAll')}
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpenProduct} />
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section className="bg-ink text-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className={lang === 'ar' ? 'md:order-2' : ''}>
            <p className="text-[11px] uppercase tracking-widest2 text-beige">{t('promoTitle')}</p>
            <h2 className="mt-3 font-serif-display text-4xl font-medium leading-tight sm:text-5xl dark:text-ivory">{t('promoTitle')}</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/75 sm:text-base dark:text-ivory/70">{t('promoText')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => { onNavigate('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 bg-ivory px-8 py-3.5 text-sm uppercase tracking-widest2 text-ink transition-colors hover:bg-beige dark:bg-ivory dark:hover:bg-beige"
              >
                {t('promoCta')}
              </button>
              <button
                onClick={() => { add(promo.id); }}
                className="inline-flex items-center gap-2 border border-ivory/50 px-8 py-3.5 text-sm uppercase tracking-widest2 text-ivory transition-colors hover:bg-ivory/10"
              >
                {t('addToCart')}
              </button>
            </div>
          </div>
          <div className={lang === 'ar' ? 'md:order-1' : ''}>
            <div className="mx-auto max-w-md bg-cream p-4">
              <SectionPhoto slot="promo" className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section id="new-arrivals" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 text-center">
          <p className="section-label">{t('newArrivalsSub')}</p>
          <h2 className="mt-2 font-serif-display text-4xl font-medium sm:text-5xl">{t('newArrivalsTitle')}</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpenProduct} />
          ))}
        </div>
      </section>
    </main>
  );
}
