import React, { useState } from 'react';
import './Login.css';
import FormInput from '../FormInput/FormInput';
import Entry from '../Entry/Entry';

function Login(props) {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!password || !email) {
      return;
    }
    props.handleLogin(password, email);
  }

  return (
    <main>
      <Entry onSubmit={submitHandler} title="Рады видеть!" btnText="Войти" captionText="Ещё не зарегистрированы?" linkText="Регистрация"
             linkPath="/signup">
        <FormInput value={email} onChange={handleChangeEmail} required={true} name="email" lableName="E-mail" type="email"/>
        <FormInput value={password} onChange={handleChangePassword} required={true} name="password" lableName="Пароль" type="password"/>
      </Entry>
    </main>
  );
}

export default Login;
