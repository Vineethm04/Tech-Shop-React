import { useState } from 'react';
import productsData from '../data/productsData';
import { useCart } from '../Context/CartContext';
import './TopProducts.css';

function TopProducts() {
  const categories = [
    'All',
    'Headphones',
    'Earbuds',
    'Earphones',
    'Neckbands',
  ];

  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  // The reference displays the first 11 products.
  const topProducts = productsData.slice(0, 11);

  const filteredProducts =
    activeCategory === 'All'
      ? topProducts
      : topProducts.filter(
          (product) => product.category === activeCategory
        );

  return (
    <section className="top-products-section">
      <h2 className="top-products-heading">Top Products</h2>

      <div className="product-categories">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category ? 'category-active' : ''
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="top-products-grid">
        {filteredProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-card-image">
              <img
                src={product.images[0]}
                alt={product.title}
                loading="lazy"
              />
            </div>

            <div className="product-card-details">
              <div
                className="product-rating"
                aria-label={`${product.rateCount} out of 5 stars`}
              >
                {'★'.repeat(product.rateCount)}
              </div>

              <h3>{product.title}</h3>

              <p className="product-info">
                {product.info}
              </p>

              <div className="product-card-price">
                <span>
                  ₹{product.finalPrice.toLocaleString('en-IN')}
                </span>

                <del>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </del>
              </div>

              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}

        {activeCategory === 'All' && (
          <button className="browse-all-card">
            <span>Browse All</span>
            <span>Products →</span>
          </button>
        )}
      </div>
    </section>
  );
}

export default TopProducts;
