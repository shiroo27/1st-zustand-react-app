// import React, { useState } from 'react';

// export const AddItemForm = ({ onAddItem }) => {
//   const [itemName, setItemName] = useState('');
//   const [itemPrice, setItemPrice] = useState('');

//   const handleNameChange = (e) => {
//     setItemName(e.target.value);
//   };

//   const handlePriceChange = (e) => {
//     setItemPrice(e.target.value);
//   };

//   const addItem = () => {
//     if (itemName && itemPrice) {
//       const newItem = {
//         id: Math.random().toString(36).substring(2, 9),
//         name: itemName,
//         price: parseFloat(itemPrice),
//       };
//       onAddItem(newItem);
//       setItemName('');
//       setItemPrice('');
//     }
//   };

//   return (
//     <div className='addItemsDiv'>
//       <h1 className='addItemsTitle'>Add Items Here</h1>
//       <span>
//         <input className='inputClass' type='text' placeholder='Item name...' value={itemName} onChange={handleNameChange}/>
//         <input className='inputClass' type='number' placeholder='Price...' value={itemPrice} onChange={handlePriceChange}/>
//         <button className='addItemsButton' onClick={addItem}>Add Item</button>
//       </span>
//       <br/>
//     </div>
    
//   );
// };

import React, { useState } from 'react';

export const AddItemForm = ({ items, onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setItemPrice(e.target.value);
  };

  const addItem = () => {
    if (itemName && itemPrice) {
      const existingItem = items?.find(item => item.name === itemName);
      const newItem = {
        id: existingItem ? existingItem.id : Math.random().toString(36).substring(2, 9),
        name: itemName,
        price: parseFloat(itemPrice),
      };
      onAddItem(newItem);
      setItemName('');
      setItemPrice('');
    }
  };

  return (
    <div className='addItemsDiv'>
      <h1 className='addItemsTitle'>Add Items Here</h1>
      <span>
        <input className='inputClass' type='text' placeholder='Item name...' value={itemName} onChange={handleNameChange}/>
        <input className='inputClass' type='number' placeholder='Price...' value={itemPrice} onChange={handlePriceChange}/>
        <button className='addItemsButton' onClick={addItem}>Add Item</button>
      </span>
      <br/>
    </div>
  );
};