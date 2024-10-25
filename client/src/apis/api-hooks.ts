import { getProduct, getProducts } from "@/apis/api";
import { STALETIME } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import "@tanstack/react-query";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
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
