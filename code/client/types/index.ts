export type Action = {
    type: string;
    payload: any;
  };
  
export type State = {
    user: any;
    users: any[];
    orders: any[];
    products: any[];
    enquiries: any[];
    categories: any[];
    brands: any[];
    colors: any[];
    coupons: any[];
};
  
export type ServerCallback = (data: any) => void;
export type ServerSetLoading = (loadState: boolean) => void;

export type Product = {
  _id: string
  title: string
  slug: string
  description: string
  price: number
  category?: string
  brand?: string
  quantity?: number
  sold?: number
  state: string
  color?: string[]
  totalrating?: string
  images?: {
    public_id: string
    url: string
  }[]
  ratings?: []
  createdAt?: string
  updatedAt?: string
}

export type User = {
  _id: string
  firstname: string
  lastname: string
  email: string   
  token: string
  mobile: string
  password?: string
  role?: string
  cart?: []
  wishlist?: []
  address?: string
  isBlocked?: boolean
  createdAt?: string
  refreshToken?: string
  updatedAt?: string
  __v?: number
}

export type Enquiry = {
  id: string
  name: string
  email: string
  mobile: string
  comment: string
  status: "Submitted" | "Contacted" | "In Progress" | "Resolved" | string
  createdAt?: string
  updatedAt?: string
}

export type Color = {
  _id: string
  title: string
  createdAt?: string
  updatedAt?: string
}

export type Brand = {
  _id: string
  title: string
  createdAt?: string
  updatedAt?: string
}

export type Category = {
  _id: string
  title: string
  createdAt?: string
  updatedAt?: string
}

export type Coupon = {
  _id: string
  name: string
  expiry: Date
  discount: number
  createdAt?: string
  updatedAt?: string
}

export type CartProduct = {
  product: Product
  count: number
  color: string
}

export type TotalCart = {
  _id: string
  cartTotal: string
  orderby: string
  products: CartProduct[]
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export type PaymentIntent = {
  id: string
  method: string
  status: string
  currency: string
  amount: string
  created: any
}

export type Order = {
  _id: string
  orderStatus: string
  products: CartProduct[]
  orderby: User
  paymentIntent: PaymentIntent
  createdAt?: string
  updatedAt?: string
  __v?: number
}

export type Rating = {
  productId: string
  star: number
  comment: string
}