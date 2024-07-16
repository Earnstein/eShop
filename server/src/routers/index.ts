import express from "express";
import productRouter from "./products";

const appRouter = express.Router();

appRouter.use("/product", productRouter);

export default appRouter;