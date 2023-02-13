import React from 'react';
import './AboutMe.css';
import portrait from '../../../images/portrait.jpg';
import { Link } from 'react-router-dom';

function AboutMe(props) {
  return (
    <section className="aboutMe container" id="student">
      <h2 className="aboutMe__title section-title">Студент</h2>
      <div className="aboutMe__wrapper">
        <div className="aboutMe__content">
          <h3 className="aboutMe__name">Дмитрий</h3>
          <p className="aboutMe__job">Фронтенд-разработчик, 28&nbsp;лет</p>
          <article className="aboutMe__story">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в
            компании
            «СКБ&nbsp;Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
            постоянной
            работы.
          </article>
          <Link className="aboutMe__link link" to="https://github.com/Maestr1/">Github</Link>
        </div>
        <img className="aboutMe__portrait" src={portrait} alt="фото создателя"/>
      </div>
    </section>
  );
}

export default AboutMe;
