import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  qty: number;
  price: number;
  image: string;
}

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type CartState = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
};

type Actions = {
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  saveShippingAddress: (address: ShippingAddress) => void;
  savePaymentMethod: (method: string) => void;
  clearCartItems: () => void;
  resetCart: () => void;
};

const initialState = {
  cartItems: [] as CartItem[],
  shippingAddress: {} as ShippingAddress,
  paymentMethod: 'PayPal',
  totalPrice: 0 as number
};

const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

const useCartStore = create<CartState & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        addToCart: (newItem) =>
          set((state) => {
            const existingItem = state.cartItems.find((item) => item._id === newItem._id);
            const updatedCartItems = existingItem
              ? state.cartItems.map((item) => (item._id === existingItem._id ? newItem : item))
              : [...state.cartItems, newItem];

            return {
              ...state,
              cartItems: updatedCartItems,
              totalPrice: addDecimals(updatedCartItems.reduce((total, item) => total + item.price * item.qty, 0))
            };
          }),
        removeFromCart: (id) =>
          set((state) => {
            const updatedCartItems = state.cartItems.filter((x) => x._id !== id);
            return { ...state, cartItems: updatedCartItems };
          }),
        saveShippingAddress: (address) =>
          set((state) => ({ ...state, shippingAddress: address })),
        savePaymentMethod: (method) =>
          set((state) => ({ ...state, paymentMethod: method })),
        clearCartItems: () =>
          set((state) => ({ ...state, cartItems: [] })),
        resetCart: () => set(() => initialState),
      }),
      {
        name: 'cart',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useCartStore;
