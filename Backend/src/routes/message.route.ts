import MessageController, { GetMessagesParams } from "#controllers/message.controllers.js";
import { container } from "#libs/inversify.config.js";
import { validateDtoMiddleware } from "#middlewares/test.middleware.js";
import express from "express";

const messageRoute = express.Router();
const messageController = container.get<MessageController>(MessageController);

messageRoute.get("/GetChatList", validateDtoMiddleware(GetMessagesParams, "params"), (req, res) => messageController.getChatList(req, res));

export default messageRoute;
