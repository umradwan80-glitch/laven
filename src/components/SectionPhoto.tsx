import { useState } from 'react';
import type { Product } from '../types';
import ProductArt from './ProductArt';
import { useLang } from '../context/LanguageContext';

const sectionImages: Record<string, { src: string; altEn: string; altAr: string }> = {
  hero: {
    src: 'https://images.pexels.com/photos/31971098/pexels-photo-31971098.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop',
    altEn: 'Model in an elegant neutral outfit in soft, natural indoor light',
    altAr: 'عارضة بإطلالة محايدة أنيقة في إضاءة طبيعية داخلية ناعمة',
  },
  promo: {
    src: 'https://images.pexels.com/photos/36100701/pexels-photo-36100701.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop',
    altEn: 'Stylish woman in beige trousers and boots with creative soft lighting',
    altAr: 'امرأة أنيقة ببنطال بيج وحذاء بووت مع إضاءة ناعمة إبداعية',
  },
  about: {
    src: 'https://images.pexels.com/photos/23023821/pexels-photo-23023821.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop',
    altEn: 'Fashionable woman in beige tones posing by a ladder, editorial style',
    altAr: 'امرأة عصرية بدرجات البيج بجانب سلم، بأسلوب تصوير أزياء',
  },
};

export default function SectionPhoto({ slot, product, className = '' }: { slot: string; product?: Product; className?: string }) {
  const [failed, setFailed] = useState(false);
  const { lang } = useLang();
  const entry = sectionImages[slot];

  if (!entry || failed) {
    if (product) return <ProductArt product={product} className={className} />;
    return <div className={`bg-cream ${className}`} />;
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
