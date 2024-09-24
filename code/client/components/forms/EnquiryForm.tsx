import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import OxfordPrimary from '../buttons/OxfordPrimary'

const EnquiryForm = () => {
    const initialState = {
        name: '',
        email: '',
        phone: '',
        message: ''
    }

    const [enquiry, setEnquiry] = useState(initialState)

    const [loading, setLoading] = useState(false)



    const submitEnquiry = () => {
        setLoading(true)
        const toastId = toast.loading("Submitting Enquiry ...")

        setTimeout(() => {
            toast.success("Enquiry Submitted", { id: toastId })
            setLoading(false)
        }, 2000)

    }

    return (
        <div className='w-full flex flex-col gap-8'>
            <h3 className='font-medium text-2xl text-night'>Contact</h3>
            <div className='flex flex-col gap-4'>
                <input
                    type='text'
                    className='input-box'
                    value={enquiry.name}
                    onChange={(e) => setEnquiry({ ...enquiry, name: e.target.value })}
                    placeholder='Name'
                />
                <input
                    type='text'
                    value={enquiry.email}
                    onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
                    className='input-box'
                    placeholder='Email'
                />
                <input
                    value={enquiry.phone}
                    type='text'
                    onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
                    className='input-box'
                    placeholder='Phone Number'
                />
                <textarea
                    value={enquiry.message}
                    onChange={(e) => setEnquiry({ ...enquiry, message: e.target.value })}
                    className='input-box resize-none'
                    placeholder='Message'
                />

                <OxfordPrimary label='Submit' onClick={submitEnquiry} loading={loading} disabled={loading} />
            </div>
        </div>
    )
}

export default EnquiryForm