import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';

function Register(props) {
  return (
    <section className="register">
      <div className="register__wrapper">
        <Link to="/" aria-label="Сылка на домашнюю страницу" className="btn nav_home-btn">Домой</Link>
        <form className="register__form form">
          <h2 className="register__title">Добро пожаловать!</h2>
          <div className="register__inputs">
            <FormInput name="name" lableName="Имя" type="text"/>
            <FormInput name="email" lableName="E-mail" type="email"/>
            <FormInput name="password" lableName="Пароль" type="password"/>
          </div>
          <button className="register__submit-btn btn">Регистрация</button>
          <p className="login__link-title">Уже зарегистрированы? <Link className="login__link link"
                                                                       to="/signin">Войти</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Register;
