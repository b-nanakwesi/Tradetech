import React from 'react'
import Button from '../buttons/Button'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorField from '../ErrorField'
import { useStateValue } from '@/redux/StateProvider'
import { ADD_COLOR } from '@/utils/server/color'

const AddColorForm = () => {
    const [{user}, dispatch] = useStateValue()
    const formik = useFormik({
        initialValues: {
           color: ""
        },
        validationSchema: Yup.object({
            color: Yup.string().required("Color is required"),
        }),
        onSubmit: (values) => { 
            ADD_COLOR(values.color, user.token, (data) => {
                dispatch({
                    type: "ADD_COLOR",
                    payload: data.data,
                });
            })
        }
   })

   
    return (
        <form onSubmit={formik.handleSubmit} method='POST' className='flex flex-col gap-2'>
            <ErrorField touched={formik.touched.color} error={formik.errors.color} />
            <input type="text" value={formik.values.color} onChange={formik.handleChange} name="color" id="color" placeholder="Color" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
            <Button text="Add" type='submit' />
        </form>
    )
}

export default AddColorForm