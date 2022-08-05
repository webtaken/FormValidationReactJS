import { useState, useReducer } from "react";

const initialInputState = {
  value: '',
  isTouched: false
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      ...state,
      value: action.value,
    };
  } else if (action.type === 'BLUR') {
    return {
      ...state,
      isTouched: true
    };
  } else if (action.type === 'RESET') {
    return {
      isTouched: false,
      value: ''
    };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);


  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = event => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = event => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    error: hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;