import React from 'react';
import './Register.css';
import FormInput from '../FormInput/FormInput';
import Entry from '../Entry/Entry';
import { useFormWithValidation } from '../../hook/useFormWithValidation';
import { REGEX_NAME } from '../../utils/constants';

function Register(props) {
  const { values, handleChange, errors, isValid, setIsValid, resetForm } = useFormWithValidation();

  function submitHandler(e) {
    e.preventDefault();
    if (!values.password || !values.email || !values.name) {
      return;
    }
    if (REGEX_NAME.test(values.name)) {
      props.handleRegister(values);
    } else {
      setIsValid(false);
      errors.name = 'Имя может содержать только латиницу кириллицу пробел или дефис';
    }
  }

  return (
    <main>
      <Entry onSubmit={submitHandler} title="Добро пожаловать!" btnText="Зарегистрироваться"
             captionText="Уже зарегистрированы?" linkText="Войти"
             linkPath="/signin" isValid={isValid} error={props.error}>
        <FormInput min="2" max="30" value={values.name} error={errors.name} onChange={handleChange} required={true}
                   name="name" lableName="Имя" type="text"/>
        <FormInput value={values.email} error={errors.email} onChange={handleChange} required={true} name="email"
                   lableName="E-mail" type="email"/>
        <FormInput value={values.password} error={errors.password} onChange={handleChange} required={true}
                   name="password" lableName="Пароль" type="password"/>
      </Entry>
    </main>
  );
}

export default Register;
