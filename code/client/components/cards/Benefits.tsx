import Image from 'next/image'
import React from 'react'

type Benefit = {
    img: string
    title: string
    sub: string
}

interface BenefitsContent {
    benefit: Benefit
}

const Benefits: React.FC<BenefitsContent> = ({ benefit }) => {
    return (
        <article className='flex items-center spinner-parent cursor-default gap-4 p-4 md:p-0 lg:mx-auto'>
            <Image src={benefit.img} className='spinner' alt={benefit.title} width={40} height={40} />
            <div className='flex flex-col gap-1 w-full'>
                <p className='text-night font-medium '>{benefit.title}</p>
                <p className='text-sm text-gray-400'>{benefit.sub}</p>
            </div>
        </article>
    )
}

export default Benefits