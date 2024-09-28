import {useCallback} from 'react';

import { Rule } from 'antd/lib/form'

const useCustomFormRules = () => {
  const getEmptyCheckRules = useCallback((fieldName: string): Rule => ({
    validator: async (_: any, value?: string) => {
      if (!value || !value.trim()) {
        return Promise.reject(new Error(`${fieldName} can not be empty or just spaces.`));
      }
      return Promise.resolve();
    }
  }), []);

  return {getEmptyCheckRules};
};

export default useCustomFormRules;