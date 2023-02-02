import './Navigation.css';

export default function Navigation() {

  return (
    <nav className="nav">
      <btn className="btn nav_home-btn">To home</btn>
      <div>
        <ul className="nav__list">
          <li className="nav__item">
            <btn href="#" className="btn nav__btn">Регистрация</btn>
          </li>
          <li className="nav__item">
            <btn href="#" className="btn nav__btn">Регистрация</btn>
          </li>
          <li className="nav__item">
            <btn href="#" className="btn nav__btn nav__btn_type_login">Войти</btn>
          </li>
        </ul>
      </div>
    </nav>
  );
}
