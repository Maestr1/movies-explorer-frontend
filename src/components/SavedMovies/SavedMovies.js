import React from 'react';
import './SavedMovies.css';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  return (
    <>
      <SearchForm filterByShortSwitch={props.filterByShortSwitch}/>
      <section className="moviesCardList container">
        <ul className="moviesCardList__list">
          <MoviesCard btnType="remove"/>
          <MoviesCard btnType="remove"/>
          <MoviesCard btnType="remove"/>
        </ul>
      </section>
    </>
  );
}

export default SavedMovies;
