
import { Search, ShoppingCart, UserRound } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <h2 className="logo">Tech-Shop</h2>

      <div className="nav-icons">
        <button aria-label="Search">
          <Search size={23} />
        </button>

        <button className="cart-icon" aria-label="Shopping cart">
          <ShoppingCart size={23} />
          <span className="cart-count">0</span>
        </button>

        <button aria-label="Account">
          <UserRound size={23} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
