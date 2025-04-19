import { MessageDto } from "#interfaces/dtoes/message.dto.js";
import { SendMessageDto } from "#interfaces/dtoes/sendMessage.dto.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";

export interface IMessageService {
  getChatUsers(userId: number): Promise<UserDto[]>;

  getMessagesByUser(userId: number, targetUserId: number): Promise<MessageDto[]>;

  sendMessage(senderId: number, sendMessageDto: SendMessageDto): Promise<void>;
}
