import { useState } from 'react';
import { Search, ShoppingCart, UserRound, X } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import productsData from '../data/productsData';
import './Navbar.css';

function Navbar({ onCartClick, onAccountClick, onProductClick }) {
  const { cartCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = searchTerm.trim()
    ? productsData
        .filter((product) =>
          product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
        .slice(0, 6)
    : [];

  const handleSearchToggle = () => {
    setSearchOpen((previous) => !previous);
    setSearchTerm('');
  };

  const handleProductSelect = (product) => {
    setSearchOpen(false);
    setSearchTerm('');
    onProductClick(product);
  };

  return (
    <header className="navbar">
      <h2 className="logo">Tech-Shop</h2>

      <div className="nav-icons">
        <button
          aria-label="Search"
          onClick={handleSearchToggle}
        >
          {searchOpen ? <X size={23} /> : <Search size={23} />}
        </button>

        <button
          className="cart-icon"
          aria-label="Shopping cart"
          onClick={onCartClick}
        >
          <ShoppingCart size={23} />
          <span className="cart-count">{cartCount}</span>
        </button>

        <button
          aria-label="Account"
          onClick={onAccountClick}
        >
          <UserRound size={23} />
        </button>
      </div>

      {searchOpen && (
        <>
          <div
            className="search-backdrop"
            onClick={() => setSearchOpen(false)}
          />

          <div
            className="search-container"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search for product..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                autoFocus
              />

              {searchTerm && (
                <button
                  className="clear-search-button"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {searchTerm.trim() && (
              <div className="search-suggestions">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <button
                      className="search-suggestion"
                      key={product.id}
                      onClick={() => handleProductSelect(product)}
                    >
                      {product.title}
                    </button>
                  ))
                ) : (
                  <p className="no-search-results">
                    No matching products found.
                  </p>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
