import UserController from "#controllers/user.controllers.js";
import { RegisterDto } from "#interfaces/dtoes/register.dto.js";
import { container } from "#libs/inversify.config.js";
import { validateDto } from "#middlewares/classValidator.middleware.js";
import express from "express";

const userRoute = express.Router();
const userController = container.get<UserController>(UserController);

userRoute.post("/login", (req, res) => userController.login(req, res));

userRoute.post("/register", validateDto(RegisterDto), (req, res) => userController.register(req, res));

userRoute.get("/get", (req, res) => userController.getUser(req, res));

export default userRoute;
