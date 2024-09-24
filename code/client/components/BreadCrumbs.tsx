import Link from 'next/link'
import React from 'react'

interface BreadCrumbsProps {
    title: string
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({title} ) => {
  return (
      <div className='bg-white py-6 w-full flex items-end gap-4 justify-center'>
          <Link href='/'> Home </Link> / 
          <p className='font-medium text-oxford-blue text-2xl lg:text-5xl'>
              {title}
          </p>
    </div>
  )
}

export default BreadCrumbs