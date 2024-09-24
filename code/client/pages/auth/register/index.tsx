import RegisterForm from '@/components/forms/RegisterForm'
import Layout from '@/components/layouts/Layout'
import React from 'react'

const Register = () => {
  return (
      <Layout title="Register">
          <section className='w-full h-full flex items-center justify-center'>
                    <RegisterForm />
            </section>
    </Layout>
  )
}

export default Register