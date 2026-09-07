import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Heart, MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import { getProductBySlug, products, whatsappLink } from '@/data';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [selectedImage, setSelectedImage] = useState(0);
  const [length, setLength] = useState(product?.lengths[0] || '');
  const [weight, setWeight] = useState(product?.weights[0] || '');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="page-pad empty-state">
        <p>Product not found.</p>
        <Link to="/products" className="button button-gold">
          Browse all products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4);
  const liked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, length, weight);
    navigate('/cart');
  };

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/category/${product.categorySlug}`}>{product.category}</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </div>

      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="gallery-main">
            <img src={product.images[selectedImage] || product.image} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="gallery-thumbs">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`gallery-thumb ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-detail-text">{product.detail}</p>
          <div className="detail-price">{product.price}</div>
          <p className="price-note">{product.priceNote}</p>

          <p className="product-description">{product.description}</p>

          <div className="detail-options">
            <div className="option-group">
              <label>Length / Size</label>
              <div className="option-pills">
                {product.lengths.map((opt) => (
                  <button
                    key={opt}
                    className={`option-pill ${length === opt ? 'active' : ''}`}
                    onClick={() => setLength(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="option-group">
              <label>Weight</label>
              <div className="option-pills">
                {product.weights.map((opt) => (
                  <button
                    key={opt}
                    className={`option-pill ${weight === opt ? 'active' : ''}`}
                    onClick={() => setWeight(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                <Minus size={15} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>
                <Plus size={15} />
              </button>
            </div>
            <button className="button button-dark" onClick={handleAddToCart}>
              <ShoppingBag size={16} /> Add to bag
            </button>
            <button
              className={`wishlist-detail ${liked ? 'liked' : ''}`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <a
            className="button button-gold detail-enquire"
            href={whatsappLink(`Hello THE SIVIA NG, I would like to enquire about ${product.name} (${length}, ${weight}).`)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={16} /> Enquire on WhatsApp
          </a>

          <div className="detail-features">
            <span><Check size={14} /> Premium quality guaranteed</span>
            <span><Check size={14} /> Nationwide delivery</span>
            <span><Check size={14} /> Expert craftsmanship</span>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="section-pad related-products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">You may also love</p>
              <h2>Complete the <em>look</em></h2>
            </div>
            <Link to="/products" className="text-button dark">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
