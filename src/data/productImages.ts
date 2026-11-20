import type { Product } from '../types';

// Verified Pexels photography, sized for fast loading.
// Fallback illustration shows automatically if any of these ever fail.
const img = (path: string) =>
  `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=800&h=1067&fit=crop`;

export const productImages: Record<number, { src: string; altEn: string; altAr: string }> = {
  1: {
    src: img('36139907/pexels-photo-36139907/free-photo-of-elegant-woman-in-flowing-beige-dress-indoors.jpeg'),
    altEn: 'Model wearing a flowing ivory silk midi dress in soft indoor light',
    altAr: 'عارضة ترتدي فستان ميدي حريري عاجي منسدل بإضاءة داخلية ناعمة',
  },
  2: {
    src: img('20356189/pexels-photo-20356189.jpeg'),
    altEn: 'Close-up of a woman adjusting a white satin blouse, showing the fabric detail',
    altAr: 'لقطة قريبة لامرأة ترتب بلوزة ساتان بيضاء مع إظهار تفاصيل القماش',
  },
  3: {
    src: img('6046228/pexels-photo-6046228.jpeg'),
    altEn: 'Studio shot of tailored taupe wide-leg trousers with soft lighting',
    altAr: 'صورة استوديو لبنطال واسع بلون التوب مع إضاءة ناعمة',
  },
  4: {
    src: img('29793778/pexels-photo-29793778.jpeg'),
    altEn: 'Beige leather tote bag worn on a woman\u2019s shoulder against a warm backdrop',
    altAr: 'حقيبة توت جلدية بيج على كتف امرأة بخلفية دافئة',
  },
  5: {
    src: img('28821783/pexels-photo-28821783.jpeg'),
    altEn: 'Elegant beige pointed-toe heels photographed on a clean light background',
    altAr: 'حذاء كعب مدبب بيج أنيق على خلفية فاتحة نظيفة',
  },
  6: {
    src: img('28716782/pexels-photo-28716782.jpeg'),
    altEn: 'Soft ivory fabric folds in gentle studio light, showing the scarf texture',
    altAr: 'طيّات قماش عاجية ناعمة بإضاءة استوديو تُظهر ملمس الوشاح',
  },
  7: {
    src: img('35003785/pexels-photo-35003785/free-photo-of-elegant-young-woman-in-black-dress-posing-indoors.jpeg'),
    altEn: 'Model posing in an elegant floor-length black evening gown indoors',
    altAr: 'عارضة ترتدي فستان سهرة أسود طويل بأناقة داخلية',
  },
  8: {
    src: img('4456146/pexels-photo-4456146.jpeg'),
    altEn: 'Woman in a light pleated chiffon blouse standing near hanging clothes',
    altAr: 'امرأة ترتدي توب شيفون بليسيه فاتح بجانب ملابس معلقة',
  },
  9: {
    src: img('31030438/pexels-photo-31030438.jpeg'),
    altEn: 'Woman wearing a warm sand linen summer dress outdoors',
    altAr: 'امرأة ترتدي فستان كتان صيفي بلون رملي في الخارج',
  },
  10: {
    src: img('8396731/pexels-photo-8396731.jpeg'),
    altEn: 'Hand holding a compact taupe leather crossbody bag, close-up',
    altAr: 'يد تحمل حقيبة كتف صغيرة جلدية بلون التوب، لقطة قريبة',
  },
  11: {
    src: img('32285300/pexels-photo-32285300.jpeg'),
    altEn: 'Elegant ivory leather flat shoes in a professional product shot',
    altAr: 'حذاء مسطح جلدي عاجي أنيق في صورة منتج احترافية',
  },
  12: {
    src: img('3266700/pexels-photo-3266700.jpeg'),
    altEn: 'Close-up of polished gold hoop earrings showing fine detail',
    altAr: 'لقطة قريبة لأقراط ذهبية دائرية لامعة تُظهر التفاصيل الدقيقة',
  },
  13: {
    src: img('15663726/pexels-photo-15663726/free-photo-of-woman-in-beige-loose-pants-and-pink-t-shirt.jpeg'),
    altEn: 'Full-length shot of a woman wearing cream pleated culotte pants',
    altAr: 'صورة كاملة لامرأة ترتدي بنطال كولوت بليسيه بلون الكريم',
  },
  14: {
    src: img('16279960/pexels-photo-16279960.jpeg'),
    altEn: 'Quilted evening clutch in soft light showing the padded texture',
    altAr: 'حقيبة سهرة مبطنة بإضاءة ناعمة تُظهر ملمس التبطين',
  },
};

export const imageFor = (product: Product) => productImages[product.id];
