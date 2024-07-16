import express from "express";
import morgan from "morgan";
import appRouter from "./routers";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet())
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
    );
app.use(morgan("combined"));
app.use("/api/v1", appRouter);

export default app;
