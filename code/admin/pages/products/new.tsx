import AddProductForm from '@/components/forms/AddProductForm'
import Layout from '@/components/layout/Layout'
import NeonLink from '@/components/links/NeonLink'
import OxfordLink from '@/components/links/OxfordLink'
import React from 'react'

const NewProduct = () => {
  return (
      <Layout title='Create New Product'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
        <div className='flex flex-col gap-1  '>
          <h1 className='font-medium text-4xl text-oxford-blue'>
            Add New Product
          </h1>
         
        </div>
        <div className='flex items-center gap-2'>
          <OxfordLink label="View Products" url="/products"  />
          <NeonLink label="Add Color" url="/color/new" />
        </div>
      </div>
      <AddProductForm />
    </Layout>
  )
}

export default NewProduct