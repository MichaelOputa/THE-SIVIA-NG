import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getCategoryBySlug, categories, whatsappLink } from '@/data';
import { useCatalog } from '@/context/CatalogContext';
import ProductCard from '@/components/ProductCard';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useCatalog();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) {
    return (
      <div className="page-pad empty-state">
        <p>Category not found.</p>
        <Link to="/products" className="button button-gold">
          Browse all products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const categoryProducts = products.filter((product) => product.categorySlug === category.slug);
  const relatedCategories = categories.filter((c) => c.group === category.group && c.slug !== category.slug);

  return (
    <div>
      <div className="category-hero">
        <img src={category.image} alt={category.name} />
        <div className="category-hero-shade" />
        <div className="category-hero-content">
          <p className="eyebrow light">{category.group}</p>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
      </div>

      <div className="page-pad">
        {categoryProducts.length > 0 ? (
          <>
            <div className="product-grid">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="shop-note">
              <span>
                <Sparkles size={17} /> Prices are tailored to length, weight and style.
              </span>
              <a
                href={whatsappLink(`Hello THE SIVIA NG, I would like to request current pricing for ${category.name}.`)}
                target="_blank"
                rel="noreferrer"
              >
                Request current price <ArrowRight size={15} />
              </a>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>New products in this collection are coming soon. Enquire on WhatsApp for availability and pricing.</p>
            <a
              className="button button-gold"
              href={whatsappLink(`Hello THE SIVIA NG, I would like to enquire about ${category.name}.`)}
              target="_blank"
              rel="noreferrer"
            >
              Enquire on WhatsApp <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>

      {relatedCategories.length > 0 && (
        <div className="related-categories section-pad cream-section">
          <p className="eyebrow">More in {category.group}</p>
          <h2>Explore more <em>collections</em></h2>
          <div className="related-grid">
            {relatedCategories.map((cat) => (
              <Link to={`/category/${cat.slug}`} className="related-card" key={cat.slug}>
                <img src={cat.image} alt={cat.name} />
                <span className="category-overlay" />
                <span className="category-name">{cat.name}<ArrowRight size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
