import ProgressBar from '@/components/ProgressBar';
import ProgressLine from '@/components/ProgressLine';
import InfoGraph from '@/components/cards/InfoGraph'
import Layout from '@/components/layout/Layout'
import { useStateValue } from '@/redux/StateProvider';
import { Enquiry, Order } from '@/types';
import { useEffect, useState } from 'react';
import { BsApple, BsDatabaseFill, BsPaletteFill, BsTicketFill } from 'react-icons/bs';
import { FaClipboardList, FaUsers } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Home() {
  const [{ user, colors, orders, users, products, enquiries, coupons, brands }, dispatch] = useStateValue();
  const [deliveredPercentage, setDeliveredPercentage] = useState(0);
  const [notProcessedPercentage, setNotProcessedPercentage] = useState(0);
  const [processingPercentage, setProcessingPercentage] = useState(0);
  const [dispatchedPercentage, setDispatchedPercentage] = useState(0);
  const [cancelledPercentage, setCancelledPercentage] = useState(0);
  const [resolvedPercentage, setResolvedPercentage] = useState(0);
  // console.log(products.length);


  // console.log(orders.length);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const deliveredOrders = orders.filter((order: Order) => order.orderStatus === 'Delivered');
      const notProcessedOrders = orders.filter((order: Order) => order.orderStatus === 'Not Processed');
      const cashOnDeliveryOrders = orders.filter((order: Order) => order.orderStatus === 'Cash on Delivery');
      const processingOrders = orders.filter((order: Order) => order.orderStatus === 'Processing');
      const dispatchedOrders = orders.filter((order: Order) => order.orderStatus === 'Dispatched');
      const cancelledOrders = orders.filter((order: Order) => order.orderStatus === 'Cancelled');


      if (deliveredOrders.length === 0 || orders.length === 0) {
        setDeliveredPercentage(0)
      } else {
        setDeliveredPercentage((deliveredOrders.length / orders.length) * 100);
      }

      if (orders.length === 0) {
        setNotProcessedPercentage(0)
      } else {
        if (notProcessedOrders.length === 0 && cashOnDeliveryOrders === 0) {
          setNotProcessedPercentage(0)
        } else {
          setNotProcessedPercentage(((notProcessedOrders.length + cashOnDeliveryOrders.length) / orders.length) * 100);
        }
      }

      if (processingOrders.length === 0 || orders.length === 0) {
        setProcessingPercentage(0)
      } else {
        setProcessingPercentage((processingOrders.length / orders.length) * 100)
      }

      if (dispatchedOrders.length === 0 || orders.length === 0) {
        setDispatchedPercentage(0)
      } else {
        setDispatchedPercentage((dispatchedOrders.length / orders.length) * 100)
      }

      if (cancelledOrders.length === 0 || orders.length === 0) {
        setCancelledPercentage(0)
      } else {
        setCancelledPercentage((cancelledOrders.length / orders.length) * 100)
      }



    }
  }, [orders]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const resolvedEnquiries = enquiries.filter((enq: Enquiry) => enq.status === 'Resolved');
      if (resolvedEnquiries.length === 0 || enquiries.length === 0) {
        setResolvedPercentage(0)
      } else {
        setResolvedPercentage((resolvedEnquiries.length / enquiries.length) * 100);
      }

    }

  }, [enquiries]);



  return (
    <Layout title='Home'>
      <div className='flex flex-col gap-1  '>
        <h1 className='font-medium text-4xl text-oxford-blue'>
          Dashboard
        </h1>
        <p className='text-sm text-gray-500'>
          Here's your business at a glance
        </p>
      </div>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        <InfoGraph count={products.length || 0} title='Total Product' icon={BsDatabaseFill} />
        <InfoGraph count={orders.length || 0} title='Total Orders' icon={FaClipboardList} />
        <InfoGraph count={enquiries.length || 0} title='Total Enquiries' icon={MdEmail} />
        <InfoGraph count={users.length || 0} title='Total Users' icon={FaUsers} />


      </div>
      <div className='py-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
        <div className='w-full flex justify-center flex-col gap-10 bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 sone rounded-lg'>
          <h2 className='text-xl md:text-2xl text-gray-900 font-m '>
            Order Progress
          </h2>
          <div className='w-[50%] mx-auto'>

            <ProgressBar value={deliveredPercentage} />
          </div>
          <div className='w-full flex items-center justify-between gap-3'>

            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-[#ccc] rounded-full'>

              </div>
              Remaining
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-neon-blue rounded-full'>

              </div>
              Delivered
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center flex-col gap-10 bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 sone rounded-lg'>
          <h2 className='text-xl md:text-2xl text-gray-900 font-m '>
            Enquiries Progress
          </h2>
          <div className='w-[50%] mx-auto'>

            <ProgressBar value={resolvedPercentage} />
          </div>
          <div className='w-full flex items-center justify-between gap-3'>

            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-[#ccc] rounded-full'>

              </div>
              Remaining
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 bg-neon-blue rounded-full'>

              </div>
              Resolved
            </div>
          </div>
        </div>
        <div className='w-full flex justify-center flex-col gap-5 bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 sone rounded-lg'>
          <h2 className='text-xl md:text-2xl text-gray-900 font-m '>
            Order Statuses
          </h2>
          <div className='w-full flex flex-col gap-4 '>
            <ProgressLine label='Pending' value={notProcessedPercentage} color='#888' />
            <ProgressLine label='Processing' value={processingPercentage} color='rgb(250 204 21)' />
            <ProgressLine label='Dispatched' value={dispatchedPercentage} color='rgb(34 197 94)' />
            <ProgressLine label='Delivered' value={deliveredPercentage} color='rgb(124 58 237)' />
            <ProgressLine label='Cancelled' value={cancelledPercentage} color='rgb(239 68 68)' />

          </div>

        </div>
        <div className='flex flex-col gap-2'>
          <InfoGraph count={colors.length || 0} title='Total Colors' icon={BsPaletteFill} />
          <InfoGraph count={coupons.length || 0} title='Total Coupons' icon={BsTicketFill} />
          <InfoGraph count={brands.length || 0} title='Total Brands' icon={BsApple} />
        </div>

      </div>
    </Layout>
  )
}
