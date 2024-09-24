import React from 'react'
import { useEffect, useState } from 'react';

interface Props {
    datetime: string;
    styles: string
}

const ShortSentenceDate: React.FC<Props> = ({ datetime, styles }) => {
    const [formattedDateTime, setFormattedDateTime] = useState('');

    useEffect(() => {
        const formattedDate = new Date(datetime).toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
        setFormattedDateTime(formattedDate);
    }, [datetime]);
    return (
        <p className={styles}>{formattedDateTime}</p>
    )
}

export default ShortSentenceDate