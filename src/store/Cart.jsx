import React from 'react';
import { useStore } from './store'; // Import the store
import { CartItem } from './CartItem';

export const Cart = () => {
  const { cart, removeItem, clearCart, totalCartPrice } = useStore(); // Retrieve cart-related data and actions from the store

  // to calculate the total price of all items in the cart...
  

  return (
    <div className='shoppingCart'>
      <h2 className='shoppingCartList'>Cart</h2>
      {cart.length === 0 ? (
        <p className='emptyList'>Your cart is empty. Please add something.</p>
      ) : (
        <div>
          {cart.map(item => (
            <CartItem key={item.id} item={item} removeItem={removeItem} />
          ))}
          <p className='totalPrice'>Total: ₱ {totalCartPrice()}</p>
          <br/>
          <button className='clearCartButton' onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
 };
