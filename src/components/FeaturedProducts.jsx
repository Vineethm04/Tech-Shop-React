import { useEffect, useState } from 'react';
import productsData from '../data/productsData';
import './FeaturedProducts.css';

function FeaturedProducts() {
  const featuredOrder = [9, 13, 14, 2, 8];

  const featuredProducts = featuredOrder
    .map((id) => productsData.find((product) => product.id === id))
    .filter(Boolean);

  // Clone two products at both ends for continuous sliding.
  const carouselProducts = [
    ...featuredProducts.slice(-2),
    ...featuredProducts,
    ...featuredProducts.slice(0, 2),
  ];

  // Start with boAt Airdopes 203 in the centre.
  const [activeIndex, setActiveIndex] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const cardWidth =
    screenWidth <= 480 ? 32 :
    screenWidth <= 768 ? 21 : 19;

  const moveNext = () => {
    setTransitionEnabled(true);
    setActiveIndex((previous) => previous + 1);
  };

  const movePrevious = () => {
    setTransitionEnabled(true);
    setActiveIndex((previous) => previous - 1);
  };

  // Seamlessly reposition after reaching a cloned product.
  const handleTransitionEnd = () => {
    if (activeIndex === 7 || activeIndex === 1) {
      setTransitionEnabled(false);
      setActiveIndex(activeIndex === 7 ? 2 : 6);
    }
  };

  // Re-enable animation after the invisible reposition.
  useEffect(() => {
    if (!transitionEnabled) {
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [transitionEnabled]);

  // Automatic carousel movement.
  useEffect(() => {
    if (isPaused || featuredProducts.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      moveNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, featuredProducts.length]);

  if (featuredProducts.length === 0) {
    return null;
  }

  const activeDot =
    (activeIndex - 2 + featuredProducts.length) %
    featuredProducts.length;

  const translateDistance = (activeIndex + 0.5) * cardWidth;

  return (
    <section className="featured-section">
      <h2 className="featured-heading">Featured Products</h2>

      <div
        className="featured-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className={`featured-track ${
            transitionEnabled ? 'featured-track-animated' : ''
          }`}
          style={{
            transform: `translateX(calc(50vw - ${translateDistance}vw))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {carouselProducts.map((product, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={`${product.id}-${index}`}
                className={`featured-item ${
                  isActive ? 'featured-item-active' : ''
                }`}
                style={{
                  '--scale': isActive ? 1.08 : 0.92,
                }}
                onClick={() => {
                  if (index >= 2 && index <= 6) {
                    setTransitionEnabled(true);
                    setActiveIndex(index);
                  }
                }}
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
      </div>

      <div className="featured-dots">
        {featuredProducts.map((product, index) => (
          <button
            key={product.id}
            className={activeDot === index ? 'active' : ''}
            onClick={() => {
              setTransitionEnabled(true);
              setActiveIndex(index + 2);
            }}
            aria-label={`Show ${product.title}`}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
