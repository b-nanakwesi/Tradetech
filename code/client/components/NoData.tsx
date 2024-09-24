import Image from 'next/image'
import React from 'react'

interface NoDataProps { 
    text?: string
}

const NoData:React.FC<NoDataProps> = ({text}) => {
  return (
      <div className=' flex items-center flex-col justify-center text-night p-8 w-full h-full'>
          <Image priority src='/images/search.png' className='mx-auto' alt="not found" width={450} height={300} />
          <p className=' text-2xl md:text-3xl'>
                {text || "No data found"}
          </p>
    </div>
  )
}

export default NoData