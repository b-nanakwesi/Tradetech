import { footerLinks } from '@/data/navlinks'
import { FooterCol } from '@/types/Navlink'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-oxford-blue '>
      <div className='max-w-[1800px] mx-auto px-4 py-10 w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
        <div className='lg:col-span-2 flex flex-col text-antiflash gap-4'>
          <Link href='/'>
            <Image src='/images/logo.png' alt='logo' width={150} height={100} />
          </Link>
          <p className='text-sm w-[90%] '>
            Explore our extensive collection of high-tech devices, ranging from smartphones to smart home gadgets, at TradeTech. Experience innovation and convenience combined, as we bring you the latest tech trends and top-quality products, making your online shopping experience seamless and rewarding.
          </p>
          {/* <p className='poppins'>
            2023 TradeTech by <span className='text-saffron'>Nutifafa</span>
          </p> */}
        </div>
        {
          footerLinks.map((link) => (
            <div className='text-white flex flex-col gap-6' key={link.id}>
              <h1 className='poppins font-semibold text-2xl'>
                {link.title}
              </h1>
              <div className='flex flex-col gap-4'>
                {
                  link.link.map((sublink) => (
                    <Link href={sublink.url} key={sublink.id}>
                      <p className='hover:text-saffron'>

                        {sublink.label}
                      </p>
                    </Link>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </footer>
  )
}

export default Footer