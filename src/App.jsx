import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FeaturedProducts from './components/FeaturedProducts';
import TopProducts from './components/TopProducts';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Account from './components/Account';
import OurAdvantages from './components/OurAdvantages';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCartClick = () => {
    setShowCart((previous) => !previous);
    setShowAccount(false);
    setSelectedProduct(null);
  };

  const handleAccountClick = () => {
    setShowAccount((previous) => !previous);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowCart(false);
    setShowAccount(false);
  };

  return (
    <>
      <Navbar
        onCartClick={handleCartClick}
        onAccountClick={handleAccountClick}
      />

      {showCart ? (
        <Cart onContinueShopping={() => setShowCart(false)} />
      ) : selectedProduct ? (
        <ProductDetails product={selectedProduct} />
      ) : (
        <>
          <HeroBanner />
          <FeaturedProducts />
          <TopProducts onProductClick={handleProductClick} />
        </>
      )}

      <OurAdvantages />
      <Footer />

      {showAccount && (
        <Account onClose={() => setShowAccount(false)} />
      )}
    </>
  );
}

export default App;
