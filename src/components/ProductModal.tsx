import { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';
import ProductArt from './ProductArt';
import ProductPhoto from './ProductPhoto';
import ProductCard from './ProductCard';
import { formatPrice } from '../utils/formatPrice';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

export default function ProductModal({
  product,
  onClose,
  onOpenProduct,
}: {
  product: Product;
  onClose: () => void;
  onOpenProduct: (p: Product) => void;
}) {
  const { lang, t } = useLang();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [product.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const cat = categories.find((c) => c.key === product.category);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={name}>
      <button className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} aria-label={t('close')} />
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-ivory shadow-2xl dark:bg-coal-soft sm:max-h-[88vh]">
        <button
          onClick={onClose}
          className="absolute end-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ivory/90 transition-colors hover:bg-beige dark:bg-coal/80 dark:text-ivory dark:hover:bg-coal-card"
          aria-label={t('close')}
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="bg-cream dark:bg-coal-card">
            <ProductPhoto product={product} className="h-72 w-full object-cover sm:h-96 md:h-full" />
          </div>

          <div className="flex flex-col p-6 sm:p-10">
            <span className="text-[11px] uppercase tracking-widest2 text-taupe-deep dark:text-beige">{lang === 'ar' ? cat?.ar : cat?.en}</span>
            <h2 className="mt-2 font-serif-display text-3xl font-medium leading-tight sm:text-4xl dark:text-ivory">{name}</h2>
            <p className="mt-3 text-xl tracking-wide dark:text-ivory">
              {formatPrice(product.price, lang)} {t('sar')}
            </p>

            <div className="mt-6">
              <h3 className="text-[11px] uppercase tracking-widest2 text-taupe-deep dark:text-beige">{t('description')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-ivory/70">{lang === 'ar' ? product.descAr : product.descEn}</p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-ink/30 dark:border-ivory/25">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 transition-colors hover:bg-beige/40" aria-label={lang === 'ar' ? 'إنقاص الكمية' : 'Decrease quantity'}>
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm" aria-live="polite">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(99, q + 1))} className="p-3 transition-colors hover:bg-beige/40" aria-label={lang === 'ar' ? 'زيادة الكمية' : 'Increase quantity'}>
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => {
                  add(product.id);
                  setAdded(true);
                  window.setTimeout(() => setAdded(false), 1500);
                }}
                className={`btn-primary flex-1 ${added ? '!bg-taupe-deep' : ''}`}
              >
                {added ? <Check size={16} /> : <ShoppingBag size={16} strokeWidth={1.5} />}
                {added ? t('added') : t('addToCart')}
              </button>
            </div>

            <p className="mt-6 text-[11px] leading-relaxed text-ink-soft/60 dark:text-ivory/45">{t('currencyNote')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
