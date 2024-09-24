import ResetPasswordForm from '@/components/forms/ResetPasswordForm'
import AuthLayout from '@/components/layout/AuthLayout'
import Layout from '@/components/layout/Layout'
import React from 'react'

const ResetPassword = () => {
  return (
    <AuthLayout title='Reset Password'>
      <ResetPasswordForm />
    </AuthLayout>
  )
}

export default ResetPassword