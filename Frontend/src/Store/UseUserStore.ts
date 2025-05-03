import { create } from "zustand";
import { API } from "../Utils/API/API";

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  socket: null,

  setUser: (user: User | null) => set((state) => ({ ...state, user })),

  action_login: async (username: string, password: string) => {
    const res = await API.post("user/Login", { username, password });

    if (res.status === 200) {
      get().setUser(res.data.payload);
      return true;
    }

    return false;
  },

  action_checkAuth: async () => {
    const res = await API.get("user/CheckAuth");

    if (res.status === 200) {
      get().setUser(res.data);

      return true;
    } else {
      get().setUser(null);
      return false;
    }
  },

  action_signOut: () => set((state) => ({ ...state, user: null })),

  connectSocket: () => {
    const socket = new WebSocket("http://localhost:7000");
    socket.onopen = () => {
      console.log("Socket opened");
      get().socket = socket;
    };
    socket.onclose = () => {
      console.log("Socket closed");
      get().socket = null;
    };
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null });
    }
  },
}));

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  action_checkAuth: () => Promise<boolean>;
  action_login: (username: string, password: string) => Promise<boolean>;
  action_signOut: () => void;

  socket: WebSocket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export interface User {
  id: number;

  username: string;

  name: string;

  email: string;

  image?: string;

  createdAt: Date;

  updatedAt: Date;
}
