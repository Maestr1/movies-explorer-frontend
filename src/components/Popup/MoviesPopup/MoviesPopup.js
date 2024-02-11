import React, {useEffect, useState} from 'react';
import './MoviesPopup.css';
import kinopoiskApi from '../../../utils/KinopoiskApi';
import YouTubePlayer from './YouTubePlayer/YouTubePlayer';

function MoviesPopup(props) {

  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState({});
  const [trailerID, setTrailerID] = useState('');

  useEffect(() => {
    if (props.selectedMovie && props.selectedMovie.filmId) {
      Promise.all([kinopoiskApi.getMovie(props.selectedMovie.filmId), kinopoiskApi.getVideos(props.selectedMovie.filmId)])
        .then((res) => {
          setMovie(res[0]);
          setVideos(res[1]);
        });
    }
  }, [props.selectedMovie]);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  useEffect(() => {
    setTrailerID(extractID);
  }, [videos]);

  function genresConstructor() {
    if (props.selectedMovie.genres) {
      return props.selectedMovie.genres.map(item => item.genre).join(', ');
    }
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
      <h2 className="movies-popup__title">{movie.nameRu}</h2>
      <div className="movies-popup__wrapper">
        <div className="movies-popup__main">
          <img src={movie.posterUrlPreview} alt=""/>
          {extractID() && <YouTubePlayer id={extractID()}/>}
        </div>
        <div className="movies-popup__details">
          <p className="movies-popup__detail">{`Год: ${movie.year}`}</p>
          {movie.countries && <p className="movies-popup__detail">{`Страна: ${movie.countries}`}</p>}
          {movie.ratingImdb && <p className="movies-popup__detail">{`Рейтинг IMDb: ${movie.ratingImdb}`}</p>}
          {movie.ratingKinopoisk && <p className="movies-popup__detail">{`Рейтинг Кинопоиска: ${movie.ratingKinopoisk}`}</p>}
          {(!movie.ratingImdb && !movie.ratingKinopoisk) && <p className="movies-popup__detail">{`Рейтинг ожидания: ${movie.ratingAwait}%`}</p>}
          <p className="movies-popup__detail">{`Жанры: ${genresConstructor()}`}</p>
          <p className="movies-popup__description">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}

export default MoviesPopup;
