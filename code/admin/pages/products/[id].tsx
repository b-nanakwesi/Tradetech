import ImageZoom from '@/components/ImageZoom';
import Layout from '@/components/layout/Layout'
import BouncingBalls from '@/components/loaders/bouncingballs/BouncingBalls';
import ProductBrand from '@/components/products/ProductBrand';
import ProductCategory from '@/components/products/ProductCategory';
import ProductColor from '@/components/products/ProductColor';
import { useStateValue } from '@/redux/StateProvider';
import { formatDate } from '@/utils/functions';
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID, UPDATE_PRODUCT } from '@/utils/server/product';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import CustomInput from '@/components/inputs/CustomInput';
import CustomSelect from '@/components/inputs/CustomSelect';
import { Brand, Category, Color, SelectType } from '@/types';
import Button from '@/components/buttons/Button';
import { MdKeyboardBackspace } from 'react-icons/md';

const ViewProduct = () => {
    const router = useRouter();
    const { id } = router.query;
    const [{ user, colors, brands, categories }, dispatch] = useStateValue()

    const [selectedCategory, setSelectedCategory] = useState<SelectType | null>(null)
    const [selectedBrand, setSelectedBrand] = useState<SelectType | null>(null)
    const [selectedColor, setSelectedColor] = useState<any | null>(null)
    const [selectedState, setSelectedState] = useState<SelectType | null>(null)
    const [view, setView] = useState<"view" | "edit">("view")
    const [currentProduct, setCurrentProduct] = useState<any>(null)


    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            quantity: 0,
        },
        onSubmit: (values) => {
            const productData = {
                title: values.title ? values.title : currentProduct.title,
                description: values.description ? values.description : currentProduct.description,
                price: values.price ? values.price : currentProduct.price,
                quantity: values.quantity ? values.quantity : currentProduct.quantity,
                brand: selectedBrand ? selectedBrand : currentProduct.brand,
                category: selectedCategory ? selectedCategory : currentProduct.category,
                color: selectedColor ? selectedColor : currentProduct.color,
                state: selectedState ? selectedState : currentProduct.state,
            }

            UPDATE_PRODUCT(id as string, productData, user.token, (productData) => {
                GET_ALL_PRODUCTS("", (allProducts) => {
                    dispatch({
                        type: "SET_PRODUCTS",
                        payload: allProducts.data
                    })

                    if (id) {
                        GET_PRODUCT_BY_ID(id as string, (data: any) => {
                            setCurrentProduct(data)
                        })
                    }
                    setView("view")
                })
            })
        },

    })

    useEffect(() => {
        if (id) {
            GET_PRODUCT_BY_ID(id as string, (data: any) => {
                setCurrentProduct(data)
            })
        }
    }, [id]);



    return (
        <Layout title='View Product'>
            {
                currentProduct ? <>
                    {
                        view === "view" ? <div className='relative flex-col flex gap-4'>

                            <button className='w-max hover:text-neon-blue flex items-center gap-2' onClick={() => {
                                router.back()
                            }}>
                                <MdKeyboardBackspace className='text-2xl' />
                                Go back
                            </button>
                            <section className='bg-white relative px-4 md:px-8 py-8 rounded-lg grid gap-6 grid-cols-1 md:grid-cols-2'>
                                <div className='w-full overflow-hidden items-center flex justify-center h-full min-h-[200px] lg:min-h-[300px] rounded-lg'>
                                    {
                                        currentProduct.images && currentProduct.images.length > 0 ? <ImageZoom src={currentProduct.images[0].url} /> : <ImageZoom src='https://photographylife.com/wp-content/uploads/2023/04/XPS15-thumbnail-laptop-for-photography.jpg' />
                                    }
                                </div>
                                <div className='flex flex-col  gap-2'>
                                    <h3 className='truncate font-medium text-2xl'>

                                        {currentProduct?.title || "Product"}
                                    </h3>
                                    <p className='text-xs text-gray-600'>
                                        {currentProduct?.description || "No description"}
                                    </p>
                                    <hr />
                                    <p>
                                        GHC{currentProduct?.price || 0}
                                    </p>


                                    <hr />
                                    <div className='flex items-center py-1 gap-4'>
                                        <p className='font-medium'>Brand: </p>
                                        <ProductBrand id={currentProduct?.brand} />

                                    </div>
                                    <div className='flex items-center py-1 gap-4'>
                                        <p className='font-medium'>Colors: </p>
                                        <div className='flex items-center gap-2'>
                                            {
                                                currentProduct?.color ? <ProductColor id={currentProduct?.color[0]} /> : <p>
                                                    No colors available
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <div className='flex items-center py-1 gap-4'>
                                        <p className='font-medium'>Category: </p>
                                        <ProductCategory id={currentProduct?.category} />

                                    </div>
                                    <div className='flex items-center py-1 gap-4'>
                                        <p className='font-medium'>Availability: </p>
                                        <p>
                                            {
                                                currentProduct?.quantity || 0
                                            }
                                        </p>
                                    </div>
                                    <div className='flex items-center py-1 gap-4'>
                                        <p className='font-medium'>Sold: </p>
                                        <p>
                                            {
                                                currentProduct?.sold || 0
                                            }
                                        </p>
                                    </div>
                                    <div className='flex items-center py-1 gap-4'>
                                        <p className='font-medium'>State: </p>
                                        <p>
                                            {
                                                currentProduct?.state || ""
                                            }
                                        </p>
                                    </div>
                                    <div className='flex flex-col md:flex-row md:items-center py-1 md:gap-4'>
                                        <p className='font-medium'>Created At: </p>
                                        <p>
                                            {
                                                formatDate(currentProduct?.createdAt, "long", "")
                                            }
                                        </p>
                                    </div>
                                    <div className='flex flex-col md:flex-row md:items-center py-1 md:gap-4'>
                                        <p className='font-medium'>Updated At: </p>
                                        <p>
                                            {
                                                formatDate(currentProduct?.updatedAt, "long", "")
                                            }
                                        </p>
                                    </div>
                                    <button className='bg-oxford-blue text-white rounded-lg py-3' onClick={() => setView("edit")} >
                                        Edit
                                    </button>




                                </div>

                            </section>

                        </div> : <>
                            <p className='text-sm'>
                                NB: The feature to edit product images is not available yet. You can only edit the product details
                            </p>
                            <h2 className='text-3xl font-medium'>
                                Edit Product Mode
                            </h2>
                            <form method='POST' className=' flex flex-col gap-2 w-full' onSubmit={formik.handleSubmit} >


                                <div className='w-full grid gap-4 grid-cols-1 lg:grid-cols-2'>

                                    <CustomInput
                                        touched={formik.touched.title}
                                        error={formik.errors.title}
                                        label="Title"
                                        name="title"
                                        placeholder="Title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                    />
                                    <CustomInput
                                        touched={formik.touched.description}
                                        error={formik.errors.description}
                                        label="Description"
                                        name="description"
                                        placeholder="Description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    />
                                    <CustomInput
                                        touched={formik.touched.price}
                                        error={formik.errors.price}
                                        label="Price"
                                        name="price"
                                        type='number'
                                        placeholder="Price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                    />
                                    <CustomInput
                                        touched={formik.touched.quantity}
                                        error={formik.errors.quantity}
                                        label="Quantity"
                                        name="quantity"
                                        type="number"
                                        placeholder="Quantity"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                    />

                                    <div className="flex flex-col">
                                        <CustomSelect
                                            placeholder="Select Category"
                                            name='category'
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e)}
                                            options={categories && categories.map((category: Category) => ({ value: category._id, label: category.title }))}
                                        />

                                    </div>
                                    <div className="flex flex-col">
                                        <CustomSelect
                                            placeholder="Select Brand"
                                            name='brand'
                                            value={selectedBrand}
                                            onChange={(e) => setSelectedBrand(e)}
                                            options={brands && brands.map((brand: Brand) => ({ value: brand._id, label: brand.title }))}
                                        />
                                    </div>
                                    <div className="flex flex-col">

                                        <CustomSelect
                                            placeholder="Select Colors"

                                            name="colors"
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e)}
                                            options={colors && colors.map((color: Color) => ({ value: color._id, label: color.title }))}
                                        />

                                    </div>
                                    <div className="flex flex-col">

                                        <CustomSelect
                                            name='state'
                                            value={selectedState}
                                            placeholder='Select State'
                                            onChange={(e) => setSelectedState(e)}
                                            options={
                                                [
                                                    { value: 'New', label: 'New' },
                                                    { value: 'Used', label: 'Used' },
                                                ]
                                            }

                                        />

                                    </div>

                                </div>
                                <div className='flex items-center gap-4 w-full'>
                                    <Button text='Cancel' variant='secondary' type='button' onClick={() => setView("view")} />
                                    <Button text='Edit Product' type='submit' />
                                </div>
                            </form>

                        </>
                    }

                </> : <>
                    <div className='w-full h-full flex items-center justify-center'>
                        <BouncingBalls />
                    </div>
                </>
            }
        </Layout>
    )
}

export default ViewProduct