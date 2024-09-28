import {useEffect, useState} from 'react';

const useDebounce = (value: string = '', delay: number) => {
    const [previousValue, setPreviousValue] = useState(value);
    const [debouncedValue, setDebouncedValue] = useState(value || '');

    useEffect(() => {
        if (value !== previousValue) {
            // Create a timeout to set the value after the specified delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
                setPreviousValue(value);
            }, delay);

            // Clear the timeout if value or delay changes
            return () => clearTimeout(handler);
        }
    }, [value, delay]); // Only re-call effect if value or delay changes

    return debouncedValue;
};

export default useDebounce;
