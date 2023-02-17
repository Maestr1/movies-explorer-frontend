import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import Burger from '../Burger/Burger';
import { useEffect, useState } from 'react';
import Overlay from '../../../Overlay/Overlay';

function Navigation({ isLanding, clickHandler }) {

  const setActive = ({ isActive }) => isActive ? 'link nav__link nav__link-active' : 'link nav__link';
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isBurgerOpen ? 'hidden' : '';
  }, [isBurgerOpen]);

  useEffect(() => {
    if (isLanding) {
      setIsBurgerOpen(false);
    }
  }, [isLanding]);

  function toggleMenuOpen() {
    if (isBurgerOpen) {
      setIsBurgerOpen(false);
    } else {
      setIsBurgerOpen(true);
    }
  }

  return (
    <>
      <Link to="/" className="btn header__home-btn">Домой</Link>
      <nav className={`nav ${!isLanding ? 'nav_type_burger' : ''} ${isBurgerOpen ? 'nav_active' : ''}`}>
        {!isLanding ?
          <>
            <ul className="nav__list">
              <li className="nav__item">
                <Link className="link nav__home-link" to="/">Главная</Link>
              </li>
              <li className="nav__item">
                <NavLink className={setActive} to="/movies">Фильмы</NavLink>
              </li>
              <li className="nav__item">
                <NavLink className={setActive} to="/saved-movies">Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </> :
          <NavLink className="link nav__link nav__link-type-landing" to="/signup">Регистрация</NavLink>}
        {isLanding ? <Link aria-label="Сылка на страницу входа" to="/signin"
                           className="btn nav__btn nav__btn_type_login">Войти</Link> :
          <Link className="btn nav__btn nav__btn_type_profile" to="/profile">Аккаунт</Link>}
      </nav>
      {!isLanding ? <><Burger onClick={toggleMenuOpen} isMenuOpen={isBurgerOpen} clickHandler={clickHandler}/><Overlay isMenuOpen={isBurgerOpen}/></> : ''}
    </>
  );
}

export default Navigation;
