import React from 'react';
import './Login.css';
import FormInput from '../FormInput/FormInput';
import Entry from '../Entry/Entry';
import { useFormWithValidation } from '../../hook/useFormWithValidation';

function Login(props) {

const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()

  function submitHandler(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    props.handleLogin(values);
  }

  return (
    <main>
      <Entry onSubmit={submitHandler} title="Рады видеть!" btnText="Войти" captionText="Ещё не зарегистрированы?" linkText="Регистрация"
             linkPath="/signup" isValid={isValid} error={props.error}>
        <FormInput isValid={isValid} error={errors.email} value={values.email} onChange={handleChange} required={true} name="email" lableName="E-mail" type="email"/>
        <FormInput isValid={isValid} error={errors.password} value={values.password} onChange={handleChange} required={true} name="password" lableName="Пароль" type="password"/>
      </Entry>
    </main>
  );
}

export default Login;
