import React from 'react'

interface ErrorFieldProps {
    touched: boolean | undefined
    error: string | undefined
}

const ErrorField: React.FC<ErrorFieldProps> = ({ touched, error }) => {
    if (!touched || !error) return null
  return (
      <div className='text-sm flex items-center text-red-500 gap-2'>
          <div className='w-2 min-w-2 min-h-2 h-2 bg-red-500 rounded-full ' />
          {error}
    </div>
  )
}

export default ErrorField