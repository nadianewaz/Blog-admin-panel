import {useState} from 'react';

const useReset = () => {
  const [resetKey, setResetKey] = useState(0);

  const triggerReset = () => {
    setResetKey(prev => prev + 1);
  };

  return {resetKey, triggerReset};
};

export default useReset;
