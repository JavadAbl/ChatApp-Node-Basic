import { Expose } from "class-transformer";

export class MessageDto {
  @Expose()
  id: number = 0;
  @Expose()
  senderId: number = 0;
  @Expose()
  recipientId: number = 0;
  @Expose()
  content: string = "";
}
