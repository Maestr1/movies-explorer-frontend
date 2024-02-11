import React, { useContext } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import LoadingContext from '../../../context/LoadingContext';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {

  const isLoading = useContext(LoadingContext);
  const moviesList = props.moviesItems.slice(0, props.listSize).map((item, index) => (
    <MoviesCard handlePopupOpen={props.handlePopupOpen} type={props.type} movie={item} key={`movie-card-${index}`} btnType={props.btnType} deleteHandler={props.deleteHandler} saveHandler={props.saveHandler} title={item.nameRu} duration={item.filmLength}
                cover={item.posterUrlPreview}/>
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
