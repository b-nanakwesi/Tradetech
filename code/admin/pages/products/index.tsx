import NoData from '@/components/NoData'
import Layout from '@/components/layout/Layout'
import NeonLink from '@/components/links/NeonLink'
import OxfordLink from '@/components/links/OxfordLink'
import ProductsTable from '@/components/tables/ProductsTable'
import { useStateValue } from '@/redux/StateProvider'
import { Product } from '@/types'
import { GET_ALL_PRODUCTS } from '@/utils/server/product'
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'

const Products = () => {
  const [{ user, products, categories, brands, colors }, dispatch] = useStateValue();

  const [searchKey, setSearchKey] = useState('')
  const [searchResults, setSearchResults] = useState(products)
  
  // console.log(products);

  const handleSearch = (e: any) => { 
    e.preventDefault();
    setSearchKey(e.target.value);



    setSearchResults(products.filter((product: Product) => {
      return product.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.price.toString().includes(e.target.value.toLowerCase()) 
    }))
  }

  useEffect(() => {
    GET_ALL_PRODUCTS("", (data: any) => {
        dispatch({
            type: 'SET_PRODUCTS',
            payload: data.data
        })
    })

    
}, []);

 
  
  return (
    <Layout title='Products'>
       <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
        <div className='flex flex-col gap-1  '>
          <h1 className='font-medium text-4xl text-oxford-blue'>
            Products
          </h1>
          <p className='text-sm text-gray-500'>
            The products you sell
          </p>
        </div>
        <div className='w-full max-w-md border rounded-lg '>
          <input type="text" value={searchKey} onChange={handleSearch} placeholder='Search by product name or description' className='w-full px-4 py-3 rounded-lg focus:outline-none' />
        </div>
        <div className='flex items-center gap-2'>
          <OxfordLink label="Add Products" url="/products/new" icon={BsPlusCircleFill} />
          <NeonLink label="Add Color" url="/color/new" icon={BsPlusCircleFill} />
        </div>
      </div>
      <section className='flex flex-col gap-4'>
        {
          searchKey === "" ? <ProductsTable /> : <>
            <div className='flex flex-col '>
              {
                searchResults.length === 0 ? <NoData /> : <>
                  {
                    searchResults.map((product: Product) => (
                      <Link href={`/products/${product._id}`} key={product._id} className='w-full  bg-white border-b px-4 sone py-4' >
                        <div className='flex items-center gap-4 overflow-hidden'>
                          <div className='bg-gray-300 w-[60px] h-[60px] min-w-[60px] min-h-[60px] flex items-center justify-center overflow-hidden rounded-lg'>

                            <img src={product.images && product.images[0].url} alt="avatar" className='w-full h-full object-cover' />
                          </div>
                          <div className='flex flex-col gap-1 '>
                            <p className='truncate'>
                              {product.title}
                            </p>
                            <p className="text-gray-600 text-sm truncate">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  }
                </>
                }
            </div>
          </>
        }
      </section>
    </Layout>
  )
}

export default Products