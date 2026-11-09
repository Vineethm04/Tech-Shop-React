import { useEffect, useRef, useState } from 'react';

export function useAddToCartFeedback(addToCart) {
  const [addedProductIds, setAddedProductIds] = useState([]);
  const timers = useRef(new Map());

  const handleAddToCart = (product) => {
    addToCart(product);

    // Restart the timer if the same product is clicked again.
    if (timers.current.has(product.id)) {
      clearTimeout(timers.current.get(product.id));
    }

    setAddedProductIds((previous) =>
      previous.includes(product.id)
        ? previous
        : [...previous, product.id]
    );

    const timer = setTimeout(() => {
      setAddedProductIds((previous) =>
        previous.filter((id) => id !== product.id)
      );

      timers.current.delete(product.id);
    }, 3000);

    timers.current.set(product.id, timer);
  };

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current.clear();
    };
  }, []);

  const isProductAdded = (productId) =>
    addedProductIds.includes(productId);

  return {
    handleAddToCart,
    isProductAdded,
  };
}
