import express from "express";
import productRouter from "./products";
import userRouter from "./users";
import authRouter from "./auth";
import orderRouter from "./order";

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/product", productRouter);
appRouter.use("/user", userRouter);
appRouter.use("/order", orderRouter);
export default appRouter;
