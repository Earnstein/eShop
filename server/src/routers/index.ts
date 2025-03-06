import express from "express";
import productRouter from "./products";
import userRouter from "./users";
import authRouter from "./auth";
import orderRouter from "./order";
import { SUCCESS } from "../constants";
import Bun from "bun";
const appRouter = express.Router();

appRouter.get("/config/paypal", (req, res) => {
  //   res.send({ clientId: Bun.env.PAYPAL_CLIENT_ID! });
  res.status(200).json({
    data: Bun.env.PAYPAL_CLIENT_ID,
    status: SUCCESS,
    messsage: "",
  });
  return;
});
appRouter.use("/auth", authRouter);
appRouter.use("/product", productRouter);
appRouter.use("/user", userRouter);
appRouter.use("/order", orderRouter);
export default appRouter;
