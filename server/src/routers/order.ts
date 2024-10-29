import express from "express";
import {
  createOrderHandler,
  getOrderById,
  getAllOrders,
  updateOrderToPaid,
  getUserOrders,
} from "../controllers/orders";
import {
  protectedRouteMiddleware,
  validateAdmin,
  validateUser,
} from "../middlewares/authMiddleware";

const orderRouter = express.Router();

orderRouter.post("/", protectedRouteMiddleware, createOrderHandler);
orderRouter.get("/", protectedRouteMiddleware, validateAdmin, getAllOrders);
orderRouter.get(
  "/myorders",
  protectedRouteMiddleware,
  validateUser,
  getUserOrders
);
orderRouter.get("/:id", protectedRouteMiddleware, validateUser, getOrderById);
orderRouter.patch(
  "/:id",
  protectedRouteMiddleware,
  validateAdmin,
  updateOrderToPaid
);
export default orderRouter;
