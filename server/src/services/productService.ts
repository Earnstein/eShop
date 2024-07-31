import Product from "../models/productModel";
import { NotFound } from "../utils/errors";

export const getProducts = async () => {
  const products = await Product.find(
    {},
    {
      __v: 0,
      updatedAt: 0,
      createdAt: 0,
    }
  );
  return products;
};

export const getProduct = async (id: string) => {
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
  if (!product) {
    throw new NotFound("product not found");
  }
  return product;
};
