import React, { useState } from 'react';
import './MoviesCard.css';
import { Link } from 'react-router-dom';

function MoviesCard(props) {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(saved => !saved)
  }

  function getTimeFromMinutes(duration) {
    const hours = Math.trunc(duration/60);
    const minutes = duration % 60;
    return hours + 'ч ' + minutes + 'м';
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__title-wrapper">
        <div className="moviesCard__about-wrapper">
          <h2 className="moviesCard__title">{props.title}</h2>
          <p className="moviesCard__duration">{getTimeFromMinutes(props.duration)}</p>
        </div>
        <button onClick={handleSave} className={`moviesCard__btn moviesCard__btn_type_${props.btnType} btn ${saved ? `moviesCard__btn_type_${props.btnType}_active` : ''}`} aria-label="Добавить в сохраненные"/>
      </div>
      <Link className="moviesCard__link" to={props.trailerLink}>
        <img className="moviesCard__cover" src={props.cover} alt="Обложка фильма"/>
      </Link>
    </li>
  );
}

export default MoviesCard;
