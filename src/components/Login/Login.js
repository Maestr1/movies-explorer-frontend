import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';

function Login(props) {
  return (
    <section className="login">
      <div className="login__wrapper">
        <Link to="/" aria-label="Сылка на домашнюю страницу" className="btn nav_home-btn">Домой</Link>
        <h2 className="login__title">Рады видеть!</h2>
        <form className="login__form form">
          <div className="login__inputs">
            <FormInput name="email" lableName="E-mail" type="email"/>
            <FormInput name="password" lableName="Пароль" type="password"/>
          </div>
          <button className="login__submit-btn btn">Войти</button>
            <p className="login__link-title">Ещё не зарегистрированы? <Link className="login__link link"
                                                                            to="/signup">Регистрация</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Login;
