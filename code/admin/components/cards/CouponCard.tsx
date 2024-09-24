import { useStateValue } from '@/redux/StateProvider'
import { Coupon } from '@/types'
import { formatDate } from '@/utils/functions'
import { DELETE_COUPON, UPDATE_COUPON } from '@/utils/server/coupons'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AiTwotoneEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import * as Yup from 'yup'
import ErrorField from '../ErrorField'

interface CouponCardProps {
    coupon: Coupon
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
    const [{ user, coupons }, dispatch] = useStateValue()
    const { name, _id, discount, expiry } = coupon

    const router = useRouter()

    const handleShowEdit = () => {
        if (showDelete) setShowDelete(false)
        setShowEdit((prev) => !prev)
    }

    const handleShowDelete = () => {
        if (showEdit) setShowEdit(false)
        setShowDelete((prev) => !prev)
    }

    const handleEdit = () => {
        setShowEdit(false)
        UPDATE_COUPON({
            _id,
            name: formik.values.newCoupon,
            discount: formik.values.newDiscount ? formik.values.newDiscount : discount,
            expiry: formik.values.newExpiry ? formik.values.newExpiry : expiry
        }, user.token, (data) => {
            // console.log(data.data);

            dispatch({
                type: "SET_COUPONS",
                payload: data.data
            })
            // reload to re render the page and reflect changes
            router.reload()
        })
        // console.log(colors);

    }

    const handleDelete = () => {
        setShowDelete(false)
        DELETE_COUPON(_id, user.token, (data) => {
            dispatch({
                type: "SET_COUPON",
                payload: data.data
            })
            // reload to re render the page and reflect changes
            router.reload()
        })
    }

    const formik = useFormik({
        initialValues: {
            newCoupon: name,
            newExpiry: "",
            newDiscount: 0,
        },
        validationSchema: Yup.object({
            newCoupon: Yup.string(),
            newDiscount: Yup.number().test("is-greater-than-100", "Discount should be less than 100 ", (value) => {
                if (value) {
                    return value < 100
                }
            }),
            newExpiry: Yup.date().test("is-expired", "Expiry date must be in the future", (value) => {
                if (value)
                return new Date(value).getTime() > Date.now()
            }),
        }),
        onSubmit: (values) => {
            handleEdit()
        }
    })
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    return (
        <article className='w-full h-max relative bg-white flex flex-col gap-2  rounded-lg border-b px-6 sone py-6'>
            <div className='absolute right-4 flex items-center gap-2 '>
                <button onClick={handleShowDelete} className='text-xl bg-red-500 p-2 rounded text-white'>
                    <MdDelete />
                </button>
                <button onClick={handleShowEdit} className='text-xl bg-blue-500 p-2 rounded text-white'>
                    <AiTwotoneEdit />
                </button>
            </div>
            <p className='text-4xl text-oxford-blue '>
                {coupon.discount}%
            </p>
            <p className='text-xl font-mediu'>
                {coupon.name}
            </p>
            <p className='text-sm text-gray-500'>
                <span>Expires on: </span>
                {formatDate(coupon.expiry, "long", "")}
            </p>

            {
                showEdit && (
                    <>
                        <form onSubmit={formik.handleSubmit} className=' flex flex-col gap-2 bg-white text-oxford-blue relative '>
                            <p className='ml-1'>

                                Edit Coupon
                            </p>
                            <div className='flex flex-col'>
                                <ErrorField touched={formik.touched.newCoupon} error={formik.errors.newCoupon} />
                                <input type="text" value={formik.values.newCoupon} onChange={formik.handleChange} name="newCoupon" id="newCoupon" placeholder="Name of Coupon" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
                            </div>
                            <div className='flex flex-col'>
                                <ErrorField touched={formik.touched.newExpiry} error={formik.errors.newExpiry} />
                                <input type="datetime-local" value={formik.values.newExpiry} onChange={formik.handleChange} name="newExpiry" id="newExpiry" placeholder="Expiry Date" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
                            </div>
                            <div className='flex flex-col'>
                                <ErrorField touched={formik.touched.newDiscount} error={formik.errors.newDiscount} />
                                <input type="number" value={formik.values.newDiscount} onChange={formik.handleChange} name="newDiscount" id="newDiscount" placeholder="Discount in percentage" className='bg-gray-100 border  w-full py-4 px-4 rounded-lg' />
                            </div>
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

export default CouponCard