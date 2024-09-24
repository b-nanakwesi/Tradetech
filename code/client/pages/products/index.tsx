import NoData from '@/components/NoData'
import OxfordPrimary from '@/components/buttons/OxfordPrimary'
import ProductCardMain from '@/components/cards/product/ProductCardMain'
import Layout from '@/components/layouts/Layout'
import ProductLoader from '@/components/loaders/ProductLoader'
import { fetchCart } from '@/hooks/fetchLocalStorageData'
import useFilterModal from '@/hooks/useFilterModal'
import { useStateValue } from '@/redux/StateProvider'
import { Category, Color, Product } from '@/types'
import { GET_ALL_PRODUCTS } from '@/utils/server/products'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export const sortOptions = [
    {
        id: 1,
        value: "",
        label: "-- Select --"
    },
    {
        id: 2,
        value: "best-selling",
        label: "Best Selling"
    },
    {
        id: 3,
        value: "title-ascending",
        label: "Alphabetically, A-Z"
    },
    {
        id: 4,
        value: "title-descending",
        label: "Alphabetically, Z-A"
    },
    {
        id: 5,
        value: "price-ascending",
        label: "Price, low to high"
    },
    {
        id: 6,
        value: "price-descending",
        label: "Price, high to low"
    },
    {
        id: 7,
        value: "created-ascending",
        label: "Date, old to new"
    },
    {
        id: 8,
        value: "created-descending",
        label: "Date, new to old"
    }
]

const Products = () => {
    const [{ user, products, coupons, categories, brands, colors,  }, dispatch] = useStateValue()
    const [loading, setLoading] = useState(true);
    const filterModal = useFilterModal()
    const [selectedSort, setSelectedSort] = useState(sortOptions[0])
    const [searchKey, setSearchKey] = useState("")
    const [minPrice, setMinPrice] = useState<number | "">("")
    const [maxPrice, setMaxPrice] = useState<number | "">("")
    const [searchResults, setSearchResults] = useState(products)



    const handleSort = (e: any) => {
        e.preventDefault()
        setSelectedSort(e.target.value)

        // let sortedProducts = [...products]
        let sortParam

        switch (e.target.value) {
            case "best-selling":
                sortParam = "sold"
                break;
            case "title-ascending":
                sortParam = "title"
                break;
            case "title-descending":
                sortParam = "-title"
                break;
            case "price-ascending":
                sortParam = "price"
                break;
            case "price-descending":
                sortParam = "-price"
                break;
            case "created-ascending":
                sortParam = "createdAt"
                break;
            case "created-descending":
                sortParam = "-createdAt"
                break;
            default:
                sortParam = "createdAt"
                break;
        }



        GET_ALL_PRODUCTS({
            sort: sortParam
        }, (data: any) => {
            dispatch({
                type: "SET_PRODUCTS",
                payload: data.data
            })
            

        })



    }

    const handleFilterByCategory = (categoryId: string) => {
        if (categoryId === "all") {
            GET_ALL_PRODUCTS({}, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
                

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
            

        })
    }

    const handleFilterByBrand = (brandId: string) => {
        if (brandId === "all") {
            GET_ALL_PRODUCTS({}, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
                

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
            

        })
    }

    const handleFilterByPrice = () => {
        if (minPrice === 0 && maxPrice === 0 || minPrice === "" && maxPrice === "") {
            GET_ALL_PRODUCTS({}, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
                

            })
            return
        }
        if (minPrice === 0 || minPrice === "") {
            GET_ALL_PRODUCTS({
                "price[lte]": maxPrice
            }, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
                

            })
            return
        }

        if (maxPrice === 0 || maxPrice === "") {
            GET_ALL_PRODUCTS({
                "price[gte]": minPrice
            }, (data: any) => {
                dispatch({
                    type: "SET_PRODUCTS",
                    payload: data.data
                })
                

            })
            return
        }
        GET_ALL_PRODUCTS({
            "price[gte]": minPrice,
            "price[lte]": maxPrice
        }, (data: any) => {
            dispatch({
                type: "SET_PRODUCTS",
                payload: data.data
            })
            

        })
    }

    const handleSearch = () => {
        setSearchResults(products.filter((product: Product) => {
            return product.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                product.description.toLowerCase().includes(searchKey.toLowerCase()) ||
                product.price.toString().includes(searchKey.toLowerCase())
        }))
    }

    useEffect(() => {
        GET_ALL_PRODUCTS({}, (data: any) => {
            dispatch({
                type: "SET_PRODUCTS",
                payload: data.data
            })

        })


    }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const getCart = fetchCart()
          dispatch({
            type: "SET_CART",
            payload: getCart,
          })
          
        }
      }, []);



    return (
        <Layout title='Products'>
            <form onSubmit={handleSearch} className='flex mb-2 gap-2'>
                <input value={searchKey} onChange={(e) => {
                    setSearchKey(e.target.value)
                    handleSearch()
                }} className='px-4 py-3 rounded-lg border w-full border-gray-300 focus:outline-none focus:border-neon-blue' type="text" placeholder='Search by title' />
                <button className='px-12 py-3 rounded-lg bg-oxford-blue text-white' type="submit">Search</button>
            </form>
            <div className='grid grid-cols-2 gap-6 lg:grid-cols-5 '>
                <aside className='hidden lg:flex flex-col gap-4 '>
                    <article className='bg-white flex flex-col gap-4 p-4 rounded-lg h-max w-full'>
                        <h3 className='font-medium  text-gray-800'>Filter By Categories</h3>
                        <ul className='flex flex-col gap-2 text-sm text-gray-600'>
                            <li onClick={() => handleFilterByCategory("all")} className='flex items-center cursor-pointer hover:text-neon-blue'>
                                All
                            </li>
                            {
                                categories && categories.map((data: Category) => (
                                    <li onClick={() => handleFilterByCategory(data._id)} key={data._id} className='flex items-center cursor-pointer hover:text-neon-blue'>
                                        {data.title}
                                    </li>
                                ))
                            }
                        </ul>
                    </article>
                    <article className='bg-white flex flex-col gap-4 p-4 rounded-lg h-max w-full'>
                        <h3 className='font-medium  text-gray-800'>Filter By Price | GHC</h3>
                        <div className='flex items-center gap-3'>
                            <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className='border border-gray-300 rounded-lg w-1/2 p-2' placeholder='Min' />
                            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className='border border-gray-300 rounded-lg w-1/2 p-2' placeholder='Max' />

                        </div>
                        <button onClick={handleFilterByPrice} className='bg-oxford-blue text-white text-sm py-3 w-full rounded-lg'>
                            Apply
                        </button>
                    </article>
                    <article className='bg-white flex flex-col gap-4 p-4 rounded-lg h-max w-full'>
                        <h3 className='font-medium  text-gray-800'>Filter By Brands</h3>
                        <ul className='flex flex-col gap-2 text-sm text-gray-600'>
                            <li onClick={() => handleFilterByBrand("all")} className='flex items-center cursor-pointer hover:text-neon-blue'>
                                All
                            </li>
                            {
                                brands && brands.map((data: Color) => (
                                    <li onClick={() => handleFilterByBrand(data._id)} key={data._id} className='flex items-center cursor-pointer hover:text-neon-blue'>
                                        {data.title}
                                    </li>
                                ))
                            }
                        </ul>
                    </article>
                </aside>
                <section className='col-span-4 flex flex-col gap-4  w-full'>
                    <div className='bg-white w-full py-4 px-4 flex flex-col lg:flex-row gap-2 lg:items-center justify-between rounded-lg shadow-sm'>
                        <div className='flex  items-center gap-4'>
                            <p>Sort by:</p>
                            <select value={selectedSort.value}
                                onChange={(e) => {
                                    handleSort(e)
                                }
                                }

                                name="sort" id="sort" className='border border-gray-300 rounded-lg px-4 py-2'>
                                {
                                    sortOptions.map((data) => (
                                        <option onClick={
                                            () => setSelectedSort(data)
                                        } key={data.id} value={data.value}>{data.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='flex items-center gap-8'>
                            <p className='text-gray-700 text-sm'>{products ? products.length : 0} products</p>
                            {/* <div className='flex items-center gap-4'>
                                <button onClick={() => setGrid(4)} className={`hidden lg:block rounded-lg ${grid === 4 ? 'bg-oxford-blue' : "bg-antiflash"} p-2`}>
                                    <img src='/images/gr4.svg' alt='grid-4' className={`${grid === 4 ? 'toggled' : ""} w-[15px] h-[15px]`} />
                                </button>
                                <button onClick={() => setGrid(3)} className={`hidden md:block rounded-lg ${grid === 3 ? 'bg-oxford-blue' : "bg-antiflash"} p-2`}>
                                    <img src='/images/gr3.svg' alt='grid-4' className={`${grid === 3 ? 'toggled' : ""} w-[15px] h-[15px]`} />
                                </button>
                                <button onClick={() => setGrid(2)} className={` rounded-lg ${grid === 2 ? 'bg-oxford-blue' : "bg-antiflash"} p-2`}>
                                    <img src='/images/gr2.svg' alt='grid-4' className={`${grid === 2 ? 'toggled' : ""} w-[15px] h-[15px]`} />
                                </button>
                                <button onClick={() => setGrid(1)} className={` rounded-lg ${grid === 1 ? 'bg-oxford-blue' : "bg-antiflash"} p-2`}>
                                    <img src='/images/gr.svg' alt='grid-4' className={`${grid === 1 ? 'toggled' : ""} w-[15px] h-[15px]`} />
                                </button>
                            </div> */}
                            <div className='lg:hidden '>
                                <OxfordPrimary label='Filter' onClick={filterModal.onOpen} />
                            </div>
                        </div>
                    </div>
                    <div className={`w-full  grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 `}>

                        {
                            searchKey === "" ? <>
                                {
                                    loading ? <>
                                        {(
                                            [1, 2, 3, 4, 5].map((data) => (
                                                <ProductLoader key={data} />
                                            )
                                            ))}
                                    </> : <>
                                        {
                                            !products || products.length === 0 ? (
                                                <div className='col-span-1 sm:col-span-2 lg:col-span-3'>
                                                    <NoData />
                                                </div>
                                            )
                                                : <>
                                                    {
                                                        products && products?.map((data: Product) => (
                                                            <ProductCardMain product={data} key={data._id} />
                                                        ))
                                                    }
                                                </>
                                        }
                                    </>
                                }
                            </> : <>
                            {
                                    loading ? <>
                                        {(
                                            [1, 2, 3, 4, 5].map((data) => (
                                                <ProductLoader key={data} />
                                            )
                                            ))}
                                    </> : <>
                                        {
                                            !searchResults || searchResults.length === 0 ? (
                                                <div className='col-span-1 sm:col-span-2 lg:col-span-3'>
                                                    <NoData />
                                                </div>
                                            )
                                                : <>
                                                    {
                                                        searchResults && searchResults?.map((data: Product) => (
                                                            <ProductCardMain product={data} key={data._id} />
                                                        ))
                                                    }
                                                </>
                                        }
                                    </>
                                }
                            </>
                        }
                    </div>
                </section>
            </div>

        </Layout>
    )
}

export default Products