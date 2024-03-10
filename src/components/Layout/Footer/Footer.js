import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

function Footer(props) {
  return (
    <footer className="footer container">
      <div className="footer__title">Ovchinnikov Dmitry</div>
      <div className="footer__wrapper">
        <p className="footer__date footer__date_type_desktop">&copy; 2024</p>
        <p className="footer__date footer__date_type_mobile">&copy;2024</p>
        <ul className="footer__links">
          <li>
            <Link target="_blank" to="https://t.me/Maestrone0" className="footer__link link">Telegram</Link>
          </li>
          <li>
            <Link target="_blank" to="https://github.com/Maestr1/" className="footer__link link">Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
