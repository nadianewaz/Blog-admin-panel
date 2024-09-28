import React, {useEffect, useState} from 'react';
import {Input} from "antd";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";

// @Hook
import UseDebounce from "@/lib/hooks/useDebounce";

const DebouncedSearch = ({value, isLoading, onChange, delay = 500, ...props}: any) => {
    const [inputValue, setInputValue] = useState(value);
    const debouncedValue = UseDebounce(inputValue?.trim(), delay);

    useEffect(() => {
        if (debouncedValue !== value) {
            onChange(debouncedValue?.trim());
        }
    }, [debouncedValue, value]);

    return (
        <Input
            {...props}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            prefix={isLoading ? <LoadingOutlined/> : <SearchOutlined/>}
        />
    );
};

export default DebouncedSearch;
