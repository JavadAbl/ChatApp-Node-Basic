import { ChatCardDto } from "#interfaces/dtoes/chatCard.dto.js";
import { MessageDto } from "#interfaces/dtoes/message.dto.js";
import { SendMessageDto } from "#interfaces/dtoes/sendMessage.dto.js";

export interface IMessageService {
  getChatUsers(userId: number): Promise<ChatCardDto[]>;

  getMessagesByUser(userId: number, targetUserId: number): Promise<MessageDto[]>;

  sendMessage(senderId: number, sendMessageDto: SendMessageDto): Promise<MessageDto>;
}
