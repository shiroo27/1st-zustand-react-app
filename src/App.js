import React, { useState } from 'react';
import './App.css';
import { useStore } from './store/store';
import { AddItemForm } from './store/AddItemForm';
import { ShoppingItems } from './store/ShoppingItems';
import { Cart } from './store/Cart';

const App = () => {
  const { cart, addToCart, removeItem, clearCart } = useStore();
  const [quantities, setQuantities] = useState({});
  const [items, setItems] = useState([
    { id: 1, name: 'Cheetos', price: 156 },
    { id: 2, name: 'Piattos', price: 150 },
    { id: 3, name: 'Doritos', price: 157 },
    { id: 4, name: 'Potato Chips', price: 192 },
  ]);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleAddItem = (item) => {
    setItems(prevItems => [...prevItems, item]);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities(prevState => ({
      ...prevState,
      [itemId]: newQuantity >= 0 ? newQuantity : ''
    }));
  };

  const handleFocus = (itemId) => {
    if (quantities[itemId] === 0 || quantities[itemId] === '') {
      setQuantities(prevState => ({
        ...prevState,
        [itemId]: ''
      }));
    }
  };

  const handleRemoveItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handlePriceChange = (itemId, newPrice) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, price: newPrice } : item
      )
    );
  };

  const totalPrice = cart.reduce((acc, currentItem) => {
    const item = items.find(item => item.id === currentItem.id);
    return acc + (item ? item.price * currentItem.quantity : 0);
  }, 0);

  return (
    <>
      <AddItemForm onAddItem={handleAddItem} />
      <ShoppingItems
        items={items}
        quantities={quantities}
        handleAddToCart={handleAddToCart}
        handleQuantityChange={handleQuantityChange}
        handleFocus={handleFocus}
        handleRemoveItem={handleRemoveItem}
        handlePriceChange={handlePriceChange} // pass the handlePriceChange function
      />
      <Cart
        cart={cart}
        removeItem={removeItem}
        totalPrice={totalPrice}
        clearCart={clearCart}
      />
    </>
  );
};

export default App;