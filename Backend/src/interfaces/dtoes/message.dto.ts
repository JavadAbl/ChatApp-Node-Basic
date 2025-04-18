export class MessageDto {
  id: number = 0;
  senderId: number = 0;
  recipientId: number = 0;
  content: string = "";
  image?: string;
}
