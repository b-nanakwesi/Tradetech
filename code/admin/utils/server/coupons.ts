import { toast } from "react-hot-toast"
import Axios from "../axios"
import { Coupon } from "@/types"

export const ADD_COUPON = async (coupon: any, token: string, callback?: (data: any) => void) => { 
    const addToast = toast.loading("Adding Coupon...")
    try {
        const response = await Axios({
            method: "POST",
            url: "/coupon/new",
            data: {
                name: coupon.name,
                discount: coupon.discount,
                expiry: coupon.expiry
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Coupon Added Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            console.log(response);
            
            toast.error("Coupon Could Not Be Added", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}

export const GET_ALL_COUPONS = async (callback?: (data: any) => void) => { 
    try {
        const response = await Axios({
            method: "GET",
            url: "/coupon/all"
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

export const GET_SINGLE_COUPON = async (id: string, callback?: (data: any) => void) => { 
    try {
        const response = await Axios({
            method: "GET",
            url: `/coupon/${id}`
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

export const UPDATE_COUPON = async (coupon: any, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Updating Coupon...")
    try {
        const response = await Axios({
            method: "PUT",
            url: `/coupon/edit/${coupon._id}`,
            data: {
                name: coupon.name,
                discount: coupon.discount,
                expiry: coupon.expiry
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Coupon Updated Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            console.log(response);
            
            toast.error("Coupon Could Not Be Updated", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}

export const DELETE_COUPON = async (id: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Deleting Coupon...")
    try {
        const response = await Axios({
            method: "DELETE",
            url: `/coupon/drop/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Coupon Deleted Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            console.log(response);
            
            toast.error("Coupon Could Not Be Deleted", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}