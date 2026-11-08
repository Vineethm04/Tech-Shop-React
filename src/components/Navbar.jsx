import { Search, ShoppingCart, UserRound } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import './Navbar.css';

function Navbar({ onCartClick, onAccountClick }) {
  const { cartCount } = useCart();

  return (
    <header className="navbar">
      <h2 className="logo">Tech-Shop</h2>

      <div className="nav-icons">
        <button aria-label="Search">
          <Search size={23} />
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
    </header>
  );
}

export default Navbar;
