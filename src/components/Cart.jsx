import { useCart } from '../Context/CartContext';
import {
  Trash2,
  Minus,
  Plus,
} from 'lucide-react';
import './Cart.css';

function Cart({ onContinueShopping }) {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const originalTotal = cartItems.reduce(
    (total, product) =>
      total + product.originalPrice * product.quantity,
    0
  );

  const totalDiscount = originalTotal - cartTotal;

  if (cartItems.length === 0) {
    return (
      <section className="empty-cart-page">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">
            <svg
              viewBox="0 0 180 180"
              className="empty-cart-svg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 20 H31 L48 137"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M38 43 H160 L146 137 H49"
                fill="none"
                stroke="currentColor"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M82 72 L116 106 M116 72 L82 106"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
                strokeLinecap="round"
              />

              <circle
                cx="64"
                cy="158"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
              />

              <circle
                cx="135"
                cy="158"
                r="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="9"
              />
            </svg>
          </div>

          <h2>Your Cart is Empty</h2>

          <button
            className="start-shopping-button"
            onClick={onContinueShopping}
          >
            Start Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h2 className="cart-heading">Shopping Cart</h2>

      <div className="cart-layout">

        {/* Scrollable Cart Items */}
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

                <del className="cart-item-original-price">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </del>

                <div className="cart-quantity">
                  <button
                    aria-label={`Decrease ${product.title} quantity`}
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        product.quantity - 1
                      )
                    }
                  >
                    <Minus size={16} />
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    aria-label={`Increase ${product.title} quantity`}
                    onClick={() =>
                      updateQuantity(
                        product.id,
                        product.quantity + 1
                      )
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <p>
                  ₹{(
                    product.finalPrice * product.quantity
                  ).toLocaleString('en-IN')}
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

        {/* Order Summary */}
        <aside className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Original Price</span>
            <span>
              ₹{originalTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span className="discount-value">
              -₹{totalDiscount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-delivery">Free</span>
          </div>

          <div className="summary-total">
            <span>Total Price</span>
            <span>
              ₹{cartTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <button className="checkout-button">
            Proceed to Checkout
          </button>
        </aside>

      </div>
    </section>
  );
}

export default Cart;
