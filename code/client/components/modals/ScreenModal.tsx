import React, { useState, useEffect, useCallback } from 'react'
import { IoMdClose } from 'react-icons/io'
import ToasterProvider from '@/providers/ToasterProvider'

interface ScreenModalProps {
    isOpen?: boolean
    onClose: () => void
    body?: React.ReactElement
    actionLabel?: string
}

const ScreenModal: React.FC<ScreenModalProps> = ({
    isOpen, onClose, body
}) => {
    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen]);

    const handleClose = useCallback(() => {


        setShowModal(false)

        // Wait for animation to finish
        setTimeout(() => {
            onClose()
        }, 300)

    }, [onClose])

    if (!isOpen) {
        return null
    }

    return (
        <>
            <ToasterProvider />
            <div className="flex justify-center items-center h-screen overflow-x-hidden  fixed inset-0 z-[100] outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-screen h-screen">
                    {/* CONTENT */}
                    <div className={`
                        translate
                        duration-300
                        h-screen
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <div className='translate h-screen  border-0  shadow-lg relative flex flex-col   w-full bg-white outline-none focus:outline-none px-4 py-4'>
                            <div className='flex items-center p-4 rounded-t justify-center relative  '>
                                <button onClick={handleClose} className='p-1 bg-oxford-blue text-white  rounded-sm   transition absolute left-0'>
                                    <IoMdClose size={18} />
                                </button>

                            </div>
                            <div className='h-full overflow-y-auto overflow-x-hidden'>
                                {body}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScreenModal