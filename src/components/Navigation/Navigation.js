import './Navigation.css';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navigation() {

  const [isLanding, setIsLanding] = useState(true);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsLanding(false);
    } else setIsLanding(true);
  }, [location]);

  // return (
  //   <nav className="nav">
  //     <Link to="/" className="btn nav_home-btn">Домой</Link>
  //     <ul className="nav__list">
  //       <li className="nav__item">
  //         <Link to="/signup" className="link nav__btn">Регистрация</Link>
  //       </li>
  //     </ul>
  //       <li className="nav__item">
  //         {isLanding ? <Link aria-label="Сылка на страницу входа" to="/signin"
  //               className="btn nav__btn nav__btn_type_login">Войти</Link> : <Link to="/profile">Аккаунт</Link>}
  //       </li>
  //   </nav>
  // );

  return (<>
    <Link to="/" className="btn nav_home-btn">Домой</Link>
    <nav className="nav">
      {!isLanding ? <ul className="nav__list">
        <li className="nav__item"><NavLink className="link nav__link" to="/movies">Фильмы</NavLink></li>
        <li className="nav__item"><NavLink className="link nav__link" to="/saved-movies">Сохранённые фильмы</NavLink></li>
      </ul> : <NavLink className="link nav__link" to="/signup">Регистрация</NavLink>}
      {isLanding ? <Link aria-label="Сылка на страницу входа" to="/signin"
                         className="btn nav__btn nav__btn_type_login">Войти</Link> : <Link className="btn nav__btn nav__btn_type_profile" to="/profile">Аккаунт</Link>}
    </nav>
  </>);
}

export default Navigation;
