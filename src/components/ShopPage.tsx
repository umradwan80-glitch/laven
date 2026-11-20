import { useMemo, useState } from 'react';
import { SlidersHorizontal, SearchX } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import ProductCard from './ProductCard';
import products, { categories } from '../data/products';
import type { Product } from '../types';
import type { CategoryKey } from '../data/products';

type SortKey = 'featured' | 'priceLow' | 'priceHigh' | 'name';

export default function ShopPage({
  search,
  onOpenProduct,
}: {
  search: string;
  onOpenProduct: (p: Product) => void;
}) {
  const { lang, t } = useLang();
  const [category, setCategory] = useState<CategoryKey>('all');
  const [sort, setSort] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    let list = products;
    if (category !== 'all') list = list.filter((p) => p.category === category);
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.nameEn.toLowerCase().includes(q) ||
          p.nameAr.includes(search.trim()) ||
          p.descEn.toLowerCase().includes(q) ||
          p.descAr.includes(search.trim())
      );
    }
    switch (sort) {
      case 'priceLow':
        return [...list].sort((a, b) => a.price - b.price);
      case 'priceHigh':
        return [...list].sort((a, b) => b.price - a.price);
      case 'name':
        return [...list].sort((a, b) =>
          lang === 'ar' ? a.nameAr.localeCompare(b.nameAr, 'ar') : a.nameEn.localeCompare(b.nameEn)
        );
      default:
        return [...list].sort((a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id);
    }
  }, [category, search, sort, lang]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-10 text-center">
        <p className="section-label">LAVEN — {t('demoTag')}</p>
        <h1 className="mt-2 font-serif-display text-4xl font-medium sm:text-5xl dark:text-ivory">{t('shop')}</h1>
        {search && (
          <p className="mt-3 text-sm text-ink-soft dark:text-ivory/65">
            “{search}” — {filtered.length} {t('pieces')}
          </p>
        )}
      </header>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-5 border-y border-beige/70 py-5 lg:flex-row lg:items-center lg:justify-between dark:border-ivory/10">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t('filterLabel')}>
          <SlidersHorizontal size={15} className="me-1 text-taupe-deep dark:text-beige" aria-hidden />
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`border px-4 py-2 text-[11px] uppercase tracking-widest2 transition-all duration-300 ${
                category === c.key
                  ? 'border-ink bg-ink text-ivory dark:border-ivory dark:bg-ivory dark:text-ink'
                  : 'border-beige text-ink-soft hover:border-taupe hover:text-ink dark:border-ivory/25 dark:text-ivory/70 dark:hover:border-taupe dark:hover:text-ivory'
              }`}
              aria-pressed={category === c.key}
            >
              {lang === 'ar' ? c.ar : c.en}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 text-xs uppercase tracking-widest2 text-ink-soft dark:text-ivory/65">
          {t('sortLabel')}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-beige bg-white/70 px-3 py-2 text-[12px] tracking-normal text-ink outline-none focus:border-taupe dark:border-ivory/25 dark:bg-coal-card dark:text-ivory"
          >
            <option value="featured">{t('sortFeatured')}</option>
            <option value="priceLow">{t('sortPriceLow')}</option>
            <option value="priceHigh">{t('sortPriceHigh')}</option>
            <option value="name">{t('sortName')}</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <SearchX size={36} className="text-taupe dark:text-beige" strokeWidth={1.2} />
          <p className="font-serif-display text-2xl text-ink-soft dark:text-ivory/70">{t('noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpenProduct} />
          ))}
        </div>
      )}
    </main>
  );
}
