import { useState } from 'react';
import { useCart } from '../Context/CartContext';
import { Star, ShoppingCart, CheckCircle } from 'lucide-react';
import './ProductDetails.css';

function ProductDetails({ product, onBack }) {
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return null;
  }

  const discount = Math.round(
    ((product.originalPrice - product.finalPrice) /
      product.originalPrice) *
      100
  );

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
                <img src={image} alt={`${product.title} ${index + 1}`} />
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

            <span>{product.ratings.toLocaleString('en-IN')} Ratings</span>
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

          <div className="product-stock">
            <CheckCircle size={18} />
            <span>In Stock</span>
          </div>

          <div className="product-detail-actions">
            <button
              className="detail-add-to-cart"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart size={19} />
              Add to cart
            </button>
          </div>

          <div className="product-basic-specifications">
            <h3>Product Information</h3>

            <div>
              <span>Brand</span>
              <span>{product.brand}</span>
            </div>

            <div>
              <span>Category</span>
              <span>{product.category}</span>
            </div>

            <div>
              <span>Type</span>
              <span>{product.type}</span>
            </div>

            <div>
              <span>Connectivity</span>
              <span>{product.connectivity}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
