import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  isLoggedIn: false,
  login: (token) => set({ token, isLoggedIn: true }),
  logout: () => set({ token: null, isLoggedIn: false }),
}));
