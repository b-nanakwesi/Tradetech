import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const handleLogin = () => {
        toast.success('Login successful')
    }

    return (
        <div className='bg-white rounded-lg p-10 flex flex-col gap-8 shadow max-w-lg w-full'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-night text-4xl font-medium'>
                    Reset Password.
                </h1>
                <p className='text-gray-500 text-sm'>
                    Enter a new password for your account
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
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                    placeholder='Confirm Password'
                    className='bg-gray-100 w-full py-4 px-4 rounded-lg'
                />
                
                <button onClick={handleLogin} className='bg-oxford-blue text-white py-4 rounded-lg'>
                    Reset 
                </button>
                <Link href='/auth/login'>
                    <button className='w-full hover:underline py-4 rounded-lg  border-oxford-blue '>
                        Go to Login
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default ResetPasswordForm