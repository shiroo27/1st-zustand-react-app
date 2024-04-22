import { create } from "zustand";

export const useStore = create((set, get) => ({
    //
    cart: [],
    //
    items: [
    { id: 1, name: 'Cheetos', price: 156 },
    { id: 2, name: 'Piattos', price: 150 },
    { id: 3, name: 'Doritos', price: 157 },
    { id: 4, name: 'Potato Chips', price: 192 },
    ],
    //
    quantities: {},
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
    //
    handleAddToCart: (item) => {
        set((state) => ({ cart: [...state.cart, item] }));
    },
    //
    handleAddItem: (item) => {
        set((state) => ({ items: [...state.items, item] }));
    },
    //
    removeItem: (itemId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== itemId)
    })),
    //
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
    
}));