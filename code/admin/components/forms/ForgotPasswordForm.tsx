import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleLogin = () => {
        toast.success('Link sent')
    }

    return (
        <div className='bg-white rounded-lg p-10 flex flex-col gap-8 shadow max-w-lg w-full'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-night text-4xl font-medium'>
                    Forgot Password.
                </h1>
                <p className='text-gray-500 text-sm'>
                    Enter your email and we will send you a link to reset your password
                </p>
            </div>
            <div className='flex flex-col gap-2'>
               
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    placeholder='Password'
                    className='bg-gray-100 w-full py-4 px-4 rounded-lg'
                />
               
                <button onClick={handleLogin} className='bg-oxford-blue text-white py-4 rounded-lg'>
                    Login
                </button>
                <Link href='/auth/login'>
                    <button className='w-full hover:underline py-4 rounded-lg  border-oxford-blue '>
                        Back to Login
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default ForgotPasswordForm