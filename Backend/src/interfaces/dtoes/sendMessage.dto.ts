import { IsString, IsNotEmpty } from "class-validator";

export class SendMessageDto {
  @IsNotEmpty()
  targetId: number = 0;

  @IsNotEmpty()
  @IsString()
  content: string = "";
}
