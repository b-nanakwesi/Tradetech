import NoData from '@/components/NoData'
import BrandCard from '@/components/cards/BrandCard'
import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import { useStateValue } from '@/redux/StateProvider'
import { Brand } from '@/types'
import { GET_ALL_BRANDS } from '@/utils/server/brand'
import React, { useEffect, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'

const Brands = () => {
  const [{ user, brands }, dispatch] = useStateValue();
  const [searchKey, setSearchKey] = useState('');
  const [filteredBrands, setFilteredBrands] = useState(brands);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchKey(e.target.value);
    setFilteredBrands(brands.filter((brand: Brand) => {
      return brand.title.toLowerCase().includes(e.target.value.toLowerCase())
    }))
  }

  useEffect(() => {
    if (brands.length === 0) {
      GET_ALL_BRANDS((data: any) => {
        dispatch({
          type: "SET_BRANDS",
          payload: data.data,
        })
      })
    }
  }, [brands]);
  return (
    <Layout title='Brands'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
        <div className='flex flex-col gap-1  '>
          <h1 className='font-medium text-4xl text-oxford-blue'>
            Brands
          </h1>
          <p className='text-sm text-gray-500'>
            Product Brands and their details
          </p>
        </div>
        <div className='w-full max-w-md border rounded-lg '>
          <input type="text" value={searchKey} onChange={handleSearch} placeholder='Search' className='w-full px-4 py-3 rounded-lg focus:outline-none' />
        </div>
        <div className='flex items-center gap-2'>
          <OxfordLink label="Add Brand" url="/brands/new" icon={BsPlusCircleFill} />
        </div>
      </div>
      {
        searchKey === "" ? <>
          {
            brands && brands.length > 0 ?
              <section className='grid mt-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {
                  brands.map((brand: Brand) => (
                    <BrandCard key={brand._id} brand={brand} />
                  ))
                }
              </section>
              : <div>
                <NoData />
              </div>
          }
        </> : <>
          {
            filteredBrands && filteredBrands.length > 0 ?
              <section className='grid mt-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {
                  filteredBrands.map((brand: Brand) => (
                    <BrandCard key={brand._id} brand={brand} />
                  ))
                }
              </section>
              : <div>
                <NoData />
              </div>
          }
        </>
      }

    </Layout>
  )
}

export default Brands