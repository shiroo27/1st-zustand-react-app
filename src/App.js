import './App.css';
import { useStore } from './store/store';
import { AddItemForm } from './store/AddItemForm';
import { ShoppingItems } from './store/ShoppingItems';
import { Cart } from './store/Cart';

const App = () => {
  const { cart,
    items,
    quantities,
    handleQuantityChange,
    handleFocus,
    handleRemoveItem,
    handlePriceChange,
    handleAddToCart,
    handleAddItem,
    removeItem,
    clearCart,
    totalCartPrice } = useStore();

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
        handlePriceChange={handlePriceChange}
      />
      <Cart
        cart={cart}
        removeItem={removeItem}
        totalCartPrice={totalCartPrice}
        clearCart={clearCart}
      />
    </>
  );
};

export default App;