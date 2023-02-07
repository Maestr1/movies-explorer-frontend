import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavTab.css'

function NavTab(props) {

  return (
    <nav className="navTab">
      <ul className="navTab__list">
        <li className="navTab__item">
          <NavLink className="navTab__link link" to="/about">О проекте</NavLink>
        </li>
        <li className="navTab__item">
          <NavLink className="navTab__link link" to="/techs">Технологии</NavLink>
        </li>
        <li className="navTab__item">
          <NavLink className="navTab__link link" to="/student">Студент</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
