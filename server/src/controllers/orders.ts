import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import type { CustomRequest } from "../middlewares/authMiddleware";
import { type I_OrderDocument } from "../models/orderModel";
import { StatusCodes } from "http-status-codes";
import { SUCCESS } from "../constants";
import * as orderService from "../services/orderService";

/**
 * @desc Create new order
 * @route POST /api/orders
 * @access Private
 */
export const createOrderHandler = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.user?._id as string;
    const body: Omit<
      I_OrderDocument,
      "_id" | "user" | "isPaid" | "isDelivered" | "paidAt" | "deliveredAt"
    > = req.body;

    const orderId = await orderService.createOrder(userId, body);

    res.status(StatusCodes.CREATED).json({
      message: "Order created successfully",
      status: SUCCESS,
      data: orderId,
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
    const orders = await orderService.getAllOrders();
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
    const userId = req.user?._id as string;
    const orders = await orderService.getUserOrders(userId);
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
    const { id: orderID } = req.params;
    const order = await orderService.getOrderById(orderID);
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
    const { id: orderID } = req.params;
    const paymentResult: orderService.paymentResult = req.body;
    const updatedOrder = await orderService.updateOrderToPaid(
      orderID,
      paymentResult
    );
    res.status(StatusCodes.OK).json({
      message: "Order updated successfully",
      status: SUCCESS,
      data: updatedOrder,
    });
    return;
  }
);
