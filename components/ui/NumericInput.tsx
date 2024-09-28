import {Input} from 'antd';
import React, {ChangeEvent, useState} from 'react';
import {InputProps} from 'antd/lib/input';


const NumericInput = ({value, onChange, ...props}: any | InputProps) => {
  const [inputValue, setInputValue] = useState(value || '');

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const reg = /^0\d*$|^\d+$/;

    if (inputValue === '' || reg.test(inputValue)) {
      setInputValue(inputValue);
      onChange?.(inputValue);
    }
  };

  return <Input type="text" {...props} value={inputValue} onChange={onChangeInput}/>;
};

export default NumericInput;
