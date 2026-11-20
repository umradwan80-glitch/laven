import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import products from '../data/products';
import type { Product } from '../types';

export type CartItem = {
  productId: number;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  detailed: { product: Product; qty: number }[];
  count: number;
  total: number;
  add: (productId: number) => void;
  remove: (productId: number) => void;
  setQty: (productId: number, qty: number) => void;
  clear: () => void;
  lastAdded: string | null;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = 'laven-cart';

function readInitialCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { productId?: unknown; qty?: unknown }[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((i) => typeof i.productId === 'number' && typeof i.qty === 'number')
      .map((i) => ({ productId: i.productId as number, qty: Math.min(99, Math.max(1, Math.round(i.qty as number))) }))
      .filter((i) => products.some((p) => p.id === i.productId));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readInitialCart);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const detailed = items
      .map((i) => {
        const product = products.find((p) => p.id === i.productId);
        return product ? { product, qty: i.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => x !== null);

    return {
      items,
      detailed,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: detailed.reduce((s, i) => s + i.product.price * i.qty, 0),
      add: (productId) => {
        const p = products.find((pp) => pp.id === productId);
        if (p) setLastAddedName(p.nameEn);
        setItems((prev) => {
          const existing = prev.find((i) => i.productId === productId);
          if (existing) {
            return prev.map((i) => (i.productId === productId ? { ...i, qty: Math.min(99, i.qty + 1) } : i));
          }
          return [...prev, { productId, qty: 1 }];
        });
      },
      remove: (productId) => setItems((prev) => prev.filter((i) => i.productId !== productId)),
      setQty: (productId, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((i) => i.productId !== productId)
            : prev.map((i) => (i.productId === productId ? { ...i, qty: Math.min(99, qty) } : i))
        ),
      clear: () => setItems([]),
      lastAdded: lastAddedName,
    };
  }, [items, lastAddedName]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
