import React, { useState } from 'react'
import ScreenModal from '../ScreenModal'
import useFilterModal from '@/hooks/useFilterModal'
import { toast } from 'react-hot-toast'
import { useStateValue } from '@/redux/StateProvider'
import { Brand, Category } from '@/types'
import { GET_ALL_PRODUCTS } from '@/utils/server/products'

const FilterModal = () => {
    const [{ user, products, coupons, categories, brands, colors }, dispatch] = useStateValue()
    const filterModal = useFilterModal()
    const initialState = {
        category: {
            label: "All",
            value: "all"
        },
        priceMin: 0,
        priceMax: 0,
        brand: {
            label: "All",
            value: "all"
        }
    }



    const [filterOptions, setFilterOptions] = useState(initialState)

    const clearFilters = () => {
        GET_ALL_PRODUCTS("", (data) => {
            dispatch({
                type: "SET_PRODUCTS",
                payload: data.data
            })
            toast.success("Filters cleared")
        })
        setFilterOptions(initialState)
    }

    

    const handleFilterByCategory = (categoryId: string) => {
        if (categoryId === "all") {
            GET_ALL_PRODUCTS({}, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
            filterModal.onClose()
                
            })
            
            return
        }
        GET_ALL_PRODUCTS({
            category: categoryId
        }, (data: any) => {
            dispatch({
                type: "SET_PRODUCTS",
                payload: data.data
            })
            filterModal.onClose()
            
        })


    }

    const handleFilterByBrand = (brandId: string) => {
        if (brandId === "all") {
            GET_ALL_PRODUCTS({}, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
                
            filterModal.onClose()

            })
            return
        }
        GET_ALL_PRODUCTS({
            brand: brandId
        }, (data: any) => {
            dispatch({
                type: "SET_PRODUCTS",
                payload: data.data
            })
            
        filterModal.onClose()

        })


    }

    const handleFilterByPrice = () => {
        if (filterOptions.priceMin === 0 && filterOptions.priceMax === 0) {
            GET_ALL_PRODUCTS({}, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
                
            filterModal.onClose()

            })

            return
        }
        if (filterOptions.priceMin === 0) {
            GET_ALL_PRODUCTS({
                "price[lte]": filterOptions.priceMax
            }, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
                
            filterModal.onClose()


            })
            return
        }

        if (filterOptions.priceMax === 0) {
            GET_ALL_PRODUCTS({
                "price[gte]": filterOptions.priceMin
            }, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
            filterModal.onClose()
                
            })
            return
        }
        GET_ALL_PRODUCTS({
            "price[gte]": filterOptions.priceMin,
            "price[lte]": filterOptions.priceMax
        }, (data: any) => {
            dispatch({
                type: "SET_PRODUCTS",
                payload: data.data
            })
            
            filterModal.onClose()
        })


    }


    const bodyContent = (
        <div className=' h-full flex flex-col gap-6'>
            {/* <div className='grid grid-cols-4 gap-4 mt-4'>
                <article className='bg-gray-200 px-2 py-1 text-xs text-gray-700 text-center truncate rounded'>
                    {filterOptions.category.label}
                </article>
                <article className='bg-gray-200 px-2 py-1 text-xs text-gray-700 text-center truncate rounded'>
                    {filterOptions.priceMin}
                </article>
                <article className='bg-gray-200 px-2 py-1 text-xs text-gray-700 text-center truncate rounded'>
                    {filterOptions.priceMax}
                </article>
                <article className='bg-gray-200 px-2 py-1 text-xs text-gray-700 text-center truncate rounded'>
                    {filterOptions.brand.label}
                </article>
            </div> */}

            <article className='bg-white flex flex-col gap-4 p-4 rounded-lg h-max w-full'>
                <h3 className='font-medium  text-gray-800'>Filter By Categories</h3>
                <ul className='flex flex-col gap-2 text-sm text-gray-600'>
                    <li onClick={() => handleFilterByCategory("all")} className='flex items-center cursor-pointer hover:text-neon-blue'>
                        All
                    </li>
                    {
                        categories.map((data: Category) => (
                            <li key={data._id} className='flex items-center cursor-pointer hover:text-neon-blue'
                                onClick={() => handleFilterByCategory(data._id)}
                            >
                                {data.title}
                            </li>
                        ))
                    }
                </ul>
            </article>
            <form  className='bg-white flex flex-col gap-4 p-4 rounded-lg h-max w-full'>
                <h3 className='font-medium  text-gray-800'>Filter By Price | GHC</h3>
                <div className='flex items-center gap-3'>
                    <input value={filterOptions.priceMin} onChange={(e) => setFilterOptions({ ...filterOptions, priceMin: Number(e.target.value) })} type="number" className='border border-gray-300 rounded-lg w-1/2 p-2' placeholder='Min' />
                    <input value={filterOptions.priceMax} onChange={(e) => setFilterOptions({ ...filterOptions, priceMax: Number(e.target.value) })} type="number" className='border border-gray-300 rounded-lg w-1/2 p-2' placeholder='Max' />

                </div>
                <button  onClick={handleFilterByPrice} className='py-3 w-full bg-oxford-blue text-white rounded-lg'>
                    Apply
                </button>
            </form>
            <article className='bg-white flex flex-col gap-4 p-4 rounded-lg h-max w-full'>
                <h3 className='font-medium  text-gray-800'>Filter By Colors</h3>
                <ul className='flex flex-col gap-2 text-sm text-gray-600'>
                    {
                        brands.map((data: Brand) => (
                            <li onClick={() => handleFilterByBrand(data._id)} key={data._id} className='flex items-center cursor-pointer hover:text-neon-blue'>
                                {data.title}
                            </li>
                        ))
                    }
                </ul>
            </article>
            
        </div>
    )
    return (
        <ScreenModal
            isOpen={filterModal.isOpen}
            onClose={filterModal.onClose}
            body={bodyContent}
        />
    )
}

export default FilterModal