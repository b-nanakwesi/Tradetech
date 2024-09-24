import { toast } from "react-hot-toast";
import Axios from "../axios";
import { ServerCallback } from "@/types";

export const GET_ALL_COLORS = async (callback?: ServerCallback) => {
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

export const GET_COLOR_BY_ID = async (id: string, callback?: ServerCallback) => {
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