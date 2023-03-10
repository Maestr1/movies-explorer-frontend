import React, { useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';
import { REGEX_NAME } from '../utils/constants';

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
    if (target.name === 'name' && !REGEX_NAME.test(target.value)) {
      setIsValid(false);
      setErrors({ ...errors, [name]: 'Имя может содержать только латиницу кириллицу пробел или дефис' });
    }
    if (target.name === 'email' && target.value && !isEmail(target.value)) {
      setIsValid(false);
      setErrors({ ...errors, [name]: 'E-mail имеет некорректный формат' });
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, setIsValid, resetForm, setValues };
}
