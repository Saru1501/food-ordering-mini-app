import { create } from "zustand";
import { User } from "@/type";

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;

  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;

  fetchAuthenticatedUser: () => Promise<void>;
};

const useAuthStore = create<AuthState>((set) => ({
  // ✅ frontend demo: always logged in
  isAuthenticated: true,
  user: { name: "Guest User" } as User,
  isLoading: false,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchAuthenticatedUser: async () => {
    // no backend — just keep default user
    set({ isAuthenticated: true, user: { name: "Guest User" } as User, isLoading: false });
  },
}));

export default useAuthStore;
