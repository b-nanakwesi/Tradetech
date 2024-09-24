import { Product } from '@/types'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { BsHeart, BsHeartFill, BsShuffle, BsEye, BsBagPlus } from 'react-icons/bs'
import Rating from '@/components/Rating';
import Link from 'next/link';
import ProductCategory from '@/components/products/ProductCategory';
import ProductBrand from '@/components/products/ProductBrand';
import { useStateValue } from '@/redux/StateProvider';
import { useRouter } from 'next/router';
import { ADD_TO_WISHLIST } from '@/utils/server/products';
import { GET_USER_WISHLIST } from '@/utils/server/auth';
import { fetchCart } from '@/hooks/fetchLocalStorageData';

interface ProductCardProps {
    product: Product
    direction?: 'row' | 'column'
}

const ProductCardMain: React.FC<ProductCardProps> = ({ product, direction }) => {
    const [{ user, compareItems, cart, wishlist }, dispatch] = useStateValue()
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

    const router = useRouter()

    const [showActions, setShowActions] = useState(false)
    const [isLiked, setIsLiked] = useState(false)


    const addToWishlist = () => {
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
    const addToCart = () => {
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
    const previewProduct = () => {
        router.push(`/products/${_id}`)
    }
    const compareProduct = () => {


        if (typeof window !== "undefined") {
            const compareItems = JSON.parse(localStorage.getItem("compareItems") || "[]")
            const alreadyExists = compareItems.find((item: any) => item._id === product._id)
            if (alreadyExists) {
                toast.error(`${title} already exists in compare`)
            } else {
                if (compareItems.length >= 4) {
                    toast.error(`You can only compare 4 products`)
                } else {
                    compareItems.push(product)
                    localStorage.setItem("compareItems", JSON.stringify(compareItems))
                    dispatch({
                        type: "SET_COMPARE",
                        compare: compareItems
                    })
                    toast.success(`${title} added to compare`)
                }
            }

        }

        router.reload()


    }


    const showActionsHandler = () => {
        setShowActions(true)
    }
    const hideActionsHandler = () => {
        setTimeout(() => {
            setShowActions(false)
        }, 500)
    }

    useEffect(() => {
        const alreadyExists = wishlist.find((item: any) => item._id === product._id)
        if (alreadyExists) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [wishlist]);


    return (

        <article
            className={`
                    bg-white px-4 py-4 rounded-lg shadow-sm relative flex gap-4
                    ${direction === "row" ? "flex-row" : "flex-col"}
            `}
            onMouseEnter={showActionsHandler}
            onMouseLeave={hideActionsHandler}
        >
            <div className='relative gradient rounded-lg max-h-[250px] h-[250px]'>
                <img src={images && images.length > 0 ? images[0]?.url : "/images/placeholder-image.webp"} alt={slug} className=' rounded-lg w-full object-cover bg-white object-center h-full' />
                <div className='absolute top-0 right-0 flex flex-col gap-1'>
                    <button className='flex items-center justify-center hover:bg-saffron bg-black/60 text-white p-2 rounded-full transition duration-300' onClick={addToWishlist}>
                        {
                            isLiked ? <BsHeartFill /> : <BsHeart />
                        }
                    </button>
                    <div className='lg:hidden flex-col flex gap-1'>
                        <button className='flex items-center justify-center hover:bg-saffron bg-black/60 text-white p-2 rounded-full transition duration-300' onClick={compareProduct}>
                            <BsShuffle />
                        </button>
                        <button className='flex items-center justify-center hover:bg-saffron bg-black/60 text-white p-2 rounded-full transition duration-300' onClick={previewProduct}>
                            <BsEye />
                        </button>

                        <button className='flex items-center justify-center hover:bg-saffron bg-black/60 text-white p-2 rounded-full transition duration-300' onClick={addToCart}>
                            <BsBagPlus />
                        </button>
                    </div>
                    {
                        showActions && (
                            <div className='lg:flex flex-col hidden gap-1'>
                                <button className='flex items-center justify-center hover:bg-saffron bg-black/60 text-white p-2 rounded-full transition duration-300' onClick={compareProduct}>
                                    <BsShuffle />
                                </button>
                                <button className='flex items-center justify-center hover:bg-saffron bg-black/60 text-white p-2 rounded-full transition duration-300' onClick={previewProduct}>
                                    <BsEye />
                                </button>

                                <button className='flex items-center justify-center hover:bg-saffron bg-black/60 text-white p-2 rounded-full transition duration-300' onClick={addToCart}>
                                    <BsBagPlus />
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
            <Link href={`/products/${_id}`}>

                <div className='flex flex-col gap-2'>
                    <div className='text-neon-blue text-xs lg:text-sm'>
                        <ProductBrand id={brand || "No Brand"} />
                    </div>
                    <h3 className='text-night font-medium text-lg truncate'>{title}</h3>
                    <Rating rating={totalrating} />
                    <p>
                        GHC <span className='text-base '>{price.toString()}</span>
                    </p>
                </div>
            </Link>
        </article>

    )
}

export default ProductCardMain