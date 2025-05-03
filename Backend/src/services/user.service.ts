import { User } from "#entities/user.entity.js";
import { RegisterDto } from "#interfaces/dtoes/register.dto.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";
import { IUserService } from "#interfaces/services/IUser.service.js";
import { TYPES } from "#interfaces/Types.js";
import { plainToInstance } from "class-transformer";
import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { hash, genSalt, compare } from "bcryptjs";
import { LoginDto } from "#interfaces/dtoes/login.dto.js";
import { toDto } from "#helpers/transformers.js";

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.UserRepository) private readonly userRepFactory: () => Repository<User>) {}

  private get userRep(): Repository<User> {
    return this.userRepFactory();
  }

  async getUser(id: number) {
    if (!id) throw new Error("UserId not found");
    const user = await this.userRep.findOne({ where: { id } });
    if (!user) return null;

    return toDto(UserDto, user);
  }

  async createUser(registerDto: RegisterDto) {
    const hashedPassword = await this.hashPassword(registerDto.password);
    const user = this.userRep.create({ ...registerDto, password: hashedPassword });
    const savedUser = await this.userRep.save(user);

    return plainToInstance(UserDto, savedUser);
  }

  async getUserByUsername(loginDto: LoginDto) {
    const user = await this.userRep.findOne({ where: { username: loginDto.username } });
    if (!user) throw new Error("User not found");

    if (!(await this.comparePasswords(loginDto.password, user.password))) throw new Error("Invalid password");

    return plainToInstance(UserDto, user);
  }

  private async hashPassword(password: string) {
    const salt = await genSalt();
    return await hash(password, salt);
  }

  private async comparePasswords(plainPassword: string, hashedPassword: string) {
    return await compare(plainPassword, hashedPassword);
  }
}
