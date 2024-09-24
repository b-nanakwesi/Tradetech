import { toast } from "react-hot-toast"
import Axios from "../axios"
import FormData from 'form-data'

export const ADD_PRODUCT = async (productData: any, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Creating Product...")

    try {
        const response = await Axios({
            method: "POST",
            url: "/product/new",
            data: {
                title: productData.title,
                description: productData.description,
                price: productData.price,
                quantity: productData.quantity,
                category: productData.category.value,
                color: [productData.color.value],
                brand: productData.brand.value,
                state: productData.state.value,
                images: productData.images
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            toast.success("Product Created Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        }

    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}

export const GET_ALL_PRODUCTS = async (params?: any ,callback?: (data: any) => void) => {
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

export const GET_PRODUCT_BY_ID = async (id: string, callback?: (data: any) => void) => {
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

export const UPDATE_PRODUCT = async (id: string, product: any, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Updating Product...")
    try {
        const response = await Axios({
            method: "PUT",
            url: `/product/edit/${id}`,
            data: {
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                category: product.category.value,
                color: [product.color.value],
                brand: product.brand.value,
                state: product.state.value,
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }

        })

        if (response.status === 200) {
            toast.success("Product Updated Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        } else {
            console.log(response);
            
            toast.error("Product Could Not Be Updated", { id: addToast })
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }

}

export const DELETE_PRODUCT = async (id: string, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Deleting Product...")
    try {
        const response = await Axios({
            method: "DELETE",
            url: `/product/drop/${id}`,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            toast.success("Product Deleted Successfully", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        }
    } catch (error: any) {
        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }

}

export const ADD_IMAGE_TO_PRODUCT = async (id: string, imageData: any, token: string, callback?: (data: any) => void) => {
    const addToast = toast.loading("Uploading Images...")
    try {
        const formData = new FormData()
        for (let i = 0; i < imageData.length; i++) {
            formData.append("images", imageData[i])
        }
        console.log(formData);

        const response = await Axios({
            method: "PUT",
            url: `/product/upload/${id}`,
            data: {
                images: formData
            },
            headers: {
                "Accept": "*/*",
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            toast.success("Images added to product", { id: addToast })
            if (callback) {
                callback(response.data)
            }
        }
    }
    catch (error: any) {
        console.log(error.message);
        console.log(error.message);

        toast.error(
            error?.response?.data?.message || error?.message || "Check console for error", { id: addToast }
        );
    }
}