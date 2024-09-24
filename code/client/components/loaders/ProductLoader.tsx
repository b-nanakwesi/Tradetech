import React from 'react'

const ProductLoader = () => {
    return (
        <article className='bg-white px-4 py-4 rounded-lg shadow-sm relative flex flex-col gap-4'>
            <div className='relative gradient w-full rounded-lg  max-h-[250px] h-[250px]'>

            </div>
            <div className='flex flex-col gap-2'>
                <div className='w-20 h-4 gradient rounded-sm'></div>
                <div className='w-[80%] h-6 gradient rounded-sm'></div>
                <div className='w-[60%] h-4 gradient rounded-sm'></div>
                <div className='w-20 h-4 gradient rounded-sm'></div>
            </div>
        </article>
    )
}

export default ProductLoader