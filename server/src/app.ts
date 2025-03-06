import Bun from "bun";
import express, { type Application } from "express";
import morgan from "morgan";
import appRouter from "./routers";
import cors from "cors";
import helmet from "helmet";
import { errorHandlerMiddleware } from "./middlewares/errorHandler";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";

const limit = rateLimit({
  windowMs: 0.4 * 60 * 1000,
  max: 4,
});

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser("secret"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
if (Bun.env.NODE_ENV === "production") {
  app.use(limit);
}
if (Bun.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use("/api", appRouter);
app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Not found" });
});

app.use(errorHandlerMiddleware);

export default app;
