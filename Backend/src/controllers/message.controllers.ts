import { SendMessageDto } from "#interfaces/dtoes/sendMessage.dto.js";
import { IMessageService } from "#interfaces/services/IMessage.service.js";
import { TYPES } from "#interfaces/Types.js";
import { IsInt, IsNotEmpty } from "class-validator";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export default class MessageController {
  constructor(@inject(TYPES.IMessageService) private readonly messageService: IMessageService) {}

  async getChatList(req: Request, res: Response) {
    const userId = req.userId;
    const userDtos = await this.messageService.getChatUsers(userId);
    await res.json({ message: "success", payload: userDtos });
  }

  async getMessages(req: Request<GetMessagesParams>, res: Response) {
    const targetUserId = parseInt(req.params.id);

    const messages = await this.messageService.getMessagesByUser(req.userId, targetUserId);
    await res.json({ message: "success", payload: messages });
  }

  async sendMessage(req: Request<unknown, unknown, SendMessageDto>, res: Response) {
    const sendMessageDto = req.body;
    const senderId = req.userId;
    const targetUserId = parseInt(req.params.id);
  }
}

export class GetMessagesParams {
  @IsInt()
  @IsNotEmpty()
  id!: string;
}
