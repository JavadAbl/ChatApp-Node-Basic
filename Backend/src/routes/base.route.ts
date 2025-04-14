import express from "express";
import userRoute from "./user.route.js";

const baseRoute = express.Router();

baseRoute.use("/api/user", userRoute);

export default baseRoute;
