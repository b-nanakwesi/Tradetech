import { Product } from '@/types/Product'
import React, { useState } from 'react'
import { BsTrash3, BsPlusLg, BsHeart } from 'react-icons/bs'
import { BiMinus } from 'react-icons/bi'
import { FiX } from 'react-icons/fi'


interface ProductCardProps {
    product: Product
    count: number
}

const CartProductCard: React.FC<ProductCardProps> = ({ product, count }) => {

    const {
        title,
        _id,
        brand,
        category,
        description,
        price,
        slug,
        state,
        color,
        images,
        quantity,
        sold,
        totalrating
    } = product

    const [newQuantity, setNewQuantity] = useState(count)

    const increment = () => {
        setNewQuantity((prev) => prev + 1)
    }

    const decrement = () => {
        if (newQuantity === 1) return
        setNewQuantity((prev) => prev - 1)
    }

    return (
        <>
            <article className='bg-white p-4 rounded-lg md:hidden grid grid-cols-3 gap-2 relative'>
                <div className='h-[100px] rounded-lg overflow-hidden border w-full'>
                    <img src={images && images[0].url} alt={title} className='w-full h-full object-cover' />
                </div>
                <div className='col-span-2  justify-center py-2 flex flex-col gap-'>
                    <h1 className='truncate text-lg font-medium mr-8'>
                        {title}
                    </h1>
                    <div>
                        <p className='text-sm font-medium'>
                            <span className='text-xs font-normal text-gray-700'>GHC</span> {price.toString()}
                        </p>
                    </div>
                </div>
                <div className=' absolute right-0 grid grid-rows-3 gap-1  top-0 h-full p-2'>

                    <button onClick={increment} className=' p-2 bg-oxford-blue rounded-lg h-max text-white'>
                        <BsPlusLg className='text- ' />
                    </button>
                    <div className='flex items-center text-oxford-blue text-xl justify-center'>
                        {newQuantity}
                    </div>
                    <button onClick={decrement} className=' p-2 bg-oxford-blue rounded-lg h-max text-white'>
                        <BiMinus className='text- ' />
                    </button>
                </div>
                <button className='absolute p-2  rounded-lg text-red-500'>
                    <BsTrash3 className='text- ' />
                </button>
            </article>
            <article className='hidden md:grid grid-cols-8 py-2 border-b'>
            <div className='col-span-4 gap-4 grid grid-cols-3'>
                <div className='border w-full rounded-lg overflow-hidden h-[150px]'>
                    <img src={images && images[0].url} alt={title} className='w-full h-full object-cover' />
                </div>
                <div className='col-span-2 flex justify-center flex-col gap-2'>
                    <h2 className='text-lg font-medium truncate'>
                        {title}
                    </h2>
                    <p>
                        {brand}
                    </p>
                    <p className='text-sm text-gray-600'>
                        {description.substring(0, 100)}
                    </p>
                </div>

            </div>
            <div className='col-span-2 flex flex-row items-center justify-start  gap-8 px-4'>
            <button onClick={decrement} className=' p-2 bg-oxford-blue rounded-lg h-max text-white'>
                    <BiMinus className='text- ' />
                </button>
                <div className='flex items-center text-oxford-blue text-xl justify-center'>
                    {newQuantity}
                </div>
                
                <button onClick={increment} className=' p-2 bg-oxford-blue rounded-lg h-max text-white'>
                    <BsPlusLg className='text- ' />
                </button>

            </div>
            <div className='cols-span-1 flex items-center justify-ceer gap-2  '>
                <button className='bg-gray-200 w-[40px] h-[40px] items-center flex justify-center rounded-lg'>
                    <BsTrash3 className='text-oxford-blue text-xl' />
                </button>
                <button className='bg-gray-200 p-2 rounded-lg w-[40px] h-[40px] items-center flex justify-center'>
                    <BsHeart className='text-oxford-blue text-xl' />
                </button>
            </div>
            <div className='cols-span-1 flex items-center'>
                GHC {price.toString()}
            </div>
        </article>
        </>
    )
}

export default CartProductCard