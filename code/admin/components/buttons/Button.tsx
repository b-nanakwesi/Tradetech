import React from 'react'

interface Props {
    text: string
    onClick?: () => void
    variant?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<Props> = ({ text, onClick, variant, disabled, type }) => {
    return (
        <button
            type={type || "button"}
            onClick={onClick || undefined}
            disabled={disabled || false}

            className={` ${variant === "secondary" ? "bg-neon-blue" : "bg-oxford-blue"}  disabled:cursor-not-allowed disabled:opacity-70 text-white py-3 rounded-lg px-12`}>
            {text}
        </button>
    )
}

export default Button