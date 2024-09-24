import React, { useEffect } from 'react'
import { Line } from 'rc-progress'

interface Props {
    value: number
    color: string
    label: string
}

const ProgressLine: React.FC<Props> = ({ value, color, label }) => {
    useEffect(() => {
        if (value > 100) {
            value = 100
        }

        if (value < 0) {
            value = 0
        }
    }, [value]);
    return (
        <div className='flex flex-col'>
            <p className='text-sm text-gray-600'>
                {label}
            </p>
            <Line
                percent={value}
                strokeWidth={3}
                trailWidth={3}
                trailColor='#ddd'
                strokeColor={color}
            />
        </div>
    )
}

export default ProgressLine