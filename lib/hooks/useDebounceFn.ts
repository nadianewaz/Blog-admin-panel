import { useCallback, useRef } from 'react';

function UseDebounceFn<T extends (...args: any[]) => any>(callback: T, delay: number = 500): T {
    const argsRef = useRef<any[]>();
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    const debouncedFunction = useCallback((...args: any[]) => {
        argsRef.current = args;
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            if (argsRef.current) {
                callback(...argsRef.current);
            }
        }, delay);
    }, [callback, delay]) as T;

    return debouncedFunction;
}

export default UseDebounceFn;
