import Authenticate from '@/components/authenticate'
import WishlistCard from '@/components/cards/product/WishlistCard'
import Layout from '@/components/layouts/Layout'
import { useStateValue } from '@/redux/StateProvider'
import { Product } from '@/types'
import { GET_USER_WISHLIST } from '@/utils/server/auth'
import React, {useEffect, useState} from 'react'

const Wishlist = () => {
    const [{ user, wishlist }, dispatch] = useStateValue()
    

    useEffect(() => {
        if (user && user.token) {
            GET_USER_WISHLIST(user.token, (data) => {
              dispatch({
                type: "SET_WISHLIST",
                payload: data.data.wishlist,
              })
            })
          }
    }, []);
    
    return (
        <Layout title='Wishlist'>
            <Authenticate>

                <section className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                    {
                        wishlist.map((data: Product) => (
                            <WishlistCard product={data} key={data._id} />
                        ))
                    }
                </section>
            </Authenticate>
        </Layout>
    )
}

export default Wishlist