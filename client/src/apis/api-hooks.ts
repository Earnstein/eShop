import {
  currentUser,
  getPayPalClientId,
  getProduct,
  getProducts,
  getUserOrderById,
} from "@/apis/api";
import { STALETIME } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import "@tanstack/react-query";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<{
      message: string;
    }>;
  }
}

//  PRODUCT APIS
export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: STALETIME,
  });
};

export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    staleTime: STALETIME,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => currentUser(),
    staleTime: STALETIME,
  });
};

export const useGetOrderById = (id: string) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getUserOrderById(id),
    staleTime: STALETIME,
  });
};

export const useGetClientId = () => {
  return useQuery({
    queryKey: ["client_id"],
    queryFn: () => getPayPalClientId(),
    staleTime: STALETIME,
  });
};
