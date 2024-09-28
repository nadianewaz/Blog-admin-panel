import React from 'react';
import {Select, SelectProps} from 'antd';

interface ObjectSelectProps extends SelectProps<string[]> {
    options: any[];
    optionLabel?: string;
    optionValue?: string;
}

const AntSelect = ({options, optionLabel = "label", optionValue = "value", ...props}: ObjectSelectProps) => {
    const selectOptions = options.map((option: any) => ({
        label: option[optionLabel],
        value: option[optionValue],
        key: option[optionValue],
        data: option
    }))

    return (
        <Select
            {...props}
            optionFilterProp="label"
            options={selectOptions}
        />
    );
};

export default AntSelect;
