import { fetchUser } from "@/hooks/fetchLocalStorageData";

const userInfo = fetchUser();

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
}

export default initialState;