import { Sparkles, Leaf, Ruler, Gem } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import SectionPhoto from './SectionPhoto';

export default function AboutPage() {
  const { lang, t } = useLang();

  const values = [
    { Icon: Leaf, en: 'Natural Fabrics', ar: 'أقمشة طبيعية', descEn: 'Silk, linen and cashmere chosen for how they feel and age.', descAr: 'حرير وكتان وكشمير مختارة لإحساسها وجمالها مع الزمن.' },
    { Icon: Ruler, en: 'Considered Tailoring', ar: 'خياطة مدروسة', descEn: 'Every silhouette is cut to move with the woman wearing it.', descAr: 'كل قصة مصممة لتتحرك مع المرأة التي ترتديها.' },
    { Icon: Gem, en: 'Quiet Luxury', ar: 'فخامة هادئة', descEn: 'No loud logos — only detail, proportion and finish.', descAr: 'بدون شعارات صاخبة — فقط تفاصيل وتناسق وإتقان.' },
    { Icon: Sparkles, en: 'Small Batches', ar: 'كميات محدودة', descEn: 'Pieces are produced thoughtfully, never in excess.', descAr: 'تُنتج قطعنا بعناية وبكميات محدودة دون إسراف.' },
  ];

  return (
    <main>
      <section className="bg-cream dark:bg-coal-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <p className="section-label">LAVEN — 2026</p>
            <h1 className="mt-2 font-serif-display text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl dark:text-ivory">
              {t('aboutTitle')}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft dark:text-ivory/70">{t('aboutP1')}</p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft dark:text-ivory/70">{t('aboutP2')}</p>
          </div>
          <div className="mx-auto w-full max-w-md">
            <SectionPhoto slot="about" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, en, ar, descEn, descAr }) => (
            <div key={en} className="border-t border-beige pt-6 dark:border-ivory/15">
              <Icon size={22} strokeWidth={1.3} className="text-taupe-deep" />
              <h2 className="mt-4 font-serif-display text-xl font-medium dark:text-ivory">{lang === 'ar' ? ar : en}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft/85 dark:text-ivory/65">{lang === 'ar' ? descAr : descEn}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
