import { ButtonProps } from '@/types/Button'
import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

interface OxfordButtonProps {
    label: string
    onClick?: () => void
    disabled?: boolean
    loading?: boolean
}

const OxfordPrimary: React.FC<OxfordButtonProps> = ({ label, onClick, disabled, loading }) => {

    return (
        <button onClick={onClick} disabled={disabled} className='text-center w-max bg-oxford-blue disabled:bg-oxford-blue/70 disabled:select-none disabled:cursor-not-allowed text-antiflash py-2 px-12 rounded-lg hover:bg-saffron hover:text-oxford-blue transition duration-300 group'>
            {
                loading ? (<>
                    <AiOutlineLoading className='animate-spin text-xl group-hover:text-oxford-blue text-saffron' />
                </>) : (<>{label}</>)
            }

        </button>
    )
}

export default OxfordPrimary