import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <>
      <SearchForm onSubmit={props.onSubmit}/>
      <MoviesCardList movies={props.movies}/>
    </>
  );
}

export default Movies;
