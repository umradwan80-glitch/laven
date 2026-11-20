import { useState } from 'react';
import type { Product } from '../types';
import { imageFor } from '../data/productImages';
import ProductArt from './ProductArt';
import { useLang } from '../context/LanguageContext';

export default function ProductPhoto({ product, className = '' }: { product: Product; className?: string }) {
  const [failed, setFailed] = useState(false);
  const { lang } = useLang();
  const entry = imageFor(product);

  if (!entry || failed) {
    return <ProductArt product={product} className={className} />;
  }

  return (
    <img
      src={entry.src}
      alt={lang === 'ar' ? entry.altAr : entry.altEn}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
