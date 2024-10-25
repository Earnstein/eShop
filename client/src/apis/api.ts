import { BASE_URL } from "@/constants";
import axios from "axios";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

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
