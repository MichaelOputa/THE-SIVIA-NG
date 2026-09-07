import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '@/data';

export type CartItem = {
  product: Product;
  quantity: number;
  length: string;
  weight: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, length: string, weight: string) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, length: string, weight: string) => {
    setItems((current) => {
      const existing = current.findIndex(
        (item) => item.product.id === product.id && item.length === length && item.weight === weight
      );
      if (existing >= 0) {
        const updated = [...current];
        updated[existing].quantity += 1;
        return updated;
      }
      return [...current, { product, quantity: 1, length, weight }];
    });
  };

  const removeItem = (index: number) => {
    setItems((current) => current.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((current) => {
      const updated = [...current];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
