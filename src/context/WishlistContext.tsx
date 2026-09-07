import { createContext, useContext, useState, type ReactNode } from 'react';

type WishlistContextType = {
  wishlist: (number | string)[];
  toggleWishlist: (id: number | string) => void;
  isInWishlist: (id: number | string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<(number | string)[]>([]);

  const toggleWishlist = (id: number | string) => {
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const isInWishlist = (id: number | string) => wishlist.includes(id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
