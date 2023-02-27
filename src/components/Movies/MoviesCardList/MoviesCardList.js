import React, { useContext } from 'react';
import './MoviesCardList.css';
import { moviesApiConfig } from '../../../utils/configs';
import MoviesCard from '../MoviesCard/MoviesCard';
import LoadingContext from '../../../hoc/LoadingContext';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList(props) {

  const isLoading = useContext(LoadingContext);
  const moviesList = props.moviesItems.slice(0, props.listSize).map((item) => (
    <MoviesCard type={props.type} movie={item} key={props.type === 'loaded' ? item.id : item._id} btnType={props.btnType} deleteHandler={props.deleteHandler} saveHandler={props.saveHandler} title={item.nameRU} duration={item.duration}
                cover={`${moviesApiConfig.baseUrl}${props.type === 'loaded' ? item.image.url : item.image}`} trailerLink={item.trailerLink}/>
  ));


  if (isLoading) {
    return <Preloader/>;
  } else return (
    <section className="moviesCardList container">
      <ul className="moviesCardList__list">
        {props.error ? <p className="moviesCardList__error">{props.error}</p> : props.type === 'loaded' ? moviesList : moviesList.reverse()}
      </ul>
      {props.error || props.listSize >= props.moviesItems.length ? '' : <button onClick={props.clickHandler} className="moviesCardList__more-btn btn">Еще</button>}
    </section>
  );
}

export default MoviesCardList;
