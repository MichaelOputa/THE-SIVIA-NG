import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { whatsappLink } from '@/data';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="page-pad empty-cart-page">
        <ShoppingBag size={40} />
        <h1>Your bag is empty</h1>
        <p>Your bag is waiting for something beautiful.</p>
        <Link to="/products" className="button button-gold">
          Explore the collection <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const enquiryMessage = `Hello THE SIVIA NG, I would like to enquire about the following items:\n\n${items
    .map(
      (item, i) =>
        `${i + 1}. ${item.product.name} — ${item.length}, ${item.weight} (x${item.quantity})`
    )
    .join('\n')}`;

  return (
    <div className="page-pad cart-page">
      <div className="page-header">
        <p className="eyebrow">Your selection</p>
        <h1>
          Shopping <em>bag</em>
        </h1>
        <p className="page-subtitle">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your bag</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {items.map((item, index) => (
            <div className="cart-list-item" key={index}>
              <Link to={`/product/${item.product.slug}`}>
                <img src={item.product.image} alt={item.product.name} />
              </Link>
              <div className="cart-item-info">
                <Link to={`/product/${item.product.slug}`}>
                  <h3>{item.product.name}</h3>
                </Link>
                <p className="cart-item-category">{item.product.category}</p>
                <p className="cart-item-options">
                  {item.length} · {item.weight}
                </p>
                <p className="cart-item-price">{item.product.price}</p>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-selector small">
                  <button onClick={() => updateQuantity(index, item.quantity - 1)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(index, item.quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
                <button className="cart-remove" onClick={() => removeItem(index)} aria-label="Remove item">
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
          <button className="clear-cart" onClick={clearCart}>
            Clear bag
          </button>
        </div>

        <div className="cart-summary">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Total items</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>Nationwide</span>
          </div>
          <p className="summary-note">
            Prices vary by length, weight and style. Final pricing will be confirmed via WhatsApp.
          </p>
          <a
            className="button button-gold"
            href={whatsappLink(enquiryMessage)}
            target="_blank"
            rel="noreferrer"
          >
            Enquire about selection <ArrowRight size={16} />
          </a>
          <Link to="/products" className="text-button dark">
            Continue shopping <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
