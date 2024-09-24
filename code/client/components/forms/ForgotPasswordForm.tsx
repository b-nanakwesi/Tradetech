import React, { useState} from 'react'
import SaffronPrimary from '../buttons/SaffronPrimary'
import OxfordPrimary from '../buttons/OxfordPrimary'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const ForgotPasswordForm = () => {

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const router = useRouter()

  const submitResetPassword = () => {
    setLoading(true)
    const toastId = toast.loading("Sending email ...")

    setTimeout(() => {
      toast.success("Email sent", { id: toastId })
      setLoading(false)
    }, 2000)
    // router.push('/')
  }


  return (
    <div className='bg-white max-w-xl flex flex-col items-center justify-center w-full gap-6 py-10 px-5 rounded-lg'>
      <h3 className='font-medium text-center text-2xl text-night'>Reset Your Password</h3>
      <p className='text-center text-sm text-neutral-700'>
        Enter your email address and we will send you a link to reset your password.
      </p>
      <div className='flex flex-col items-center gap-4 w-full'>
        <input
          type='email'
          className='input-box '
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        
        
        <div className='flex flex-col items-center gap-4'>
       

          <OxfordPrimary
            label='Submit'
            onClick={submitResetPassword}
            loading={loading}
          />

          <Link href='/auth/login' className='hover:underline text-night'>Back to Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordForm