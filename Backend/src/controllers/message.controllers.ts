import { IMessageService } from "#interfaces/services/IMessage.service.js";
import { TYPES } from "#interfaces/Types.js";
import { IsInt } from "class-validator";
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

  async getMessages(req: Request<{ id: string }>, res: Response) {
    const userId = parseInt(req.params.id);

    const userDtos = await this.messageService.getChatUsers(userId);
    await res.json({ message: "success", payload: userDtos });
  }
}

export class GetMessagesParams {
  @IsInt()
  id?: number;
}
