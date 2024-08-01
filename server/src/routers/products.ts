import express from "express";
import { getProducts, getProduct } from "../controllers/products";
import { paramValidator, validateId } from "../middlewares/validators";
import { protectedRouteMiddleware, validateAdmin } from '../middlewares/authMiddleware';

const productRouter = express.Router();

productRouter.get("/", protectedRouteMiddleware, validateAdmin, getProducts);
productRouter.get("/:id", paramValidator, validateId, protectedRouteMiddleware, validateAdmin, getProduct);

export default productRouter;
