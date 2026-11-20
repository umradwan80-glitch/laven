import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';
import ProductArt from './ProductArt';
import ProductPhoto from './ProductPhoto';
import { formatPrice } from '../utils/formatPrice';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

export default function ProductCard({ product, onOpen }: { product: Product; onOpen: (p: Product) => void }) {
  const { lang, t } = useLang();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const cat = categories.find((c) => c.key === product.category);

  const handleAdd = () => {
    add(product.id);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col">
      <button
        onClick={() => onOpen(product)}
        className="relative block w-full overflow-hidden bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-taupe dark:bg-coal-card"
        aria-label={name}
      >
        <ProductPhoto product={product} className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        {product.newArrival && (
          <span className="absolute start-3 top-3 bg-ink px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-ivory">
            {t('newArrivals')}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col pt-4">
        <span className="text-[10px] uppercase tracking-widest2 text-taupe-deep dark:text-beige">{lang === 'ar' ? cat?.ar : cat?.en}</span>
        <button onClick={() => onOpen(product)} className="mt-1 text-start">
          <h3 className="font-serif-display text-lg font-medium leading-snug text-ink transition-colors group-hover:text-taupe-deep dark:text-ivory dark:group-hover:text-beige">
            {name}
          </h3>
        </button>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-soft/80 dark:text-ivory/60">
          {lang === 'ar' ? product.descAr : product.descEn}
        </p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm font-medium tracking-wide text-ink dark:text-ivory">
            {formatPrice(product.price, lang)} {t('sar')}
          </span>
          <button
            onClick={handleAdd}
            className={`inline-flex items-center gap-2 border px-4 py-2 text-[11px] uppercase tracking-widest2 transition-all duration-300 ${
              added
                ? 'border-taupe-deep bg-taupe-deep text-ivory'
                : 'border-ink text-ink hover:bg-ink hover:text-ivory dark:border-ivory/60 dark:text-ivory dark:hover:bg-ivory dark:hover:text-ink'
            }`}
            aria-label={`${t('addToCart')} — ${name}`}
          >
            {added ? <Check size={13} /> : <ShoppingBag size={13} strokeWidth={1.5} />}
            {added ? t('added') : t('addToCart')}
          </button>
        </div>
      </div>
    </article>
  );
}
