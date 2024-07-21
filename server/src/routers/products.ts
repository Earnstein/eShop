import express from "express";
import { getProducts, getProduct } from '../controllers/products';
import { paramValidator, validateId } from "../middlewares/validators";


const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", paramValidator, validateId, getProduct);


export default productRouter;