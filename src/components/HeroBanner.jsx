
import { useEffect, useState } from 'react';
import productsData from '../data/productsData';
import './HeroBanner.css';

const heroProducts = productsData.filter(
  (product) => product.tag === 'hero-product'
);

function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentProduct = heroProducts[activeSlide];

  useEffect(() => {
    if (isPaused || heroProducts.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveSlide(
        (previous) => (previous + 1) % heroProducts.length
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused]);

  if (!currentProduct) {
    return null;
  }

  return (
    <section
      className="hero-banner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <span
        className="hero-watermark"
        key={`watermark-${currentProduct.id}`}
      >
        {currentProduct.type}
      </span>

      <div className="hero-content" key={currentProduct.id}>
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
            aria-label={`Show ${product.title}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;
