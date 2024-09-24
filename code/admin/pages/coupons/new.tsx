import AddCouponForm from '@/components/forms/AddCouponForm'
import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import React from 'react'
import { BsEyeFill } from 'react-icons/bs'

const NewCoupon = () => {
  return (
      <Layout title='New Coupon'>
          <div className='absolute bottom-4 right-4'>
                <OxfordLink label="View Coupons" url="/coupons" icon={BsEyeFill} />
            </div>

            <section className='flex items-center justify-center h-full'>
                <div className='w-full max-w-lg gap-8 flex-col flex'>
                    <h1 className='font-medium text-4xl text-center text-oxford-blue'>
                        Add New Coupon
                    </h1>
                    <AddCouponForm />
                </div>
            </section>
    </Layout>
  )
}

export default NewCoupon