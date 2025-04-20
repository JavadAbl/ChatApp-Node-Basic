import { create } from "zustand";
import { API } from "../Utils/API/API";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  setUser: (user: User | null) => set((state) => ({ ...state, user })),

  login: async (username: string, password: string) => {
    const res = await API.post("user/Login", { username, password });

    if (res.status === 200) {
      get().setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
    } else {
      console.error("Failed to login");
    }
  },

  checkAuth: async () => {
    try {
      const res = await API.get("user/CheckAuth");

      if (res.status === 200) {
        get().setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        return true;
      } else {
        get().setUser(null);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  signOut: () => set((state) => ({ ...state, user: null })),
}));

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<boolean>;
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
