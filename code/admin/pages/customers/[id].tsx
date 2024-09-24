
import Button from '@/components/buttons/Button'
import Layout from '@/components/layout/Layout'
import BouncingBalls from '@/components/loaders/bouncingballs/BouncingBalls'
import { useStateValue } from '@/redux/StateProvider'
import { formatDate } from '@/utils/functions'
import { BLOCK_USER, GET_ALL_USERS, GET_USER_BY_ID, UNBLOCK_USER } from '@/utils/server/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BiSolidUser } from 'react-icons/bi'
import { BsMailbox2 } from 'react-icons/bs'
import { MdKeyboardBackspace, MdMail, MdPhone } from 'react-icons/md'

const SingleUser = () => {
  const [{ user }, dispatch] = useStateValue()
  const router = useRouter()
  const { id } = router.query
  // console.log(id)

  const [loading, setLoading] = useState(false);
  const [functionLoading, setFunctionLoading] = useState(false);
  const [customer, setCustomer] = useState({} as any);

  const handleBlock = () => {
    BLOCK_USER(setFunctionLoading, id, user.token, () => {
      GET_ALL_USERS(setFunctionLoading, (data: any) => {
        dispatch({
          type: "SET_USERS",
          payload: data.data,
        })
      })
    })
    router.reload()
  }

  const handleUnblock = () => {
    UNBLOCK_USER(setFunctionLoading, id, user.token, () => {
      GET_ALL_USERS(setFunctionLoading, (data: any) => {
        dispatch({
          type: "SET_USERS",
          payload: data.data,
        })
      })
      router.reload()
    })
  }

  useEffect(() => {
    if (id) {
      GET_USER_BY_ID(setLoading, id, user.token, (data: any) => {
        setCustomer(data.data)
      })
    }
  }, [id]);
  // console.log(customer);

  return (
    <Layout title={customer && customer.firstname !== undefined ? `${customer.firstname} ${customer.lastname}` : "Single User"}>
      <button className='w-max hover:text-neon-blue flex items-center gap-2' onClick={() => {
        router.back()
      }}>
        <MdKeyboardBackspace className='text-2xl' />
        Go back
      </button>
      {
        loading || !customer || customer.firstname === undefined ? <div className='flex items-center h-full justify-center'>
          <BouncingBalls />
        </div> : <>

          <div className='w-full h-full flex items-center justify-center'>
            <article className='bg-white max-w-md w-full flex flex-col gap-4 p-4 md:p-8 rounded-lg sone'>

              <div className='flex items-center gap-4'>
                <div className='bg-gray-300 w-[70px] h-[70px] min-w-[70px] min-h-[70px] flex items-center justify-center overflow-hidden rounded-full'>

                  <Image src={'/images/avatar.png'} alt="avatar" width={70} height={70} />
                </div>
                <div className='flex flex-col g'>

                  <h1 className='text-xl font-medium text-oxford-blue truncate '>
                    {customer.firstname} {customer.lastname}
                  </h1>
                  <div className='flex items-center gap-2'>
                    <MdMail className='text-saffron' />
                    <p className='text-gray-600 text-sm truncate'>
                      {customer.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2' >
                <div className='flex items-center gap-2'>
                  <BiSolidUser className='text-saffron text-xl' />
                  <p className='text-gray-600 uppercase text-sm truncate'>
                    {customer.role}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <MdPhone className='text-saffron text-xl' />
                  <p className='text-gray-600 text-sm truncate'>
                    {customer.mobile}
                  </p>
                </div>
                <div className='flex items-center gap-2'>
                  <BsMailbox2 className='text-saffron text-xl' />
                  <p className='text-gray-600 text-sm truncate'>
                    {customer.address || "No address"}
                  </p>
                </div>
                <div className='flex items-center text-sm gap-1 flex-wrap'>
                  <p>
                    Created At:
                  </p>
                  <p className='text-gray-600 text-sm truncate'>
                    {
                      formatDate(customer.createdAt, "long", "")
                    }
                  </p>
                </div>
                <div className='flex items-center text-sm gap-1 flex-wrap'>
                  <p>
                    Updated At:
                  </p>
                  <p className='text-gray-600 text-sm truncate'>
                    {
                      formatDate(customer.updatedAt, "long", "")
                    }
                  </p>
                </div>

                </div>
                {
                  id === user._id ? <></> : <>
                   {
                customer.isBlocked ?
                  (<Button
                    text='Unblock'
                    disabled={functionLoading}
                    onClick={handleUnblock}
                  />) :
                  (<Button
                    text='Block'
                    disabled={functionLoading}
                    onClick={handleBlock}
                  />)
              }
                  </>
                }

             


            </article>

          </div>
        </>
      }
    </Layout>
  )
}

export default SingleUser