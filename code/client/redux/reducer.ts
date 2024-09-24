import { Action, State } from "@/types";

const actionTypes = {
    SET_USER: "SET_USER",
    ADD_ORDER: "ADD_ORDER",
    SET_ORDERS: "SET_ORDERS",
    SET_PRODUCTS: "SET_PRODUCTS",
    SET_CART: "SET_CART",
    SET_CATEGORIES: "SET_CATEGORIES",
    SET_COUPONS: "SET_COUPONS",
    SET_BRANDS: "SET_BRANDS",
    SET_COLORS: "SET_COLORS",
    SET_WISHLIST: "SET_WISHLIST",
    SET_COMPARE: "SET_COMPARE",
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        case actionTypes.ADD_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.payload],
            }
        case actionTypes.SET_ORDERS: 
            return {
                ...state,
                orders: action.payload
            }
        case actionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case actionTypes.SET_CART:
            return {
                ...state,
                cart: action.payload
            }
        case actionTypes.SET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case actionTypes.SET_COUPONS:
            return {
                ...state,
                coupons: action.payload
            }
        case actionTypes.SET_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        case actionTypes.SET_COLORS:
            return {
                ...state, 
                colors: action.payload
            }
        case actionTypes.SET_WISHLIST: 
            return {
                ...state,
                wishlist: action.payload
            }
        case actionTypes.SET_COMPARE:
            return {
                ...state,
                compareItems: action.payload
            }
    }
}

export default reducer;