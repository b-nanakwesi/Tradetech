import Button from '@/components/buttons/Button'
import AddColorForm from '@/components/forms/AddColorForm'
import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import React from 'react'
import { toast } from 'react-hot-toast'
import { BsEyeFill } from 'react-icons/bs'

const NewColor = () => {
    
    return (
        <Layout title='New Color'>
            <div className='absolute bottom-4 right-4'>
                <OxfordLink label="View Colors" url="/color" icon={BsEyeFill} />
            </div>

            <section className='flex items-center justify-center h-full'>
                <div className='w-full max-w-lg gap-8 flex-col flex'>
                    <h1 className='font-medium text-4xl text-center text-oxford-blue'>
                        Add New Color
                    </h1>
                    <AddColorForm />
                </div>
            </section>
        </Layout>
    )
}

export default NewColor