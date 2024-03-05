import React, {useEffect, useState} from 'react';
import './MoviesPopup.css';
import kinopoiskApi from '../../../utils/KinopoiskApi';
import YouTubePlayer from './YouTubePlayer/YouTubePlayer';
import {Link} from 'react-router-dom';

function MoviesPopup(props) {

  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState({});
  const [staff, setStaff] = useState({});
  const [trailerID, setTrailerID] = useState('');

  useEffect(() => {
    if (props.selectedMovie && props.selectedMovie.filmId) {
      Promise.all([kinopoiskApi.getMovie(props.selectedMovie.filmId), kinopoiskApi.getVideos(props.selectedMovie.filmId), kinopoiskApi.getStaff(props.selectedMovie.filmId)])
        .then((res) => {
          setMovie(res[0]);
          setVideos(res[1]);
          setStaff(res[2]);
        });
    }
  }, [props.selectedMovie]);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  useEffect(() => {
    if (staff.length > 0) {
      staffConstructor();
    }
  }, [staff]);

  function qwe() {

  }

  function staffConstructor() {
    const directors = staff.filter(item => item.professionKey === 'DIRECTOR').map(item => item.nameRu).join(', ');
    const actors = staff.filter(item => item.professionKey === 'ACTOR').map(item => item.nameRu)
    const writers = staff.filter(item => item.professionKey === 'WRITER').map(item => item.nameRu)
    const producers = staff.filter(item => item.professionKey === 'PRODUCER');
    setMovie(prevState => ({
      ...prevState,
      directors: directors,
      actors: actors,
      writers: writers,
      producers: producers
    }));
  }

  function genresConstructor() {
    if (props.selectedMovie.genres) {
      return props.selectedMovie.genres.map(item => item.genre).join(', ');
    }
  }

  function countriesConstructor() {
    if (props.selectedMovie.countries) {
      return props.selectedMovie.countries.map(item => item.country).join(', ');
    }
  }

  function getTimeFromMinutes(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
    return hours + 'ч ' + minutes + 'м';
  }


  function extractID() {
    if (videos && videos.items) {
      try {
        const urlObj = new URL(videos.items.find(item => item.site === 'YOUTUBE').url);
        if (urlObj.hostname === 'youtu.be') {
          return urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube')) {
          const params = urlObj.searchParams;
          // Интуитивно понятный запрос идентификатора видео
          return params && params.get('v');
        }
        return false;
      } catch (e) {
        return false; // Если не удалось проанализировать URL, то выходим с ложным результатом
      }
    }

  }

  return (
    <div className="movies-popup">
      <div className="movies-popup__wrapper">
        <div className="movies-popup__main">
          <img src={movie.posterUrlPreview} alt=""/>
          {extractID() && <YouTubePlayer id={extractID()}/>}
        </div>
        <div className="movies-popup__details">
          <h2 className="movies-popup__title">{movie.nameRu}</h2>
          <p className="movies-popup__detail">{`Год производства: ${movie.year}`}</p>
          {movie.countries && <p className="movies-popup__detail">{`Страна: ${countriesConstructor()}`}</p>}
          <p className="movies-popup__detail">{`Жанр: ${genresConstructor()}`}</p>
          {movie.directors &&
            <p className="movies-popup__detail">{`Режисер: ${movie.directors}`}</p>}
          {movie.writers &&
            <p className="movies-popup__detail">{`Сценарий: ${movie.writers.length > 3 ? movie.writers.slice(0, 3).join(', ') + ', ' : movie.writers.join(', ')}`}
              {movie.writers.length > 3 && <Link className="link" to='#'>...</Link>}</p>}
          {movie.actors &&
            <p className="movies-popup__detail">{`Актеры: ${movie.actors.length > 5 ? movie.actors.slice(0, 5).join(', ') + ', ' : movie.actors.join(', ')}`}
              {movie.actors.length > 3 && <Link className="link" to='#'>...</Link>}</p>}
          {movie.ratingImdb && <p className="movies-popup__detail">{`Рейтинг IMDb: ${movie.ratingImdb}`}</p>}
          {movie.ratingKinopoisk &&
            <p className="movies-popup__detail">{`Рейтинг Кинопоиска: ${movie.ratingKinopoisk}`}</p>}
          {(!movie.ratingImdb && !movie.ratingKinopoisk) &&
            <p className="movies-popup__detail">{`Рейтинг ожидания: ${movie.ratingAwait}%`}</p>}
          {movie.filmLength &&
            <p className="movies-popup__detail">{`Продолжительность: ${getTimeFromMinutes(movie.filmLength)}`}</p>}
          <p className="movies-popup__description">{movie.description}</p>
          <div className="movies-popup__links">

            <Link to={movie.webUrl} target="_blank" className="movies-popup__link link">Открыть на Кинопоиске</Link>
            <Link to={movie.webUrl} target="_blank" className="movies-popup__save-btn link"></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesPopup;
