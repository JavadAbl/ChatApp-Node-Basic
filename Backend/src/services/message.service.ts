import { Message } from "#entities/message.entity.js";
import { User } from "#entities/user.entity.js";
import { toDto } from "#helpers/transformers.js";
import { ChatCardDto } from "#interfaces/dtoes/chatCard.dto.js";
import { MessageDto } from "#interfaces/dtoes/message.dto.js";
import { SendMessageDto } from "#interfaces/dtoes/sendMessage.dto.js";
import { IMessageService } from "#interfaces/services/IMessage.service.js";
import { TYPES } from "#interfaces/Types.js";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";

@injectable()
export class MessageService implements IMessageService {
  constructor(
    @inject(TYPES.MessageRepository) private messageRepFactory: () => Repository<Message>,
    @inject(TYPES.UserRepository) private userRepFactory: () => Repository<User>,
  ) {}

  get messageRep(): Repository<Message> {
    return this.messageRepFactory();
  }

  get userRep(): Repository<User> {
    return this.userRepFactory();
  }

  async getChatUsers(userId: number): Promise<ChatCardDto[]> {
    const query = await this.userRep.query(
      `SELECT 
      u.*, m.CreatedAt AS lastMessage_createdAt, 
    COALESCE(m.content, '') AS lastMessage_content
FROM User u
LEFT JOIN (
    SELECT 
        CASE 
            WHEN SenderId = ? THEN RecipientId 
            ELSE SenderId 
        END AS otherUserId,
        MAX(id) AS lastMessageId
    FROM Message
    WHERE SenderId = ? OR RecipientId = ?
    GROUP BY otherUserId
) AS lastMessages ON u.id = lastMessages.otherUserId
LEFT JOIN Message m ON m.id = lastMessages.lastMessageId
WHERE u.id != ?;`,
      [userId, userId, userId, userId],
    );

    return query.map((raw: any) => {
      const chatCard = new ChatCardDto();

      chatCard.lastMessage = raw.lastMessage_content ?? "";
      chatCard.lastMessageDate = raw.lastMessage_createdAt ?? new Date(0);
      chatCard.user = {
        id: raw.Id,
        username: raw.Username,
        name: raw.Name,
        email: raw.Email,
        createdAt: raw.CreatedAt,
        updatedAt: raw.UpdatedAt,
      };
      return chatCard;
    });
  }

  async getMessagesByUser(userId: number, targetUserId: number): Promise<MessageDto[]> {
    const messages = await this.messageRep.find({
      where: [
        { senderId: userId, recipientId: targetUserId },
        { senderId: targetUserId, recipientId: userId },
      ],
      order: { createdAt: "ASC" },
    });

    return messages.map((message) => plainToInstance(MessageDto, message));
  }

  async sendMessage(senderId: number, sendMessageDto: SendMessageDto): Promise<MessageDto> {
    const message = new Message();
    message.senderId = senderId;
    message.recipientId = sendMessageDto.targetId;
    message.content = sendMessageDto.content;
    const newMessage = await this.messageRep.save(message);

    return toDto(MessageDto, newMessage);
  }
}
