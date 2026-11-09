import { useEffect, useRef, useState } from 'react';
import {
  Search,
  ShoppingCart,
  UserRound,
  X,
} from 'lucide-react';
import { useCart } from '../Context/CartContext';
import productsData from '../data/productsData';
import './Navbar.css';

function Navbar({
  onCartClick,
  onAccountClick,
  onProductClick,
  onHomeClick,
}) {
  const { cartCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const accountMenuRef = useRef(null);

  const filteredProducts = searchTerm.trim()
    ? productsData
        .filter((product) =>
          product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
        )
        .slice(0, 6)
    : [];

  // Close the account dropdown when clicking outside it.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setAccountMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSearchToggle = () => {
    setSearchOpen((previous) => !previous);
    setSearchTerm('');
    setAccountMenuOpen(false);
  };

  const handleHomeClick = () => {
    setSearchOpen(false);
    setSearchTerm('');
    setAccountMenuOpen(false);
    onHomeClick();
  };

  const handleCartClick = () => {
    setAccountMenuOpen(false);
    setSearchOpen(false);
    onCartClick();
  };

  const handleAccountToggle = () => {
    setAccountMenuOpen((previous) => !previous);
    setSearchOpen(false);
  };

  const handleLoginSignup = () => {
    setAccountMenuOpen(false);
    onAccountClick();
  };

  const handleProductSelect = (product) => {
    setSearchOpen(false);
    setSearchTerm('');
    onProductClick(product);
  };

  return (
    <header className="navbar">
      <h2
        className="logo"
        onClick={handleHomeClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleHomeClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Go to homepage"
      >
        Tech-Shop
      </h2>

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
          onClick={handleCartClick}
        >
          <ShoppingCart size={23} />
          <span className="cart-count">{cartCount}</span>
        </button>

        <div className="account-menu-wrapper" ref={accountMenuRef}>
          <button
            aria-label="Account"
            aria-expanded={accountMenuOpen}
            aria-haspopup="true"
            onClick={handleAccountToggle}
          >
            <UserRound size={23} />
          </button>

          {accountMenuOpen && (
            <div className="account-dropdown">
              <h3>Hello!</h3>

              <p className="account-dropdown-description">
                Access account and manage orders
              </p>

              <button
                className="account-login-button"
                onClick={handleLoginSignup}
              >
                Login / Signup
              </button>

              <div className="account-dropdown-divider" />

              <p className="account-dropdown-footer">
                Please Login
              </p>
            </div>
          )}
        </div>
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
