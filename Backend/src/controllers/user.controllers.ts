import { RegisterDto } from "#interfaces/dtoes/register.dto.js";
import { UserDto } from "#interfaces/dtoes/user.dto.js";
import { IUserService } from "#interfaces/services/IUser.service.js";
import { TYPES } from "#interfaces/Types.js";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export default class UserController {
  constructor(@inject(TYPES.IUserService) private readonly userService: IUserService) {
    // Bind the methods to the class
    // this.getUser = this.getUser.bind(this);
  }

  async getUser(req: Request, res: Response) {
    const user = this.userService.getUser(1);

    res.json(user);
  }

  async login(req: Request, res: Response) {
    res.send("login, User!");
  }

  async register(req: Request, res: Response) {
    const userDto = await this.userService.createUser(req.body);
    res.json({ message: "success", payload: userDto });
  }
}
