import type { Request, Response } from "express";
import products from "../constants/products";

export function getProducts(req: Request, res: Response) {
    res.status(200).json(products);
}

export function getProduct(req: Request, res: Response) {
    const { id } = req.params;
    const product = products.find(product => product._id === id);
    res.status(200).json(product);
}