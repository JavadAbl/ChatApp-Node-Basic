import { IMessageService } from "#interfaces/services/IMessage.service.js";
import { TYPES } from "#interfaces/Types.js";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export default class MessageController {
  constructor(@inject(TYPES.IMessageService) private readonly messageService: IMessageService) {}

  async getChatList(req: Request<unknown, unknown, unknown>, res: Response) {
    const userDtos = await this.messageService.getChatUsers(1);
    await res.json({ message: "success", payload: userDtos });
  }
}
