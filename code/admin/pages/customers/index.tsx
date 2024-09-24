import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import { BsPlusCircleFill } from 'react-icons/bs'
import CustomersTable from '@/components/tables/CustomersTable'
import { useStateValue } from '@/redux/StateProvider'
import { GET_ALL_USERS } from '@/utils/server/auth'
import { User } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import NoData from '@/components/NoData'

const Customers = () => {
  const [{ users }, dispatch] = useStateValue();
  const [searchKey, setSearchKey] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchKey(e.target.value);
    setFilteredUsers(users.filter((user: User) => {
      return user.firstname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.lastname.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
    }))
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      GET_ALL_USERS(setLoading, (data: any) => {
        dispatch({
          type: "SET_USERS",
          payload: data.data,
        })
      })
    }
  }, []);



  return (
    <Layout title='Customers'>
      <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
        <div className='flex flex-col gap-1  '>
          <h1 className='font-medium text-4xl text-oxford-blue'>
            Customers
          </h1>
          <p className='text-sm text-gray-500'>
            People using your services
          </p>
        </div>
        <div className='w-full max-w-md border rounded-lg '>
          <input type="text" value={searchKey} onChange={handleSearch} placeholder='Search by firstname, lastname, email' className='w-full px-4 py-3 rounded-lg focus:outline-none' />
        </div>
        <div className='flex items-center gap-2'>
          <OxfordLink label="Add Admin" url="/customers/new" icon={BsPlusCircleFill} />
        </div>
      </div>
      <section className='flex flex-col gap-4 mt-4'>
        {
          searchKey === '' ? <CustomersTable /> : <>
            <div className='flex flex-col '>
              {
                filteredUsers.length === 0 ? <>
                  <NoData />
                </> : <>
                  {
                    filteredUsers.map((user: User) => (
                      <Link href={`/customers/${user._id}`} key={user._id} className='w-full bg-white border-b px-4 sone py-4' >
                        <div className='flex items-center gap-4'>
                          <div className='bg-gray-300 w-[60px] h-[60px] min-w-[60px] min-h-[60px] flex items-center justify-center overflow-hidden rounded-full'>

                            <Image src={'/images/avatar.png'} alt="avatar" width={60} height={60} />
                          </div>
                          <div className='flex flex-col gap-1'>
                            <p>
                              {user.firstname} {user.lastname}
                            </p>
                            <p className="text-gray-600 text-sm truncate">
                              {user.email}
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

export default Customers