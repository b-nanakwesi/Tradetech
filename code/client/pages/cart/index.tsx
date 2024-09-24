import NoData from '@/components/NoData'
import Authenticate from '@/components/authenticate'
import CartProductCard from '@/components/cards/product/CartProductCard'
import Layout from '@/components/layouts/Layout'
import BouncingBalls from '@/components/loaders/bouncingballs/BouncingBalls'
import { products } from '@/data/products'
import { fetchCart } from '@/hooks/fetchLocalStorageData'
import { useStateValue } from '@/redux/StateProvider'
import { Product } from '@/types'
import { CREATE_USER_CART, EMPTY_USER_CART, GET_USER_CART } from '@/utils/server/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { BiMinus } from 'react-icons/bi'
import { BsPlusLg } from 'react-icons/bs'
import { FiX } from 'react-icons/fi'

const Cart = () => {
    const [{ user, cart, products }, dispatch] = useStateValue()
    // const [newCart, setNewCart] = useState(cart)
    const [loading, setLoading] = useState(false)

    const router = useRouter()


    // const newCart = cart.map(item)

    const proceedToCheckout = () => {
        // check if user is logged in
        if (!user || !user.token) { 
            toast.error("Please login to continue")
            return 
        }

        // check if cart is empty
        if (!cart || cart.length === 0) { 
            toast.error("Cart is empty")
            return 
        }

        // create new cart
        const newCart = cart.map((item: any) => {
            return {
                _id: item.product._id,
                count: item.count,
                color: item.color
            }
        })

        CREATE_USER_CART(newCart, user.token, (data) => {
          
            router.push('/checkout')
        })
        
    }

    useEffect(() => {
        if (user && user.token) {
                setLoading(true)
                GET_USER_CART(user.token, (data) => {
                    if (!data.data || data.data === null) {
                        setLoading(false)
                        return
                    }
                    else {
                        setLoading(false)
                        router.push("/checkout")
                    }
                    
                })
            
        }
    }, [user]);

    return (
        <Layout title='Cart'>
            <Authenticate>
                {
                    loading ? <div className='w-full h-full flex items-center justify-center'>
                        <BouncingBalls />
                    </div> : <>
                    
                <section className='flex flex-col gap-4   h-full'>
                    {
                        !cart || cart.length === 0 ? <> <NoData /></> : <>

                            <div className='h-[60vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8 overflow-y-auto hide-scroll'>
                                {
                                    cart.map((data: any) => {
                                        const increment = () => {
                                            // update data.count in cart
                                            const updatedCart = cart.map((item: any) => {
                                                if (item.product._id === data.product._id) {
                                                    return { ...item, count: item.count + 1 }
                                                }
                                                return item
                                            })

                                            localStorage.setItem("cart", JSON.stringify(updatedCart))
                                            if (typeof window !== 'undefined') {
                                                const getCart = fetchCart()
                                                dispatch({
                                                    type: "SET_CART",
                                                    payload: getCart,
                                                })

                                            }

                                        }

                                        const decrement = () => {
                                            if (data.count > 1) {
                                                // update data.count in cart
                                                const updatedCart = cart.map((item: any) => {
                                                    if (item.product._id === data.product._id) {
                                                        return { ...item, count: item.count - 1 }
                                                    }
                                                    return item
                                                })

                                                localStorage.setItem("cart", JSON.stringify(updatedCart))
                                                if (typeof window !== 'undefined') {
                                                    const getCart = fetchCart()
                                                    dispatch({
                                                        type: "SET_CART",
                                                        payload: getCart,
                                                    })

                                                }
                                            }

                                        }

                                        const removeFromCart = () => {
                                            // update data.count in cart
                                            const updatedCart = cart.filter((item: any) => {
                                                return item.product._id !== data.product._id
                                            })

                                            localStorage.setItem("cart", JSON.stringify(updatedCart))
                                            if (typeof window !== 'undefined') {
                                                const getCart = fetchCart()
                                                dispatch({
                                                    type: "SET_CART",
                                                    payload: getCart,
                                                })

                                            }
                                        }

                                        return (
                                            <article className='bg-white flex h-max flex-col gap-2 p-4 rounded-lg' key={data.product._id}>
                                                <div className='h-[250px] rounded-lg w-full gradient relative overflow-hidden'>
                                                    <img src={data.product.images[0].url} alt="" className='w-full h-full object-cover' />
                                                    <button onClick={removeFromCart} className='bg-oxford-blue text-lg p-2 rounded-md text-white absolute top-0 right-0 z-10 '>
                                                        <FiX />

                                                    </button>
                                                </div>
                                                <p className='truncate text-lg font-medium'>
                                                    {data.product.title}
                                                </p>
                                                <p className='truncate'>
                                                    GHC{data.product.price}
                                                </p>
                                                <div className=' flex flex-row items-center justify-start  gap-6 '>
                                                    <button onClick={decrement} className=' p-2 bg-oxford-blue rounded-lg h-max text-white'>
                                                        <BiMinus className='text- ' />
                                                    </button>
                                                    <div className='flex items-center text-oxford-blue text-xl justify-center'>
                                                        {data.count}
                                                    </div>

                                                    <button onClick={increment} className=' p-2 bg-oxford-blue rounded-lg h-max text-white'>
                                                        <BsPlusLg className='text- ' />
                                                    </button>

                                                </div>

                                            </article>
                                        )
                                    })
                                }

                            </div>
                            <div className='flex  flex-col gap-2'>

                                <div className='flex flex-col  md:hidden'>


                                    <button onClick={proceedToCheckout} className='bg-oxford-blue w-full py-3 text-antiflash rounded-lg'>
                                        Checkout
                                    </button>

                                    <div className='flex py-2 w-full justify-center items-center gap-4'>
                                        or
                                    </div>
                                    <Link href='/products'>
                                        <button className='bg-neon-blue w-full py-3 text-antiflash rounded-lg'>
                                            Continue Shopping
                                        </button>
                                    </Link>
                                </div>
                                <div className='p-4 hidden md:flex items-center justify-between'>
                                    <Link href='/products'>
                                        <button className='bg-neon-blue w-max px-8 py-3 text-antiflash rounded-lg'>
                                            Continue Shopping
                                        </button>
                                    </Link>


                                    <button onClick={proceedToCheckout} className='bg-oxford-blue w-max px-8 py-3 text-antiflash rounded-lg'>
                                        Proceed to Checkout
                                    </button>


                                </div>
                            </div>
                        </>
                    }

                </section>
                    </>
                }

            </Authenticate>
        </Layout>
    )
}

export default Cart