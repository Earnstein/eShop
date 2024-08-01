import express from "express";
import { getProducts, getProduct } from "../controllers/products";
import { validateId } from "../middlewares/validators";
import { protectedRouteMiddleware } from '../middlewares/authMiddleware';

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", validateId, getProduct);

export default productRouter;
