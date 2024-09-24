import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import OxfordPrimary from '../buttons/OxfordPrimary'
import Link from 'next/link'
import SaffronPrimary from '../buttons/SaffronPrimary'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import ErrorField from '../ErrorField'
import Button from '../buttons/Button'
import { useStateValue } from '@/redux/StateProvider'
import { REGISTER_USER } from '@/utils/server/auth'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)

  const [{ user }, dispatch] = useStateValue()

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      mobile: Yup.string().required("Phone number is required").min(10, "Phone number should be 10 characters").max(10, "Phone number should be 10 characters"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required").min(6, "Password should be at least 6 characters"),
      confirmPassword: Yup.string().required("Confirm password is required").test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      })
    }),
    onSubmit: (values) => {

      const userData = {
        firstname: values.firstname,
        lastname: values.lastname,
        mobile: values.mobile,
        email: values.email,
        password: values.password,
      }

      // check if there is already a user
      if (typeof window !== undefined) {
        if (user) {
          toast.error("You are already logged in")
          return
        }
      }

      // if there is no user, register

      REGISTER_USER(setLoading, userData, (data) => { 
        router.push("/auth/login")
      })

    }
  })

  return (
    <div className='bg-white max-w-xl flex flex-col items-cen w-full gap-6 p-5 rounded-lg'>
      <h3 className='font-medium px-2 text-2xl text-night'>Create An Account</h3>
      <form onSubmit={formik.handleSubmit} className='flex flex-col items-center gap-4 w-full'>
        <div className="flex w-full flex-col">
          <ErrorField touched={formik.touched.firstname} error={formik.errors.firstname} />
          <input
            type='text'
            name="firstname"
            className='input-box '
            value={formik.values.firstname}
            onChange={formik.handleChange}
            placeholder='First name'
          />
        </div>
        <div className="flex w-full flex-col">
          <ErrorField touched={formik.touched.lastname} error={formik.errors.lastname} />
          <input
            type='text'
            name="lastname"
            className='input-box '
            value={formik.values.lastname}
            onChange={formik.handleChange}
            placeholder='Last name'
          />
        </div>
        <div className="flex w-full flex-col">
          <ErrorField touched={formik.touched.email} error={formik.errors.email} />
          <input
            type='text'
            name="email"
            className='input-box '
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder='Email'
          />
        </div>
        <div className="flex w-full flex-col">
          <ErrorField touched={formik.touched.mobile} error={formik.errors.mobile} />
          <input
            type='text'
            name="mobile"
            className='input-box'
            value={formik.values.mobile}
            onChange={formik.handleChange}
            placeholder='Mobile'
          />
        </div>
        <div className="flex w-full flex-col">
          <ErrorField touched={formik.touched.password} error={formik.errors.password} />
          <input
            type='password'
            name="password"
            className='input-box '
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder='Password'
          />
        </div>
        <div className="flex w-full flex-col">
          <ErrorField touched={formik.touched.confirmPassword} error={formik.errors.confirmPassword} />
          <input
            type='password'
            name="confirmPassword"
            className='input-box '
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder='Confirm Password'
          />
        </div>

        <div className='flex items-center gap-8 justify-between w-full text-sm text-neutral-600'>
          <Link href='/auth/login' className='hover:underline'>Already have an account? <span className='text-neon-blue '>Login</span></Link>
        </div>

        <Button type='submit' text='Register' />
      </form>
    </div>
  )
}

export default RegisterForm