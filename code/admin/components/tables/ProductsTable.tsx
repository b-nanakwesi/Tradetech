import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStateValue } from '@/redux/StateProvider';
import { Brand, Category, Product, SelectType, User } from '@/types';
import NoData from '../NoData';
import Link from 'next/link';
import { BsMailbox2, BsApple } from 'react-icons/bs';
import { BiSolidUser } from 'react-icons/bi';
import { GET_ALL_PRODUCTS, DELETE_PRODUCT } from '@/utils/server/product';
import Image from 'next/image';
import { MdMail, MdPhone, MdCategory } from 'react-icons/md';
import { formatDate } from '@/utils/functions';
import Button from '../buttons/Button';
import { GET_CATEGORY_BY_ID } from '@/utils/server/category';
import ProductCategory from '../products/ProductCategory';
import ProductBrand from '../products/ProductBrand';
import { GiTwoCoins } from 'react-icons/gi';
import CustomSelect from '../inputs/CustomSelect';


const ProductsTable = () => {
    const [{ user, products, categories, brands }, dispatch] = useStateValue();
    const [flagDelete, setFlagDelete] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<SelectType | null>(null)
    const [selectedBrand, setSelectedBrand] = useState<SelectType | null>(null)


    const router = useRouter()

    const handleDelete = async (id: string) => {
        DELETE_PRODUCT(id, user.token, (data) => {
            GET_ALL_PRODUCTS("", (data: any) => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: data.data
                })

            })

        })

    }

    const handleFilterByCategory = (e: any) => { 
        if (selectedBrand !== null) { 
            let params = {
                category: e?.value,
                brand: selectedBrand?.value
            }
            GET_ALL_PRODUCTS(params, (data: any) => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: data.data
                })
            })
        }
       
        setSelectedCategory(e)
        if (e === null) { 
            GET_ALL_PRODUCTS("", (data: any) => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: data.data
                })
            })
        } else {

            let params = {
                category: e?.value
            }
            console.log(params);
            
            GET_ALL_PRODUCTS(params, (data: any) => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: data.data
                })
            })
        }
    }

    const handleFilterByBrand = (e: any) => {
        if (selectedCategory !== null) {
            let params = {
                category: selectedCategory?.value,
                brand: e?.value
            }
            GET_ALL_PRODUCTS(params, (data: any) => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: data.data
                })
            })
        }
        setSelectedBrand(e)
        if (e === null) {
            GET_ALL_PRODUCTS("", (data: any) => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: data.data
                })
            })
        } else {
            let params = {
                brand: e?.value
            }
            console.log(params);
            
            GET_ALL_PRODUCTS(params, (data: any) => {
                dispatch({
                    type: 'SET_PRODUCTS',
                    payload: data.data
                })
            })

        }
    }


    useEffect(() => {
        GET_ALL_PRODUCTS("", (data: any) => {
            dispatch({
                type: 'SET_PRODUCTS',
                payload: data.data
            })
        })


    }, []);


    return (
        <div className='w-full  min-h-[70vh] flex flex-col gap-2 p-2'>
            {/* filters */}
            <div className='grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-3'>
                <CustomSelect
                    placeholder="Filter category"
                    name='category'
                    value={selectedCategory}
                    onChange={(e) => handleFilterByCategory(e)}
                    options={categories && categories.map((category: Category) => ({ value: category._id, label: category.title }))}
                />
                <CustomSelect
                    placeholder="Filter brand"
                    name='brand'
                    value={selectedBrand}
                    onChange={(e) => handleFilterByBrand(e)}
                    options={brands && brands.map((brand: Brand) => ({ value: brand._id, label: brand.title }))}
                />
            </div>

            <div className='md:flex flex-col w-full hidden'>
                <div className='bg-gray-200 font-medium text-oxford-blue grid grid-cols-10 mb-[2px]'>
                    <div className='p-4 text-lg border-r '>
                        Image
                    </div>
                    <div className='p-4 text-lg border-r col-span-2 '>
                        Title
                    </div>
                    <div className='p-4 text-lg border-r col-span-2 '>
                        Category
                    </div>
                    <div className='p-4 text-lg border-r col-span-1 '>
                        Brand
                    </div>
                    <div className='p-4 text-lg border-r col-span-1 '>
                        Price
                    </div>

                    <div className='p-4 text-lg border-r '>
                        Stock
                    </div>
                    <div className='p-4 text-lg border-r col-span-2 '>
                        Actions
                    </div>

                </div>
                <div className='flex flex-col min-h-full gap-[2px] '>
                    {
                        products && products.length > 0 ? products.map((product: Product) => (
                            <div className='grid grid-cols-10 bg-white' key={product._id}>
                                <div className='p-2 flex items-center justify-center truncate text-sm capitalize border-r '>
                                    <div className='border-gray-300 border-2 w-[70px] h-[70px] min-w-[70px] min-h-[70px] flex items-center justify-center overflow-hidden rounded-lg'>
                                        {
                                         product.images &&   product.images.length > 0 ? <img src={product.images[0].url} className='object-cover w-full h-full' alt="avatar"  /> : <div className='w-full h-full flex items-center justify-center text-neon-blue text-'></div>
                                        }
                                    </div>
                                </div>
                                <Link href={`/products/${product._id}`} className='p-4 flex flex-col truncate text-sm border-r col-span-2 '>
                                    <p className='truncate text-base font-medium'>

                                        {product.title}
                                    </p>
                                    <p className='truncate'>
                                        {product.description}
                                    </p>
                                </Link>
                                <div className='p-4 truncate text-sm border-r col-span-2 '>
                                    <ProductCategory id={product.category || ""} />
                                </div>
                                <div className='p-4 truncate text-sm border-r col-span-1 '>
                                    <ProductBrand id={product.brand || ""} />
                                </div>
                                <div className='p-4 truncate text-sm border-r col-span-1 '>
                                    {product.price}
                                </div>

                                <div className='p-4 truncate text-sm border-r '>
                                    {product.quantity}
                                </div>
                                <div className='px-3 truncate flex items-center gap-2 text-sm border-r col-span-2 '>
                                    <Link href={`/products/${product._id}`} className='bg-blue-500 text-sm px-3 py-1 text-white rounded-lg  transition'>
                                        Edit
                                    </Link>

                                    <button onClick={() => handleDelete(product._id)} className='bg-red-500 text-sm px-3 py-1 text-white rounded-lg  transition'>
                                        Delete
                                    </button>

                                </div>
                            </div>
                        )) : <NoData />
                    }

                </div>

            </div >
            <div className='gap-4 w-full grid grid-cols-1 sm:grid-cols-2 md:hidden p-1 py-4'>
                {
                    products && products.length > 0 ? <>
                        {
                            products.map((prod: Product) => (
                                <article key={prod._id} className='bg-white  max-w-md w-full flex flex-col gap-4 p-4 md:p-8 rounded-lg sone'>

                                    <div className='flex flex-col  tems-center gap-4 overflow-hidden '>
                                        <div className='border-gray-300 border w-[90px] h-[90px] min-w-[90px] min-h-[90px] flex items-center justify-center overflow-hidden rounded-lg'>

                                            <img src={prod.images && prod.images[0].url} className='object-cover h-full w-full' alt="avatar" />
                                        </div>
                                        <div className='flex flex-col  w-full'>

                                            <h1 className='text-xl font-medium flex-wrap flex text-oxford-blue truncate '>
                                                {prod.title}
                                            </h1>
                                            <div className='flex items-center gap-2 truncate'>
                                                <p className='text-gray-600 text-sm truncate'>
                                                    {prod.description.substring(0, 100)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2' >
                                        <div className='flex items-center gap-2'>
                                            <GiTwoCoins className='text-saffron text-xl' />
                                            <p className='text-gray-600  text-sm truncate'>
                                                GHC {prod.price}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <MdCategory className='text-saffron text-xl' />
                                            <div className='text-gray-600  text-sm truncate'>
                                                <ProductCategory id={prod.category || ""} />

                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <BsApple className='text-saffron text-xl' />
                                            <div className='text-gray-600 text-sm truncate'>
                                                <ProductBrand id={prod.brand|| ""} />
                                            </div>
                                        </div>

                                        <div className='flex items-center text-sm gap-1 flex-wrap'>
                                            <p>
                                                Created At:
                                            </p>
                                            <p className='text-gray-600 text-sm truncate'>
                                                {
                                                    formatDate(prod.createdAt || "", "long", "")
                                                }
                                            </p>
                                        </div>
                                        <div className='flex items-center text-sm gap-1 flex-wrap'>
                                            <p>
                                                Updated At:
                                            </p>
                                            <p className='text-gray-600 text-sm truncate'>
                                                {
                                                    formatDate(prod.updatedAt || "", "long", "")
                                                }
                                            </p>
                                        </div>
                                        <div className="w-full flex items-center gap-2">
                                            <button className='w-full bg-red-500 text-white py-3 rounded-lg' onClick={() => setFlagDelete((prev) => !prev)}>
                                                Delete
                                            </button>
                                            <Link href={`/products/${prod._id}`} className='w-full text-center bg-oxford-blue text-white py-3 rounded-lg'>
                                                View
                                            </Link>
                                        </div>

                                        {
                                            flagDelete && <div className='w-full py-3 px-2 rounded-lg flex flex-col gap-2 bg-red-200'>
                                                <p className='text-red-700'>Flagged for deletion</p>
                                                <div className='flex items-center gap-2'>
                                                    
                                                    <button className='w-full text-oxford-blue bg-white py-2 rounded-lg' onClick={() => setFlagDelete((prev) => !prev)}>
                                                        Cancel
                                                    </button>
                                                    <button onClick={() => {
                                                        handleDelete(prod._id)
                                                        setFlagDelete((prev) => !prev)
                                                    }} className='w-full bg-red-500 text-white py-2 rounded-lg'>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        }

                                    </div>





                                </article>
                            ))
                        }
                    </> : <div className='col-span-1 sm:col-span-2'>
                        <NoData />
                    </div>
                }
            </div>


        </div>
    );
};


export default ProductsTable