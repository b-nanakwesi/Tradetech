import NoData from '@/components/NoData'
import CategoryCard from '@/components/cards/CategoryCard'
import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import { useStateValue } from '@/redux/StateProvider'
import { Category } from '@/types'
import { GET_ALL_CATEGORIES } from '@/utils/server/category'
import React, { useEffect, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'

const Category = () => {
  const [{ user, categories }, dispatch] = useStateValue();
  const [searchKey, setSearchKey] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchKey(e.target.value);
    setFilteredCategories(categories.filter((category: Category) => {
      return category.title.toLowerCase().includes(e.target.value.toLowerCase())
    }))
  }

  useEffect(() => {
    if (categories.length === 0) {
      GET_ALL_CATEGORIES((data: any) => {
        dispatch({
          type: "SET_BRANDS",
          payload: data.data,
        })
      })
    }
  }, [categories]);
  return (
    <Layout title='Category'>
         <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
        <div className='flex flex-col gap-1  '>
          <h1 className='font-medium text-4xl text-oxford-blue'>
            Categories
          </h1>
          <p className='text-sm text-gray-500'>
            Your product categories
          </p>
        </div>
        <div className='w-full max-w-md border rounded-lg '>
          <input type="text" value={searchKey} onChange={handleSearch} placeholder='Search' className='w-full px-4 py-3 rounded-lg focus:outline-none' />
        </div>
        <div className='flex items-center gap-2'>
          <OxfordLink label="Add Categories" url="/category/new" icon={BsPlusCircleFill} />
        </div>
      </div>
      {
        searchKey === "" ? <>
          {
            categories && categories.length > 0 ?
              <section className='grid mt-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {
                  categories.map((category: Category) => (
                    <CategoryCard key={category._id} category={category} />
                  ))
                }
              </section>
              : <div>
                <NoData />
              </div>
          }
        </> : <>
          {
            filteredCategories && filteredCategories.length > 0 ?
              <section className='grid mt-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {
                  filteredCategories.map((category: Category) => (
                    <CategoryCard key={category._id} category={category} />
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

export default Category