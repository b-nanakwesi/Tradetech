import React from 'react'
import Button from '../buttons/Button'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorField from '../ErrorField'
import { useStateValue } from '@/redux/StateProvider'
import { ADD_CATEGORY } from '@/utils/server/category'

const AddCategoryForm = () => {
    const [{ user }, dispatch] = useStateValue()
    
    const formik = useFormik({
        initialValues: {
           category: ""
        },
        validationSchema: Yup.object({
            category: Yup.string().required("Color is required"),
        }),
        onSubmit: (values) => { 
            ADD_CATEGORY(values.category, user.token, (data: any) => {
                dispatch({
                    type: "ADD_CATEGORY",
                    payload: data.data,
                });
            })
        }
   })

    return (
        <form onSubmit={formik.handleSubmit} method='POST' className='flex flex-col gap-2'>
            <ErrorField touched={formik.touched.category} error={formik.errors.category} />
            <input type="text" value={formik.values.category} onChange={formik.handleChange} name="category" id="category" placeholder="Category" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
            <Button text="Add" type='submit' />
        </form>
    )
}

export default AddCategoryForm