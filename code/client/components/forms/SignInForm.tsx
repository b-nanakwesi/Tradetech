import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Button from '../buttons/Button'
import ErrorField from '../ErrorField'
import { LOGIN_USER } from '@/utils/server/auth'
import { useStateValue } from '@/redux/StateProvider'
import { toast } from 'react-hot-toast'
import { handleFeatureUnavailable } from '@/utils/functions'


const SignInForm = () => {
  const [{ user }, dispatch] = useStateValue()

  const [loading, setLoading] = useState(false)


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required().min(6, "Password should be at least 6 characters")
    }),
    onSubmit: (values) => {
      if (typeof window !== undefined) {
        if (user) {
          toast.error("You are already logged in")
          return
        }
      }
      LOGIN_USER(setLoading, values, (data) => {
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
        setLoading(false);
        if (router.pathname === "/auth/login") {
          router.push("/")
        }
      })
    }
  })

  const router = useRouter()

  


  return (
    <div className='bg-white max-w-xl flex flex-col items-cente justify-cente w-full gap-6 px-4 md:px-6 py-8 rounded-lg'>
      <h3 className='font-medium text-2xl  md:text-3xl px-2 text-night'>Log into your account</h3>
      <form onSubmit={formik.handleSubmit} className='flex flex-col  gap-2 w-full'>
        <div className="flex flex-col">
          <ErrorField touched={formik.touched.email} error={formik.errors.email} />
          <input
            type='text'
            name="email"
            className='input-box '
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Enter your email'
          />
        </div>
        <div className='flex flex-col'>
          <ErrorField touched={formik.touched.password} error={formik.errors.password} />
          <input
            type='password'
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className='input-box'
            placeholder='Enter your password'
          />
        </div>
        <div className='flex items-center gap-8 justify-between w-full text-xs py-3 md:text-sm text-neutral-600'>
          <Link href='/auth/register' className='hover:underline'>Don't have an account? <span className='text-neon-blue '>Register</span></Link>
          {/* <Link href='/auth/forgot-password' className='hover:underline  text-neon-blue'>Forgot Password?</Link> */}
          <button type="button" onClick={handleFeatureUnavailable} className='hover:underline  text-neon-blue'>Forgot Password?</button>
        </div>
        <div className='flex  gap-4'>

          <Button disabled={loading} text='Login' type='submit' />
        </div>
      </form>
    </div>
  )
}

export default SignInForm