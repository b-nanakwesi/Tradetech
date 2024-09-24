import ClientOnly from '@/components/ClientOnly'
import Authenticate from '@/components/authenticate'
import AddressForm from '@/components/forms/AddressForm'
import Meta from '@/components/layouts/Meta'
import BouncingBalls from '@/components/loaders/bouncingballs/BouncingBalls'
import ProductBrand from '@/components/products/ProductBrand'
import { products } from '@/data/products'
import ToasterProvider from '@/providers/ToasterProvider'
import { useStateValue } from '@/redux/StateProvider'
import { TotalCart } from '@/types'
import { GET_USER_CART } from '@/utils/server/auth'
import { GET_ALL_BRANDS } from '@/utils/server/brand'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Checkout = () => {

    const [{ user, brands }, dispatch] = useStateValue()
    const [userCart, setUserCart] = useState<TotalCart | null>(null)

    useEffect(() => {
        if (user && user.token) {
            GET_USER_CART(user.token, (data) => {
                setUserCart(data.data)
            })
        }
    }, [user]);


    useEffect(() => {
        
        if (brands.length === 0) {
            GET_ALL_BRANDS((data: any) => {
              dispatch({
                type: "SET_BRANDS",
                payload: data.data,
              })
            })
          }
    }, []);


    return (
        <ClientOnly>
            <ToasterProvider />
            <Meta title='Checkout' />
            <Authenticate>
                <main className='w-full h-full flex flex-col-reverse lg:flex-row '>
                    <section className='min-h-screen flex items-center justify-center w-full bg-white p-4'>
                        <div className='max-w-lg w-full flex flex-col gap-6'>
                            <Link href='/'>
                                <Image src='/images/logoblack.png' alt='logo' width={120} height={100} />
                            </Link>
                            <div className='flex flex-col'>
                                <h3 className='text-lg'>
                                    Contact Information
                                </h3>
                                <p className='text-sm mt-2'>
                                    {user?.firstname} {user?.lastname}, {user?.email}, {user?.mobile}
                                </p>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <h3 className='text-lg'>
                                    Delivery Information
                                </h3>
                                <AddressForm />
                            </div>
                        </div>
                    </section>
                    <section className='lg:min-h-screen p-4 flex justify-center  py-10 bg-antiflash w-full'>
                        {
                            userCart === null ? <section className='flex items-center justify-center'>
                                <BouncingBalls />
                            </section> : <>

                                <div className="max-w-lg w-full flex flex-col gap-4 py-8 max-h-full overflow-y-auto hide-scroll h-full ">
                                    {
                                        userCart.products.map((data) => (
                                            <article className='grid gap-4 grid-cols-5' key={data.product._id}>
                                                <div className='border relative h-[70px] w-[70px] mx-auto rounded-lg '>
                                                    <div className='bg-white w-8 h-8 rounded-full -top-3 -right-3 absolute truncate shadow z-10 flex items-center justify-center font-medium text-gray-700'>
                                                            {data.count}
                                                    </div>
                                                    <img src={data.product.images && data.product.images[0].url} alt='' className='w-full h-full object-cover border gradient rounded-lg' />
                                                </div>
                                                <div className='col-span-3 flex flex-col gap-1 justify-center truncate'>
                                                    <p className='truncate'>
                                                        {data.product.title}
                                                    </p>
                                                    <ProductBrand id={data.product.brand || ""} classname='text-sm text-gray-600' />
                                                    
                                                </div>
                                                <div className='flex items-center'>
                                                    <p>
                                                        GHC  {data.product.price}
                                                    </p>
                                                </div>
                                            </article>
                                        ))
                                    }
                                    <div className='flex items-center py-4 px-6 justify-between mt-2 border-t border-oxford-blue/50'>
                                        <h3 className='font-medium'>Total</h3>
                                        <h3 className='font-medium text-xl flex gap-2 items-end'><span className='text-sm text-gray-600'>GHC</span>
                                            {userCart?.cartTotal}
                                        </h3>
                                    </div>

                                </div>
                            </>
                        }
                    </section>
                </main>
            </Authenticate>
        </ClientOnly>
    )
}

export default Checkout