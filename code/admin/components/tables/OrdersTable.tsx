import { useStateValue } from '@/redux/StateProvider';
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/utils/functions'
import { Order } from '@/types';
import { GET_ALL_ORDERS } from '@/utils/server/auth';
import ProductColor from '../products/ProductColor';
import OrderStatusTag from '../tag/OrderStatusTag';
import NoData from '../NoData';
import BouncingBalls from '../loaders/bouncingballs/BouncingBalls';
import OrderCard from '../cards/OrderCard';



const OrdersTable = () => {
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
            case "processing":
                setFilterResults(orders.filter((order: Order) => {
                    return order.orderStatus === "Processing"
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
            GET_ALL_ORDERS(user.token, (data: any) => {
                console.log(data.data);

                dispatch({
                    type: "SET_ORDERS",
                    payload: data.data,
                })
                setFilterResults(data.data)
            })
        }
    }, [user]);

    return (
        <>
            <select onChange={(e) => handleFilter(e)} className='white-input-box max-w-lg mb-4' name="filter" id="">
                <option value="all">Filter by: All</option>
                <option value="not-processed">Not Processed</option>
                <option value="cash-on-delivery">Pending</option>
                <option value="processing">Processing</option>
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
                            <section className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
                                {
                                            filterResults.map((order: Order) => <OrderCard key={order._id} order={order} />
                                    )
                                }
                            </section>
                        )
                    }
                </>
            }
        </>
    )
};


export default OrdersTable