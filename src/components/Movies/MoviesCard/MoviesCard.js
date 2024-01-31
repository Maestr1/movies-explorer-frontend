import React, { useEffect, useState } from 'react';
import './MoviesCard.css';
// import { Link } from 'react-router-dom';

function MoviesCard(props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (props.movie.saved) {
      setSaved(true)
    } else setSaved(false)
  }, [props.movie.saved])

  function handleSaveClick(event) {
    event.stopPropagation()
    if (!saved) {
      props.saveHandler(props.movie);
      // setSaved(true);
    }
  }

  function handleDeleteClick(event) {
    event.stopPropagation()
    props.deleteHandler(props.movie);
    setSaved(false);
    props.movie.saved = false
  }

  // function getTimeFromMinutes(duration) {
  //   const hours = Math.trunc(duration / 60);
  //   const minutes = duration % 60;
  //   return hours + 'ч ' + minutes + 'м';
  // }

  function splitDuration() {
    if (props.duration) {
      const time = props.duration.split(':');
      return `${time[0]}ч ${time[1]}м`;
    } else return '-ч -м'
  }

  function openMoviePopup() {
    console.log('open')
  }

  return (
    <li className="moviesCard" onClick={openMoviePopup}>
      <div className="moviesCard__title-wrapper">
        <div className="moviesCard__about-wrapper">
          <h2 className="moviesCard__title">{props.title}</h2>
          <p className="moviesCard__duration">{splitDuration()}</p>
        </div>
        <button onClick={props.type === 'loaded' && !saved ? handleSaveClick : handleDeleteClick}
                className={`moviesCard__btn moviesCard__btn_type_${props.btnType} btn ${saved ? `moviesCard__btn_type_${props.btnType}_active` : ''}`}
                aria-label="Добавить в сохраненные"/>
      </div>
      {/*<Link className="moviesCard__link" target="_blank" to={props.trailerLink}>*/}
        <img className="moviesCard__cover" src={props.cover} alt="Обложка фильма"/>
      {/*</Link>*/}
    </li>
  );
}

export default MoviesCard;
