import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { products as fallbackProducts, type Product } from '@/data';
import { supabase } from '@/lib/supabase';

type CatalogContextType = {
  products: Product[];
  loading: boolean;
};

const CatalogContext = createContext<CatalogContextType>({ products: fallbackProducts, loading: false });

const mapProduct = (row: Record<string, unknown>): Product => ({
  id: String(row.id),
  name: String(row.name),
  slug: String(row.slug),
  category: String(row.category),
  categorySlug: String(row.category_slug),
  detail: String(row.detail || ''),
  description: String(row.description || ''),
  image: String(row.image),
  images: Array.isArray(row.images) ? row.images.map(String) : [String(row.image)],
  lengths: Array.isArray(row.lengths) ? row.lengths.map(String) : [],
  weights: Array.isArray(row.weights) ? row.weights.map(String) : [],
  price: String(row.price),
  priceNote: String(row.price_note || ''),
});

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalogProducts, setCatalogProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;
    supabase.from('store_products').select('*').eq('is_active', true).order('created_at', { ascending: false }).then(({ data }) => {
      if (data && data.length > 0) setCatalogProducts(data.map((row) => mapProduct(row as Record<string, unknown>)));
      setLoading(false);
    });
  }, []);

  return <CatalogContext.Provider value={{ products: catalogProducts, loading }}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  return useContext(CatalogContext);
}
