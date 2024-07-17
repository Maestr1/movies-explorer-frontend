import React, {useContext, useEffect, useState} from 'react';
import './MoviesCard.css';
import AuthContext from '../../../context/AuthContext';
import {Link} from 'react-router-dom';
import Popup from '../../Popup/Popup';
import CoverPopup from '../../Popup/CoverPopup';
import LoginRequestPopup from '../../Popup/LoginRequestPopup';

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
    event.preventDefault();
    if (!saved) {
      props.saveHandler(props.movie);
      // setSaved(true);
    }
  }

  function handleDeleteClick(event) {
    event.preventDefault();
    props.deleteHandler(props.movie);
    setSaved(false);
    props.movie.saved = false;
  }

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
    if (props.movie.rating.indexOf('%') === -1 && props.movie.rating !== 'Рейтинг не указан') {
      if (props.movie.rating >= 7) {
        return 'high';
      } else if (props.movie.rating >= 4) {
        return 'middle';
      } else return 'low';
    }
  }

  function unloggedButtonHandler(event) {
    //отсанавливаем всплытия нативного события до ссылки
    event.preventDefault();
    props.setLoginRequestPopupIsOpen(true);
  }

  return (
      <li className="moviesCard">
        <Link className="moviesCard__link" to={`./film/${props.movie.filmId}`}>
          <div className="moviesCard__title-wrapper">
            <div className="moviesCard__about-wrapper">
              <h2 className="moviesCard__title">{props.title}</h2>
              <p className="moviesCard__duration">{splitDuration()}</p>
            </div>
            <button
              onClick={loggedIn ? (props.type === 'loaded' && !saved ? handleSaveClick : handleDeleteClick) : unloggedButtonHandler}
              className={`moviesCard__btn moviesCard__btn_type_${props.btnType} btn ${saved ? `moviesCard__btn_type_${props.btnType}_active` : ''}`}
              aria-label="Добавить в сохраненные"/>
          </div>
          <div className="moviesCard__cover-wrapper">
            {(props.movie.rating) ?
              (props.movie.rating.indexOf('%') !== -1 ?
                <p className="moviesCard__rating moviesCard__rating-text">{`Рейтинг ожидания `}<span
                  className="moviesCard__rating-percent">{modifiedRating}</span></p> :
                <p
                  className={`moviesCard__rating moviesCard__rating_type_${ratingColorCalc()}`}>{props.movie.rating}</p>)
              : <p className="moviesCard__rating moviesCard__rating-text">Рейтинг отсутствует</p>}
            <img className="moviesCard__cover" src={props.cover} alt="Обложка фильма"/>
          </div>
        </Link>
      </li>
  );
}

export default MoviesCard;
