import UserController from "#controllers/user.controllers.js";
import appDbContext from "#data/appDbContext.js";
import { User } from "#entities/user.entity.js";
import { IUserService } from "#interfaces/services/IUser.service.js";
import { TYPES } from "#interfaces/Types.js";
import { UserService } from "#services/user.service.js";
import { Container } from "inversify";
import { Repository } from "typeorm";

const container = new Container();

// Bind controller
container.bind<UserController>(UserController).toSelf().inSingletonScope();

// Bind interface to implementation
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();

// Bind the UserRepository
/* container
  .bind<Repository<User>>(TYPES.UserRepository)
  .toDynamicValue(() => {
    return appDbContext.getRepository(User);
  })
  .inRequestScope(); */

container.bind<() => Repository<User>>(TYPES.UserRepository).toFactory(() => () => appDbContext.getRepository(User));

export { container };
