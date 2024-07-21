import express from "express";
import morgan from "morgan";
import appRouter from "./routers";
import cors from "cors";
import helmet from "helmet";
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";

const limit = rateLimit({
    windowMs: 0.4 * 60 * 1000,
    max: 4,
});


const app = express();

app.use(express.json());
app.use(helmet())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
    );
app.use(limit);
app.use(cookieParser("secret"));
if (Bun.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use("/api/v1", appRouter);

app.use(errorHandlerMiddleware);

export default app;
