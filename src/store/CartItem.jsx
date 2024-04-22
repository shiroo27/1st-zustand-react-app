 import React from 'react';

export const CartItem = ({ item, removeItem }) => {
  return (
    <div className='cartItem'>
      <p className='nameP'>{item.name}</p>
      <p>₱ {item.price} </p>
      <p>Quantity: {item.quantity}</p>
      <button className='removeButton' onClick={() => removeItem(item.id)}>
        Remove
      </button>
    </div>
  );
};