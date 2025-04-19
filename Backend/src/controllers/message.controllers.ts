import { SendMessageDto } from "#interfaces/dtoes/sendMessage.dto.js";
import { IMessageService } from "#interfaces/services/IMessage.service.js";
import { TYPES } from "#interfaces/Types.js";
import { IsNotEmpty } from "class-validator";
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

  async getMessages(req: Request<GetMessagesParams, unknown, unknown>, res: Response) {
    if (!req.params.id) {
      res.status(400).json({ message: "id not supplied in params" });
      return;
    }

    const targetUserId = parseInt(req.params.id);

    const messages = await this.messageService.getMessagesByUser(req.userId, targetUserId);
    res.json({ message: "success", payload: messages });
  }

  async sendMessage(req: Request<unknown, unknown, SendMessageDto>, res: Response) {
    const sendMessageDto = req.body;
    const senderId = req.userId;

    await this.messageService.sendMessage(senderId, sendMessageDto);

    res.status(201).send();
  }
}

export class GetMessagesParams {
  @IsNotEmpty()
  id?: string;
}
