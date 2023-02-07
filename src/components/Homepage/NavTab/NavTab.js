import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavTab.css'
import { HashLink as Link } from 'react-router-hash-link';

function NavTab(props) {

  return (
    <nav className="navTab">
      <ul className="navTab__list">
        <li className="navTab__item">
          <Link className="navTab__link link" to="/#about">О проекте</Link>
        </li>
        <li className="navTab__item">
          <Link className="navTab__link link" to="/#techs">Технологии</Link>
        </li>
        <li className="navTab__item">
          <Link className="navTab__link link" to="/#student">Студент</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
