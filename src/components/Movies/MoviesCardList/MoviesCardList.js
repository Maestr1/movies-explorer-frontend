import React from 'react';
import './MoviesCardList.css';
import { moviesApiConfig } from '../../../utils/configs';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {

  const moviesList = props.movies.map((item) => (
    <MoviesCard title={item.nameRU} duration={item.duration} cover={`${moviesApiConfig.baseUrl}${item.image.url}`} trailerLink={item.trailerLink}/>
  ));

  return (
    <section className="moviesCardList container">
      <ul className="moviesCardList__list">
        {moviesList}
      </ul>
      <button className="moviesCardList__more-btn btn">Еще</button>
    </section>
  );
}

export default MoviesCardList;
