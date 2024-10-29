import type { I_OrderDocument } from "../models/orderModel";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import { BadRequest, NoContent } from "../utils/errors";
import moment from "moment";

export type paymentResult = {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
};
type Body = Omit<
  I_OrderDocument,
  "_id" | "user" | "isPaid" | "isDelivered" | "paidAt" | "deliveredAt"
>;

export const createOrder = async (userID: string, body: Body) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = body;
  if (!orderItems) {
    throw new BadRequest("No Order items");
  }

  const validatedOrderItems = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item.product_id);
      if (!product) {
        throw new BadRequest("Product not found");
      }
      if (product.countInStock < Number(item.quantity)) {
        throw new BadRequest(`${product.name} is out of stock`);
      }
      if (product.price !== item.price) {
        throw new BadRequest(
          `${product.name} price has changed to ${product.price}`
        );
      }
      product.countInStock -= Number(item.quantity);
      await product.save();
      return {
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        product_id: product._id,
      };
    })
  );

  const order = new Order({
    orderItems: validatedOrderItems,
    user: userID,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const createdOrder = await order.save();
  return createdOrder._id;
};

export const getAllOrders = async () => {
  const orders = await Order.find({}).populate("user", "name");
  if (orders.length === 0) {
    throw new NoContent("No orders found");
  }
  return orders;
};

export const getUserOrders = async (userID: string) => {
  const orders = await Order.find({ user: userID });
  if (orders.length === 0) {
    throw new NoContent("No orders found");
  }
  return orders;
};

export const getOrderById = async (orderID: string) => {
  const order = await Order.findById(orderID).populate("user", "name");
  if (!order) {
    throw new BadRequest("Order not found");
  }
  return order;
};

export const updateOrderToPaid = async (
  orderID: string,
  paymentResult: paymentResult
) => {
  const order = await Order.findById(orderID);
  if (!order) {
    throw new BadRequest("Order not found");
  }

  order.isPaid = true;
  order.paidAt = moment().toDate() as any;
  order.paymentResult = {
    id: paymentResult.id,
    status: paymentResult.status,
    update_time: new Date(Date.now()).toISOString(),
    email_address: paymentResult.email_address,
  };
  await order.save();
  return order;
};
