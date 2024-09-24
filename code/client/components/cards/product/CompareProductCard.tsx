import ProductBrand from '@/components/products/ProductBrand'
import ProductCategory from '@/components/products/ProductCategory'
import ProductColor from '@/components/products/ProductColor'
import { useStateValue } from '@/redux/StateProvider'
import { Product } from '@/types'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-hot-toast'
import { FiX } from 'react-icons/fi'

interface ProductCardProps {
    product: Product
}

const CompareProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [{ compareItems }, dispatch] = useStateValue()
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

    const router = useRouter()

    const removeProduct = () => {
        // remove from local storage
        if (typeof window !== "undefined") {
            const compareItems = JSON.parse(localStorage.getItem("compareItems") || "[]")
            const updatedCompareItems = compareItems.filter((item: any) => item._id !== product._id)
            localStorage.setItem("compareItems", JSON.stringify(updatedCompareItems))
            toast.success(`${title} removed from compare`)
            dispatch({
                type: "SET_COMPARE",
                compareItems: updatedCompareItems
            })
            router.reload()
        }
        
    }
    
    return (
        <article className='flex flex-col gap-2 p-4 bg-white rounded-lg shadow-sm'>
            <div className='relative max-h-[250px] h-[250px] overflow-hidden'>
                <img src={images ? images[0].url : "/images/mac2.jpg"} alt={slug} className=' rounded-lg  w-full object-cover object-center max-w-[250px] mx-auto h-full' />
                <button onClick={removeProduct} className='absolute bg-oxford-blue top-0 right-0 p-2 text-white rounded '>
                    <FiX />
                </button>

            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='text-lg font-medium flex-wrap'>
                    {title}
                </h3>
                <div>
                    GHC{price.toString()}
                </div>
                <hr />
                <div className='flex items-center py-2 justify-between'>
                    <p className='font-medium'>Brand: </p>
                    <div>

                        <ProductBrand id={brand || ""} />
                        
                    </div>
                </div>
                <hr />
                <div className='flex items-center py-2 justify-between'>
                    <p className='font-medium'>Category: </p>
                    <div>

                        <ProductCategory id={category || ""} />
                        
                    </div>
                </div>
                <hr />
                <div className='flex items-center py-2 justify-between'>
                    <p className='font-medium'>State: </p>
                    <p>
                        {state}
                    </p>
                </div>
                <hr />
                <div className='flex items-center py-2 justify-between'>
                    <p className='font-medium'>Availability: </p>
                    <p>
                        {!quantity || quantity === 0 ? "Out of stock" : `In stock`}
                    </p>
                </div>
                <hr />
                <div className='flex items-center py-2 justify-between'>
                    <p className='font-medium'>Rating: </p>
                    <p className='font-medium text-lg'>
                        {totalrating} <span className='text-xs font-normal'> / 5</span>
                    </p>
                </div>
                <hr />
                <div className='flex flex-col  py-2 justify-between'>
                    <p className='font-medium'>Colors: </p>
                    <div className='flex items-center gap-2'>
                        {
                            color?.map((c) => (
                               <ProductColor id={c} key={c} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </article>
    )
}

export default CompareProductCard