import SignInForm from '@/components/forms/SignInForm'
import Layout from '@/components/layouts/Layout'
import React from 'react'

const LoginPage = () => {
    return (
        <Layout title="Login">
            <section className='w-full h-full flex items-center justify-center'>
                    <SignInForm />
            </section>
        </Layout>
    )
}

export default LoginPage