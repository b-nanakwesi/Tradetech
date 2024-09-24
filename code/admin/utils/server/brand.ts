import { toast } from "react-hot-toast"
import Axios from "../axios"


export const ADD_BRAND = async (title: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Adding Brand...")
    try {
        const response = await Axios({
            method: "POST",
            url: "/brand/new",
            data: {
                title: title
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })
        console.log(response);
        

        if (response.status === 200) {
            toast.success("Brand Added Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Brand Could Not Be Added", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
        
    }
}

export const GET_ALL_BRANDS = async (callback?: (data: any) => void) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/brand/all"
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

export const GET_BRAND_BY_ID = async (id: string, callback?: (data: any) => void) => {
    try {
        const response = await Axios({
            method: "GET",
            url: `/brand/${id}`
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

export const UPDATE_BRAND = async (id: string, title: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Updating Brand...")
    try {
        const response = await Axios({
            method: "PUT",
            url: `/brand/edit/${id}`,
            data: {
                title: title
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Brand Updated Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Brand Could Not Be Updated", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}

export const DELETE_BRAND = async (id: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Deleting Brand...")
    try {
        const response = await Axios({
            method: "DELETE",
            url: `/brand/drop/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Brand Deleted Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Brand Could Not Be Deleted", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}