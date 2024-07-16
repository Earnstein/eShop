import {getProduct, getProducts } from "@/apis/api"
import products from "@/constants/products";
import {  useQuery } from "@tanstack/react-query";


export const useGetProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        placeholderData: products,
    })
}

export const useGetProduct = (id: string) => {
    return useQuery ({
        queryKey: ["product", id],
        queryFn: () => getProduct(id)
    })
}