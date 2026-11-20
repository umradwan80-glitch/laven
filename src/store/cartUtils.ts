import type { Product } from '../types';

export type CartLine = { id: number; qty: number };

export const cartCount = (lines: CartLine[]) => lines.reduce((s, l) => s + l.qty, 0);

export const cartTotal = (lines: CartLine[], products: Product[]) =>
  lines.reduce((sum, l) => {
    const p = products.find((pp) => pp.id === l.id);
    return p ? sum + p.price * l.qty : sum;
  }, 0);

export const formatPrice = (v: number, lang: 'en' | 'ar') =>
  new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-SA', {
    maximumFractionDigits: 0,
  }).format(v);
