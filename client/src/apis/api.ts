import { BASE_URL } from "@/constants";
import { ShippingAddress } from "@/store/state";
import axios from "axios";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export interface I_Order {
  name: string;
  quantity: number;
  image: string;
  price: number;
  product_id: string;
}

export interface I_OrderBody {
  orderItems: Array<I_Order>;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export interface I_User {
  name: string;
  email: string;
  password: string;
}

export const getProducts = async () => {
  const response = await axios.get("product");
  const data = await response.data;
  return data;
};

export const getProduct = async (id: string) => {
  const response = await axios.get(`product/${id}`);
  const data = await response.data;
  return data;
};

export const signUp = async (body: I_User) => {
  const response = await axios.post("auth/signup", body);
  const result = await response.data;
  return result;
};

export const signIn = async (body: { email: string; password: string }) => {
  const response = await axios.post("auth/signin", body);
  const result = await response.data;
  return result;
};

export const signOut = async () => {
  const response = await axios.post("auth/signout");
  const result = await response.data;
  return result;
};

export const currentUser = async () => {
  const response = await axios.get("user/current/loggedin");
  const result = await response.data;
  return result;
};

export const createOrder = async (body: I_OrderBody) => {
  const response = await axios.post("order", body);
  const result = await response.data;
  return result;
};
