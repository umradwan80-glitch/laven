import type { CategoryKey } from './data/products';

export type Lang = 'en' | 'ar';

export type Product = {
  id: number;
  category: CategoryKey;
  nameEn: string;
  nameAr: string;
  price: number;
  descEn: string;
  descAr: string;
  seed: string;
  newArrival: boolean;
  featured: boolean;
};
