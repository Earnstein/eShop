import { Schema, model, Document, type ObjectId, type Date } from "mongoose";

export interface I_OrderDocument extends Document {
  user: ObjectId;
  orderItems: [I_CartDocument];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: Number;
  taxPrice: Number;
  shippingPrice: Number;
  totalPrice: Number;
  isPaid: Boolean;
  paidAt: Date;
  isDelivered: Boolean;
  deliveredAt: Date;
}

interface I_CartDocument {
  name: string;
  quantity: Number;
  image: string;
  price: Number;
  product: ObjectId;
}

const CartSchema = new Schema<I_CartDocument>({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

const OrderSchema = new Schema<I_OrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [CartSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String, required: true },
      status: { type: String, required: true },
      update_time: { type: String, required: true },
      email_address: { type: String, required: true },
    },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true },
    isDelivered: { type: Boolean, required: true },
    paidAt: { type: Date, required: true },
    deliveredAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);


const Order = model<I_OrderDocument>("Order", OrderSchema);
export default Order;