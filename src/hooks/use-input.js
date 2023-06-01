import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const valueIsValid = validateValue(enteredValue);

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const reset = () => {
    setEnteredValue('');
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    valueChangeHandler,
    reset,
  };
};

export default useInput;
