import type { I_OrderDocument } from "../models/orderModel";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import { BadRequest, NoContent } from "../utils/errors";

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
  return createdOrder;
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

export const updateOrderToPaid = async (orderID: string) => {
  const order = await Order.findById(orderID);
  if (!order) {
    throw new BadRequest("Order not found");
  }
  order.isPaid = true;
  await order.save();
  return order;
};
