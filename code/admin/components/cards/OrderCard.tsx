import { Order } from '@/types'
import { formatDate } from '@/utils/functions'
import React, { useState } from 'react'
import ProductColor from '../products/ProductColor'
import OrderStatusTag from '../tag/OrderStatusTag'
import { useStateValue } from '@/redux/StateProvider'
import { GET_ALL_ORDERS, UPDATE_ORDER_STATUS } from '@/utils/server/auth'
import { toast } from 'react-hot-toast'

const OrderCard = ({ order }: { order: Order }) => {
    const [{ user, colors, orders }, dispatch] = useStateValue()
    const [showActions, setShowActions] = useState(false)
    const [showMore, setShowMore] = useState(false)

    // console.log(user.token);


    const handleUpdateOrder = (status: string) => {
        if (!user || !user.token) {
            toast.error("Please login first")
            return
        }

        if (!order._id) {
            toast.error("Please choose an order to update")
            return
        }

        if (!status) {
            toast.error("Please choose a status")
            return
        }

        UPDATE_ORDER_STATUS(order._id, status, user.token, (data: any) => {
            setShowActions(false)
            GET_ALL_ORDERS(user.token, (data: any) => {
                // re render the order card
                dispatch({
                    type: "SET_ORDERS",
                    payload: data.data,
                })

            })

        })
    }

    return (
        <article className='bg-white w-full rounded-lg p-4 md:p-8 flex flex-col gap-4 shadow-md overflow-hidden' key={order._id}>
            <div className='flex items-start gap-4 justify-between'>
                <div className='max-'>
                    <p className='font-medium'>
                        {order.orderby.firstname} {order.orderby.lastname}
                    </p>
                    <p className='text-sm'>
                        {order.orderby.mobile}
                    </p>
                    <p className='text-sm'>
                        {order.orderby.email}
                    </p>
                </div>
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
            {
                showMore &&
                <div className=' border-t flex py-1 pt-2 text-sm flex-col gap-2'>
                    <div className='flex flex-col '>
                        <p className='text-xs font-medium'>Address:</p>
                        <p className=''>
                            {
                                order.orderby.address
                            }
                        </p>
                    </div>
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
            }
            {
                showActions && (
                    <div className='flex flex-col'>
                        <div className='cursor-pointer py-2 border-b' onClick={() => handleUpdateOrder("Not Processed")}>
                            Not Processed
                        </div>
                        <div className='cursor-pointer py-2 border-b' onClick={() => handleUpdateOrder("Processing")}>
                            Processing
                        </div>
                        <div className='cursor-pointer py-2 border-b' onClick={() => handleUpdateOrder("Dispatched")}>
                            Dispatched
                        </div>
                        <div className='cursor-pointer py-2 border-b' onClick={() => handleUpdateOrder("Cancelled")}>
                            Cancelled
                        </div>
                        <div className='cursor-pointer py-2 border-b' onClick={() => handleUpdateOrder("Delivered")}>
                            Delivered
                        </div>
                    </div>
                )
            }
            <div className='flex items-center gap-4 w-full'>

            <button onClick={() => setShowMore((prev) => !prev)} className='mt-auto text-white w-full bg-neon-blue rounded-lg py-3'>
                {
                    showMore ? "Show Less" : "Show More"
                }
            </button>
            <button onClick={() => setShowActions((prev) => !prev)} className='mt-auto text-white w-full bg-oxford-blue rounded-lg py-3'>
                {
                    showActions ? "Cancel" : "Update Status"
                }
            </button>
            </div>


        </article>
    )
}

export default OrderCard