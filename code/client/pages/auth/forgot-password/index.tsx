import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import Layout from '@/components/layouts/Layout'
import React from 'react'

const ForgotPassword = () => {
  return (
    <Layout title="Forgot Password">
            <section className='w-full h-full flex items-center justify-center'>
                    <ForgotPasswordForm />
            </section>
        </Layout>
  )
}

export default ForgotPassword