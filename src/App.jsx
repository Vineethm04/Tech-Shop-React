import { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FeaturedProducts from './components/FeaturedProducts';
import TopProducts from './components/TopProducts';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Account from './components/Account';
import OurAdvantages from './components/OurAdvantages';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [showCart, showAllProducts, selectedProduct]);

  const handleCartClick = () => {
    setShowCart((previous) => !previous);
    setShowAccount(false);
    setShowAllProducts(false);
    setSelectedProduct(null);
  };

  const handleAccountClick = () => {
    setShowAccount((previous) => !previous);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowCart(false);
    setShowAccount(false);
    setShowAllProducts(false);
  };

  const handleBrowseAll = () => {
    setShowAllProducts(true);
    setShowCart(false);
    setShowAccount(false);
    setSelectedProduct(null);
  };

  const handleBackToHome = () => {
    setShowAllProducts(false);
  };

  const handleHomeClick = () => {
    setShowCart(false);
    setShowAccount(false);
    setShowAllProducts(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar
        onCartClick={handleCartClick}
        onAccountClick={handleAccountClick}
        onProductClick={handleProductClick}
        onHomeClick={handleHomeClick}
      />

      {showCart ? (
        <Cart
          onContinueShopping={handleBrowseAll}
        />
      ) : selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onProductClick={handleProductClick}
        />
      ) : showAllProducts ? (
        <AllProducts
          onProductClick={handleProductClick}
          onBack={handleBackToHome}
        />
      ) : (
        <>
          <HeroBanner
            onProductClick={handleProductClick}
          />

          <FeaturedProducts
            onProductClick={handleProductClick}
          />

          <TopProducts
            onProductClick={handleProductClick}
            onBrowseAll={handleBrowseAll}
          />
        </>
      )}

      <OurAdvantages />

      <Footer />

      {showAccount && (
        <Account
          onClose={() => setShowAccount(false)}
        />
      )}
    </>
  );
}

export default App;
