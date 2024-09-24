import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import OrdersTable from '@/components/tables/OrdersTable'
import React from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'

const Orders = () => {
  return (
    <Layout title='Orders'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
        <div className='flex flex-col gap-1  '>
          <h1 className='font-medium text-4xl text-oxford-blue'>
            Orders
          </h1>
          <p className='text-sm text-gray-500'>
            Requests for your services
          </p>
        </div>
        
      </div>
      <section className='flex flex-col gap-4'>
        
        <OrdersTable />
      </section> 
    </Layout>
  )
}

export default Orders