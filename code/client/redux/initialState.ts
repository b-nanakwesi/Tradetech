import { fetchCart, fetchUser, fetchCompare, fetchWishlist } from "@/hooks/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart()
const compareInfo = fetchCompare()

const initialState = {
    user: userInfo,
    users: [],
    orders: [],
    products: [],
    enquiries: [],
    categories: [],
    coupons: [],
    brands: [],
    colors: [],
    cart: cartInfo,
    wishlist: [],
    compareItems: compareInfo,
}

export default initialState;