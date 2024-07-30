import express from "express";
import { getProducts, getProduct } from "../controllers/products";
import { paramValidator, validateId } from "../middlewares/validators";
import { protectedRouteMiddleware } from '../middlewares/authMiddleware';

const productRouter = express.Router();

productRouter.get("/", protectedRouteMiddleware ,getProducts);
productRouter.get("/:id", paramValidator, validateId, protectedRouteMiddleware, getProduct);

export default productRouter;
