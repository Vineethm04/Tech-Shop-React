import { useMemo, useState, useEffect } from 'react';
import productsData from '../data/productsData';
import { useCart } from '../Context/CartContext';
import './AllProducts.css';

function AllProducts({ onProductClick }) {
  const [sortOption, setSortOption] = useState('Latest');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(19990);
  const [addedProducts, setAddedProducts] = useState([]);

  const { addToCart } = useCart();

  const brands = ['JBL', 'boAt', 'Sony'];

  const categories = [
    'Headphones',
    'Earbuds',
    'Earphones',
    'Neckbands',
  ];

  useEffect(() => {
    if (addedProducts.length === 0) return;

    const timers = addedProducts.map((productId) =>
      setTimeout(() => {
        setAddedProducts((previous) =>
          previous.filter((id) => id !== productId)
        );
      }, 3000)
    );

    return () => timers.forEach(clearTimeout);
  }, [addedProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);

    setAddedProducts((previous) =>
      previous.includes(product.id)
        ? previous
        : [...previous, product.id]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((previous) =>
      previous.includes(brand)
        ? previous.filter((item) => item !== brand)
        : [...previous, brand]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((previous) =>
      previous.includes(category)
        ? previous.filter((item) => item !== category)
        : [...previous, category]
    );
  };

  const filteredProducts = useMemo(() => {
    let products = [...productsData];

    if (selectedBrands.length > 0) {
      products = products.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedCategories.length > 0) {
      products = products.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    products = products.filter(
      (product) => product.finalPrice <= maxPrice
    );

    switch (sortOption) {
      case 'Featured':
        products.sort(
          (a, b) =>
            Number(b.tag === 'featured-product') -
            Number(a.tag === 'featured-product')
        );
        break;

      case 'Top Rated':
        products.sort(
          (a, b) =>
            b.rateCount - a.rateCount ||
            b.ratings - a.ratings
        );
        break;

      case 'Price (Lowest First)':
        products.sort(
          (a, b) => a.finalPrice - b.finalPrice
        );
        break;

      case 'Price (Highest First)':
        products.sort(
          (a, b) => b.finalPrice - a.finalPrice
        );
        break;

      default:
        break;
    }

    return products;
  }, [
    sortOption,
    selectedBrands,
    selectedCategories,
    maxPrice,
  ]);

  return (
    <section className="all-products-section">
      <aside className="products-sidebar">
        <div className="sidebar-section">
          <h3>Sort By</h3>

          <div className="sort-options">
            {[
              'Latest',
              'Featured',
              'Top Rated',
              'Price (Lowest First)',
              'Price (Highest First)',
            ].map((option) => (
              <button
                key={option}
                className={
                  sortOption === option ? 'sort-active' : ''
                }
                onClick={() => setSortOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Filter By</h3>

          <div className="filter-group">
            <h4>Brands</h4>

            {brands.map((brand) => (
              <label
                className="filter-option"
                key={brand}
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <span>{brand === 'boAt' ? 'BoAt' : brand}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Category</h4>

            {categories.map((category) => (
              <label
                className="filter-option"
                key={category}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          <div className="filter-group price-filter">
            <h4>Price</h4>

            <div className="price-value">
              ₹{maxPrice.toLocaleString('en-IN')}
            </div>

            <input
              type="range"
              min="449"
              max="19990"
              step="100"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(Number(event.target.value))
              }
              aria-label="Maximum product price"
            />
          </div>
        </div>
      </aside>

      <div className="all-products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const isAdded = addedProducts.includes(product.id);

            return (
              <article
                className="all-product-card"
                key={product.id}
              >
                <div
                  className="all-product-image"
                  role="button"
                  tabIndex={0}
                  onClick={() => onProductClick(product)}
                  onKeyDown={(event) => {
                    if (
                      event.key === 'Enter' ||
                      event.key === ' '
                    ) {
                      event.preventDefault();
                      onProductClick(product);
                    }
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>

                <div className="all-product-details">
                  <div
                    className="all-product-rating"
                    aria-label={`${product.rateCount} out of 5 stars`}
                  >
                    {'★'.repeat(product.rateCount)}
                  </div>

                  <h3
                    role="button"
                    tabIndex={0}
                    onClick={() => onProductClick(product)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        onProductClick(product);
                      }
                    }}
                  >
                    {product.title}
                  </h3>

                  <p>{product.info}</p>

                  <div className="all-product-price">
                    <span>
                      ₹{product.finalPrice.toLocaleString('en-IN')}
                    </span>

                    <del>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </del>
                  </div>

                  <button
                    className={`all-product-add-button ${
                      isAdded ? 'product-added' : ''
                    }`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {isAdded ? 'Added' : 'Add to cart'}
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="no-products-found">
            <h3>No Products Found</h3>
            <p>Try changing your selected filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AllProducts;
