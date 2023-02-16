import React from 'react';
import './Portfolio.css';
import {Link} from 'react-router-dom';

function Portfolio(props) {
  return (
    <section className="portfolio container">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <Link className="portfolio__link link" to="https://github.com/Maestr1/how-to-learn">Статичный сайт</Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link link" to="https://github.com/Maestr1/mesto">Адаптивный сайт</Link>
        </li>
        <li className="portfolio__item">
          <Link className="portfolio__link link" to="https://github.com/Maestr1/react-mesto-api-full">Одностраничное приложение</Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
