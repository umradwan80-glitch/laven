import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { LanguageProvider, useLang } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar, { type Page } from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CartDrawer from './components/CartDrawer';
import ProductModal from './components/ProductModal';
import type { Product } from './types';

type AppPage = 'home' | 'shop' | 'about' | 'contact';

function CartToast() {
  const { t } = useLang();
  const { count, lastAdded } = useCart();
  const [visible, setVisible] = useState(false);
  const prevCount = useRef(count);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (count > prevCount.current) {
      setVisible(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), 2200);
    }
    prevCount.current = count;
  }, [count]);

  if (!visible || !lastAdded) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 animate-fade-up" role="status">
      <div className="flex items-center gap-3 bg-ink px-5 py-3 text-sm text-ivory shadow-xl dark:bg-ivory dark:text-ink">
        <CheckCircle2 size={17} className="shrink-0 text-beige dark:text-taupe-deep" />
        <span>
          {lastAdded} — {t('added')}
        </span>
      </div>
    </div>
  );
}

function Site() {
  const { lang } = useLang();
  const { count } = useCart();
  const [page, setPage] = useState<AppPage>('home');
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const navigate = useCallback((p: AppPage) => {
    setPage(p);
  }, []);

  const openProduct = useCallback((p: Product) => {
    setActiveProduct(p);
  }, []);

  useEffect(() => {
    if (page !== 'shop' && search) setSearch('');
  }, [page, search]);

  return (
    <div key={lang} className="flex min-h-screen flex-col">
      <Navbar
        page={page}
        onNavigate={navigate}
        onOpenCart={() => setCartOpen(true)}
        search={search}
        onSearch={(q) => {
          setSearch(q);
          if (q && page !== 'shop') setPage('shop');
        }}
      />

      <div className="flex-1">
        {page === 'home' && <HomePage onNavigate={navigate} onOpenProduct={openProduct} />}
        {page === 'shop' && <ShopPage search={search} onOpenProduct={openProduct} />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </div>

      <Footer onNavigate={navigate} />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} onOpenProduct={openProduct} />}

      {/* Screen-reader live region for cart updates */}
      <p className="sr-only" aria-live="polite">
        {count}
      </p>
      <CartToast />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <Site />
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
