import { useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Lock } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import ProductArt from './ProductArt';
import ProductPhoto from './ProductPhoto';
import { formatPrice } from '../utils/formatPrice';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, t } = useLang();
  const { detailed, total, count, setQty, remove } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={t('yourCart')}>
      <button className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={onClose} aria-label={t('close')} />
      <aside className="drawer-panel absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl dark:bg-coal-soft">
        <div className="flex items-center justify-between border-b border-beige px-6 py-5 dark:border-ivory/10">
          <h2 className="font-serif-display text-2xl font-medium">
            {t('yourCart')}
            {count > 0 && <span className="ms-2 text-sm text-taupe-deep">({count} {t('itemsCount')})</span>}
          </h2>
          <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-beige/50" aria-label={t('close')}>
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream dark:bg-coal-card">
              <ShoppingBag size={24} className="text-taupe-deep" strokeWidth={1.5} />
            </span>
            <h3 className="font-serif-display text-2xl">{t('cartEmpty')}</h3>
            <p className="text-sm text-ink-soft/80">{t('cartEmptySub')}</p>
            <button onClick={onClose} className="btn-outline mt-2 !px-6 !py-2.5 !text-xs">
              {t('continueShopping')}
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-beige/70 overflow-y-auto px-6 dark:divide-ivory/10">
              {detailed.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4 py-5">
                  <ProductPhoto product={product} className="h-28 w-20 shrink-0 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif-display text-base font-medium leading-snug dark:text-ivory">
                        {lang === 'ar' ? product.nameAr : product.nameEn}
                      </h3>
                      <button
                        onClick={() => remove(product.id)}
                        className="rounded p-1 text-ink-soft/60 transition-colors hover:text-red-700"
                        aria-label={`${t('remove')} ${lang === 'ar' ? product.nameAr : product.nameEn}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-ink-soft/70 dark:text-ivory/55">
                      {formatPrice(product.price, lang)} {t('sar')}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-beige dark:border-ivory/25">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="p-2 transition-colors hover:bg-beige/40"
                          aria-label={lang === 'ar' ? 'إنقاص الكمية' : 'Decrease quantity'}
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-9 text-center text-sm" aria-live="polite">{qty}</span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="p-2 transition-colors hover:bg-beige/40"
                          aria-label={lang === 'ar' ? 'زيادة الكمية' : 'Increase quantity'}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(product.price * qty, lang)} {t('sar')}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-beige bg-cream/50 px-6 py-5 dark:border-ivory/10 dark:bg-coal-card/60">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-ink-soft dark:text-ivory/65">
                  <span>{t('subtotal')}</span>
                  <span>{formatPrice(total, lang)} {t('sar')}</span>
                </div>
                <div className="flex justify-between text-ink-soft dark:text-ivory/65">
                  <span>{t('shipping')}</span>
                  <span className="text-taupe-deep">{t('freeShipping')}</span>
                </div>
                <div className="flex justify-between border-t border-beige pt-2.5 text-base font-medium text-ink dark:border-ivory/15 dark:text-ivory">
                  <span>{t('total')}</span>
                  <span>{formatPrice(total, lang)} {t('sar')}</span>
                </div>
              </div>
              <button
                className="btn-primary mt-4 w-full"
                onClick={() => window.alert(t('checkoutDemo'))}
              >
                <Lock size={14} strokeWidth={1.5} />
                {t('checkout')}
              </button>
              <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-soft/70 dark:text-ivory/50">{t('currencyNote')}</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
