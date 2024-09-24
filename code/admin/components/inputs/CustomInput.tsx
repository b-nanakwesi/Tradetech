import React from 'react'
import ErrorField from '../ErrorField'

interface Props {
    touched?: boolean
    error?: string
    label?: string
    name: string
    type?: string
    placeholder?: string
    value: any
    onChange: ((e: any) => void) | (() => void)

}

const CustomInput: React.FC<Props> = ({ touched, error, name, type, placeholder, value, onChange }) => {
    return (
        <div className='flex flex-col'>
            <ErrorField touched={touched} error={error} />
            <input value={value} onChange={onChange} type={type || "text"} name={name} id={name} placeholder={placeholder || "Placeholder"} className='white-input-box' />
        </div>
    )
}

export default CustomInput