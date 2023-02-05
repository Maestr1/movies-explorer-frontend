import React from 'react';
import './Register.css';
import { Form, Link } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';

function Register(props) {
  return (
    <section className="login">
      <Link to='/' aria-label="Сылка на домашнюю страницу" className="btn nav_home-btn">Домой</Link>
      <form className="login__form form">
        <h2 className="login__title">Добро пожаловать!</h2>
        <FormInput name="name" lableName="Имя" type="text"/>
        <FormInput name="email" lableName="E-mail" type="email"/>
        <FormInput name="password" lableName="Пароль" type="password"/>
      </form>
    </section>
  );
}

export default Register;
