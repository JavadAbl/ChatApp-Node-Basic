import { create } from "zustand";
import { API } from "../Utils/API/API";

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user: User | null) => set((state) => ({ ...state, user })),
  login: async (username: string, password: string) => {
    const res = await API.post("user/login", { username, password });

    if (res.status === 200) {
      set((state) => ({ ...state, user: res.data.payload }));
    } else {
      console.error("Failed to login");
    }
  },
  signOut: () => set((state) => ({ ...state, user: null })),
}));

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface User {
  id: number;

  username: string;

  name: string;

  email: string;

  image?: string;

  createdAt: Date;

  updatedAt: Date;
}
