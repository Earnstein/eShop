import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import type { CustomRequest } from "../middlewares/authMiddleware";
import Order, { type I_OrderDocument } from "../models/orderModel";
import { BadRequest } from "../utils/errors";
import Product from "../models/productModel";
import { StatusCodes } from "http-status-codes";
import { SUCCESS } from "../constants";

/**
 * @desc Create new order
 * @route POST /api/orders
 * @access Private
 */
export const createOrderHandler = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.user?._id;
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    }: Omit<
      I_OrderDocument,
      "_id" | "user" | "isPaid" | "isDelivered" | "paidAt" | "deliveredAt"
    > = req.body;

    if (!orderItems) {
      throw new BadRequest("No order items");
    }

    const newOrderItems = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new BadRequest("Product not found");
        }
        if (product.countInStock < Number(item.quantity)) {
          throw new BadRequest(`${product.name} is out of stock`);
        }
        product.countInStock -= Number(item.quantity);
        await product.save();
        return {
          name: item.name,
          quantity: item.quantity,
          image: item.image,
          price: item.price,
          product: product._id,
        };
      })
    );
    const order = new Order({
      user: userId,
      orderItems: newOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const savedOrder = await order.save();

    res.status(StatusCodes.CREATED).json({
      message: "Order created successfully",
      status: SUCCESS,
      data: savedOrder,
    });
    return;
  }
);

/**
 * @desc Get all orders
 * @route GET /api/orders
 * @access Private (admin)
 */
export const getAllOrders = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const orders = await Order.find({}).populate("user", "name");
    res.status(StatusCodes.OK).json({
      message: "Orders fetched successfully",
      status: SUCCESS,
      data: orders,
    });
    return;
  }
);

/**
 * @desc Get user orders
 * @route GET /api/orders/myorders
 * @access Private
 */
export const getUserOrders = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.user?._id;
    const orders = await Order.find({ user: userId });
    res.status(StatusCodes.OK).json({
      message: "Orders fetched successfully",
      status: SUCCESS,
      data: orders,
    });
    return;
  }
);

/**
 * @desc Get order by id
 * @route GET /api/orders/:id
 * @access Private
 */

export const getOrderById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name");
    if (!order) {
      throw new BadRequest("Order not found");
    }
    res.status(StatusCodes.OK).json({
      message: "Order fetched successfully",
      status: SUCCESS,
      data: order,
    });
    return;
  }
);

/**
 * @desc Update order to paid
 * @route PATCH /api/orders/:id/pay
 * @access Private
 */

export const updateOrderToPaid = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      throw new BadRequest("Order not found");
    }
    order.isPaid = true;
    // order.paidAt = new Date();
    const updatedOrder = await order.save();
    res.status(StatusCodes.OK).json({
      message: "Order updated successfully",
      status: SUCCESS,
      data: updatedOrder,
    });
    return;
  }
);
