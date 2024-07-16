import express from "express";
import { getProducts, getProduct } from '../controllers/products';

const productRouter = express.Router();
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);

export default productRouter;