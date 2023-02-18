import React from 'react';
import './Login.css';
import FormInput from '../FormInput/FormInput';
import Entry from '../Entry/Entry';

function Login(props) {
  return (
    <main>
      <Entry title="Рады видеть!" btnText="Войти" captionText="Ещё не зарегистрированы?" linkText="Регистрация"
             linkPath="/signup">
        <FormInput required={true} name="email" lableName="E-mail" type="email"/>
        <FormInput required={true} name="password" lableName="Пароль" type="password"/>
      </Entry>
    </main>
  );
}

export default Login;
