import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FeaturedProducts from './components/FeaturedProducts';
import TopProducts from './components/TopProducts';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setShowCart(!showCart)} />

      {showCart ? (
        <Cart onContinueShopping={() => setShowCart(false)} />
      ) : (
        <>
          <HeroBanner />
          <FeaturedProducts />
          <TopProducts />
        </>
      )}
    </>
  );
}

export default App;
