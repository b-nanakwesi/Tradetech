import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoMdClose, IoMdLogOut } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import CurrentDate from '../dates/CurrentDate'
import { useRouter } from 'next/router'
import { sidebarLinks } from '@/utils/data'
import { BiMenu } from 'react-icons/bi'
import { toast } from 'react-hot-toast'
import { LOGOUT } from '@/utils/server/auth'
import { useStateValue } from '@/redux/StateProvider'

const Sidebar = () => {
    const [{ user }, dispatch] = useStateValue();
    
    const [showMobile, setShowMobile] = useState(false)
    const [links, setLinks] = useState(sidebarLinks)
    const [loading, setLoading] = useState(false)

    const handleLogout = () => {
        setLoading(true)
        try {
            dispatch({
                type: "SET_USER",
                payload: null,
            })
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user')
            }
            toast.success('Logged out successfully')
        } catch (error) {
            toast.error('Error logging out')    
        }
    }

    const router = useRouter()
    return (
        <>
            {/* MOBILE */}

            <div className='flex lg:hidden max-w-screen overflow-x-hidden relative'>
                <div className='flex items-center overflow-x-hidden justify-between bg-oxford-blue shadow-sm w-full py-4 px-4'>
                    <Link href='/'>
                        <Image src='/images/logo.png' priority alt='' width={120} height={50} />
                    </Link>
                    <button onClick={() => setShowMobile(true)} className='text-white text-3xl'>
                        <BiMenu />
                    </button>

                    <div className={`absolute top-0 w-full slide-menu  h-screen z-10 bg-white flex flex-col py-8
                            ${showMobile ? "show" : "hide"}`} >
                        <div className='w-full h-full relative flex flex-col justify-between '>
                            <button onClick={() => {
                                setShowMobile(false)
                            }} className='p-1 hover:bg-neutral-100 bg-oxford-blue border-oxford-blue text-white rounded-sm border-2 -top-2  transition absolute right-4'>
                                <IoMdClose size={18} />
                            </button>
                            <div className='w-full'>
                                <div className='flex flex-col  px-6 '>
                                    <Image src='/images/logoblack.png' alt='' priority width={150} height={50} />
                                    <CurrentDate />
                                    <div className='h-1 border-b-2 py-2 border-neutral-200'></div>
                                </div>
                                <div className='flex flex-col py-4 gap-2 w-full'>
                                    {
                                        sidebarLinks.map((link) => (
                                            <Link href={link.path} key={link.name}>
                                                <div className={`relative w-full flex gap-4 items-center 
                                                            ${router.pathname === link.path ? 'sone' : ''}
                                                    `}>
                                                    <div className={`
                                                            w-2 h-12
                                                         ${router.pathname === link.path ? 'bg-neon-blue ' : 'bg-transparent'}
                                                    `} />
                                                    <div className='flex items-center gap-2 h-full'>
                                                        <link.icon className='text-2xl text-gray-500' />
                                                        <p className={`text-lg  
                                                        ${router.pathname === link.path ? 'text-black' : 'text-neutral-600'}
                                                        `}>
                                                            {link.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <div className='h-1 border-b-2  border-neutral-200 mx-4'></div>

                            <div className='px-4 py-4'>
                                <button onClick={handleLogout} className=' w-full py-3 text-white rounded-lg flex items-center justify-center gap-2 bg-oxford-blue'>
                                    <IoMdLogOut className='text-xl' />
                                    Logout
                                </button>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* DESKTOP */}
            <aside className='hidden  lg:flex'>
                <div
                    className={`
                w-[250px]   h-screen bg-white flex flex-col py-8 border-r
                
              `}
                >
                    <div className='w-full h-full relative flex flex-col justify-between '>
                        <div className='w-full'>
                            <div className='flex flex-col  px-6 '>
                                <Image src='/images/logoblack.png' alt='' priority width={150} height={50} />
                                <CurrentDate />
                                <div className='h-1 border-b-2 py-2 border-neutral-200'></div>
                            </div>
                            <div className='flex flex-col py-4 gap-2 w-full'>
                                {
                                    sidebarLinks.map((link) => (
                                        <Link href={link.path} key={link.name}>
                                            <div className={`relative w-full flex gap-4 items-center 
                                                            ${router.pathname === link.path ? 'sone' : ''}
                                                    `}>
                                                <div className={`
                                                            w-2 h-12
                                                         ${router.pathname === link.path ? 'bg-neon-blue ' : 'bg-transparent'}
                                                    `} />
                                                <div className='flex items-center gap-2 h-full'>
                                                    <link.icon className='text-2xl text-gray-500' />
                                                    <p className={`text-lg  
                                                        ${router.pathname === link.path ? 'text-black' : 'text-neutral-600'}
                                                        `}>
                                                        {link.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                            <div className='h-1 border-b-2 py-2 border-neutral-200 mx-4'></div>
                            <div className='px-4 py-4'>
                                <button onClick={handleLogout} className=' w-full py-2 text-white rounded-lg flex items-center justify-center gap-2 bg-oxford-blue'>
                                    <IoMdLogOut className='text-xl' />
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar