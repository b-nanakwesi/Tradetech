import { toast } from "react-hot-toast"
import Axios from "../axios"


export const ADD_CATEGORY = async (title: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Adding Category...")
    try {
        const response = await Axios({
            method: "POST",
            url: "/productCategory/new",
            data: {
                title: title
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })
        console.log(response);
        

        if (response.status === 200) {
            toast.success("Category Added Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Category Could Not Be Added", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
        
    }
}

export const GET_ALL_CATEGORIES = async (callback?: (data: any) => void) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/productCategory/all"
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

export const GET_CATEGORY_BY_ID = async (id: string, callback?: (data: any) => void) => {
    try {
        const response = await Axios({
            method: "GET",
            url: `/productCategory/${id}`
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

export const UPDATE_CATEGORY = async (id: string, title: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Updating Category...")
    try {
        const response = await Axios({
            method: "PUT",
            url: `/productCategory/edit/${id}`,
            data: {
                title: title
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Category Updated Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Category Could Not Be Updated", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}

export const DELETE_CATEGORY = async (id: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Deleting Category...")
    try {
        const response = await Axios({
            method: "DELETE",
            url: `/productCategory/drop/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Category Deleted Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Category Could Not Be Deleted", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}