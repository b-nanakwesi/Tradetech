import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { BsSearch } from 'react-icons/bs'
import { FaClipboardList, FaOpencart } from 'react-icons/fa'
import { navButtons, navButtonsMobile, navLinks } from '@/data/navlinks'
import { NavButton, Navlink } from '@/types/Navlink'
import { HiShoppingCart } from 'react-icons/hi'
import CurrentDate from '../dates/CurrentDate'
import { IoMdLogOut } from 'react-icons/io'
import { useStateValue } from '@/redux/StateProvider'
import { toast } from 'react-hot-toast'
import { BiUser } from 'react-icons/bi'
import { fetchCart } from '@/hooks/fetchLocalStorageData'


const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<any>(null)



  const [{ user, cart }, dispatch] = useStateValue()


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
      setUserInfo(null)
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserInfo(user)
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getCart = fetchCart()
      dispatch({
        type: "SET_CART",
        payload: getCart,
      })

    }
  }, []);


  const toggleMenu = () => {
    setShowMenu(prev => !prev)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const openMenu = () => {
    setShowMenu(true)
  }
  return (
    <header className='bg-oxford-blue text-antiflash'>
      <div className='max-w-[1800px] mx-auto w-full px-4 py-6 hidden md:flex flex-col gap-4'>
        <div className='flex items-center justify-between gap-4'>
          <Link href='/'>
            <Image src='/images/logo.png' alt='logo' width={150} height={100} />
          </Link>

          {/* BUTTONS */}
          <div className='flex items-center gap-6'>
            {
              navButtons.map((button: NavButton) => (
                <Link href={button.url} key={button.id}>
                  <button className='flex items-center gap-2 spinner-parent'>
                    <button.icon className='text-white text-3xl spinner' />
                    <p className='lg:flex flex-col hidden text-sm items-start'>
                      <span className="first-word">{button.label.split(' ')[0]}</span>
                      <span>{button.label.split(' ').slice(1).join(' ')}</span>
                    </p>
                  </button>
                </Link>
              ))
            }
            {
              userInfo ? <>

                <button onClick={handleLogout} className='flex items-center gap-2 spinner-parent'>
                  <BiUser className='text-white text-3xl spinner' />
                  <p className='lg:flex flex-col hidden text-sm items-start'>
                    <span className="first-word">{userInfo.firstname}</span>
                    <span>Logout</span>
                  </p>
                </button>

              </> : <>
                <Link href="/auth/login" >
                  <button className='flex items-center gap-2 spinner-parent'>
                    <BiUser className='text-white text-3xl spinner' />
                    <p className='lg:flex flex-col hidden text-sm items-start'>
                      <span className="first-word">Login</span>
                      <span>My Account</span>
                    </p>
                  </button>
                </Link>
              </>
            }



            <Link href={"/cart"}>
              <div className='relative flex flex-col ml-4'>
                <div className='w-7 h-7 absolute -top-2 z-0 right-0 rounded-full bg-antiflash text-oxford-blue flex items-center justify-center'>
                  {cart ? cart.length : 0}
                </div>
                <FaOpencart className='text-4xl z-1 relative' />
                <p className='text-xs text-saffron'>
                  Your Cart
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className='border-b border-antiflash/20 w-full' />
        {/* NAV */}
        <nav className='max-w-[1800px] mx-auto w-full px-4  hidden md:flex items-center gap-6'>
          {
            navLinks.map((link: Navlink) => (
              <Link href={link.url} key={link.id}>
                <p className='uppercase hover:text-saffron transition'>
                  {link.label}
                </p>
              </Link>
            ))
          }

          {
            user && user.token && (
              <Link href="/orders" >
                <p className='uppercase hover:text-saffron transition'>
                  Your Orders
                </p>
              </Link>
            )
          }
        </nav>
      </div>

      {/* Mobile */}
      <div className='md:hidden flex bg-oxford-blue text-white px-4 py-4'>
        <div className='flex items-center justify-between w-full'>

          <Link href='/'>
            <Image src='/images/logo.png' alt='logo' width={120} height={100} />
          </Link>
          <button className='text-white text-3xl' onClick={openMenu}>
            <FiMenu />
          </button>
          <div className={`
                    slide-menu hide-scroll bg-white py-8 flex flex-col
                    ${showMenu ? 'show' : "hide"}
                `}>
            <div className='flex flex-col  px-6 '>
              <Image src='/images/logoblack.png' alt='' priority width={150} height={50} />
              <CurrentDate />
              <div className='h-1 border-b-2 py-2 border-neutral-200'></div>
            </div>
            <button className='text-white bg-oxford-blue rounded-md p-2 text-xl absolute right-4 top-4' onClick={closeMenu}>
              <FiX />
            </button>
            <div className='p-4 flex flex-col justify-between gap-6  h-full '>


              <div className='flex flex-col gap-4'>
                {
                  navLinks.map((link: Navlink) => (
                    <Link href={link.url} key={link.id}>
                      <div className='w-full p-2 text-gray-600 flex items-center gap-2' onClick={closeMenu} >
                        <link.icon className='text-gray-500 text-2xl' />
                        <p className='capitalize  text-lg   transition'>
                          {link.label}
                        </p>
                      </div>
                    </Link>
                  ))
                }
                <Link href={"/cart"}>
                  <div className='w-full p-2 flex items-center gap-2'>
                    <HiShoppingCart className='text-gray-500 text-2xl' />
                    <p className='capitalize text-gray-600 text-lg   transition'>
                      Your Cart
                    </p>

                  </div>
                </Link>
                {
                  user && user.token &&
                  (<Link href={"/orders"}>
                    <div className='w-full p-2 flex items-center gap-2'>
                      <FaClipboardList className='text-gray-500 text-2xl' />
                      <p className='capitalize text-gray-600 text-lg   transition'>
                        Your Orders
                      </p>

                    </div>
                  </Link>)
                }
                {
                  navButtonsMobile.map((button: NavButton) => (
                    <Link href={button.url} key={button.id}>
                      <button className='w-full p-2 flex items-center gap-2' onClick={closeMenu} >
                        <button.icon className='text-gray-500 text-2xl ' />
                        <p className='capitalize text-gray-600 text-lg  transition'>
                          {button.label}
                        </p>
                      </button>
                    </Link>
                  ))
                }
                <div className='h-1 border-b-2  border-neutral-200'></div>

              </div>

              <div className='flex flex-col gap-2'>
                {
                  userInfo ? <>
                    <button onClick={handleLogout} className=' w-full py-3 text-white rounded-lg flex items-center justify-center gap-2 bg-oxford-blue'>
                      <IoMdLogOut className='text-xl' />
                      Logout
                    </button>
                  </> : <>
                    <Link href={'/auth/register'} className=' w-full py-3 text-white rounded-lg flex items-center justify-center gap-2 bg-neon-blue'>

                      Register
                    </Link>
                    <Link href="/auth/login" className=' w-full py-3 text-white rounded-lg flex items-center justify-center gap-2 bg-oxford-blue'>

                      Log In
                    </Link>
                  </>
                }

              </div>


            </div>

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header