import { create } from "zustand";

export const useStore = create((set) => ({
    cart: [],
    addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
    removeItem: (itemId) =>
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== itemId)
        })),
    clearCart: () => set({ cart: [] })
}));
