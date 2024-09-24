import Meta from '@/components/layouts/Meta'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Custom404 = () => {
    return (
        <>
            <Meta title='404' />
            <main className='bg-antiflash flex flex-col gap-2 items-center justify-center h-screen w-screen '>
                <Link href='/'>
                    <Image src='/images/logoblack.png' alt='logo' width={200} height={100} />
                </Link>
                <h1 className='text-[100px] text-oxford-blue'>
                    Oops!
                </h1>
                <p className='text-night text-lg'>
                    Looks like you're lost. This page does not exist.
                </p>
                <Link href='/' className='mt-4'>
                    <button className='bg-neon-blue text-antiflash py-3 px-8 rounded-lg'>
                        Go Home
                    </button>
                </Link>
            </main>
        </>
    )
}

export default Custom404