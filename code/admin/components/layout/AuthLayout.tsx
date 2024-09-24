import React from 'react'
import Meta from './Meta'
import ToasterProvider from '@/providers/ToasterProvider'
import ModalProvider from '@/providers/ModalProvider'

interface AuthLayoutProps {
    children: React.ReactNode
    title: string
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
    return (
        <>
            <Meta title={title} />
            <ToasterProvider />
            <div className='w-screen h-screen flex items-center justify-center bg-antiflash p-4'>
                {children}
            </div>
        </>
    )
}

export default AuthLayout