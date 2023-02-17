import React from 'react';
import './Enrty.css'
import { Link } from 'react-router-dom';


function Entry(props) {
  return (
    <section className="entry">
      <div className="entry__wrapper">
        <Link to="/" aria-label="Сылка на домашнюю страницу" className="btn nav_home-btn"/>
        <h1 className="entry__title">{props.title}</h1>
        <form className="entry__form form">
          <div className="entry__inputs">
            {props.children}
          </div>
          <button className="entry__submit-btn btn">{props.btnText}</button>
          <p className="entry__caption">{props.captionText}<Link className="entry__link link"
                                                                       to={props.linkPath}>{props.linkText}</Link></p>
        </form>
      </div>
    </section>
  );
}

export default Entry;
