import './Navigation.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navigation({ isLanding }) {

  // let activeClassName = "nav__link-active";
  const setActive = ({isActive}) => isActive ? 'link nav__link nav__link-active' : 'link nav__link'

  return (
    <>
      <Link to="/" className="btn nav_home-btn">Домой</Link>
      <nav className="nav">
        {!isLanding ? <ul className="nav__list">
          <li className="nav__item"><NavLink className={setActive} to="/movies">Фильмы</NavLink></li>
          <li className="nav__item"><NavLink className={setActive} to="/saved-movies">Сохранённые фильмы</NavLink>
          </li>
        </ul> : <NavLink className="link nav__link nav__link-type-landing" to="/signup">Регистрация</NavLink>}
        {isLanding ? <Link aria-label="Сылка на страницу входа" to="/signin"
                           className="btn nav__btn nav__btn_type_login">Войти</Link> :
          <Link className="btn nav__btn nav__btn_type_profile" to="/profile">Аккаунт</Link>}
      </nav>
    </>
  );
}

export default Navigation;
