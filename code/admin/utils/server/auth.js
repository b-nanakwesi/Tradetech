import { toast } from "react-hot-toast"
import Axios from "../axios"

export const LOGIN = async (setLoading ,userData, callback) => {
    try {
        const response = await Axios({
            method: "POST",
            url: "/user/admin-login",
            data: {
                email: userData.email,
                password: userData.password,
            },
        })

        if (response.status === 200) {

            callback(response.data)
        } else {
            toast.error("Login Failed")
        }
    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
        setLoading(false)
    }

}

export const GET_SESSION_USER = async (setLoading, callback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/user/refresh"
        })
        if (response.status === 200) {
            callback(response.data)
        }
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
}

export const LOGOUT = async (callback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/user/logout"
        })
        if (response.status === 200) {
            callback(response)
        } else {
            toast.error("Logout Failed")
        } 
    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );     
    }
}

export const ADD_ADMIN = async (setLoading, userData, callback) => {
    try {
        const response = await Axios({
            method: "POST",
            url: "/user/register",
            data: {
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                password: userData.password,
                role: userData.role,
                mobile: userData.mobile,
            }
        })
        if (response.status === 200) {
            callback(response.data)
            toast.success("Admin Added Successfully")
        }
        setLoading(false)
    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
        setLoading(false)
    }
}

export const GET_ALL_USERS = async (setLoading, callback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/user/all",
        })
        if (response.status === 200) {
            callback(response.data)
        }
        setLoading(false)
        
    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
        setLoading(false)
    }
}

export const GET_USER_BY_ID = async (setLoading, id, token, callback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: `/user/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            callback(response.data)
        }
        setLoading(false)
        
    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
        setLoading(false)
    }
}

export const BLOCK_USER = async (setLoading, id, token, callback) => {
    try {
        const response = await Axios({
            method: "PUT",
            url: `/user/block/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            toast.success("User Blocked Successfully")
            callback()
        }
        setLoading(false)

    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
        setLoading(false)
        
    }
}

export const UNBLOCK_USER = async (setLoading, id, token, callback) => {
    try {
        const response = await Axios({
            method: "PUT",
            url: `/user/unblock/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            toast.success("User Unblocked Successfully")
            callback()
        }
        setLoading(false)

    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
        setLoading(false)
        
    }
}

export const GET_ALL_ORDERS = async (token, callback) => {
    try {
        const response = await Axios({
            method: "GET",
            url: '/user/orders/all',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            callback(response.data)
        }
    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error"
        );
    }

}

export const UPDATE_ORDER_STATUS = async (id, status, token, callback) => {
    const toastId = toast.loading(`Updating status to ${status}  ...`)
    try {
        const response = await Axios({
            method: "PUT",
            url: `/user/orders/edit/${id}`,
            data: {
                status: status
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            toast.success("Order updated!",  {id: toastId})
            callback(response.data)
        }
    } catch (error) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error",  {id: toastId}
        );
    }
}