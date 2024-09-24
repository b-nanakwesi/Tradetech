import Image from 'next/image'
import React from 'react'

type CategoryCard = {
    id: string
    name: string
    img: string
    subtext: string
}

interface CategoryCardProps { 
    category: CategoryCard
}

const CategoryCard: React.FC<CategoryCardProps> = ({category}) => {
  return (
      <article className='w-full  p-4 flex group gap-4 justify-between lg:justify-center lg:mx-auto cursor-pointer'>
          <div className='flex flex-col py-4 '>
              <p className='font-medium group-hover:underline transition'>
                 {category.name} 
              </p>
              <p className='text-sm'>
                  {category.subtext}
              </p>
          </div>
          <div>
              <Image src={category.img} alt={category.name} width={100} height={100} />
          </div>
    </article>
  )
}

export default CategoryCard