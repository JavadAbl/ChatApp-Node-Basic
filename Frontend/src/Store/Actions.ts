import { API } from "../Utils/API/API";
import { Message } from "./UseMessageStore";

export function getChatByUserId(userId: number) {
  return API.get<Message[]>(`chat/${userId}`);
}
