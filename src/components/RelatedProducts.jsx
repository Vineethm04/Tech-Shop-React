import { useState } from 'react';
import productsData from '../data/productsData';
import { useCart } from '../Context/CartContext';
import { useAddToCartFeedback } from '../hooks/useAddToCartFeedback';
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
              className="related-product-card"
              key={item.id}
              role="link"
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
              aria-label={`View details for ${item.title}`}
              style={{ cursor: 'pointer' }}
            >
              <div className="related-product-image">
                <img src={item.images[0]} alt={item.title} />
              </div>

              <div className="related-product-details">
                <div className="related-product-rating">
                  {'★'.repeat(item.rateCount)}
                  {'☆'.repeat(5 - item.rateCount)}
                </div>

                <h3>{item.title}</h3>

                <p>{item.info}</p>

                <div className="related-product-price">
                  <span>
                    ₹{item.finalPrice.toLocaleString('en-IN')}
                  </span>

                  <del>
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </del>
                </div>

                <button
                  className="related-add-to-cart"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAddToCart(item);
                  }}
                  style={
                    isAdded
                      ? { backgroundColor: '#16a34a', color: '#ffffff' }
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
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              className={
                activeIndex === index ? 'active' : ''
              }
              onClick={() => setActiveIndex(index)}
              aria-label={`Show related products starting at ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedProducts;
