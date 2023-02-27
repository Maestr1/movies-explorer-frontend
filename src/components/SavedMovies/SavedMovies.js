import React from 'react';
import './SavedMovies.css';
import MoviesCard from '../Movies/MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  return (
    <>
      <SearchForm filterByShortSwitch={props.filterByShortSwitch} onSubmit={props.onSubmit}/>
      <MoviesCardList btnType={props.btnType} btnClickHandler={props.deleteHandler} type={'saved'} listSize={props.listSize} clickHandler={props.clickHandler} error={props.error} moviesItems={props.moviesItems}/>
    </>
  );
}

export default SavedMovies;
