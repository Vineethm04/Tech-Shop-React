
import { useEffect, useState } from 'react';
import productsData from '../data/productsData';
import './FeaturedProducts.css';

function FeaturedProducts() {
  const featuredOrder = [9, 13, 14, 2, 8];

  const featuredProducts = featuredOrder
    .map((id) => productsData.find((product) => product.id === id))
    .filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const showNext = () => {
    setActiveIndex(
      (previous) => (previous + 1) % featuredProducts.length
    );
  };

  const showPrevious = () => {
    setActiveIndex(
      (previous) =>
        (previous - 1 + featuredProducts.length) %
        featuredProducts.length
    );
  };

  useEffect(() => {
    if (isPaused || featuredProducts.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex(
        (previous) => (previous + 1) % featuredProducts.length
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, featuredProducts.length]);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="featured-section">
      <h2 className="featured-heading">Featured Products</h2>

      <div
        className="featured-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          className="carousel-arrow carousel-previous"
          onClick={showPrevious}
          aria-label="Previous product"
        >
          &#10094;
        </button>

        <div className="featured-track">
          {featuredProducts.map((product, index) => {
            let offset = index - activeIndex;

            if (offset > featuredProducts.length / 2) {
              offset -= featuredProducts.length;
            }

            if (offset < -featuredProducts.length / 2) {
              offset += featuredProducts.length;
            }

            return (
              <article
                key={product.id}
                className={`featured-item ${
                  offset === 0 ? 'featured-item-active' : ''
                }`}
                style={{
                  '--offset': offset,
                  '--scale': offset === 0 ? 1.08 : 0.92,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <h3>{product.title}</h3>

                <div className="featured-image">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                  />
                </div>

                <div className="featured-price">
                  <span>
                    ₹{product.finalPrice.toLocaleString('en-IN')}
                  </span>

                  <del>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </del>
                </div>
              </article>
            );
          })}
        </div>

        <button
          className="carousel-arrow carousel-next"
          onClick={showNext}
          aria-label="Next product"
        >
          &#10095;
        </button>
      </div>

      <div className="featured-dots">
        {featuredProducts.map((product, index) => (
          <button
            key={product.id}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${product.title}`}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
