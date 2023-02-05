import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {

  return (
    <nav className="nav">
      <Link to="/" className="btn nav_home-btn">Домой</Link>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/signup" className="link nav__btn">Регистрация</Link>
          </li>
          <li className="nav__item">
            <Link aria-label="Сылка на страницу входа" to='/signin' className="btn nav__btn nav__btn_type_login">Войти</Link>
          </li>
        </ul>
    </nav>
  );
}

export default Navigation;
