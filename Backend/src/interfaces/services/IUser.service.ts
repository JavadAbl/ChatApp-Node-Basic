import { User } from "#entities/user.entity.js";
import { RegisterDto } from "#interfaces/dtoes/register.dto.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";

export interface IUserService {
  getUser(id: number): User | undefined | string;

  createUser(registerDto: RegisterDto): Promise<UserDto>;
}
