import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import { categories, whatsappLink } from '@/data';
import { useCatalog } from '@/context/CatalogContext';
import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { products } = useCatalog();

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.categorySlug === activeCategory);
    }
    if (query) {
      const term = query.toLowerCase();
      result = result.filter((p) =>
        `${p.name} ${p.category} ${p.detail} ${p.description}`.toLowerCase().includes(term)
      );
    }
    return result;
  }, [activeCategory, query]);

  return (
    <div className="page-pad">
      <div className="page-header">
        <p className="eyebrow">The edit</p>
        <h1>
          Luxury, <em>designed for you.</em>
        </h1>
        <p className="page-subtitle">
          Explore our full collection of premium human hair, luxury wigs, and wig care essentials.
        </p>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All pieces
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            className={`filter-pill ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {query && (
        <div className="search-result-note">
          Showing results for "{query}"
          <button onClick={() => setSearchParams({})}>
            <X size={14} />
          </button>
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No products found. Try a different search or category.</p>
        </div>
      )}

      <div className="shop-note">
        <span>
          <Sparkles size={17} /> Prices are tailored to length, weight and style.
        </span>
        <a
          href={whatsappLink('Hello THE SIVIA NG, I would like to request current pricing for your hair and wig collections.')}
          target="_blank"
          rel="noreferrer"
        >
          Request current price <ArrowRight size={15} />
        </a>
      </div>
    </div>
  );
}
