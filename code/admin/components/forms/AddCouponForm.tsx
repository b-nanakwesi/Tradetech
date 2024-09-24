import { useStateValue } from '@/redux/StateProvider'
import { ADD_COUPON } from '@/utils/server/coupons'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import ErrorField from '../ErrorField'
import Button from '../buttons/Button'


const AddCouponForm = () => {
    const [{ user }, dispatch] = useStateValue()
    const formik = useFormik({
        initialValues: {
            name: "",
            discount: 0,
            expiry: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Color is required"),
            discount: Yup.number().required("Discount is required").test("is-greater-than-100", "Discount should be less than 100 ", (value) => { 
                return value < 100
            }),
            expiry: Yup.date().required("Expiry date is required").test("is-expired", "Expiry date must be in the future", (value) => {
                return new Date(value).getTime() > Date.now()
            }),
        }),
        onSubmit: (values) => {
            // console.log(values)
            ADD_COUPON(values, user.token, (data) => {
                dispatch({
                    type: "ADD_COUPON",
                    payload: data.data,
                });
            })
        }
    })
    return (
        <form method='POST' className='flex flex-col gap-2' onSubmit={formik.handleSubmit}  >
            <div className='flex flex-col'>
                <ErrorField touched={formik.touched.name} error={formik.errors.name} />
                <input type="text" value={formik.values.name} onChange={formik.handleChange} name="name" id="name" placeholder="Name of Coupon" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
            </div>
            <div className='flex flex-col'>
                <ErrorField touched={formik.touched.expiry} error={formik.errors.expiry} />
                <input type="datetime-local" value={formik.values.expiry} onChange={formik.handleChange} name="expiry" id="expiry" placeholder="Expiry Date" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
            </div>
            <div className='flex flex-col'>
                <ErrorField touched={formik.touched.discount} error={formik.errors.discount} />
                <input type="number" value={formik.values.discount} onChange={formik.handleChange} name="discount" id="discount" placeholder="Discount in percentage" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
            </div>
            <Button text='Add' type='submit' />
        </form>
    )
}

export default AddCouponForm