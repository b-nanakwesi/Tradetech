import toast from "react-hot-toast";

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

export const handleFeatureUnavailable = () => {
    toast('This feature is not available yet!', {
        icon: '🚫',
      });
}