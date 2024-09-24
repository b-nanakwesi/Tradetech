import { Product } from '@/types/Product'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsHeart, BsHeartFill, BsShuffle, BsEye, BsBagPlus } from 'react-icons/bs'
import Rating from '@/components/Rating';

interface ProductCardProps {
    product: Product
    direction?: 'row' | 'column'
}

const SpecialProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
        totalrating,
        discount
    } = product

    const [showActions, setShowActions] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const addToWishlist = () => {
        setIsLiked((prev) => !prev)
        if (isLiked) {
            toast.success(`${title} removed from wishlist`)
        } else {
            toast.success(`${title} added to wishlist`)
        }
    }
    const addToCart = () => {
        toast.success(`${title} added to cart`)
    }
    const previewProduct = () => {
        // toast.success(`${title} previewed`)
    }
    const compareProduct = () => { }

    const showActionsHandler = () => {
        setShowActions(true)
    }
    const hideActionsHandler = () => {
        setTimeout(() => {
            setShowActions(false)
        }, 500)
    }



    return (
        <article className='grid grid-cols-2 relative bg-white rounded-lg p-4'>
            <div className='flex flex-col gap-4  relative  '>
                <div className='absolute bg-saffron top-0 left-1 px-4 py-1 rounded-full text-xs flex flex-col gap-1'>
                    {discount ? discount.toString() : 0}%
                </div>
                <div className='absolute top-0 right-1 flex flex-col gap-1'>
                    <button className='flex items-center justify-center hover:bg-saffron p-2 rounded-full transition duration-300' onClick={addToWishlist}>
                        {
                            isLiked ? <BsHeartFill /> : <BsHeart />
                        }
                    </button>
                </div>
                <img src={images ? images[0].url : "/images/mac2.jpg"} alt={title} className='w-full h-auto object-cover' />
                <div className='hide-scroll overflow-x-auto flex items-center gap-4'>
                    {
                        images && images.length > 0 && images.map((image) => (
                            <img src={image.url} key={image.public_id} alt={title} className='w-20 border rounded-lg h-auto object-cover select-none' />
                        )
                        )
                    }
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='text-neon-blue text-xs lg:text-sm'>{brand}</p>
                <h3 className='text-night font-medium text-lg truncate'>{title}</h3>
                <Rating rating={totalrating} />
                <p>
                    GHC <span className='text-base '>{price.toString()}</span>
                </p>
            </div>
        </article>
    )
}

export default SpecialProductCard