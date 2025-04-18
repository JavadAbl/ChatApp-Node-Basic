import { MessageDto } from "#interfaces/dtoes/message.dto.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";

export interface IMessageService {
  getChatUsers(userId: number): Promise<UserDto[]>;

  getMessagesByUser(userId: number, targetUserId: number): Promise<MessageDto[]>;
}
