import React, {useEffect, useRef, useState} from "react";
import {Select, SelectProps, Spin} from "antd";

// @Models
import {PaginationType} from "@/models";

// @Hooks
import UseDebounceFn from "@/lib/hooks/useDebounceFn";

// @Components
import SafeHtmlRenderer from "@/components/ui/SafeHtmlRenderer";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (pagination: PaginationType, filter: string) => Promise<any>;
  labelKey: string;
  filter?: string;
  optionSize?: number,
  debounceTimeout?: number;
  isHtmlLabel?: boolean
}

export default function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
>({
    fetchOptions,
    optionSize = 10,
    labelKey,
    filter,
    debounceTimeout = 800,
    isHtmlLabel = false,
    ...props
  }: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const pagination: PaginationType = {
    page: 1,
    size: optionSize
  }

  const debounceFetcher = UseDebounceFn((value: string) => {
    fetchRef.current += 1;
    const fetchId = fetchRef.current;
    setOptions([]);
    setFetching(true);
    const searchAndFilter: string = '&status=true&term=' + value?.trim() + (!!filter ? filter : '')
    fetchOptions(pagination, searchAndFilter).then((response: any) => {
      const newOptions: ValueType[] = response.data?.map((option: any) => {
        let displayLabel: any = ''

        if (isHtmlLabel) {
          const dNumber: string = !!option.displayNumber ? `<span style="padding-right: 2px; float: left;">${option.displayNumber} </span>` : ''
          displayLabel = <SafeHtmlRenderer
            html={dNumber + option[labelKey]}
            isKatexEnable={true}
          />
        } else {
          displayLabel = (!!option.displayNumber ? option.displayNumber + ' ' : '') + option[labelKey]
        }

        return {
          ...option,
          label: displayLabel,
          value: option._id,
          key: option._id,
        }
      })

      if (fetchId !== fetchRef.current) {
        // for fetch callback order
        return;
      }

      setOptions(newOptions);
      setFetching(false);
    });
  })

  useEffect(() => {
    if (!!filter) {
      debounceFetcher('')
    }
  }, [filter])

  const onFocus = () => {
    if (!options?.length && !fetching) debounceFetcher('')
  }

  const onClear = () => {
    if (!fetching) debounceFetcher('')
  }
 

  return (
    <Select
      allowClear
      labelInValue
      style={{width: 200}}
      filterOption={false}
      showSearch={true}
      onSearch={debounceFetcher}
      onClear={onClear}
      notFoundContent={fetching ? <Spin size="small"/> : null}
      {...props}
      options={options}
      onFocus={onFocus}
    />
  );
}