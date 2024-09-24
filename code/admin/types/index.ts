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

export type SelectType = {
    value: string
    label: string
}


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

export type CartProduct = {
    product: Product
    count: number
    color: string
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
    orderby: User
    products: CartProduct[]
    paymentIntent: PaymentIntent
    orderStatus: string
    createdAt?: string
    updatedAt?: string
}