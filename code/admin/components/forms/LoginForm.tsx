import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ErrorField from '../ErrorField'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN } from '@/utils/server/auth'
import { User } from '@/types'
import { useStateValue } from '@/redux/StateProvider'
import { useRouter } from 'next/router'
import { BiLoaderAlt } from 'react-icons/bi'



const LoginForm = () => {
    const [{ user }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({

            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .min(6, "Must be 6 characters or more")

                .required('Password is required'),
        }),
        onSubmit: (values) => {
            setLoading(true);
            LOGIN(setLoading, values, (data: User) => {
                dispatch({
                    type: "SET_USER",
                    payload: data,
                });
                if (typeof window !== 'undefined') {
                    localStorage.setItem(
                        'user',
                        JSON.stringify(data)
                    )
                }
                toast.success("Login Successful")
                setLoading(false);
                if ( router.pathname === "/auth/login") {
                    router.push("/")
                }
            })
        }
    })


    return (
        <div className='bg-white rounded-lg p-10 flex flex-col gap-8 shadow max-w-lg w-full'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-night text-4xl font-medium'>
                    Login.
                </h1>
                <p className='text-gray-500 text-sm'>
                    Enter your credentials to access your dashboard
                </p>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-2'>

                <ErrorField touched={formik.touched.email} error={formik.errors.email} />
                <input
                    type="text"
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Email'
                    className='bg-gray-100 w-full py-4 px-4 rounded-lg'
                />
                <ErrorField touched={formik.touched.password} error={formik.errors.password} />
                <input
                    type="password"
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Password'
                    className='bg-gray-100 w-full py-4 px-4 rounded-lg'
                />

                <Link href='/auth/forgot-password' className='ml-auto text-gray-500 text-sm hover:text-neon-blue hover:underline'>
                    Forgot Password?
                </Link>
                <button disabled={loading} type="submit" className='bg-oxford-blue text-white py-4 rounded-lg'>
                    {
                        loading ? (
                            <BiLoaderAlt className='animate-spin text-center text-lg mx-auto' />
                        ) : <>
                            Login
                        </>
                    }

                </button>
            </form>

        </div>
    )
}

export default LoginForm