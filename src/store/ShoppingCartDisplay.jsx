import React, { useState } from 'react';

export const ShoppingCartDisplay = ({
  items, // add items prop...
  quantities, // add quantities prop...
  handleAddToCart, // add handleAddToCart prop...
  handleQuantityChange, // add handleQuantityChange prop...
  handleFocus, // add handleFocus prop...
  handleRemoveItem, // add handleRemoveItem prop...
  handlePriceChange // add handlePriceChange prop from the App.js...
}) => {
  //
  const [editItemId, setEditItemId] = useState(null);
  const [editedPrice, setEditedPrice] = useState(0);

  const startEditingPrice = (itemId, price) => {
    setEditItemId(itemId);
    setEditedPrice(price);
  };

  const cancelEditingPrice = () => {
    setEditItemId(null);
    setEditedPrice(0);
  };

  const saveEditedPrice = (itemId) => {
    handlePriceChange(itemId, editedPrice);
    setEditItemId(null);
    setEditedPrice(0);
  };

  return (
    <div className='shoppingCartContainer'>
      <h1 className='shoppingCartTitle'>Shopping Cart</h1>
      <div className='shoppingItemListContainer'>
        <div className='shoppingItemContainer'>
          {items.map(item => (
            <div key={item.id} className='shoppingItem'>
              <p className='nameClass'>{item.name}</p>
              <div className='priceContainer'>
                {editItemId === item.id ? (
                  <>
                    <input
                      type='number'
                      className='editPriceInput'
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(parseInt(e.target.value))}
                    />
                    <button 
                      className="saveButton"
                      onClick={() => saveEditedPrice(item.id)}
                    >
                      Save
                    </button>
                    <button 
                      className="cancelButton"
                      onClick={cancelEditingPrice}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p className='priceClass'>₱ {item.price}</p>
                    <button
                      className="editPriceButton"
                      onClick={() => startEditingPrice(item.id, item.price)}
                    >
                      Edit Price
                    </button>
                  </>
                )}
              </div>
              <div className='quantityContainer'>
                <input
                  className='quantity'
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
