import React from 'react';
import './Techs.css';

function Techs(props) {
  return (
    <section className="techs" id="techs">
      <div className="container">
        <h2 className="techs__title section-title">Технологии</h2>
        <div className="techs__content-wrapper">
          <h3 className="techs__heading">7 технологий</h3>
          <p className="techs__subheading">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
            проекте.</p>
          <ul className="techs__list">
            <li className="techs__item">HTML</li>
            <li className="techs__item">CSS</li>
            <li className="techs__item">JS</li>
            <li className="techs__item">React</li>
            <li className="techs__item">Git</li>
            <li className="techs__item">Express.js</li>
            <li className="techs__item">mongoDB</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Techs;
