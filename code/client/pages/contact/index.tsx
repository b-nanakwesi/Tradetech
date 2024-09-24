import EnquiryForm from '@/components/forms/EnquiryForm'
import Layout from '@/components/layouts/Layout'
import React from 'react'
import { IoHome } from 'react-icons/io5'
import { MdCall, MdEmail, MdInfo } from 'react-icons/md'

const Contact = () => {
    return (
        <Layout title='Contact'>
            <section className='bg-white flex flex-col lg:flex-row lg:items-start gap-8 rounded-lg lg:p-8'>
                <EnquiryForm />
                <div className='w-full flex flex-col gap-8'>
                    <h3 className='font-medium text-2xl text-night'>Get In Touch With Us</h3>
                    <div className='flex flex-col gap-4 text-sm text-neutral-600'>
                        <div className='flex items-end gap-2 '>
                            <IoHome className='text-xl' />
                            <p>
                                TradeTech, 54 Nii Kotei St, Dzorwulu, Accra
                            </p>
                        </div>
                        <div className='flex items-end gap-2 '>
                            <MdCall className='text-xl' />
                            <p>
                                0501234567
                            </p>
                        </div>
                        <div className='flex items-end gap-2 '>
                            <MdEmail className='text-xl' />
                            <p>
                                attorfafa@gmail.com
                            </p>
                        </div>
                        <div className='flex items-end gap-2 '>
                            <MdInfo className='text-xl' />
                            <p>
                                Monday - Friday: 9am - 5pm
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Contact