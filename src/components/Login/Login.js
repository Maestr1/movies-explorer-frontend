import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';

function Login(props) {
  return (
    <section className="login">
      <Link to='/' aria-label="Сылка на домашнюю страницу" className="btn nav_home-btn">Домой</Link>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form form">
        <FormInput name="email" lableName="E-mail" type="email"/>
        <FormInput name="password" lableName="Пароль" type="password"/>
      </form>
      <p className="login__link-title">Ещё не зарегистрированы? <Link className="login__link link"
                                                                  to="/signup">Регистрация</Link></p>
    </section>
  );
}

export default Login;
