import LoginForm from '@/components/forms/LoginForm'
import AuthLayout from '@/components/layout/AuthLayout'
import Layout from '@/components/layout/Layout'
import React from 'react'

const Login = () => {
  return (
    <AuthLayout title='Login'>
      <LoginForm />
    </AuthLayout>
  )
}

export default Login