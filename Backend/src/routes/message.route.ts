import MessageController, { GetMessagesParams } from "#controllers/message.controllers.js";
import { SendMessageDto } from "#interfaces/dtoes/sendMessage.dto.js";
import { container } from "#libs/inversify.config.js";
import { validateDtoMiddleware } from "#middlewares/validateDto.middleware.js";
import express from "express";

const messageRoute = express.Router();
const messageController = container.get<MessageController>(MessageController);

messageRoute.get("/GetChatList", (req, res) => messageController.getChatList(req, res));

messageRoute.get("/GetMessages/:id", validateDtoMiddleware(GetMessagesParams, "params"), (req, res) => messageController.getMessages(req, res));

messageRoute.post("/SendMessage", validateDtoMiddleware(SendMessageDto, "body"), (req, res) => messageController.sendMessage(req, res));

export default messageRoute;
