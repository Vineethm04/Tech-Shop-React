import { useState } from 'react';
import { useCart } from '../Context/CartContext';
import reviewsData from '../data/reviewsData';
import { ShoppingCart, Check } from 'lucide-react';
import RelatedProducts from './RelatedProducts';
import './ProductDetails.css';

function ProductDetails({ product }) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Specifications');

  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const savings = product.originalPrice - product.finalPrice;

  const discount = Math.round(
    (savings / product.originalPrice) * 100
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
      <div className="product-details-container">

        {/* Product Image Gallery */}
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

        {/* Product Information */}
        <div className="product-information">
          <h1>{product.title}</h1>

          <p className="product-description">
            {product.info}
          </p>

          <div className="product-detail-rating">
            <span className="rating-stars">
              {'★'.repeat(product.rateCount)}
              {'☆'.repeat(5 - product.rateCount)}
            </span>

            <span>
              | {product.ratings.toLocaleString('en-IN')} Ratings
            </span>
          </div>

          {/* Price and Stock */}
          <div className="product-detail-price">
            <div className="price-values">
              <span className="current-price">
                ₹{product.finalPrice.toLocaleString('en-IN')}
              </span>

              <del>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </del>
            </div>

            <span className="stock-status">
              <Check size={14} />
              In Stock
            </span>
          </div>

          <p className="savings-information">
            You save: ₹{savings.toLocaleString('en-IN')} ({discount}%)
          </p>

          <p className="tax-information">
            (Inclusive of all taxes)
          </p>

          {/* Offers */}
          <div className="product-offers">
            <h3>Offers and Discounts</h3>

            <div className="product-offers-list">
              <div className="product-offer-card">
                No Cost EMI on Credit Card
              </div>

              <div className="product-offer-card">
                Pay Later &amp; Avail Cashback
              </div>
            </div>
          </div>

          {/* Add to Cart */}
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

      {/* Product Tabs */}
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

          {/* Specifications */}
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

          {/* Overview */}
          {activeTab === 'Overview' && (
            <div className="overview-content">
              <h3 className="overview-heading">
                The <span>{product.title}</span> {product.info} provides
                with fabulous sound quality
              </h3>

              <ul className="overview-highlights">
                <li>Sound Tuned to Perfection</li>
                <li>Comfortable to Wear</li>
                <li>Long Hours Playback Time</li>
              </ul>

              <p className="overview-description">
                Buy the <strong>{product.title} {product.info}</strong>{' '}
                which offers you with fabulous music experience by
                providing you with awesome sound quality that you can
                never move on from. Enjoy perfect flexibility and
                mobility with amazing musical quality with these
                products giving you a truly awesome audio experience.
                It blends with exceptional sound quality and a range
                of smart features for an unrivalled listening
                experience.
              </p>
            </div>
          )}

          {/* Reviews */}
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

      <RelatedProducts product={product} />
    </section>
  );
}

export default ProductDetails;
