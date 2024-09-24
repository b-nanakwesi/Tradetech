import { ButtonProps } from '@/types/Button'
import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

interface SaffronButtonProps {
    label: string
    onClick?: () => void
    disabled?: boolean
    loading?: boolean
}

const SaffronPrimary: React.FC<SaffronButtonProps> = ({ label, onClick, disabled, loading }) => {

    return (
        <button onClick={onClick} disabled={disabled} className='bg-saffron disabled:bg-saffron/70 disabled:select-none disabled:cursor-not-allowed text-oxford-blue py-2 px-8 rounded-lg hover:bg-oxford-blue hover:text-saffron transition duration-300 group'>
            {
                loading ? (<>
                    <AiOutlineLoading className='animate-spin text-xl group-hover:text-saffron text-oxford-blue' />
                </>) : (<>{label}</>)
            }

        </button>
    )
}

export default SaffronPrimary