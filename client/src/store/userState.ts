import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type User = {
  name: string;
};

const initialState = {
  user: {} as User,
  isLoggedIn: false,
};

type UserState = {
  user: User;
  isLoggedIn: boolean;
};

type Actions = {
  setUser: (user: User) => void;
  clearUser: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const useAuthStore = create<UserState & Actions>()(
  persist(
    devtools(
      immer((set) => ({
        ...initialState,
        setUser: (user: User) =>
          set((state) => {
            state.user = user;
            state.isLoggedIn = true;
          }),
        clearUser: () =>
          set((state) => {
            state.user = {} as User;
            state.isLoggedIn = false;
          }),
        setIsLoggedIn: (isLoggedIn: boolean) =>
          set((state) => {
            state.isLoggedIn = isLoggedIn;
          }),
      }))
    ),
    {
      name: "user-state",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
