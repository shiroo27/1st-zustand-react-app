import { create } from "zustand";

export const useStore = create((set, get) => {
    // load items from localStorage on initial setup...
    const initialItems = JSON.parse(localStorage.getItem('items')) || [];

    // counter for generating unique IDs...
    let itemIdCounter = initialItems.length;

    return ({
    
    cart: [],
    //
    items: initialItems,
    //
    quantities: {},

    // function to generate unique item IDs...
    generateItemId: () =>
    {
        itemIdCounter += 1;
        return itemIdCounter;
    },
    // function to check if an item already exists in the items list...
    isItemInItems: (itemId) => {
        const { items } = get();
        return items.some(item => item.id === itemId);
    },
    // function to check if an item already exists in the cart...
    isItemInCart: (itemId) => {
        const { cart } = get();
        return cart.some(item => item.id === itemId);
    },
    //
    isItemNameExists: (itemName) => {
        const { items } = get();
        return items.some((item) => item.name === itemName);
     },
    // updated handleAddItem function to prevent adding duplicate items to items list...
    handleAddItem: (item) => {
        const { isItemInItems, isItemNameExists, generateItemId, setNotification } = get();
        const newItem = { ...item, id: generateItemId() };
        if (!isItemInItems(newItem.id) && !isItemNameExists(newItem.name)) {
          set((state) => ({ items: [...state.items, newItem] }));
          // Check if the item already exists in localStorage
          const storedItems = JSON.parse(localStorage.getItem('items')) || [];
          if (!storedItems.some((storedItem) => storedItem.id === newItem.id)) {
            localStorage.setItem('items', JSON.stringify([...storedItems, newItem])); // Update localStorage
          }
        } else {
          setNotification(`Item '${item.name}' already exists.`);
        }
      },
  
    // updated handleAddToCart function to prevent adding duplicate items to cart...
    handleAddToCart: (item) => {
        const { isItemInCart } = get();
        if (!isItemInCart(item.id)) {
          set((state) => ({ cart: [...state.cart, item] }));
        }
    },
    //
    handleQuantityChange: (itemId, newQuantity) => {
        set((state) => ({
          quantities: {
            ...state.quantities,
            [itemId]: newQuantity >= 0 ? newQuantity : ''
            }
        }));
    },
    //
    handleFocus: (itemId) => {
        set((state) => ({
          quantities: {
            ...state.quantities,
            [itemId]: state.quantities[itemId] === 0 || state.quantities[itemId] === '' ? '' : state.quantities[itemId]
          }
        }));
    },
    //
    handleRemoveItem: (itemId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== itemId)
        }));
    },
    //
    handlePriceChange: (itemId, newPrice) => {
        set((state) => ({
          items: state.items.map(item =>
            item.id === itemId ? { ...item, price: newPrice } : item
          )
        }));
    },
    // just removing the selected id...
    removeItem: (itemId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== itemId)
    })),
    // empty the cart...
    clearCart: () => set({ cart: [] }),
    // to calculate the total price of all items in the cart...
    totalCartPrice: () => {
        const { cart } = get();
        let total = 0;
        cart.forEach((item) => {
          total += item.price * item.quantity;
        });
        return total;
    },

    notification: '',
    setNotification: (message) => set({ notification: message }),
    
})});