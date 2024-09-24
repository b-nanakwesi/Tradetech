import React, {useState, useEffect} from 'react'

interface Props {
    label: string
}

const EnquiryStatusTag: React.FC<Props> = ({ label }) => {
    const [color, setColor] = useState('')

    useEffect(() => {
        if (label === 'In Progress') {
            setColor('bg-green-100 text-green-600')
        } else if (label === 'Contacted') {
            setColor('bg-yellow-100 text-yellow-600')
        } else if (label === 'Resolved') {
            setColor('bg-violet-100 text-violet-600')
        } else if (label === 'Submitted') {
            setColor('bg-gray-200')
        }
    }, []);
  return (
      <div className={`
        ${color} text-center px-8 w-max text-sm rubik py-2 rounded-lg
      `} >
          {label}
      </div>
  )
}

export default EnquiryStatusTag