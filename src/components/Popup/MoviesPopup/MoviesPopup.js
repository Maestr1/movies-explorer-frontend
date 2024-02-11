import React, {useEffect, useState} from 'react';
import './MoviesPopup.css';
import kinopoiskApi from '../../../utils/KinopoiskApi';

function MoviesPopup(props) {

  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (props.selectedMovie && props.selectedMovie.filmId) {
      kinopoiskApi.getMovie(props.selectedMovie.filmId)
        .then((res) => setMovie(res))
    }
  }, [props.selectedMovie]);

  useEffect(() => {
    console.log(movie)
  }, [movie]);

  return (
    <div className="movies-popup">
      <div className="movies-popup__main">
        <h2 className="movies-popup__title">{props.selectedMovie.nameRu}</h2>
        <img src={movie.posterUrlPreview} alt=""/>
      </div>
      <div className="movies-popup__description">
        <p>{movie.description}</p>
      </div>
    </div>
  );
}

export default MoviesPopup;
