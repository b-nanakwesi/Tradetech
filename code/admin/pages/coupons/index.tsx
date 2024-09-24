import NoData from '@/components/NoData'
import CouponCard from '@/components/cards/CouponCard'
import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import { useStateValue } from '@/redux/StateProvider'
import { Coupon } from '@/types'
import { GET_ALL_COUPONS } from '@/utils/server/coupons'
import React, { useEffect, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'

const Coupons = () => {
  const [{ user, coupons }, dispatch] = useStateValue()
  const [searchKey, setSearchKey] = useState('')
  const [filteredCoupons, setFilteredCoupons] = useState(coupons)

  const handleSearch = (e: any) => {
    e.preventDefault()
    setSearchKey(e.target.value)
    setFilteredCoupons(coupons.filter((coupon: any) => {
      return coupon.name.toLowerCase().includes(e.target.value.toLowerCase())
    }))
  }

  useEffect(() => {
    if (coupons.length === 0) {
      GET_ALL_COUPONS((data: any) => {
        dispatch({
          type: "SET_COUPONS",
          payload: data.data
        })
      })
    }
  }, []);

  return (
    <Layout title='Coupons'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
        <div className='flex flex-col gap-1  '>
          <h1 className='font-medium text-4xl text-oxford-blue'>
            Coupons
          </h1>
          <p className='text-sm text-gray-500'>
            Discounts for your customers
          </p>
        </div>
        <div className='w-full max-w-md border rounded-lg '>
          <input type="text" value={searchKey} onChange={handleSearch} placeholder='Search' className='w-full px-4 py-3 rounded-lg focus:outline-none' />
        </div>
        <div className='flex items-center gap-2'>
          <OxfordLink label="Add Coupon" url="/coupons/new" icon={BsPlusCircleFill} />
        </div>
      </div>
      {
        searchKey === "" ? <>
          <div className='flex flex-col '>
            {
              coupons.length === 0 ? <>
                <NoData />
              </> : <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 '>
                {
                  coupons.map((coupon: Coupon) => (
                    <CouponCard key={coupon._id} coupon={coupon} />
                  ))
                }
              </div>
            }
          </div>
        </> : <>
          <div className='flex flex-col '>
            {
              filteredCoupons.length === 0 ? <>
                <NoData />
              </> : <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 '>
                {
                  filteredCoupons.map((coupon: Coupon) => (
                    <CouponCard key={coupon._id} coupon={coupon} />
                  ))
                }
              </div>
            }
          </div>
        </>
      }

    </Layout>
  )
}

export default Coupons