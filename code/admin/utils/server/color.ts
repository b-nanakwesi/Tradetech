import { toast } from "react-hot-toast"
import Axios from "../axios"

export const ADD_COLOR = async (title: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Adding Color...")
    try {
        const response = await Axios({
            method: "POST",
            url: "/color/new",
            data: {
                title: title
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Color Added Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            toast.error("Color Could Not Be Added", { id: addToast })
        }
    } catch (error) {
        toast.error("Color Could Not Be Added", { id: addToast })
    }
}

export const GET_ALL_COLORS = async (callback?: (data: any) => void) => {
    try {
        const response = await Axios({
            method: "GET",
            url: "/color/all"
        })
        if (response.status === 200) {
            if (callback) {
                callback(response.data)
            }
        }
    } catch (error) {
        toast.error("Could not fetch colors")
    }
}

export const GET_COLOR_BY_ID = async (id: string, callback?: (data: any) => void) => {
    try {
        const response = await Axios({
            method: "GET",
            url: `/color/${id}`
        })
        if (response.status === 200) {
            if (callback) {
                callback(response.data)
            }
        }
    } catch (error) {
        toast.error("Could not fetch color")
    }
}

export const UPDATE_COLOR = async (id: string, title: string, token: string, callback?: (data: any) => void) => {
    const updateToast = toast.loading("Updating Color...")
    try {
        const response = await Axios({
            method: "PUT",
            url: `/color/edit/${id}`,
            data: {
                title: title
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Color Updated Successfully", { id: updateToast })
            if (callback) {
                callback(response.data)
            }
        }
        else {
            toast.error("Color Could Not Be Updated", { id: updateToast })
        }

    } catch (error) {
        toast.error("Color Could Not Be Updated", { id: updateToast })
    }
}

export const DELETE_COLOR = async (id: string, token: string, callback?: (data: any) => void) => {
    const updateToast = toast.loading("Deleting Color...")
    try {
        const response = await Axios({
            method: "DELETE",
            url: `/color/drop/${id}`,   
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Color Deleted Successfully", { id: updateToast })
            if (callback) {
                callback(response.data)
            }
        }
        else {
            toast.error("Color Could Not Be Deleted", { id: updateToast })
        }

    } catch (error) {
        toast.error("Color Could Not Be Deleted", { id: updateToast })
    }
}