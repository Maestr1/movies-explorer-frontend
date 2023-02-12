import React, { useState } from 'react';
import './MoviesCard.css';
import tempPic from '../../../images/temp-img.jpg'

function MoviesCard(props) {

  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(saved => !saved)
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__title-wrapper">
        <div className="moviesCard__about-wrapper">
          <h3 className="moviesCard__title">33 слова о дизайне</h3>
          <p className="moviesCard__duration">1ч 47м</p>
        </div>
        <button onClick={handleSave} className={`moviesCard__save-btn btn ${saved ? 'moviesCard__save-btn_active' : ''}`} aria-label="Добавить в сохраненные"/>
      </div>
      <img src={tempPic} alt=""/>

    </li>
  );
}

export default MoviesCard;
