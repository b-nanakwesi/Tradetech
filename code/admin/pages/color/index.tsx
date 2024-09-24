import NoData from '@/components/NoData'
import ColorCard from '@/components/cards/ColorCard'
import Layout from '@/components/layout/Layout'
import NeonLink from '@/components/links/NeonLink'
import OxfordLink from '@/components/links/OxfordLink'
import { useStateValue } from '@/redux/StateProvider'
import { Color } from '@/types'
import { GET_ALL_COLORS } from '@/utils/server/color'
import React, { useEffect, useState } from 'react'

const ColorPage = () => {
    const [{ colors }, dispatch] = useStateValue()

    const [searchKey, setSearchKey] = useState("")
    const [filteredColors, setFilteredColors] = useState(colors)

    const handleSearch = (e: any) => {
        e.preventDefault();
        setSearchKey(e.target.value);
        setFilteredColors(colors.filter((color: Color) => {
            return color.title.toLowerCase().includes(e.target.value.toLowerCase())
        }))
    }

    useEffect(() => {
        if (colors.length === 0) {
            GET_ALL_COLORS((data: any) => {
                dispatch({
                    type: "SET_COLORS",
                    payload: data.data,
                })
            })
        }
    }, [colors]);

    // console.log(colors);


    return (
        <Layout title="Color">
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
                <div className='flex flex-col gap-1  '>
                    <h1 className='font-medium text-4xl text-oxford-blue'>
                        Colors
                    </h1>
                    <p className='text-sm text-gray-500'>
                        The different colors of your products
                    </p>
                </div>
                <div className='w-full max-w-md border rounded-lg '>
                    <input value={searchKey} onChange={handleSearch} type="text" placeholder='Search' className='w-full px-4 py-3 rounded-lg focus:outline-none' />
                </div>
                <div className='flex items-center gap-2'>
                    <OxfordLink label="Add Color" url="/color/new" />
                    <NeonLink label="View Products" url="/products" />
                </div>
            </div>
            {
                searchKey === "" ? <>
                    {
                        colors && colors.length > 0 ?
                            <section className='grid mt-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                                {
                                    colors.map((color: Color) => (
                                        <ColorCard key={color._id} color={color} />
                                    ))
                                }
                            </section>
                            : <div>
                                <NoData />
                            </div>
                    }
                </> : <>
                    {
                        filteredColors && filteredColors.length > 0 ?
                            <section className='grid mt-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                                {
                                    filteredColors.map((color: Color) => (
                                        <ColorCard key={color._id} color={color} />
                                    ))
                                }
                            </section>
                            : <div>
                                <NoData />
                            </div>
                    }
                </>
            }


        </Layout>
    )
}

export default ColorPage