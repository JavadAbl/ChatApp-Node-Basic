import { User } from "#entities/user.entity.js";
import { RegisterDto } from "#interfaces/dtoes/register.dto.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";
import { IUserService } from "#interfaces/services/IUser.service.js";
import { TYPES } from "#interfaces/Types.js";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { hash, genSalt } from "bcryptjs";

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.UserRepository) private readonly userRepFactory: () => Repository<User>) {}

  private get userRep(): Repository<User> {
    return this.userRepFactory();
  }

  getUser(id: number): User | undefined | string {
    throw new Error("Method not implemented.");
  }

  async createUser(registerDto: RegisterDto) {
    const hashedPassword = await this.hashPassword(registerDto.password);
    const user = this.userRep.create({ ...registerDto, password: hashedPassword });
    const savedUser = await this.userRep.save(user);

    return plainToInstance(UserDto, savedUser);
  }

  private async hashPassword(password: string) {
    const salt = await genSalt();
    return await hash(password, salt);
  }
}
