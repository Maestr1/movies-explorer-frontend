import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies(props) {
  return (
    <>
      <SearchForm/>
      <MoviesCardList movies={props.movies}/>
    </>
  );
}

export default Movies;
