import React, { useContext } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import LoadingContext from '../../../hoc/LoadingContext';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {

  const isLoading = useContext(LoadingContext);
  const moviesList = props.moviesItems.slice(0, props.listSize).map((item) => (
    <MoviesCard type={props.type} movie={item} key={item.movieId} btnType={props.btnType} deleteHandler={props.deleteHandler} saveHandler={props.saveHandler} title={item.nameRU} duration={item.duration}
                cover={item.image} trailerLink={item.trailerLink}/>
  ));


  if (isLoading) {
    return <Preloader/>;
  } else return (
    <section className="moviesCardList container">
      {props.error ? <p className="moviesCardList__error">{props.error}</p> : ''}
      <ul className="moviesCardList__list">
        {!props.error ? moviesList : ''}
      </ul>
      {props.error || props.listSize >= props.moviesItems.length ? '' : <button onClick={props.clickHandler} className="moviesCardList__more-btn btn">Еще</button>}
    </section>
  );
}

export default MoviesCardList;
