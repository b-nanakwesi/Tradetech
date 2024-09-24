import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import Meta from './Meta'
import ToasterProvider from '@/providers/ToasterProvider'
import BreadCrumbs from '../BreadCrumbs'
import FilterModal from '../modals/screen/FilterModal'
import { useStateValue } from '@/redux/StateProvider'
import { GET_ALL_COLORS } from '@/utils/server/color'
import { GET_ALL_PRODUCTS } from '@/utils/server/products'
import { GET_ALL_BRANDS } from '@/utils/server/brand'
import { GET_ALL_CATEGORIES } from '@/utils/server/category'
import { GET_ALL_COUPONS } from '@/utils/server/coupons'
import ClientOnly from '../ClientOnly'
import { GET_USER_ORDERS, GET_USER_WISHLIST } from '@/utils/server/auth'

interface LayoutProps {
  children: React.ReactNode
  title: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  
  const [{ user, products, coupons, categories, brands, colors, orders }, dispatch] = useStateValue()
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (products.length === 0) { 
      GET_ALL_PRODUCTS("", (data: any) => {
        dispatch({
          type: "SET_PRODUCTS",
          payload: data.data,
        })
      })
    }

    if (brands.length === 0) {
      GET_ALL_BRANDS((data: any) => {
        dispatch({
          type: "SET_BRANDS",
          payload: data.data,
        })
      })
    }

    if (categories.length === 0) {
      GET_ALL_CATEGORIES((data: any) => {
        dispatch({
          type: "SET_CATEGORIES",
          payload: data.data,
        })
      })
    }

    if (coupons.length === 0) {
      GET_ALL_COUPONS((data: any) => {
        dispatch({
          type: "SET_COUPONS",
          payload: data.data,
        })
      })
    }

    if (colors.length === 0) {
      GET_ALL_COLORS((data: any) => {
        dispatch({
          type: "SET_COLORS",
          payload: data.data,
        })
      })
    }

    if (user && user.token) {
      GET_USER_WISHLIST(user.token, (data) => {
        dispatch({
          type: "SET_WISHLIST",
          payload: data.data.wishlist,
        })
      })
    }

    if (user && user.token) {
      GET_USER_ORDERS(user.token, (data) => {
        dispatch({
          type: "SET_ORDERS",
          payload: data.data,
        })
      })
    }
  }, []);

  
  
  return (
    <ClientOnly>
      <Meta title={title} />
      <ToasterProvider />

      {/* Modals */}
      <FilterModal />



      <div className=' '>
        <Header />
        {
          title === 'Home' ? <></> : <BreadCrumbs title={title} />
        }

        <div className='min-h-[50vh] max-w-[1800px] w-full h-full mx-auto py-10 px-4 sm:px-8'>{children}</div>
        <Footer />
      </div>
    </ClientOnly>
  )
}

export default Layout