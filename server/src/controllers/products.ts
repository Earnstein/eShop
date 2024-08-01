import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "express-async-handler";
import * as productService from "../services/productService";
import { SUCCESS } from "../constants";



/**
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public
 */
export const getProducts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const products = await productService.getProducts();
    if (products.length === 0) {
      res.status(StatusCodes.OK).json({
        message: "There is no product in this inventory",
        status: SUCCESS,
        data: "",
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: "products",
      status: SUCCESS,
      data: products,
    });
    return;
  },
);



/**
 * @desc Fetch a product
 * @route GET /api/product/:id
 * @access Public
 */
export const getProduct = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await productService.getProduct(id);
    res.status(StatusCodes.OK).json({
      message: "product found",
      status: SUCCESS,
      data: product,
    });
    return;
  },
);
