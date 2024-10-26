import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type CartItem = {
  _id: string;
  name: string;
  qty: number;
  price: number;
  image: string;
  countInStock: string;
};

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type User = {
  name: string;
};
type CartState = {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalPrice: number;
  user: User;
};

type Actions = {
  addToCart: (item: CartItem) => void;
  addUser: (newUser: User) => void;
  removeFromCart: (id: string) => void;
  saveShippingAddress: (address: ShippingAddress) => void;
  savePaymentMethod: (method: string) => void;
  clearCartItems: () => void;
  clearUser: () => void;
  resetCart: () => void;
};

const initialState = {
  cartItems: [] as CartItem[],
  shippingAddress: {} as ShippingAddress,
  paymentMethod: "PayPal",
  totalPrice: 0 as number,
  user: {} as User,
};

const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

const useCartStore = create<CartState & Actions>()(
  persist(
    devtools(
      immer((set) => ({
        ...initialState,
        addUser: (newUser) =>
          set((state) => {
            state.user = newUser;
          }),
        addToCart: (newItem) =>
          set((state) => {
            const existingItem = state.cartItems.find(
              (item) => item._id === newItem._id
            );
            if (existingItem) {
              state.cartItems = state.cartItems.map((item) =>
                item._id === existingItem._id ? newItem : item
              );
            } else {
              state.cartItems.push(newItem);
            }
            const itemsPrice = addDecimals(
              state.cartItems.reduce(
                (total, item) => total + item.price * item.qty,
                0
              )
            );
            const shippingPrice = addDecimals(itemsPrice > 1000 ? 0 : 10);
            const tax = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
            state.totalPrice = Number(itemsPrice + shippingPrice + tax);
          }),
        removeFromCart: (id) =>
          set((state) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== id);
            const isCartEmpty = state.cartItems.length === 0;
            if (isCartEmpty) {
              state.totalPrice = 0;
            } else {
              const itemsPrice = addDecimals(
                state.cartItems.reduce(
                  (total, item) => total + item.price * item.qty,
                  0
                )
              );
              const shippingPrice = addDecimals(itemsPrice > 1000 ? 0 : 10);
              const tax = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
              state.totalPrice = Number(itemsPrice + shippingPrice + tax);
            }
          }),
        saveShippingAddress: (address) =>
          set((state) => {
            state.shippingAddress = address;
          }),
        savePaymentMethod: (method) =>
          set((state) => {
            state.paymentMethod = method;
          }),
        clearCartItems: () =>
          set((state) => {
            state.cartItems = [];
            state.totalPrice = 0;
          }),
        resetCart: () => set(() => initialState),
        clearUser: () => set((state) => ({ ...state, user: {} })),
      }))
    ),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              key === "cartItems" ||
              key === "totalPrice" ||
              key === "shippingAddress"
          )
        ),
    }
  )
);

export default useCartStore;
