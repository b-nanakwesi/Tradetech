import NoData from '@/components/NoData'
import CompareProductCard from '@/components/cards/product/CompareProductCard'
import Layout from '@/components/layouts/Layout'
import { products } from '@/data/products'
import { useStateValue } from '@/redux/StateProvider'
import { Product } from '@/types'
import React from 'react'

const CompareProduct = () => {
    const [{ compareItems }, dispatch] = useStateValue()
    
    return (
        <Layout title='Compare '>
            {
                compareItems ? <>
                 <section className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                {
                    compareItems && compareItems.length > 0 && compareItems.map((data: Product) => (
                        <CompareProductCard product={data} key={data._id} />
                    ))
                }
            </section>
                </> : <>
                    <NoData />
                </>
            }
           
        </Layout>
    )
}

export default CompareProduct