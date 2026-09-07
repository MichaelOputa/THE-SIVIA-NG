import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/data';

export default function ProductCard({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const liked = isInWishlist(product.id);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <span className="product-tag">The Sivia edit</span>
        <button
          className={`wishlist-button ${liked ? 'liked' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Add to wishlist"
        >
          <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <Link to={`/product/${product.slug}`} className="quick-view">
          Quick view
        </Link>
      </div>
      <div className="product-info">
        <div>
          <p className="product-category">{product.category}</p>
          <h3>{product.name}</h3>
          <p className="product-detail">{product.detail}</p>
        </div>
        <button
          className="product-add"
          onClick={() => addItem(product, product.lengths[0], product.weights[0])}
        >
          <span>{product.price}</span>
          <span className="add-circle">
            <ArrowRight size={15} />
          </span>
        </button>
      </div>
    </article>
  );
}
