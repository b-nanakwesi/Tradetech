import { toast } from "react-hot-toast";
import Axios from "../axios";
import { Rating, ServerCallback } from "@/types";

export const GET_ALL_PRODUCTS = async (params?: any, callback?: ServerCallback) => {
    let newParams = params === "" ? {} : params
    try {
        const response = await Axios({
            method: "GET",
            url: "/product",
            params: newParams
        })
        if (response.status === 200) {
            if (callback) {
                callback(response.data)
            }
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
    }
}

export const GET_PRODUCT_BY_ID = async (id: string, callback?: ServerCallback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: `/product/${id}`
        })
        if (response.status === 200) {
            if (callback) {
                callback(response.data)
            }
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
    }
}




export const ADD_TO_WISHLIST = async (productId: string, token: string, callback?: ServerCallback) => {
    const toastId = toast.loading("Adding to wishlist...")
    try {
        const response = await Axios({
            method: "PUT",
            url: `/product/wishlist`,
            data: {
                productId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) { 
            toast.success("Added to wishlist", { id: toastId })
            if (callback) { 
                callback(response.data)
            }
        }
        
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: toastId }
        );
    
        
    }

 }

export const GIVE_A_RATING = async (rating: Rating, token: string, callback?: ServerCallback) => {
    const toastId = toast.loading("Rating this product ...")
    try {
        const response = await Axios({
            method: "PUT",
            url: `/product/rating`,
            data: {
                productId: rating.productId,
                star: rating.star,
                comment: rating.comment
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            toast.success("Rating added", { id: toastId })
            if (callback) { 
                callback(response.data)
            }
        }
        
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: toastId }
        );  
    }
}