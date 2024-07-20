import type { Request, Response } from "express";
import Product from "../models/productModel";
import { StatusCodes } from "http-status-codes";

export async function getProducts(req: Request, res: Response) {
  const products = await Product.find(
    {},
    {
      __v: 0,
      updatedAt: 0,
      createdAt: 0,
    }
  );
  return res.status(StatusCodes.OK).json(products);
}

export async function getProduct(req: Request, res: Response) {
  const { id } = req.params;
  const product = await Product.findById(
    {
      _id: id,
    },
    {
      __v: 0,
      updatedAt: 0,
      createdAt: 0,
    }
  );
  return res.status(StatusCodes.OK).json(product);
}
