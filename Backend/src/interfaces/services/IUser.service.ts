import { LoginDto } from "#interfaces/dtoes/login.dto.js";
import { RegisterDto } from "#interfaces/dtoes/register.dto.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";

export interface IUserService {
  getUser(id: number): Promise<UserDto | null>;

  createUser(registerDto: RegisterDto): Promise<UserDto>;

  getUserByUsername(loginDto: LoginDto): Promise<UserDto>;
}
