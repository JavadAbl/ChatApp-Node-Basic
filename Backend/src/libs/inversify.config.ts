import MessageController from "#controllers/message.controllers.js";
import UserController from "#controllers/user.controllers.js";
import appDbContext from "#data/appDbContext.js";
import { Message } from "#entities/message.entity.js";
import { User } from "#entities/user.entity.js";
import { IMessageService } from "#interfaces/services/IMessage.service.js";
import { IUserService } from "#interfaces/services/IUser.service.js";
import { TYPES } from "#interfaces/Types.js";
import { MessageService } from "#services/message.service.js";
import { UserService } from "#services/user.service.js";
import { Container } from "inversify";
import { Repository } from "typeorm";

const container = new Container();

// Bind controller
container.bind<UserController>(UserController).toSelf().inSingletonScope();
container.bind<MessageController>(MessageController).toSelf().inSingletonScope();

// Bind interface to implementation
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
container.bind<IMessageService>(TYPES.IMessageService).to(MessageService).inSingletonScope();

// Bind the UserRepository
/* container
  .bind<Repository<User>>(TYPES.UserRepository)
  .toDynamicValue(() => {
    return appDbContext.getRepository(User);
  })
  .inRequestScope(); */

container.bind<() => Repository<User>>(TYPES.UserRepository).toFactory(() => () => appDbContext.getRepository(User));
container.bind<() => Repository<Message>>(TYPES.MessageRepository).toFactory(() => () => appDbContext.getRepository(Message));

export { container };
