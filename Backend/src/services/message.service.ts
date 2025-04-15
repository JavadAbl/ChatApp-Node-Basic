import { Message } from "#entities/message.entity.js";
import { User } from "#entities/user.entity.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";
import { IMessageService } from "#interfaces/services/IMessage.service.js";
import { TYPES } from "#interfaces/Types.js";
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

  async getChatUsers(userId: number) /* Promise<UserDto[]> */ {
    const users = await this.userRep.find({ where: { id: Not(userId) }, select: { password: false } });

    return users;
  }
}
