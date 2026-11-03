import { useCart } from '../Context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import './Cart.css';

function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <section className="cart-section">
      <h2 className="cart-heading">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={65} />
          <h3>Your cart is empty!</h3>
          <p>Add some products to your cart to see them here.</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((product) => (
              <article className="cart-item" key={product.id}>
                <div className="cart-item-image">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                  />
                </div>

                <div className="cart-item-details">
                  <h3>{product.title}</h3>

                  <p className="cart-item-price">
                    ₹{product.finalPrice.toLocaleString('en-IN')}
                  </p>

                  <div className="cart-quantity">
                    <button
                      aria-label={`Decrease ${product.title} quantity`}
                      onClick={() =>
                        updateQuantity(product.id, product.quantity - 1)
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <span>{product.quantity}</span>

                    <button
                      aria-label={`Increase ${product.title} quantity`}
                      onClick={() =>
                        updateQuantity(product.id, product.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <p>
                    ₹{(product.finalPrice * product.quantity).toLocaleString('en-IN')}
                  </p>

                  <button
                    className="remove-cart-item"
                    aria-label={`Remove ${product.title}`}
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Products ({cartCount})</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-delivery">Free</span>
            </div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            <button className="checkout-button">
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Cart;
