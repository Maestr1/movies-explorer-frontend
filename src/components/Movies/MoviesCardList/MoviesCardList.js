import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  return (
    <section className="moviesCardList container">
      <ul className="moviesCardList__list">
        <MoviesCard btnType='save'/>
        <MoviesCard btnType='save'/>
        <MoviesCard btnType='save'/>
        <MoviesCard btnType='save'/>
        <MoviesCard btnType='save'/>
        <MoviesCard btnType='save'/>
        <MoviesCard btnType='save'/>
        <MoviesCard btnType='save'/>
        <MoviesCard btnType='save'/>
      </ul>
      <button className="moviesCardList__more-btn btn">Еще</button>
    </section>
  );
}

export default MoviesCardList;
