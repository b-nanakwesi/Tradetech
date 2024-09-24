import { v4 as uuid } from 'uuid'

export const getRandomID = (length?: number) => {
    if(length) return uuid().slice(0, length)
    return uuid().slice(0, 8)
}

export const formatDate = (dateString: any, format: string, type: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    const date = new Date(dateString);

    if (type === 'time') {
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit'
        };

        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
        return formattedTime;
    }

    const formattedDate = date.toLocaleDateString('en-US', options);

    if (format === 'short') {
        const shortOptions: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        };

        return date.toLocaleDateString('en-US', shortOptions);
    }

    return formattedDate;
}
