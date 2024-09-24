
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useStateValue } from '@/redux/StateProvider';
import { User } from '@/types';
import NoData from '../NoData';
import Link from 'next/link';
import {  BsMailbox2 } from 'react-icons/bs';
import {  BiSolidUser } from 'react-icons/bi';
import { BLOCK_USER, GET_ALL_USERS, UNBLOCK_USER } from '@/utils/server/auth';
import Image from 'next/image';
import { MdMail, MdPhone } from 'react-icons/md';
import { formatDate } from '@/utils/functions';
import Button from '../buttons/Button';


const CustomersTable = () => {
    const [{ user, users }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    // console.log(users);

    const router = useRouter()

    const handleBlock = (id: string) => {
        BLOCK_USER(setLoading, id, user.token, () => {
            GET_ALL_USERS(setLoading, (data: any) => {
                dispatch({
                    type: "SET_USERS",
                    payload: data.data,
                })
            })
        })
        router.reload()
    }

    const handleUnblock = (id: string) => {
        UNBLOCK_USER(setLoading, id, user.token, () => {
            GET_ALL_USERS(setLoading, (data: any) => {
                dispatch({
                    type: "SET_USERS",
                    payload: data.data,
                })
            })
            router.reload()
        })
    }





    return (
        <div className='w-full overflow-x-auto'>

            <div className='md:flex flex-col w-full hidden'>
                <div className='bg-gray-200 font-medium text-oxford-blue grid grid-cols-10 mb-[2px]'>
                    <div className='p-4 text-lg border-r col-span-2 '>
                        Full Name
                    </div>
                    <div className='p-4 text-lg border-r col-span-2 '>
                        Email
                    </div>
                    <div className='p-4 text-lg border-r col-span-2 '>
                        Mobile
                    </div>
                    <div className='p-4 text-lg border-r '>
                        Role
                    </div>
                    <div className='p-4 text-lg border-r '>
                        Blocked
                    </div>
                    <div className='p-4 text-lg border-r col-span-2 '>
                        Actions
                    </div>

                </div>
                <div className='flex flex-col min-h-full gap-[2px] '>
                    {
                        users.length > 0 ? users.map((customer: User) => (
                            <div className='grid grid-cols-10 bg-white' key={customer._id}>
                                <Link href={`/customers/${customer._id}`} className='p-4 truncate text-sm border-r col-span-2 '>
                                    {customer.firstname} {customer.lastname}
                                </Link>
                                <div className='p-4 truncate text-sm border-r col-span-2 '>
                                    {customer.email}
                                </div>
                                <div className='p-4 truncate text-sm border-r col-span-2 '>
                                    {customer.mobile}
                                </div>
                                <div className='p-4 truncate text-sm capitalize border-r '>
                                    {customer.role}
                                </div>
                                <div className='p-4 truncate text-sm border-r '>
                                    {customer.isBlocked ? 'Yes' : 'No'}
                                </div>
                                <div className='p-1 truncate flex items-center gap-2 text-sm border-r col-span-2 '>
                                    <Link href={`/customers/${customer._id}`} className='bg-blue-500 text-sm px-3 py-1 text-white rounded-lg  transition'>
                                        View
                                    </Link>
                                    {
                                        customer._id === user._id ? null : <>
                                            {
                                                customer.isBlocked ? (
                                                    <button onClick={() => handleUnblock(customer._id)} className=' text-sm text-white bg-night rounded-lg px-3 py-1 hover: transition'>
                                                        Unblock
                                                    </button>
                                                ) : <button onClick={() => handleBlock(customer._id)} className=' text-sm text-white bg-red-500 rounded-lg px-3 py-1 hover: transition'>
                                                    Block
                                                </button>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )) : <NoData />
                    }

                </div>

            </div >
            <div className='gap-4 w-full grid grid-cols-1 sm:grid-cols-2 md:hidden p-1 py-4'>
                {
                    users.length > 0 ? <>
                        {
                            users.map((customer: User) => (
                                <article key={customer._id} className='bg-white max-w-md w-full flex flex-col gap-4 p-4 md:p-8 rounded-lg sone'>

                                    <div className='flex items-center gap-4 overflow-hidden truncate'>
                                        <div className='bg-gray-300 w-[60px] h-[60px] min-w-[60px] min-h-[60px] flex items-center justify-center overflow-hidden rounded-full'>

                                            <Image src={'/images/avatar.png'} alt="avatar" width={60} height={60} />
                                        </div>
                                        <div className='flex flex-col g'>

                                            <h1 className='text-xl font-medium text-oxford-blue truncate '>
                                                {customer.firstname} {customer.lastname}
                                            </h1>
                                            <div className='flex items-center gap-2 truncate'>
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
                                                    formatDate(customer.createdAt || "", "long", "")
                                                }
                                            </p>
                                        </div>
                                        <div className='flex items-center text-sm gap-1 flex-wrap'>
                                            <p>
                                                Updated At:
                                            </p>
                                            <p className='text-gray-600 text-sm truncate'>
                                                {
                                                    formatDate(customer.updatedAt || "", "long", "")
                                                }
                                            </p>
                                        </div>

                                    </div>
                                    {
                                        customer._id === user._id ? <></> : <>
                                            {
                                                customer.isBlocked ?
                                                    (<Button
                                                        text='Unblock'
                                                        disabled={loading}
                                                        onClick={() => handleUnblock(customer._id)}
                                                    />) :
                                                    (<Button
                                                        text='Block'
                                                        disabled={loading}
                                                        onClick={() => handleBlock(customer._id)}
                                                    />)
                                            }
                                        </>
                                    }




                                </article>
                            ))
                        }
                    </> : <div className='col-span-1 sm:col-span-2'>
                        <NoData />
                    </div>
                }
            </div>
        </div>
    );
};


export default CustomersTable