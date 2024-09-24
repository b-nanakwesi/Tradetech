import React, { useState, useEffect, useCallback } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../buttons/Button'
import ToasterProvider from '@/providers/ToasterProvider'

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    body?: React.ReactElement
    actionLabel?: string
}

const Modal: React.FC<ModalProps> = ({
    isOpen, onClose, body, actionLabel
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
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none bg-neutral-800/70">
                <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto lg:h-auto md:h-auto">
                    {/* CONTENT */}
                    <div className={`
                        translate
                        duration-300
                        h-full
                        ${showModal ? 'translate-y-0' : 'translate-y-full'}
                        ${showModal ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col   w-full bg-white outline-none focus:outline-none'>
                            <div className='flex items-center p-6 rounded-t justify-center relative  '>
                                <button onClick={handleClose} className='p-1 hover:bg-neutral-100 rounded-sm border-2  transition absolute left-5'>
                                    <IoMdClose size={18} />
                                </button>

                            </div>
                            <div className='p-6'>

                                {body}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal