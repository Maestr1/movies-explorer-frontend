import React from 'react';
import './SavedMovies.css'
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
function SavedMovies(props) {
  return (
    <section className="moviesCardList container">
      <ul className="moviesCardList__list">
        <MoviesCard btnType='remove'/>
        <MoviesCard btnType='remove'/>
        <MoviesCard btnType='remove'/>
      </ul>
    </section>
  );
}

export default SavedMovies;
