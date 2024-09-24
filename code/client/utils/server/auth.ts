import { toast } from "react-hot-toast";
import Axios from "../axios";
import { ServerCallback, ServerSetLoading, User } from "@/types";


type LoginUserData = {
    email: string,
    password: string
}

type RegisterUserData = {
    firstname: string
    lastname: string
    email: string
    mobile: string
    password: string
}



export const LOGIN_USER = async (setLoading: ServerSetLoading, userData: LoginUserData, callback?: ServerCallback) => {
    setLoading(true)
    const loginToast = toast.loading("Logging in...")
    try {
        const response = await Axios({
            method: "POST",
            url: "/user/login",
            data: userData
        })

        if (response.status === 200) {
            setLoading(false)
            toast.success("Login Successful", { id: loginToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            setLoading(false)
            toast.error("Login Failed", { id: loginToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: loginToast }
        );
        setLoading(false)
    }
}

export const GET_SESSION_USER = async (setLoading: ServerSetLoading, callback?: ServerCallback) => {

    try {
        const response = await Axios({
            method: "GET",
            url: "/user/refresh"
        })
        if (response.status === 200) {
            if (callback) {
                callback(response.data)
            }
        }
        setLoading(false);
    } catch (error: any) {
        setLoading(false);
    }
}

export const LOGOUT = async (callback?: ServerCallback) => {
    const logoutToast = toast.loading("Trying to log you out...")

    try {
        const response = await Axios({
            method: "GET",
            url: "/user/logout"
        })
        if (response.status === 200) {
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Logout Failed", { id: logoutToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: logoutToast }
        );
    }
}

export const REGISTER_USER = async (setLoading: ServerSetLoading, userData: RegisterUserData, callback?: ServerCallback) => {
    const registerToast = toast.loading("Trying to register you...")
    setLoading(true)
    try {
        const response = await Axios({
            method: "POST",
            url: "/user/register",
            data: userData
        })

        if (response.status === 200) {
            toast.success("You have been registered", { id: registerToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Registration Failed", { id: registerToast })
        }
        setLoading(false)
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: registerToast }
        );
        setLoading(false)
    }
}

export const GET_USER_WISHLIST = async (token: string, callback?: ServerCallback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/user/wishlist",
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export const CREATE_USER_CART = async (cart: any, token: string, callback?: ServerCallback) => {
    const toastId = toast.loading("Creating your cart...")
    const cartData = {
        cart: cart
    }


    try {
        const response = await Axios({
            method: "POST",
            url: `/user/cart/create`,
            data: cartData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            toast.success("Cart created", { id: toastId })
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

export const EMPTY_USER_CART = async (token: string, callback?: ServerCallback) => {
    const toastId = toast.loading("Deleting your old cart...")


    try {
        const response = await Axios({
            method: "DELETE",
            url: `/user/cart/empty`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            toast.success("Cart deleted", { id: toastId })
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

export const GET_USER_CART = async (token: string, callback?: ServerCallback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/user/cart",
            headers: {
                Authorization: `Bearer ${token}`
            }
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

export const SAVE_USER_ADDRESS = async (address: string, token: string, callback?: ServerCallback) => {
    const toastId = toast.loading("Saving your address...")
    const addressData = {
        address: address
    }
    try {
        const response = await Axios({
            method: "PUT",
            url: "/user/save-address",
            data: addressData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            toast.success("Address saved", { id: toastId })
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

export const CREATE_NEW_ORDER = async (orderType: { COD: boolean, couponApplied: boolean }, token: string, callback?: ServerCallback) => {
    const toastId = toast.loading("Creating your order...")
    const orderData = {
        COD: orderType.COD,
        couponApplied: orderType.couponApplied,
    }

    try {
        const response = await Axios({
            method: "POST",
            url: "/user/orders/cash/create",
            data: orderData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            toast.success("Order created", { id: toastId })
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

export const GET_USER_ORDERS = async (token: string, callback?: ServerCallback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/user/orders",
            headers: {
                Authorization: `Bearer ${token}`
            }
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
