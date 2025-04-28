import { UserDto } from "./user.dto.js";

export class ChatCardDto {
  lastMessage!: string;

  lastMessageDate!: Date;

  user!: UserDto;
}
