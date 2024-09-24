import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useStateValue } from '@/redux/StateProvider'
import { Brand, Category, Color, SelectType } from '@/types'
import Button from '../buttons/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import CustomSelect from '../inputs/CustomSelect'
import CustomInput from '../inputs/CustomInput'
import {  ADD_PRODUCT } from '@/utils/server/product'
import { AiOutlineDelete } from 'react-icons/ai'
import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
} from '@firebase/storage'
import { storage } from '@/firebase.config'
import { getRandomID } from '@/utils/functions'
import { BsCamera } from 'react-icons/bs'
import BouncingBalls from '../loaders/bouncingballs/BouncingBalls'



const AddProductForm = () => {
    const [{ user, colors, brands, categories }, dispatch] = useStateValue()

    const [selectedCategory, setSelectedCategory] = useState<SelectType | null>(null)
    const [selectedBrand, setSelectedBrand] = useState<SelectType | null>(null)
    const [selectedColor, setSelectedColor] = useState<any | null>(null)
    const [selectedState, setSelectedState] = useState<SelectType | null>(null)

    const [fileLoading, setFileLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [previewImage, setPreviewImage] = useState<any>(null)


    const [files, setFiles] = useState<{ public_id: string, url: string } | any>([])

    const previewImageFile = (e: any) => {
        if (e.target.files[0]) {
            setSelectedFile(e.target.files[0])
            setPreviewImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const deleteImage = () => {
        setFileLoading(true)
        setPreviewImage(null)
        setSelectedFile(null)
        setFileLoading(false)
    }


    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            quantity: 0,
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required').max(350, "Description must be less than 350 characters"),
            price: Yup.number().required('Price is required'),
            quantity: Yup.number().required('Quantity of product is required'),
        }),
        onSubmit: (values) => {
            if (!selectedBrand || !selectedCategory || !selectedColor || !selectedState || !selectedFile) {
                toast.error('Please select all options')
                return
            }

            const uploadToast = toast.loading("Uploading images ...")

            const fileName = getRandomID()

            const file = selectedFile
            const storageRef = ref(storage, `products/${fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, (error) => {
                toast.error("Error uploading images", { id: uploadToast })
                return
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    toast.success("Images uploaded successfully", { id: uploadToast })

                    const image = {
                        public_id: fileName,
                        url: downloadURL
                    }

                    const productData = {
                        title: values.title,
                        description: values.description,
                        price: values.price,
                        quantity: values.quantity,
                        brand: selectedBrand,
                        category: selectedCategory,
                        color: selectedColor,
                        state: selectedState,
                        images: [...files, image]
                    }

                    ADD_PRODUCT(productData, user.token, async (data) => {
                        formik.resetForm()
                        setSelectedBrand(null)
                        setSelectedCategory(null)
                        setSelectedColor(null)
                        setSelectedState(null)
                        setPreviewImage(null)
                        setSelectedFile(null)
                        console.log(data)
                    })


                })
            })

        },

    })

    return (
        <section className='flex'>
            <form method='POST' className=' flex flex-col gap-2 w-full' onSubmit={formik.handleSubmit} >
                <div
                    className={`h-[320px] max-w-lg sone rounded-lg bg-white border-2 border-dashed flex items-center justify-center ${previewImage || fileLoading
                            ? 'border-transparent'
                            : 'border-gray-400'
                        }`}
                >
                    {fileLoading ? (
                        <div>
                            <BouncingBalls />
                        </div>
                    ) : (
                        <>
                            {previewImage ? (
                                <div className='w-full h-full relative'>
                                    <img
                                        src={previewImage}
                                        alt=''
                                        className='w-full relative rounded-lg object-cover h-full max-h-[320px]'
                                    />
                                    <button
                                        className='bg-red-500 absolute right-0 bottom-0 m-1 cursor-pointer inline-block p-2 rounded-full hover:bg-red-600'
                                        onClick={deleteImage}
                                    >
                                        <AiOutlineDelete className=' text-2xl text-white ' />
                                    </button>
                                </div>
                            ) : (
                                <label
                                    className='w-full h-full flex-col gap-2 items-center justify-center flex cursor-pointer'
                                    onClick={() => { }}
                                >
                                    <div className='flex items-center cursor-pointer justify-center border h-12 w-12 rounded-full bg-gray-100/50 '>
                                        <BsCamera className='h-6 w-6 text-gray-400' />
                                    </div>
                                    <p className='text-xs text-gray-400'>
                                        Click to upload a cover
                                        image *
                                    </p>
                                    <input
                                        type='file'
                                        name='uploadimage'
                                        accept='image/*'
                                        onChange={
                                            previewImageFile
                                        }
                                        className='w-0 h-0	'
                                    />
                                </label>
                            )}
                        </>
                    )}
                </div>

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
                <Button text='Add Product' type='submit' />
            </form>
        </section>
    )
}

export default AddProductForm