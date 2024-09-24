import AddAdminForm from '@/components/forms/AddAdminForm'
import Layout from '@/components/layout/Layout'
import OxfordLink from '@/components/links/OxfordLink'
import React from 'react'

const NewAdmin = () => {
    return (
        <Layout title='New Admin'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between '>
                <div className='flex flex-col gap-1  '>
                    <h1 className='font-medium text-4xl text-oxford-blue'>
                        Add New Admin
                    </h1>
                </div>

                <div className='flex items-center gap-2'>
                    <OxfordLink label="View Customers" url="/customers/" />
                </div>
            </div>
            <section>
                <AddAdminForm />
            </section>
        </Layout>
    )
}

export default NewAdmin