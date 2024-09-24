import React from 'react'

const CurrentDate: React.FC = () => {
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      };
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
    
    return <p className='tracking-wider text-sm py-1 text-neutral-500'>{formattedDate}</p>;
}

export default CurrentDate