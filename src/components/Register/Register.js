import React from 'react';
import './Register.css';
import FormInput from '../FormInput/FormInput';
import Entry from '../Entry/Entry';

function Register(props) {
  return (
    <main>
      <Entry title="Добро пожаловать!" btnText="Зарегистрироваться" captionText="Уже зарегистрированы?" linkText="Войти"
             linkPath="/signin">
        <FormInput required={true} name="name" lableName="Имя" type="text"/>
        <FormInput required={true} name="email" lableName="E-mail" type="email"/>
        <FormInput required={true} name="password" lableName="Пароль" type="password"/>
      </Entry>
    </main>
  );
}

export default Register;
