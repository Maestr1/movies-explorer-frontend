import React, { useContext } from 'react';
import './MoviesCardList.css';
import { moviesApiConfig } from '../../../utils/configs';
import MoviesCard from '../MoviesCard/MoviesCard';
import LoadingContext from '../../../hoc/LoadingContext';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {

  const isLoading = useContext(LoadingContext);
  const moviesList = props.moviesItems.map((item) => (
    <MoviesCard btnType="save" title={item.nameRU} duration={item.duration}
                cover={`${moviesApiConfig.baseUrl}${item.image.url}`} trailerLink={item.trailerLink}/>
  ));

  if (isLoading) {
    return <Preloader/>
  } else return (
    <section className="moviesCardList container">
      <ul className="moviesCardList__list">
        {props.error ? <p className="moviesCardList__error">{props.error}</p> : moviesList}
      </ul>
      {props.error ? '' : <button className="moviesCardList__more-btn btn">Еще</button>}
    </section>
  );
}

export default MoviesCardList;
