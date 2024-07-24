import type { Request, Response } from "express";
import Product from "../models/productModel";
import { StatusCodes } from "http-status-codes";
import { NotFound } from "../utils/errors";
import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const products = await Product.find(
      {},
      {
        __v: 0,
        updatedAt: 0,
        createdAt: 0,
      },
    );
    if (products.length === 0) {
      res.status(StatusCodes.OK).json({
        data: 0,
        message: "There is no product in this inventory",
        error: "",
      });
      return;
    }
    res.status(StatusCodes.OK).json(products);
    return;
  },
);

export const getProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await Product.findById(
      {
        _id: id,
      },
      {
        __v: 0,
        updatedAt: 0,
        createdAt: 0,
      },
    );

    if (!product) {
      throw new NotFound("product not found");
    }
    res.status(StatusCodes.OK).json(product);
    return;
  },
);
