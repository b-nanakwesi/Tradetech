import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm'
import AuthLayout from '@/components/layout/AuthLayout'
import Layout from '@/components/layout/Layout'
import React from 'react'

const ForgotPassword = () => {
  return (
    <AuthLayout title='Forgot Password'>
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

export default ForgotPassword