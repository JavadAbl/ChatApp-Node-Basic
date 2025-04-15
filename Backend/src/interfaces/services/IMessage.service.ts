import { UserDto } from "#interfaces/dtoes/user.dto.js";

export interface IMessageService {
  getChatUsers(userId: number): Promise<any> /* : Promise<UserDto[]> */;
}
