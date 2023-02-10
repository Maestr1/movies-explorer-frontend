import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

function Footer(props) {
  return (
    <footer className="footer container">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__wrapper">
        <p className="footer__date">&copy; 2023</p>
        <ul className="footer__links">
          <li>
            <Link to="https://practicum.yandex.ru/" className="footer__link link">Яндекс Практикум</Link>
          </li>
          <li>
            <Link to="https://github.com/Maestr1/" className="footer__link link">Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
