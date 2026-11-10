import { useState } from 'react';
import productsData from '../data/productsData';
import { useCart } from '../Context/CartContext';
import { useAddToCartFeedback } from '../hooks/useAddToCartFeedback';
import './TopProducts.css';
import './RelatedProducts.css';

function RelatedProducts({ product, onProductClick }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const { addToCart } = useCart();
  const { handleAddToCart, isProductAdded } =
    useAddToCartFeedback(addToCart);

  if (!product) {
    return null;
  }

  const relatedProducts = productsData.filter(
    (item) => item.category === product.category
  );

  const maxIndex = Math.max(0, relatedProducts.length - 4);

  const visibleProducts = relatedProducts.slice(
    activeIndex,
    activeIndex + 4
  );

  return (
    <section className="related-products-section">
      <h2 className="related-products-heading">
        Related Products
      </h2>

      <div className="related-products-grid">
        {visibleProducts.map((item) => {
          const isAdded = isProductAdded(item.id);

          return (
            <article
              className="product-card"
              key={item.id}
            >
              <div
                className="product-card-image"
                role="button"
                tabIndex={0}
                onClick={() => onProductClick(item)}
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' ||
                    event.key === ' '
                  ) {
                    event.preventDefault();
                    onProductClick(item);
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  loading="lazy"
                />
              </div>

              <div className="product-card-details">
                <div
                  className="product-rating"
                  aria-label={`${item.rateCount} out of 5 stars`}
                >
                  {'★'.repeat(item.rateCount)}
                </div>

                <h3
                  role="button"
                  tabIndex={0}
                  onClick={() => onProductClick(item)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      onProductClick(item);
                    }
                  }}
                >
                  {item.title}
                </h3>

                <p className="product-info">
                  {item.info}
                </p>

                <div className="product-divider"></div>

                <div className="product-card-price">
                  <span>
                    ₹{item.finalPrice.toLocaleString('en-IN')}
                  </span>

                  <del>
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </del>
                </div>

                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(item)}
                  style={
                    isAdded
                      ? {
                          backgroundColor: '#16a34a',
                          color: '#ffffff',
                        }
                      : undefined
                  }
                >
                  {isAdded ? 'Added' : 'Add to cart'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {maxIndex > 0 && (
        <div className="related-products-dots">
          {Array.from(
            { length: maxIndex + 1 },
            (_, index) => (
              <button
                key={index}
                className={
                  activeIndex === index ? 'active' : ''
                }
                onClick={() => setActiveIndex(index)}
                aria-label={`Show related products starting at ${index + 1}`}
              />
            )
          )}
        </div>
      )}
    </section>
  );
}

export default RelatedProducts;
