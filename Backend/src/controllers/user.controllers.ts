import { LoginDto } from "#interfaces/dtoes/login.dto.js";
import { RegisterDto } from "#interfaces/dtoes/register.dto.js";
import { IUserService } from "#interfaces/services/IUser.service.js";
import { TYPES } from "#interfaces/Types.js";
import { generateToken } from "#libs/jwt.js";
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

  async login(req: Request<unknown, unknown, LoginDto>, res: Response) {
    const userDto = await this.userService.getUserByUsername(req.body);

    const token = generateToken(userDto.id);

    res.cookie("token", token, { httpOnly: true, sameSite: true, secure: false, expires: new Date(Date.now() + 2592000000) });

    res.json({ message: "success", payload: userDto });
  }

  async register(req: Request<unknown, unknown, RegisterDto>, res: Response) {
    const userDto = await this.userService.createUser(req.body);

    const token = generateToken(userDto.id);

    res.cookie("token", token, { httpOnly: true, sameSite: true, secure: false, expires: new Date(Date.now() + 2592000000) });

    res.json(userDto);
  }

  async checkAuth(req: Request, res: Response) {
    const user = await this.userService.getUser(req.userId);
    res.send(user);
  }
}
