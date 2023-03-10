import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import Burger from '../Burger/Burger';
import { useEffect, useState } from 'react';
import Overlay from '../../../Overlay/Overlay';

function Navigation({ loggedIn, clickHandler }) {

  const setActive = ({ isActive }) => isActive ? 'link nav__link nav__link-active' : 'link nav__link';
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isBurgerOpen ? 'hidden' : '';
  }, [isBurgerOpen]);

  useEffect(() => {
    if (!loggedIn) {
      setIsBurgerOpen(false);
    }
  }, [loggedIn]);



  function handleLinkClick() {
    if (isBurgerOpen) {
      setTimeout(() => setIsBurgerOpen(false), 300)

    }
  }

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
      <nav className={`nav ${loggedIn ? 'nav_type_burger' : ''} ${isBurgerOpen ? 'nav_active' : ''}`}>
        {loggedIn ?
          <>
            <ul className="nav__list">
              <li className="nav__item">
                <Link onClick={handleLinkClick} className="link nav__home-link" to="/">Главная</Link>
              </li>
              <li className="nav__item">
                <NavLink onClick={handleLinkClick} className={setActive} to="/movies">Фильмы</NavLink>
              </li>
              <li className="nav__item">
                <NavLink onClick={handleLinkClick} className={setActive} to="/saved-movies">Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </> :
          <NavLink className="link nav__link nav__link-type-landing" to="/signup">Регистрация</NavLink>}
        {!loggedIn ? <Link aria-label="Сылка на страницу входа" to="/signin"
                           className="btn nav__btn nav__btn_type_login">Войти</Link> :
          <Link className="btn nav__btn nav__btn_type_profile" to="/profile">Аккаунт</Link>}
      </nav>
      {loggedIn ? <><Burger onClick={toggleMenuOpen} isMenuOpen={isBurgerOpen} clickHandler={clickHandler}/><Overlay
        isMenuOpen={isBurgerOpen}/></> : ''}
    </>
  );
}

export default Navigation;
