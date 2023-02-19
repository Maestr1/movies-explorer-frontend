import React, { useState } from 'react';
import './Register.css';
import FormInput from '../FormInput/FormInput';
import Entry from '../Entry/Entry';

function Register(props) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!password || !email || !name) {
      return;
    }
    props.handleRegister(name, password, email);
  }

  return (
    <main>
      <Entry onSubmit={submitHandler} title="Добро пожаловать!" btnText="Зарегистрироваться" captionText="Уже зарегистрированы?" linkText="Войти"
             linkPath="/signin">
        <FormInput value={name} onChange={handleChangeName} required={true} name="name" lableName="Имя" type="text"/>
        <FormInput value={email} onChange={handleChangeEmail} required={true} name="email" lableName="E-mail" type="email"/>
        <FormInput value={password} onChange={handleChangePassword} required={true} name="password" lableName="Пароль" type="password"/>
      </Entry>
    </main>
  );
}

export default Register;
