import type { Lang } from '../types';

export const formatPrice = (value: number, lang: Lang) =>
  new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-SA', {
    maximumFractionDigits: 0,
  }).format(value);
