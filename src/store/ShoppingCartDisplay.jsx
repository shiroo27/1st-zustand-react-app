import React from 'react';

export const ShoppingCartDisplay = ({
  items,
  quantities,
  handleAddToCart,
  handleQuantityChange,
  handleFocus,
  handleRemoveItem
}) => {
  return (
    <div className='shoppingCartContainer'>
        <h1 className='shoppingCartTitle'>Shopping Cart</h1>
        <div className='shoppingItemListContainer'>
      
        <div className='shoppingItemContainer'>
          {items.map(item => (
            <div key={item.id} className='shoppingItem'>
              <p className='nameClass'>{item.name}</p>
              <p className='priceClass'>$ {item.price}</p>
              <div className='quantityContainer'>
                <input className='quantity'
                type='number'
                min='0'
                value={quantities[item.id] || 0}
                onFocus={() => handleFocus(item.id)}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </div>
              <button className='addToCartButton' onClick={() => handleAddToCart({ ...item, quantity: quantities[item.id] || 0 })}>
                Add to Cart
              </button>
              <button className='removeItemButton' onClick={() => handleRemoveItem(item.id)}>
                Remove Item
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
