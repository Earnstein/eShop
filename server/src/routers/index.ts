import express from "express";
import productRouter from "./products";
import userRouter from "./users";
import authRouter from "./auth";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/product", productRouter);
appRouter.use("/user", userRouter);

export default appRouter;