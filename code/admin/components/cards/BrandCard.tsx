import { Brand, Color } from '@/types'
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { AiTwotoneEdit } from 'react-icons/ai'
import { DELETE_BRAND, UPDATE_BRAND} from '@/utils/server/brand'
import ErrorField from '../ErrorField'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useStateValue } from '@/redux/StateProvider'
import { useRouter } from 'next/router'

interface Props {
    brand: Brand
}

const BrandCard: React.FC<Props> = ({ brand }) => {
    const [{ user, brands }, dispatch] = useStateValue()
    const { title, _id } = brand

    const router = useRouter()

    const handleShowEdit = () => {
        if(showDelete) setShowDelete(false)
        setShowEdit((prev) => !prev)
    }

    const handleShowDelete = () => {
        if(showEdit) setShowEdit(false)
        setShowDelete((prev) => !prev)
    }

    const handleEdit = () => {
        setShowEdit(false)
        UPDATE_BRAND(_id, formik.values.newBrand, user.token, (data) => {
            // console.log(data.data);
            
            dispatch({
                type: "SET_BRANDS",
                payload: data.data
            })
            // reload to re render the page and reflect changes
            router.reload()
        })
        // console.log(colors);
        
    }

    const handleDelete = () => {
        setShowDelete(false)
        DELETE_BRAND(_id, user.token, (data) => {
            dispatch({
                type: "SET_BRANDS",
                payload: data.data
            })
            // reload to re render the page and reflect changes
            router.reload()
        })
    }

    const formik = useFormik({
        initialValues: {
            newBrand: title
        },
        validationSchema: Yup.object({
            newBrand: Yup.string().required('Brand is required').test('brand-exists', 'Brand can not be the same', function(value) {
                const { newBrand } = this.parent;
                
                return newBrand !== title;
              })
        }), 
        onSubmit: (values) => {
            handleEdit()
        }
    })
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    

    return (

        <article className=' rounded-lg h-max bg-white sone flex flex-col gap- relative overflow-hidden'>
            <div className='absolute h-full bg-gray-200 w-1/2 rounded-lg -right-12 lg:-right-12 top-0 -rotate-45'>
            </div>
            <div className='flex p-4 items-center justify-between w-full'>
                <div className='md:text-lg '>
                    {title}
                </div>
                <div className='flex gap-2 items-center relative'>
                    <button onClick={handleShowDelete} className='text-xl bg-red-500 p-2 rounded text-white'>
                        <MdDelete />
                    </button>
                    <button onClick={handleShowEdit} className='text-xl bg-blue-500 p-2 rounded text-white'>
                        <AiTwotoneEdit />
                    </button>
                </div>
            </div>


            {
                showEdit && (
                    <>
                        <form onSubmit={formik.handleSubmit} className='p-4 flex flex-col gap-2 bg-white text-oxford-blue relative '>
                            <p className='ml-1'>

                            Edit Brand
                            </p>
                            <ErrorField error={formik.errors.newBrand} touched={formik.touched.newBrand} />
                            <input type="text" value={formik.values.newBrand} onChange={formik.handleChange} name="newBrand" id="newColor" placeholder="Color" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
                            <div className='flex items-center gap-2 '>
                                <button onClick={handleShowEdit} className='text-night  font-medium rounded-lg text-sm py-2 bg-gray-200 w-full'>
                                    Cancel
                                </button>
                                <button type="submit" className='text-white  rounded-lg text-sm py-2 bg-oxford-blue w-full'>
                                    Edit
                                </button>
                            </div>
                        </form>
                    </>
                )
            }

            {
                showDelete && (
                    <>
                        <div className='p-4 flex flex-col gap-2 bg-red-200 text-red-700 relative' >
                            Flagged for deletion
                            <div className='flex items-center gap-2 '>
                                <button onClick={handleShowDelete} className='text-night font-medium rounded-lg text-sm py-2 bg-white w-full'>
                                    Cancel
                                </button>
                                <button onClick={handleDelete} className='text-white  rounded-lg text-sm py-2 bg-red-500 w-full'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </>
                )
            }

        </article>

    )
}

export default BrandCard