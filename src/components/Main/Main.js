import '../Movies/Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Popup from '../Popup/Popup';
import MoviesPopup from '../Popup/MoviesPopup/MoviesPopup';
import kinopoiskApi from '../../utils/KinopoiskApi';
import {useEffect, useState} from 'react';

function Movies(props) {

  const [moviesList, setMoviesList] = useState([]);


  useEffect(() => {
    getPopularMovies()
  }, []);

  function getPopularMovies() {
    kinopoiskApi.getPopularMovies()
      .then(data => {
        if (data && data.films) {
          setMoviesList(data.films);
        }
      })
      .catch(err => console.error(err));
  }

  return (
    <>
      {/*<Popup isOpen={props.moviePopupIsOpen} onClose={props.closePopup}>*/}
      {/*  <MoviesPopup selectedMovie={props.selectedMovie}/>*/}
      {/*</Popup>*/}
      <SearchForm onSubmit={props.findHandler}/>
      <MoviesCardList handlePopupOpen={props.handlePopupOpen} btnType={props.btnType} type={'loaded'} deleteHandler={props.deleteHandler}
                      saveHandler={props.saveHandler} listSize={props.listSize} clickHandler={props.clickHandler}
                      error={props.error} moviesItems={moviesList}/>
    </>
  );
}

export default Movies;
