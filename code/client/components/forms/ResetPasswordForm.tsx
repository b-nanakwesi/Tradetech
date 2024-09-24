import React, { useState} from 'react'
import SaffronPrimary from '../buttons/SaffronPrimary'
import OxfordPrimary from '../buttons/OxfordPrimary'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()

  const submitResetPassword = () => {
    setLoading(true)
    const toastId = toast.loading("Validating ...")

    setTimeout(() => {
      toast.success("Your password has been reset", { id: toastId })
      setLoading(false)
    }, 2000)
    // router.push('/auth/login')
  }


  return (
    <div className='bg-white max-w-xl flex flex-col items-center justify-center w-full gap-6 py-10 px-5 rounded-lg'>
    <h3 className='font-medium text-center text-2xl text-night'>Reset Your Password</h3>
    <p className='text-center text-sm text-neutral-700'>
      Type in a new password for your account
    </p>
    <div className='flex flex-col items-center gap-4 w-full'>
      <input
        type='password'
        className='input-box '
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <input
        type='password'
        className='input-box '
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder='Confirm Password'
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

export default ResetPasswordForm