import React from 'react'
import Button from '../buttons/Button'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useStateValue } from '@/redux/StateProvider'
import { ADD_BRAND } from '@/utils/server/brand'
import ErrorField from '../ErrorField'

const AddBrandForm = () => {
    const [{ user }, dispatch] = useStateValue()
    
    const formik = useFormik({
        initialValues: {
            brand: ""
        },
        validationSchema: Yup.object({
            brand: Yup.string().required("Brand is required"),
        }),
        onSubmit: (values) => { 
            ADD_BRAND(values.brand, user.token, (data) => {
                dispatch({
                    type: "ADD_BRAND",
                    payload: data.data,
                })

            })
        }

    })

   
    return (
        <form onSubmit={formik.handleSubmit} method='POST' className='flex flex-col gap-2'>
            <ErrorField touched={formik.touched.brand} error={formik.errors.brand} />
            <input type="text" value={formik.values.brand} onChange={formik.handleChange} name="brand" id="brand" placeholder="Brand" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
            <Button text="Add" type='submit' />
        </form>
    )
}

export default AddBrandForm