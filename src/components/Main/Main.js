import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import kinopoiskApi from '../../utils/KinopoiskApi';
import {useEffect, useState} from 'react';

function Movies(props) {

  // const [moviesList, setMoviesList] = useState([]);


  useEffect(() => {
    props.getPopularMovies()
  }, []);


  return (
    <>
      <SearchForm onSubmit={props.findHandler}/>
      <MoviesCardList handlePopupOpen={props.handlePopupOpen} btnType={props.btnType} type={'loaded'} deleteHandler={props.deleteHandler}
                      saveHandler={props.saveHandler} listSize={props.listSize} clickHandler={props.clickHandler}
                      error={props.error} moviesItems={props.moviesItems}/>
    </>
  );
}

export default Movies;
