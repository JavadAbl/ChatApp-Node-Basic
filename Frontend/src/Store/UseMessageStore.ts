import { create } from "zustand";
import { API } from "../Utils/API/API";
import { User } from "./UseUserStore";

export interface ChatState {
  currentChat: Chat | null;
  action_getChat: (chatUser: User) => Promise<void>;
  action_getChatList: () => Promise<ChatCard[]>;
  action_sendMessage: (sendMessageDto: SendMessageDto) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  currentChat: null,

  action_getChat: async (chatUser: User) => {
    const res = await API.get<any>(`message/GetMessages/${chatUser.id}`);
    if (res.status === 200) {
      set({
        currentChat: {
          messages: res.data.payload,
          chatUser,
          addMessage(message) {
            set((state) => {
              if (!state.currentChat) return {};

              return {
                currentChat: {
                  ...state.currentChat, // Spread to create a new object
                  messages: [...state.currentChat.messages, message], // Create a new array
                },
              };
            });
          },
        },
      });
    }
  },

  action_getChatList: async () => {
    const res = await API.get<any>(`message/GetChatList`);
    return res.data.payload;
  },

  action_sendMessage: async (sendMessageDto: SendMessageDto) => {
    const res = await API.post<any>(`message/SendMessage`, sendMessageDto);
    if (res.status === 201) get().currentChat?.addMessage(res.data.payload);
  },
}));

export interface Chat {
  messages: Message[];
  chatUser: User;
  addMessage: (message: Message) => void;
}

export interface SendMessageDto {
  targetId: number;
  content: string;
}

export interface ChatCard {
  lastMessage: string;
  lastMessageDate: Date;
  user: User;
}

export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
}
