import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <>
      <SearchForm filterByShortSwitch={props.filterByShortSwitch} onSubmit={props.onSubmit}/>
      <MoviesCardList listSize={props.listSize} clickHandler={props.clickHandler} error={props.error} moviesItems={props.moviesItems}/>
    </>
  );
}

export default Movies;
