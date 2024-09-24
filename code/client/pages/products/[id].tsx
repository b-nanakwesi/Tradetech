import ImageZoom from '@/components/ImageZoom'
import Rating from '@/components/Rating'
import OxfordPrimary from '@/components/buttons/OxfordPrimary'
import ReviewCard from '@/components/cards/ReviewCard'
import ProductCardMain from '@/components/cards/product/ProductCardMain'
import RatingForm from '@/components/forms/RatingForm'
import Layout from '@/components/layouts/Layout'
import ProductBrand from '@/components/products/ProductBrand'
import ProductCategory from '@/components/products/ProductCategory'
import ProductColor from '@/components/products/ProductColor'
import { reviews } from '@/data/review'
import { fetchCart } from '@/hooks/fetchLocalStorageData'
import { useStateValue } from '@/redux/StateProvider'
import { Product } from '@/types'
import { GET_USER_WISHLIST } from '@/utils/server/auth'
import { GET_COLOR_BY_ID } from '@/utils/server/color'
import { ADD_TO_WISHLIST, GET_PRODUCT_BY_ID } from '@/utils/server/products'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsHeart, BsHeartFill, BsShuffle, BsEye, BsBagPlus } from 'react-icons/bs'


const SingleProduct = () => {
    const router = useRouter()
    const { id } = router.query

    const [{ user, products, wishlist }, dispatch] = useStateValue()

    const [currentProduct, setCurrentProduct] = useState<any>(null)

    const [count, setCount] = useState(1)
    const [isLiked, setIsLiked] = useState(false)

    const addToWishlist = () => {
        if (!user || !user.token) {
            toast.error("Please login to add to wishlist")
            return
        }

        // check if item is already in wishlist
        if (!currentProduct) {
            toast.error("Something went wrong")
            return
        }

        ADD_TO_WISHLIST(currentProduct._id, user.token, (data) => {
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
        if (typeof window !== "undefined" && currentProduct) {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            const alreadyExists = cart.find((item: any) => item.product._id === currentProduct._id)

            if (alreadyExists) {
                // toast.error(`${title} already exists in cart`)
                // find the item and increase the quantity
                const updatedCart = cart.map((item: any) =>
                    item.product._id === currentProduct._id ? { ...item, count: item.count + count } : item
                )

                localStorage.setItem("cart", JSON.stringify(updatedCart))
                dispatch({
                    type: "SET_CART",
                    cart: updatedCart
                })
            } else {
                cart.push({
                    product: currentProduct,
                    count: count,
                    color: currentProduct.color && currentProduct.color[0] ? currentProduct.color[0] : "",
                })
                localStorage.setItem("cart", JSON.stringify(cart))
                dispatch({
                    type: "SET_CART",
                    cart: cart
                })
                toast.success(`${currentProduct.title} added to cart`)
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

    const compareProduct = () => {


        if (typeof window !== "undefined") {
            const compareItems = JSON.parse(localStorage.getItem("compareItems") || "[]")
            const alreadyExists = compareItems.find((item: any) => item._id === currentProduct._id)
            if (alreadyExists) {
                toast.error(`${currentProduct.title} already exists in compare`)
            } else {
                if (compareItems.length >= 4) {
                    toast.error(`You can only compare 4 products`)
                } else {
                    compareItems.push(currentProduct)
                    localStorage.setItem("compareItems", JSON.stringify(compareItems))
                    dispatch({
                        type: "SET_COMPARE",
                        compare: compareItems
                    })
                    toast.success(`${currentProduct.title} added to compare`)
                }
            }

        }

        router.reload()


    }

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    useEffect(() => {
        if (id) {
            GET_PRODUCT_BY_ID(id as string, (data: any) => {
                setCurrentProduct(data)
            })
        }
    }, [id]);

    useEffect(() => {
        if (!id) return
        const alreadyExists = wishlist.find((item: any) => item._id === id)
        if (alreadyExists) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [wishlist, id]);


    return (
        <Layout title={currentProduct && currentProduct.title ? currentProduct.title : "Product"}>
            {
                currentProduct ? <>
                    <section className='bg-white px-4 md:px-8 py-8 rounded-lg grid gap-6 grid-cols-1 md:grid-cols-2'>
                        <div className='w-full overflow-hidden  h-full  min-h-[200px] lg:min-h-[370px] rounded-lg'>
                            {
                                currentProduct.images && currentProduct.images.length > 0 && <ImageZoom src={currentProduct.images[0].url} />
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h3 className='truncate font-medium text-2xl'>

                                {currentProduct?.title || "Product"}
                            </h3>
                            <hr />
                            <p>
                                GHC{currentProduct?.price || 0}
                            </p>
                            <div className='flex items-center gap-4'>

                                <Rating rating={Number(currentProduct.totalrating)} /> <span className='text-xs text-gray-500'>{currentProduct.ratings?.length} {currentProduct.ratings?.length === 1 ? "review" : "reviews"}</span>
                            </div>
                            <Link href='#reviews' className='text-gray-500 text-sm' >
                                Write a review
                            </Link>
                            <hr />
                            <div className='flex items-center py-2 gap-4'>
                                <p className='font-medium'>Brand: </p>
                                <ProductBrand id={currentProduct?.brand || "Brand"} />
                                
                            </div>
                            <div className='flex items-center py-2 gap-4'>
                                <p className='font-medium'>Colors: </p>
                                <div className='flex items-center gap-2'>
                                    {
                                        currentProduct?.color && currentProduct?.color.length > 0 ? currentProduct?.color.map((color: string) => (
                                            <ProductColor id={color} key={color} />
                                        )) : <p>
                                            No colors available
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className='flex items-center py-2 gap-4'>
                                <p className='font-medium'>Availability: </p>
                                <p>
                                    {
                                        currentProduct?.quantity && currentProduct?.quantity > 0 ? "In stock" : "Out of stock"
                                    }
                                </p>
                            </div>
                            <div className='flex items-center py-2 gap-4'>
                                <p className='font-medium'>Category: </p>
                                <ProductCategory id={currentProduct?.category || "Category"} />
                               
                            </div>
                            <div className='flex items-center py-2 gap-4'>
                                <p className='font-medium'>Quantity: </p>
                                <div className='flex items-center gap-3'>
                                    <button onClick={decrement} disabled={count === 1} className='text-3xl disabled:bg-saffron/70  text-white bg-saffron  w-10 rounded-full flex-items-center justify-center  h-10'>
                                        -
                                    </button>
                                    <p className='text-xl'>
                                        {count}
                                    </p>
                                    <button onClick={increment} className='text-2xl text-white bg-saffron  w-10 rounded-full flex-items-center justify-center  h-10'>
                                        +
                                    </button>
                                </div>
                            </div>
                            <OxfordPrimary label='ADD TO CART' onClick={addToCart} />
                            <div className='flex  items-center py-2 gap-4'>
                                <button className='flex items-center gap-2' onClick={addToWishlist}>
                                    {
                                        isLiked ? <BsHeartFill /> : <BsHeart />
                                    }
                                    {
                                        isLiked ? "Remove from wishlist" : "Add to wishlist"
                                    }
                                </button>
                                <button className='flex items-center gap-2' onClick={compareProduct}>
                                    <BsShuffle />
                                    Add to compare
                                </button>
                            </div>

                        </div>

                    </section>
                    <section className='py-16 flex flex-col gap-4'>
                        <h3 className='font-medium text-3xl text-night'>Description</h3>
                        <div className='p-4 md:p-8 bg-white rounded-lg text-sm '>
                            {
                                currentProduct?.description || "No description"
                            }
                        </div>
                    </section>
                    <section id='reviews' className='py-8 flex flex-col gap-4'>
                        <h3 className='font-medium text-3xl text-night'>Reviews</h3>
                        <div className='p-4 md:p-8 flex flex-col gap-8 bg-white rounded-lg text-sm '>
                            {
                                currentProduct &&
                                <RatingForm productId={currentProduct._id} />
                            }
                            <div className='flex flex-col gap-4'>
                                <h3 className='font-medium text-xl text-night'>Other Reviews</h3>
                                <div className='flex flex-col gap-2'>
                                    {
                                        currentProduct?.ratings.length > 0 ? currentProduct?.ratings.map((review: any) => (
                                            <ReviewCard key={review._id} review={review} />
                                        )) : <p>
                                            No reviews
                                        </p>
                                    }

                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='py-10 flex flex-col gap-8'>
                        <h3 className='font-medium text-3xl text-night'>You May Also Like</h3>
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                            {


                                products.slice(0, 5).map((data: Product) => (
                                    <ProductCardMain product={data} key={data._id} />
                                ))
                            }
                        </div>
                    </section>
                </> : <>

                    <section className='bg-white px-4 md:px-8 py-8 rounded-lg grid gap-6 grid-cols-1 md:grid-cols-2'>
                        <div className='w-full overflow-hidden gradient  h-full min-h-[200px] lg:min-h-[370px] rounded-lg'>

                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='w-[80%] gradient h-10 rounded-lg' />
                            <hr />
                            <div className='w-[20%] gradient h-5 rounded-lg' />

                            <div className='flex items-center gap-4'>

                                <Rating rating={0} /> <span className='text-xs text-gray-500'>0 reviews</span>
                            </div>
                            <Link href='#reviews' className='text-gray-500 text-sm' >
                                Write a review
                            </Link>
                            <hr />
                            <div className='w-[40%] gradient h-8 rounded-lg' />
                            <div className='w-[50%] gradient h-8 rounded-lg' />
                            <div className='w-[40%] gradient h-8 rounded-lg' />
                            <div className='w-[50%] gradient h-8 rounded-lg' />
                            <div className='w-[80%] gradient h-8 rounded-lg' />
                            <div className='w-[50%] gradient h-5 rounded-lg' />




                        </div>

                    </section>
                    <section className='py-16 flex flex-col gap-4'>
                        <h3 className='font-medium text-3xl text-night'>Description</h3>
                        <div className='p-4 md:p-8 bg-white rounded-lg text-sm '>
                            <div className='w-[90%] gradient h-12 rounded-lg' />
                        </div>
                    </section>
                    <section id='reviews' className='py-8 flex flex-col gap-4'>
                        <h3 className='font-medium text-3xl text-night'>Reviews</h3>
                        <div className='p-4 md:p-8 flex flex-col gap-8 bg-white rounded-lg text-sm '>

                            {/* <RatingForm  /> */}
                            
                        </div>
                    </section>
                    <section className='py-10 flex flex-col gap-8'>
                        <h3 className='font-medium text-3xl text-night'>You May Also Like</h3>
                        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                            {


                                products.slice(0, 5).map((data: Product) => (
                                    <ProductCardMain product={data} key={data._id} />
                                ))
                            }
                        </div>
                    </section>
                </>
            }
        </Layout>
    )
}

export default SingleProduct