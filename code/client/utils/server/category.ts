import { toast } from "react-hot-toast";
import Axios from "../axios";
import { ServerCallback } from "@/types";



export const GET_ALL_CATEGORIES = async (callback?: ServerCallback) => {
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

export const GET_CATEGORY_BY_ID = async (id: string, callback?: ServerCallback) => {
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
