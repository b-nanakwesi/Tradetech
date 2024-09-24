export type ProductImage = {
    public_id: string
    url: string
}

export type ProductRating = {
    star: Number
    comment: string
    postedby: any

}

export type Product = {
    _id: string
    title: string
    slug: string
    description: string
    price: Number
    category: string
    brand: string
    quantity?: Number
    sold?: Number
    state: string
    images?: ProductImage[]
    color?: string[]
    totalrating?: string
    discount?: Number
}