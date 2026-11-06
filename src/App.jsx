import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FeaturedProducts from './components/FeaturedProducts';
import TopProducts from './components/TopProducts';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import './App.css';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCartClick = () => {
    setShowCart((previous) => !previous);
    setSelectedProduct(null);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowCart(false);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Navbar onCartClick={handleCartClick} />

      {showCart ? (
        <Cart onContinueShopping={() => setShowCart(false)} />
      ) : selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={handleBackToProducts}
        />
      ) : (
        <>
          <HeroBanner />
          <FeaturedProducts />
          <TopProducts onProductClick={handleProductClick} />
        </>
      )}
    </>
  );
}

export default App;
