import React from 'react';
import './About.css';

function About(props) {
  return (
    <section id="about" className="about container">
      <h2 className="about__title section-title">О проекте</h2>
      <div className="about__article-wrapper">
        <article className="about__article">
          <h3 className="about__article-title">Дипломный проект включал 5 этапов</h3>
          <p className="about__article-text">Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.</p>
        </article>
        <article className="about__article">
          <h3 className="about__article-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about__article-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
            чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about__scheme">
        <div className="about__scheme-item about__scheme-item_type_backend">
          <p className="about__scheme-text"> 1 неделя </p>
          <label className="about__scheme-label">Back-end</label>
        </div>
        <div className="about__scheme-item about__scheme-item_type_frontend">
          <p className="about__scheme-text"> 4 недели</p>
          <label className="about__scheme-label">Front-end</label>
        </div>
      </div>
    </section>
  );
}

export default About;
