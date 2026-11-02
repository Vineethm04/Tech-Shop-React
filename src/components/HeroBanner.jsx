
import { useState } from 'react';
import productsData from '../data/productsData';
import './HeroBanner.css';

function HeroBanner() {
  const heroProducts = productsData.filter(
    (product) => product.tag === 'hero-product'
  );

  const [activeSlide, setActiveSlide] = useState(0);

  const currentProduct = heroProducts[activeSlide];

  if (!currentProduct) {
    return null;
  }

  return (
    <section className="hero-banner">

      <span className="hero-watermark">
        {currentProduct.type}
      </span>

      <div className="hero-content">

        <div className="hero-text">
          <h2>{currentProduct.title}</h2>

          <h1>{currentProduct.tagline}</h1>

          <div className="hero-price">
            <span>
              ₹{currentProduct.finalPrice.toLocaleString('en-IN')}
            </span>

            <del>
              ₹{currentProduct.originalPrice.toLocaleString('en-IN')}
            </del>
          </div>

          <button className="shop-now">
            Shop Now
          </button>
        </div>

        <div className="hero-image">
          <img
            src={currentProduct.heroImage}
            alt={currentProduct.title}
          />
        </div>

      </div>

      <div className="hero-dots">
        {heroProducts.map((product, index) => (
          <button
            key={product.id}
            className={activeSlide === index ? 'active' : ''}
            onClick={() => setActiveSlide(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

export default HeroBanner;
