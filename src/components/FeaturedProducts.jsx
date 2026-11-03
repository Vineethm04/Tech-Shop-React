import productsData from '../data/productsData';
import './FeaturedProducts.css';

function FeaturedProducts() {
  const featuredOrder = [9, 13, 14, 2, 8];

  const featuredProducts = featuredOrder
    .map((id) => productsData.find((product) => product.id === id))
    .filter(Boolean);

  return (
    <section className="featured-section">
      <h2 className="featured-heading">Featured Products</h2>

      <div className="featured-products">
        {featuredProducts.map((product, index) => (
          <div
            className={`featured-item ${
              index === 2 ? 'featured-item-center' : ''
            }`}
            key={product.id}
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
          </div>
        ))}
      </div>

      <div className="featured-dots" aria-label="Featured products position">
        {featuredProducts.map((product, index) => (
          <span
            key={product.id}
            className={index === 4 ? 'active' : ''}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
