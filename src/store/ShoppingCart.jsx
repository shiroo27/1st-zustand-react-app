import React from 'react';
import { CartItem } from './CartItem';

export const ShoppingCart = ({ cart, removeItem, totalPrice, clearCart }) => {
  return (
    <div className='shoppingCart'>
      <h2 className='shoppingCartList'>Shopping Cart List</h2>
      {cart.length === 0 ? (
        <p className='emptyList'>Your cart is empty. Please add something.</p>
      ) : (
        <div>
          {cart.map(item => (
            <CartItem key={item.id} item={item} removeItem={removeItem} />
          ))}
          <p className='totalPrice'>Total: $ {totalPrice}</p>
          <br/>
          <button className='clearCartButton' onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
 };