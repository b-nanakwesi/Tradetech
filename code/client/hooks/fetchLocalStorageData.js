export const fetchUser = () => {
    let userInfo = null
    if (typeof window !== 'undefined') {
        if (localStorage.getItem("user") !== undefined) {
            userInfo = JSON.parse(localStorage.getItem("user"))
        } else {
            localStorage.clear()
            userInfo = {}
        }
       
    }

    return userInfo
}

export const fetchCart = () => {
    let cartInfo = []
    if (typeof window !== "undefined") {
        cartInfo = localStorage.getItem("cart") !== "[]" ? JSON.parse(localStorage.getItem("cart")) : localStorage.clear()
    }
    return cartInfo
}

export const fetchWishlist = () => {
    let wishlistInfo = null
    if (typeof window !== "undefined") {
        wishlistInfo = localStorage.getItem("wishlist") !== "undefined" ? JSON.parse(localStorage.getItem("wishlist")) : localStorage.clear()
    }
}

export const fetchCompare = () => {
    let compareInfo = []
    if (typeof window !== "undefined") {
        compareInfo = localStorage.getItem("compareItems") !== "[]" ? JSON.parse(localStorage.getItem("compareItems")) : localStorage.clear()
    }
    return compareInfo
}