import AddCategoryForm from '@/components/forms/AddCategoryForm'
import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import React from 'react'
import { BsEyeFill } from 'react-icons/bs'

const NewCategory = () => {

    return (
        <Layout title='New Category'>
            <div className='absolute bottom-4 right-4'>
                <OxfordLink label="View Categories" url="/category" icon={BsEyeFill} />
            </div>

            <section className='flex items-center justify-center h-full'>
                <div className='w-full max-w-lg gap-8 flex-col flex'>
                    <h1 className='font-medium text-4xl text-center text-oxford-blue'>
                        Add New Category
                    </h1>
                    <AddCategoryForm />
                </div>
            </section>
        </Layout>
    )
}

export default NewCategory