import { Action, State } from "@/types";

const actionTypes = {
  SET_USER: "SET_USER",
  ADD_USER: "ADD_USER",
  SET_USERS: "SET_USERS",
  SET_ORDERS: "SET_ORDERS",
  ADD_PRODUCT: "ADD_PRODUCT",
  SET_PRODUCTS: "SET_PRODUCTS",
  SET_ENQUIRIES: "SET_ENQUIRIES",
  ADD_CATEGORY: "ADD_CATEGORY",
  SET_CATEGORIES: "SET_CATEGORIES",
  ADD_BRAND: "ADD_BRAND",
  SET_BRANDS: "SET_BRANDS",
  ADD_COLOR: "ADD_COLOR",
  SET_COLORS: "SET_COLORS",
  ADD_COUPON: "ADD_COUPON",
  SET_COUPONS: "SET_COUPONS",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case actionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.SET_ENQUIRIES:
      return {
        ...state,
        enquiries: action.payload,
      };
    case actionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.ADD_BRAND:
      return {
        ...state,
        brands: [...state.brands, action.payload],
      };
    case actionTypes.SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case actionTypes.ADD_COLOR:
      return {
        ...state,
        colors: [...state.colors, action.payload],
      };
    case actionTypes.SET_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    case actionTypes.ADD_COUPON:
      return {
        ...state,
        coupons: [...state.coupons, action.payload],
      };
    case actionTypes.SET_COUPONS:
      return {
        ...state,
        coupons: action.payload,
      };
    

    default:
      return state;
  }
};

export default reducer;