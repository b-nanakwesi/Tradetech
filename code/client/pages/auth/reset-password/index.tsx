import ResetPasswordForm from '@/components/forms/ResetPasswordForm'
import Layout from '@/components/layouts/Layout'
import React from 'react'

const ResetPassword = () => {
  return (
    <Layout title="Reset Password">
    <section className='w-full h-full flex items-center justify-center'>
            <ResetPasswordForm />
    </section>
</Layout>
  )
}

export default ResetPassword