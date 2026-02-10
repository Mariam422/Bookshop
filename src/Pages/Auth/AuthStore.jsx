
import { create } from "zustand";

export const AuthStore = create((set) => ({
  user: null,
  token: null, 
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearUser: () => set({ user: null, token: null }),
}));
