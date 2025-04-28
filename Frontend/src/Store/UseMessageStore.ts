import { create } from "zustand";
import { API } from "../Utils/API/API";
import { User } from "./UseUserStore";

export const useChatStore = create<ChatState>((set) => ({
  currectChat: null,

  action_getChat: async (chatUser: User) => {
    const res = await API.get<Message[]>(`chat/${chatUser.id}`);
    if (res.status === 200) {
      set({
        currectChat: { messages: res.data, chatUser },
      });
    }
  },
}));

export interface ChatState {
  currectChat: Chat | null;
  action_getChat: (chatUser: User) => Promise<void>;
}

export interface Chat {
  messages: Message[];
  chatUser: User;
}

export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  image?: string;
}
