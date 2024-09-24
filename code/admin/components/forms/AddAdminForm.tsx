import { useStateValue } from '@/redux/StateProvider';
import { User } from '@/types';
import { ADD_ADMIN } from '@/utils/server/auth';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import { BiLoaderAlt } from 'react-icons/bi';
import * as Yup from 'yup'
import ErrorField from '../ErrorField';

const AddAdminForm = () => {
    const [{ user }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            role: "admin",
            password: "",
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required("First Name is required"),
            lastname: Yup.string().required("Last Name is required"),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .min(6, "Must be 6 characters or more").required('Password is required'),
            mobile: Yup.string().required("Mobile is required").min(10, "Must be 10 characters").max(10, "Must be 10 characters"),
        }),
        onSubmit: (values) => {
            setLoading(true);
            ADD_ADMIN(setLoading, values, (data: User) => {
                dispatch({
                    type: "ADD_USER",
                    payload: data,
                });
               
                toast.success("Admin Added Successfully")
                setLoading(false);
                router.push("/customers")
            })
        }
    })
    return (
        <form method='POST' className='flex flex-col gap-4 max-w-xl' onSubmit={formik.handleSubmit} >
            <div className='w-full grid gap-4 grid-cols-1  max-w-xl'>
                <ErrorField touched={formik.touched.firstname} error={formik.errors.firstname} />
                <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="First Name"
                    className='white-input-box'
                />
                <ErrorField touched={formik.touched.lastname} error={formik.errors.lastname} />
                <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Last Name"
                    className='white-input-box'
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <ErrorField touched={formik.touched.email} error={formik.errors.email} />
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className='white-input-box'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <ErrorField touched={formik.touched.mobile} error={formik.errors.mobile} />

                <input
                    type="text"
                    name="mobile"
                    id="mobile"
                    placeholder="Mobile"
                    className='white-input-box'
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <ErrorField touched={formik.touched.password} error={formik.errors.password} />

                <input type="password" name="password" id="password" value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} placeholder="Password" className='bg-white border  w-full py-4 px-4 rounded-lg' />

            </div>
            <button disabled={loading} type="submit" className='bg-oxford-blue text-white py-4 rounded-lg'>
                {
                    loading ? (
                        <BiLoaderAlt className='animate-spin text-center text-lg mx-auto' />
                    ) : <>
                        Add
                    </>
                }

            </button>
        </form>
    )
}

export default AddAdminForm