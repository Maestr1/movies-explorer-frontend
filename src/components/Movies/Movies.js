import React, { useContext } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import currentUserContext from '../../hoc/CurrentUserContext';

function Movies(props) {
  return (
    <>
      <SearchForm filterByShortSwitch={props.filterByShortSwitch} onSubmit={props.onSubmit}/>
      <MoviesCardList btnType={props.btnType} type={'loaded'} btnClickHandler={props.saveHandler} listSize={props.listSize} clickHandler={props.clickHandler} error={props.error} moviesItems={props.moviesItems}/>
    </>
  );
}

export default Movies;
