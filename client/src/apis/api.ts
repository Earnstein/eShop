import { BASE_URL } from "@/constants"
import axios from "axios"

axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true


export const getProducts = async () => {
    const response = await axios.get("product")
    const data = await response.data;
    return data;
}

export const getProduct = async (id: string) => {
    const response = await axios.get(`product/${id}`);
    const data = await response.data;
    return data;
}