import MessageController from "#controllers/message.controllers.js";
import { container } from "#libs/inversify.config.js";
import { validateDto } from "#middlewares/classValidator.middleware.js";
import express from "express";

const messageRoute = express.Router();
const messageController = container.get<MessageController>(MessageController);

messageRoute.get("/GetChatList", (req, res) => messageController.getChatList(req, res));

export default messageRoute;
