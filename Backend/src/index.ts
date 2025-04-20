import "reflect-metadata";
import appDbContext from "#data/appDbContext.js";
import baseRoute from "#routes/base.route.js";
import { configDotenv } from "dotenv";
import express from "express";
import { errorHandler } from "#middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

configDotenv();

const app = express();

// Express configuration
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(baseRoute);

app.use(errorHandler);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  appDbContext
    .initialize()
    .then(() => console.log("Data Source initialized"))
    .catch((error) => console.error("Error initializing Data Source", error));
});
