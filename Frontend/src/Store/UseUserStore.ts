import { create } from "zustand";
import { API } from "../Utils/API/API";
import { io, Socket } from "socket.io-client";

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  onlineUsers: [],
  socket: null,

  setUser: (user: User | null) => set((state) => ({ ...state, user })),

  action_login: async (username: string, password: string) => {
    const res = await API.post("user/Login", { username, password });

    if (res.status === 200) {
      get().setUser(res.data.payload);
      get().connectSocket();
      return true;
    }

    return false;
  },

  action_checkAuth: async () => {
    const res = await API.get("user/CheckAuth");

    if (res.status === 200) {
      get().setUser(res.data);
      get().connectSocket();
      return true;
    } else {
      get().setUser(null);
      return false;
    }
  },

  action_signOut: () => set((state) => ({ ...state, user: null })),

  connectSocket: () => {
    if (get().socket && get().socket?.connected) return;

    const socket = io("http://localhost:7000", {
      query: { userId: get().user?.id },
    });

    socket.on("onlineUsers", (data) => {
      set({ onlineUsers: data });
    });

    set({ socket });
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

  onlineUsers: number[];
  socket: Socket | null;
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
