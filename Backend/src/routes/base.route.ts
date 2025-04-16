import express from "express";
import userRoute from "./user.route.js";
import messageRoute from "./message.route.js";
import { authMiddleware } from "#middlewares/auth.middleware.js";

const baseRoute = express.Router();

baseRoute.use("/api/user", userRoute);
baseRoute.use("/api/message", authMiddleware, messageRoute);

export default baseRoute;
