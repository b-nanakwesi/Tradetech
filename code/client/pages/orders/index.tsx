import NoData from '@/components/NoData'
import OrderStatusTag from '@/components/OrderStatusTag'
import Authenticate from '@/components/authenticate'
import Layout from '@/components/layouts/Layout'
import BouncingBalls from '@/components/loaders/bouncingballs/BouncingBalls'
import ProductColor from '@/components/products/ProductColor'
import { useStateValue } from '@/redux/StateProvider'
import { Order } from '@/types'
import { formatDate } from '@/utils/functions'
import { GET_USER_ORDERS } from '@/utils/server/auth'
import React, { useEffect, useState } from 'react'

const Orders = () => {
    const [{ user, orders }, dispatch] = useStateValue()
    const [filterResults, setFilterResults] = useState(orders)

    const handleFilter = (e: any) => {
        switch (e.target.value) {
            case "all":
                setFilterResults(orders)
                break;

            case "not-processed":
                setFilterResults(orders.filter((order: Order) => {
                    return order.orderStatus === "Not Processed"
                }))
                break;

            case "cash-on-delivery":
                setFilterResults(orders.filter((order: Order) => {
                    return order.orderStatus === "Cash on Delivery"
                }))
                break;

            case "dispatched":
                setFilterResults(orders.filter((order: Order) => {
                    return order.orderStatus === "Dispatched"
                }))
                break;

            case "cancelled":
                setFilterResults(orders.filter((order: Order) => {
                    return order.orderStatus === "Cancelled"
                }))
                break;

            case "delivered":
                setFilterResults(orders.filter((order: Order) => {
                    return order.orderStatus === "Delivered"
                }))
                break;
            default:
                setFilterResults(orders)
        }

    }

    useEffect(() => {
        if (user && user.token) {
            GET_USER_ORDERS(user.token, (data) => {
                dispatch({
                    type: "SET_ORDERS",
                    payload: data.data,
                })
            })
        }
    }, [user]);


    return (
        <Layout title='Your Orders'>
            <Authenticate>
                <select onChange={(e) => handleFilter(e)} className='input-box max-w-lg mb-4' name="filter" id="">
                    <option value="all">Filter by: All</option>
                    <option value="not-processed">Not Processed</option>
                    <option value="cash-on-delivery">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="delivered">Delivered</option>
                </select>
                {
                    !filterResults ? <div className='w-full h-full flex items-center justify-center'>
                        <BouncingBalls />
                    </div> : <>
                        {
                            filterResults.length === 0 ? <>
                                <NoData />
                            </> : (
                                <section className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4'>
                                    {
                                        filterResults.map((order: Order, index: number) => (
                                            <article className='bg-white w-full rounded-lg p-4 md:p-8 flex flex-col gap-4 shadow-md overflow-hidden' key={order._id}>
                                                <div className='flex items-center justify-end'>
                                                    <OrderStatusTag status={order.orderStatus} />
                                                </div>
                                                <div className='flex items-center'>
                                                    {
                                                        order.products.slice(0, 5).map((data, i) => (
                                                            <div className='min-h-12 h-12 min-w-12 w-12' key={i}>
                                                                {data.product.images &&
                                                                    <img key={i} src={data.product.images[0].url} alt={data.product.title} className={`w-full h-full object-cover object-center rounded-full ${i === 0 ? "m-0" : `-ml-4 z-[1] `} `} />}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className='flex flex-col gap-1 border-b'>
                                                    <p className='text-sm '>Order Number</p>
                                                    <p className='font-medium  truncate pb-2'>
                                                        {order._id}
                                                    </p>
                                                </div>
                                                <div className='flex flex-col gap-2 '>

                                                    {
                                                        order.products.map((data, i) => (
                                                            <div key={i} className='w-full flex items-end justify-between'>
                                                                <div className='flex flex-col'>
                                                                    <p>

                                                                        {data.product.title}
                                                                    </p>
                                                                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                                                                        <p className='text-sm text-gray-500'>
                                                                            GHC  {data.product.price}
                                                                        </p>
                                                                        -

                                                                        <ProductColor id={data.color} />
                                                                    </div>
                                                                </div>
                                                                <p className='text-2xl font-medium'>
                                                                    x {data.count}
                                                                </p>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <div className=' border-t flex py-1 flex-col gap-2'>
                                                    <div className='flex gap-4 text-sm text-gray-600 items-center justify-between'>
                                                        <p className=''>
                                                            Total
                                                        </p>
                                                        <p className='font-medium text-xs text-night'>
                                                            GHC <span className='text-lg'>
                                                                {order.paymentIntent.amount}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className='flex gap-4 text-sm text-gray-600 items-center justify-between'>
                                                        <p className=''>
                                                            Order Type
                                                        </p>
                                                        <p className='font-medium text-night'>
                                                            {order.paymentIntent.method === "COD" ? "Cash on Delivery" : order.paymentIntent.method}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className=' border-t flex py-1 text-sm flex-col gap-2'>
                                                    <div className='flex flex-col '>
                                                        <p className='text-xs font-medium'>Created At:</p>
                                                        <p className=''>
                                                            {formatDate(order.createdAt, "long", "")}
                                                        </p>
                                                    </div>
                                                    <div className='flex flex-col '>
                                                        <p className='text-xs font-medium'>Updated At:</p>
                                                        <p className=''>
                                                            {formatDate(order.updatedAt, "long", "")}
                                                        </p>
                                                    </div>

                                                </div>


                                            </article>
                                        ))
                                    }
                                </section>
                            )
                        }
                    </>
                }



            </Authenticate>
        </Layout>
    )
}

export default Orders