import React from 'react'
import Layout from '@/components/layout/Layout'
import EnquiryTable from '@/components/tables/EnquiryTable'

const Enquiries = () => {

 
  
  
  return (
    <Layout title='Enquiries'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
        <div className='flex flex-col gap-1  '>
          <h1 className='font-medium text-4xl text-oxford-blue'>
            Enquiries
          </h1>
          <p className='text-sm text-gray-500'>
            People reaching out to you
          </p>
        </div>
        <div className='w-full max-w-md border rounded-lg '>
          <input type="text" placeholder='Search' className='w-full px-4 py-3 rounded-lg focus:outline-none' />
        </div>
        <div className='flex items-center gap-2'>
        </div>
      </div>
      <section className='flex flex-col gap-4'>
        
        <EnquiryTable />
      </section>
    </Layout>
  )
}

export default Enquiries