import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(persist((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  login: ({ user, accessToken, refreshToken }) => set({ user, accessToken, refreshToken }),
  logout: () => set({ user: null, accessToken: null, refreshToken: null }),
  setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken })
}), {
  name: "auth-store"
}));


