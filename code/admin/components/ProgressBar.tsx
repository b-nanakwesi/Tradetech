import React, { useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Props { 
    value: number
}

const ProgressBar: React.FC<Props> = ({ value }) => {
    const [pathColor, setPathColor] = React.useState('#4369F2');
    useEffect(() => {
        if (value > 100) {
            value = 100
        }

        if (value < 0) {
            value = 0
        }

    }, [value]);
    const fixedVal = Number(value.toFixed(1))
    return (
        <CircularProgressbar
            value={value}
            text={`${fixedVal}%`}
            styles={buildStyles({
                pathTransitionDuration: 1,
                pathColor: `${pathColor}`,
                textColor: '#011638',
                trailColor: '#cccccc',
                backgroundColor: '#cccccc',
            })}
        />
    )
}

export default ProgressBar