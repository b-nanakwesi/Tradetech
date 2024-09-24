import { fetchCart } from '@/hooks/fetchLocalStorageData'
import { useStateValue } from '@/redux/StateProvider'
import { Product } from '@/types'
import { GET_USER_WISHLIST } from '@/utils/server/auth'
import { ADD_TO_WISHLIST } from '@/utils/server/products'
import React from 'react'
import { toast } from 'react-hot-toast'
import { FiX } from 'react-icons/fi'

interface ProductCardProps {
    product: Product
}


const WishlistCard: React.FC<ProductCardProps> = ({ product }) => {
    const [{user, cart}, dispatch] = useStateValue()
    const {
        title,
        _id,
        brand,
        category,
        description,
        price,
        slug,
        state,
        color,
        images,
        quantity,
        sold,
        totalrating
    } = product

    const removeProduct = () => {
        if (!user || !user.token) {
            toast.error("Please login to add to wishlist")
            return
        } 

        // check if item is already in wishlist
        

        ADD_TO_WISHLIST(_id, user.token, (data) => {
            if (user && user.token) {
                GET_USER_WISHLIST(user.token, (data) => {
                  dispatch({
                    type: "SET_WISHLIST",
                    payload: data.data.wishlist,
                  })
                })
              }
        })
    }

    const handleAddToCart = () => {
        if (typeof window !== "undefined") {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            const alreadyExists = cart.find((item: any) => item.product._id === product._id)

            if (alreadyExists) {
                // toast.error(`${title} already exists in cart`)
                // find the item and increase the quantity
                const updatedCart = cart.map((item: any) =>
                    item.product._id === product._id ? { ...item, count: item.count + 1 } : item
                )

                localStorage.setItem("cart", JSON.stringify(updatedCart))
                dispatch({
                    type: "SET_CART",
                    cart: updatedCart
                })
            } else {
                cart.push({
                    product: product,
                    count: 1,
                    color: product.color && product.color[0] ? product.color[0] : "",
                })
                localStorage.setItem("cart", JSON.stringify(cart))
                dispatch({
                    type: "SET_CART",
                    cart: cart
                })
                toast.success(`${title} added to cart`)
            }

        }
        if (typeof window !== 'undefined') {
            const getCart = fetchCart()
            dispatch({
                type: "SET_CART",
                payload: getCart,
            })

        }
    }

    return (
        <article className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm'>
            <div className='relative max-h-[250px] h-[250px] overflow-hidden'>
                <img src={images ? images[0].url : "/images/mac2.jpg"} alt={slug} className=' rounded-lg  w-full object-cover object-center h-full max-w-[250px] mx-auto ' />
                <button onClick={removeProduct} className='absolute bg-oxford-blue top-0 right-0 p-2 text-white rounded '>
                    <FiX />
                </button>

            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-lg font-medium flex-wrap'>
                    {title}
                </h3>
                <div>
                    GHC{price.toString()}
                </div>
            </div>
            <button onClick={handleAddToCart} className='py-3 rounded-lg text-white bg-oxford-blue' >
                Add To Cart
            </button>
        </article>
    )
}

export default WishlistCard