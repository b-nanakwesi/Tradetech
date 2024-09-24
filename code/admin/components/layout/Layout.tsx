import ToasterProvider from '@/providers/ToasterProvider'
import React, { useEffect } from 'react'
import Meta from './Meta'
import ModalProvider from '@/providers/ModalProvider'
import Sidebar from './Sidebar'
import Authenticate from '../authenticate'
import { useStateValue } from '@/redux/StateProvider'
import { GET_ALL_ORDERS, GET_ALL_USERS } from '@/utils/server/auth'
import { GET_ALL_COLORS } from '@/utils/server/color'
import { GET_ALL_BRANDS } from '@/utils/server/brand'
import { GET_ALL_CATEGORIES } from '@/utils/server/category'
import { GET_ALL_COUPONS } from '@/utils/server/coupons'
import { GET_ALL_PRODUCTS } from '@/utils/server/product'

interface LayoutProps {
  children: React.ReactNode
  title: string
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [{ user, users, colors, brands, categories, coupons,products, orders }, dispatch] = useStateValue();
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

    if (users.length === 0) {
      GET_ALL_USERS(setLoading, (data: any) => {
        dispatch({
          type: "SET_USERS",
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

  

  }, []);

  useEffect(() => {
    if (user && user.token) {
      if (orders.length === 0) { 
        GET_ALL_ORDERS(user.token, (data: any) => {
          dispatch({
            type: "SET_ORDERS",
            payload: data.data,
          })
        })
      }
      }
  }, [user]);

  // console.log(colors);
  return (
    <>
      <Meta title={title} />
      <ToasterProvider />
      <ModalProvider />
      <Authenticate>

        <main className='flex flex-col lg:flex-row'>
          <Sidebar />
          <div className='flex flex-col w-full  gap-4 py-4 px-4 lg:px-4 h-[90vh] lg:h-screen overflow-y-auto bg-slate-50'>
            {children}
          </div>
        </main>
      </Authenticate>

    </>
  )
}

export default Layout