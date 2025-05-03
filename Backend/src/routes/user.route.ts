import UserController from "#controllers/user.controllers.js";
import { LoginDto } from "#interfaces/dtoes/login.dto.js";
import { RegisterDto } from "#interfaces/dtoes/register.dto.js";
import { container } from "#libs/inversify.config.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";
import { validateDtoMiddleware } from "#middlewares/validateDto.middleware.js";
import express from "express";

const userRoute = express.Router();
const userController = container.get<UserController>(UserController);

userRoute.post("/login", validateDtoMiddleware(LoginDto), (req, res) => userController.login(req, res));

userRoute.post("/register", validateDtoMiddleware(RegisterDto), (req, res) => userController.register(req, res));

// userRoute.get("/get", (req, res) => userController.getUser(req, res));

userRoute.get("/CheckAuth", authMiddleware, (req, res) => userController.checkAuth(req, res));

export default userRoute;
