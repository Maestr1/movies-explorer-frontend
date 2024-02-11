import React, {useContext, useEffect, useState} from 'react';
import './MoviesCard.css';
import AuthContext from '../../../context/AuthContext';

// import { Link } from 'react-router-dom';

function MoviesCard(props) {
  const [saved, setSaved] = useState(false);
  const loggedIn = useContext(AuthContext);
  const modifiedRating = props.movie.rating.slice(0, -3) + props.movie.rating.slice(-1);

  useEffect(() => {
    if (props.movie.saved) {
      setSaved(true);
    } else setSaved(false);
  }, [props.movie.saved]);

  function handleSaveClick(event) {
    event.stopPropagation();
    if (!saved) {
      props.saveHandler(props.movie);
      // console.log(props.movie)
      // setSaved(true);
    }
  }

  function handleDeleteClick(event) {
    event.stopPropagation();
    props.deleteHandler(props.movie);
    setSaved(false);
    props.movie.saved = false;
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
    } else return '-ч -м';
  }


  function openMoviePopup() {
    props.handlePopupOpen(props.movie);
  }

  function ratingColorCalc() {
    if (props.movie.rating.indexOf('%') === -1) {
      if (props.movie.rating >= 7) {
        return 'high';
      } else if (props.movie.rating >= 4) {
        return 'middle';
      } else return 'low';
    }
  }


  return (
    <li className="moviesCard" onClick={openMoviePopup}>
      <div className="moviesCard__title-wrapper">
        <div className="moviesCard__about-wrapper">
          <h2 className="moviesCard__title">{props.title}</h2>
          <p className="moviesCard__duration">{splitDuration()}</p>
        </div>
        {loggedIn ? <button onClick={props.type === 'loaded' && !saved ? handleSaveClick : handleDeleteClick}
                            className={`moviesCard__btn moviesCard__btn_type_${props.btnType} btn ${saved ? `moviesCard__btn_type_${props.btnType}_active` : ''}`}
                            aria-label="Добавить в сохраненные"/> : null}
      </div>
      <div className="moviesCard__cover-wrapper">
        {props.movie.rating.indexOf('%') !== -1 ?
          <p className="moviesCard__rating moviesCard__rating-text">{`Рейтинг ожидания `}<span
            className="moviesCard__rating-percent">{modifiedRating}</span></p> :
          <p className={`moviesCard__rating moviesCard__rating_type_${ratingColorCalc()}`}>{props.movie.rating}</p>}
        <img className="moviesCard__cover" src={props.cover} alt="Обложка фильма"/>
      </div>
    </li>
  );
}

export default MoviesCard;
