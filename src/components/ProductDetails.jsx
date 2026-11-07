import { useState } from 'react';
import { useCart } from '../Context/CartContext';
import reviewsData from '../data/reviewsData';
import { ShoppingCart } from 'lucide-react';
import './ProductDetails.css';

function ProductDetails({ product, onBack }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Specifications');

  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const discount = Math.round(
    ((product.originalPrice - product.finalPrice) /
      product.originalPrice) *
      100
  );

  const specifications = [
    { label: 'Brand', value: product.brand },
    { label: 'Model', value: product.title },
    { label: 'Generic Name', value: product.category },
    { label: 'Headphone Type', value: product.type },
    { label: 'Connectivity', value: product.connectivity },
  ];

  const tabs = ['Specifications', 'Overview', 'Reviews'];

  return (
    <section className="product-details-section">
      <button className="product-back-button" onClick={onBack}>
        ← Back to Products
      </button>

      <div className="product-details-container">
        <div className="product-gallery">
          <div className="product-thumbnails">
            {product.images.map((image, index) => (
              <button
                key={image}
                className={
                  activeImage === index ? 'thumbnail-active' : ''
                }
                onClick={() => setActiveImage(index)}
                aria-label={`View product image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                />
              </button>
            ))}
          </div>

          <div className="product-main-image">
            <img
              src={product.images[activeImage]}
              alt={product.title}
            />
          </div>
        </div>

        <div className="product-information">
          <h1>{product.title}</h1>

          <p className="product-description">{product.info}</p>

          <div className="product-detail-rating">
            <span className="rating-stars">
              {'★'.repeat(product.rateCount)}
              {'☆'.repeat(5 - product.rateCount)}
            </span>

            <span>
              {product.ratings.toLocaleString('en-IN')} Ratings
            </span>
          </div>

          <div className="product-detail-price">
            <span className="current-price">
              ₹{product.finalPrice.toLocaleString('en-IN')}
            </span>

            <del>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </del>

            <span className="discount-percentage">
              {discount}% off
            </span>
          </div>

          <p className="tax-information">
            (Inclusive of all taxes)
          </p>

          <div className="product-detail-actions">
            <button
              className="detail-add-to-cart"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={19} />
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div className="product-tabs-section">
        <div className="product-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'tab-active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="product-tab-content">
          {activeTab === 'Specifications' && (
            <div className="specifications-list">
              {specifications.map((specification) => (
                <div
                  className="specification-row"
                  key={specification.label}
                >
                  <span>{specification.label}</span>
                  <strong>{specification.value}</strong>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Overview' && (
            <div className="overview-content">
              <p>{product.info}</p>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="reviews-list">
              {reviewsData.map((review) => (
                <article className="review-card" key={review.id}>
                  <div className="review-header">
                    <h3>{review.name}</h3>
                    <span>{review.date}</span>
                  </div>

                  <div className="review-stars">
                    {'★'.repeat(review.rateCount)}
                    {'☆'.repeat(5 - review.rateCount)}
                  </div>

                  <p>{review.review}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
