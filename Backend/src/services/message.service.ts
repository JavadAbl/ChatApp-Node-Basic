import { Message } from "#entities/message.entity.js";
import { User } from "#entities/user.entity.js";
import { MessageDto } from "#interfaces/dtoes/message.dto.js";
import { SendMessageDto } from "#interfaces/dtoes/sendMessage.dto.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";
import { IMessageService } from "#interfaces/services/IMessage.service.js";
import { TYPES } from "#interfaces/Types.js";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { Not, Repository } from "typeorm";

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

  async getChatUsers(userId: number): Promise<UserDto[]> {
    const users = await this.userRep.find({ where: { id: Not(userId) }, select: { password: false } });

    return users;
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

  async sendMessage(senderId: number, sendMessageDto: SendMessageDto): Promise<void> {
    const message = new Message();
    message.senderId = senderId;
    message.recipientId = sendMessageDto.targetId;
    message.content = sendMessageDto.content;
    await this.messageRep.save(message);
  }
}
