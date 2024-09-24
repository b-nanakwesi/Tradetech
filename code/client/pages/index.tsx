import Image from 'next/image'
import Layout from '@/components/layouts/Layout'
import Link from 'next/link'
import MainBannerCard from '@/components/cards/banner/MainBannerCard'
import SubBannerCard from '@/components/cards/banner/SubBannerCard'
import { benefits } from '@/data/benefits'
import Benefits from '@/components/cards/Benefits'
import { categories } from '@/data/categories'
import CategoryCard from '@/components/cards/CategoryCard'
// import { products, specialProducts } from '@/data/products'
import ProductCardMain from '@/components/cards/product/ProductCardMain'
import SpecialProductCard from '@/components/cards/product/SpecialProductCard'
import { useStateValue } from '@/redux/StateProvider'
import { Product } from '@/types'
import ProductLoader from '@/components/loaders/ProductLoader'
import {useEffect} from "react"


export default function Home() {
  const [{ user, products }, dispatch] = useStateValue()

  
  return (
    <Layout title='Home'>
      <section className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <MainBannerCard />
        <SubBannerCard
          img='catbanner-01.jpg'
          subtitle='Best Sale'
          title='Macbook Pros'
          text='From GHC5000'
        />
        <SubBannerCard
          img='catbanner-02.jpg'
          subtitle='New Arrival'
          title='Smart Watches'
          text='Shop the latest band styles and colors'
        />
        <SubBannerCard
          img='catbanner-03.jpg'
          subtitle='15% Off'
          title='iPad Air'
          text='From GHC 1200'
        />
        <SubBannerCard
          img='catbanner-04.jpg'
          subtitle='Refurbished'
          title='Airpods Max'
          text='High fidelity playback with  noise cancellation'
        />
      </section>
      <section className='py-10 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
        {
          benefits.map((data) => (
            <Benefits benefit={data} key={data.title} />
          ))
        }
      </section>


      <section className='py-10 flex flex-col gap-8'>
        <div className=' w-full flex flex-col md:flex-row md:items-center justify-between '>

          <h3 className='font-medium text-3xl text-night'>Latest Products</h3>
          <Link href='/products' className='text-neon-blue ml-auto'>
            View All
          </Link>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4'>
          {
            !products || products.length === 0 ? (
              [1, 2, 3, 4, 5].map((data) => (
                <ProductLoader key={data} />
              )
              ))
              : <>
                {
                  // first 5 products          
                  products.slice(0, 5).map((data: Product) => (
                    <ProductCardMain product={data} key={data._id} />
                  ))
                }
              </>
          }
        </div>
      </section>

    </Layout>
  )
}
