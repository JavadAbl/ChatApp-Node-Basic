import express from "express";
import userRoute from "./user.route.js";
import messageRoute from "./message.route.js";

const baseRoute = express.Router();

baseRoute.use("/api/user", userRoute);
baseRoute.use("/api/message", messageRoute);

export default baseRoute;
