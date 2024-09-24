import React from 'react'
import { IconType } from 'react-icons/lib'

interface InfoGraphProps {
    count: number
    title: string
    icon: IconType
}

const InfoGraph: React.FC<InfoGraphProps> = ({ count, title, icon: Icon }) => {
    return (
        <article className='w-full bg-white flex flex-col py-6 px-5 rounded-lg sone min-h-[100px] overflow-hidden relative  ' >
            <div className='absolute h-full bg-gray-200 w-1/2 -right-16 lg:-right-12 top-0 -rotate-45'>

                <Icon className='text-gray-400 absolute translate-x-4 translate-y-2 text-7xl  rotate-45 mx-auto' />
            </div>
            <h2 className='text-5xl font-medium'>
                {count}
            </h2>
            <p className='text-blue-500 z-10'>
                {title}
            </p>
        </article>
    )
}

export default InfoGraph